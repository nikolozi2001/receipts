import { ApiResponse } from '@/types/api';

const API_CAR_SEARCH_URLS = [
  'http://192.168.1.27:3001/api/receipt-by-car',  // Your network IP
  'http://10.0.2.2:3001/api/receipt-by-car',      // Android emulator
  'http://localhost:3001/api/receipt-by-car'       // Fallback
];

class ApiService {
  private async makeRequest(url: string, options: RequestInit = {}): Promise<ApiResponse> {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.log('API returned non-JSON response');
        return {
          success: false,
          message: 'Invalid response format',
          data: { count: 0, results: [] }
        };
      }

      const text = await response.text();
      try {
        return JSON.parse(text) as ApiResponse;
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        console.log('Response text:', text.substring(0, 200));
        return {
          success: false,
          message: 'Failed to parse response',
          data: { count: 0, results: [] }
        };
      }
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        data: { count: 0, results: [] }
      };
    }
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
    console.log('Searching by car number:', carNumber);
    
    // Try multiple URLs for React Native compatibility
    for (const url of API_CAR_SEARCH_URLS) {
      console.log('Attempting to connect to proxy server at:', url);
      
      try {
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout per URL
        
        const response = await fetch(url, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({ 
            carNumber: carNumber.trim().toUpperCase() 
          }),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Proxy response received from', url, ':', data);
        
        // Handle the proxy response format you specified
        if (data && typeof data === 'object' && 'success' in data) {
          if (data.success && data.data && data.data.results) {
            console.log('✅ Found', data.data.results.length, 'violations');
            return {
              success: true,
              message: data.message || 'წარმატებით ჩაიტვირთა',
              data: {
                count: data.data.results.length,
                results: data.data.results
              }
            };
          } else {
            return {
              success: true,
              message: 'ჯარიმები არ მოიძებნა',
              data: { count: 0, results: [] }
            };
          }
        }
        
        return {
          success: false,
          message: 'არასწორი რესპონსის ფორმატი',
          data: { count: 0, results: [] }
        };
        
      } catch (error) {
        console.warn(`Failed to connect to ${url}:`, error instanceof Error ? error.message : 'Unknown error');
        
        // If this is the last URL, return the error
        if (url === API_CAR_SEARCH_URLS[API_CAR_SEARCH_URLS.length - 1]) {
          console.error('All proxy URLs failed');
          
          if (error instanceof Error && error.name === 'AbortError') {
            return {
              success: false,
              message: 'სერვერთან კავშირი ვერ დამყარდა (timeout)',
              data: { count: 0, results: [] }
            };
          }
          
          return {
            success: false,
            message: '❌ პროქსი სერვერი მიუწვდომელია. დარწმუნდით რომ სერვერი მუშაობს port 3001-ზე',
            data: { count: 0, results: [] }
          };
        }
        
        // Continue to next URL
        continue;
      }
    }
    
    // This should never be reached, but just in case
    return {
      success: false,
      message: 'უცნობი შეცდომა',
      data: { count: 0, results: [] }
    };
  }

  async searchByPersonalData(personalId: string, surname: string, birthDate: string): Promise<ApiResponse> {
    console.log('Searching by personal data');
    // This endpoint might not exist yet, but keeping it for future implementation
    return {
      success: false,
      message: 'Personal search not implemented yet',
      data: { count: 0, results: [] }
    };
  }
}

export const apiService = new ApiService();