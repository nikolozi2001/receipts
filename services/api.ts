import { ApiResponse } from '@/types/api';

const API_BASE_URL = 'https://police.ge/protocol/index.php?url=protocols';

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
    console.log('Fetching all protocols...');
    return this.makeRequest(API_BASE_URL);
  }

  async searchByCarNumber(carNumber: string): Promise<ApiResponse> {
    console.log('Searching by car number:', carNumber);
    return this.makeRequest(`${API_BASE_URL}/searchByAuto`, {
      method: 'POST',
      body: JSON.stringify({
        auto: carNumber.trim().toUpperCase()
      }),
    });
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