import { ApiResponse } from '@/types/api';

// API configuration - inline to avoid import issues
const API_BASE_URL = __DEV__ ? 'https://da8bec28957b.ngrok-free.app' : 'https://api.police.ge';
const API_TIMEOUT = 10000;
const RETRY_ATTEMPTS = 3;
const ENDPOINTS = {
  CAR_SEARCH: '/api/receipt-by-car',
  PERSONAL_SEARCH: '/api/receipt-by-personal',
  ALL_PROTOCOLS: '/api/protocols'
};

// Error messages in Georgian
const ERROR_MESSAGES = {
  NETWORK_ERROR: 'ინტერნეტ კავშირი არ არის ხელმისაწვდომი',
  SERVER_ERROR: 'სერვერთან კავშირის პრობლემა',
  TIMEOUT_ERROR: 'მოთხოვნის დრო ამოიწურა',
  INVALID_INPUT: 'შეიყვანეთ სწორი მონაცემები',
  NO_DATA: 'მონაცემები არ მოიძებნა',
  VALIDATION_ERROR: 'მონაცემების ვალიდაცია ვერ მოხერხდა'
};

// Success messages
const SUCCESS_MESSAGES = {
  DATA_LOADED: 'მონაცემები წარმატებით ჩაიტვირთა',
  SEARCH_COMPLETED: 'ძიება წარმატებით დასრულდა'
};

class ApiService {
  private async makeRequestWithRetry(url: string, options: RequestInit = {}, retryCount = 0): Promise<ApiResponse> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        signal: controller.signal,
        ...options,
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status >= 500 && retryCount < RETRY_ATTEMPTS) {
          console.log(`Server error, retrying... (${retryCount + 1}/${RETRY_ATTEMPTS})`);
          await this.delay(1000 * (retryCount + 1)); // Exponential backoff
          return this.makeRequestWithRetry(url, options, retryCount + 1);
        }
        
        // Handle 404 as "no data found" rather than an error
        if (response.status === 404) {
          return {
            success: true,
            message: 'მონაცემები არ მოიძებნა',
            data: { count: 0, results: [] }
          };
        }
        
        return {
          success: false,
          message: this.getErrorMessage(response.status),
          data: { count: 0, results: [] }
        };
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        return {
          success: false,
          message: ERROR_MESSAGES.SERVER_ERROR,
          data: { count: 0, results: [] }
        };
      }

      const data = await response.json();
      return data as ApiResponse;
      
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return {
          success: false,
          message: ERROR_MESSAGES.TIMEOUT_ERROR,
          data: { count: 0, results: [] }
        };
      }
      
      if (retryCount < RETRY_ATTEMPTS && this.isRetryableError(error)) {
        console.log(`Network error, retrying... (${retryCount + 1}/${RETRY_ATTEMPTS})`);
        await this.delay(1000 * (retryCount + 1));
        return this.makeRequestWithRetry(url, options, retryCount + 1);
      }
      
      console.error('API Error:', error);
      return {
        success: false,
        message: this.getNetworkErrorMessage(error),
        data: { count: 0, results: [] }
      };
    }
  }
  
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  private isRetryableError(error: unknown): boolean {
    if (error instanceof Error) {
      return error.message.includes('fetch') || 
             error.message.includes('network') ||
             error.message.includes('connection');
    }
    return false;
  }
  
  private getErrorMessage(status: number): string {
    switch (status) {
      case 400: return 'არასწორი მოთხოვნა';
      case 401: return 'ავტორიზაცია საჭიროა';
      case 403: return 'წვდომა აკრძალულია';
      case 404: return 'მონაცემები არ მოიძებნა';
      case 429: return 'ძალიან ბევრი მოთხოვნა, სცადეთ მოგვიანებით';
      case 500: return ERROR_MESSAGES.SERVER_ERROR;
      default: return ERROR_MESSAGES.NETWORK_ERROR;
    }
  }
  
  private getNetworkErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      if (error.message.includes('fetch')) {
        return ERROR_MESSAGES.NETWORK_ERROR;
      }
    }
    return ERROR_MESSAGES.SERVER_ERROR;
  }
  
  private async makeRequest(url: string, options: RequestInit = {}): Promise<ApiResponse> {
    return this.makeRequestWithRetry(url, options, 0);
  }

  async getAllProtocols(): Promise<ApiResponse> {
    console.log('Ready to search protocols...');
    // Return empty state for initial load - user needs to search
    return {
      success: true,
      message: 'შეიყვანეთ ძიების პარამეტრები',
      data: { count: 0, results: [] }
    };
  }

  async searchByCarNumber(carNumber: string): Promise<ApiResponse> {
    if (!carNumber || !carNumber.trim()) {
      return {
        success: false,
        message: ERROR_MESSAGES.INVALID_INPUT,
        data: { count: 0, results: [] }
      };
    }
    
    const cleanCarNumber = carNumber.trim().toUpperCase();
    console.log('Searching by car number:', cleanCarNumber);
    
    const url = `${API_BASE_URL}${ENDPOINTS.CAR_SEARCH}?plate=${encodeURIComponent(cleanCarNumber)}`;
    console.log('Using API URL:', url);
    
    const response = await this.makeRequest(url, {
      method: 'GET'
    });
    
    // Check if this is a "no data found" response (success with no results)
    if (response.success && response.data) {
      if (response.data.results && response.data.results.length > 0) {
        console.log('✅ Found', response.data.results.length, 'violations');
        return {
          success: true,
          message: `${SUCCESS_MESSAGES.SEARCH_COMPLETED} - ნაპოვნია ${response.data.results.length} ჯარიმა`,
          data: response.data
        };
      } else {
        console.log('✅ No violations found for car:', cleanCarNumber);
        return {
          success: true,
          message: '✅ ამ ავტომობილზე აქტიური ჯარიმები არ არის',
          data: { count: 0, results: [] }
        };
      }
    }
    
    // If not successful, return the error response
    console.log('❌ Search failed:', response.message);
    return response;
  }

  async searchByPersonalData(personalId: string, surname: string, birthDate: string): Promise<ApiResponse> {
    // Validate inputs
    if (!personalId || !personalId.trim()) {
      return {
        success: false,
        message: 'შეიყვანეთ პირადი ნომერი',
        data: { count: 0, results: [] }
      };
    }
    
    if (!surname || !surname.trim()) {
      return {
        success: false,
        message: 'შეიყვანეთ გვარი',
        data: { count: 0, results: [] }
      };
    }
    
    if (!birthDate || !birthDate.trim()) {
      return {
        success: false,
        message: 'შეიყვანეთ დაბადების თარიღი',
        data: { count: 0, results: [] }
      };
    }
    
    // Validate personal ID format (Georgian personal ID is 11 digits)
    const cleanPersonalId = personalId.trim();
    if (!/^\d{11}$/.test(cleanPersonalId)) {
      return {
        success: false,
        message: 'პირადი ნომერი უნდა შეიცავდეს 11 ციფრს',
        data: { count: 0, results: [] }
      };
    }
    
    // Validate birth date format (DD/MM/YYYY)
    const cleanBirthDate = birthDate.trim();
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(cleanBirthDate)) {
      return {
        success: false,
        message: 'დაბადების თარიღი უნდა იყოს ფორმატში: DD/MM/YYYY',
        data: { count: 0, results: [] }
      };
    }
    
    console.log('Searching by personal data:', { personalId: cleanPersonalId, surname: surname.trim(), birthDate: cleanBirthDate });
    
    const url = `${API_BASE_URL}${ENDPOINTS.PERSONAL_SEARCH}`;
    console.log('Using API URL:', url);
    
    const response = await this.makeRequest(url, {
      method: 'POST',
      body: JSON.stringify({ 
        personalId: cleanPersonalId,
        surname: surname.trim(),
        birthDate: cleanBirthDate
      })
    });
    
    // Check if this is a "no data found" response (success with no results)
    if (response.success && response.data) {
      if (response.data.results && response.data.results.length > 0) {
        console.log('✅ Found', response.data.results.length, 'violations for personal data');
        return {
          success: true,
          message: `${SUCCESS_MESSAGES.SEARCH_COMPLETED} - ნაპოვნია ${response.data.results.length} ჯარიმა`,
          data: response.data
        };
      } else {
        console.log('✅ No violations found for personal data');
        return {
          success: true,
          message: '✅ მოცემულ მონაცემებზე აქტიური ჯარიმები არ არის',
          data: { count: 0, results: [] }
        };
      }
    }
    
    // If not successful, return the error response
    console.log('❌ Personal search failed:', response.message);
    return response;
  }
}

export const apiService = new ApiService();