import { apiService } from '@/services/api';
import { ProtocolData, SearchFormData } from '@/types/api';
import { create } from 'zustand';

interface AppState {
  // Protocol data
  protocolData: ProtocolData | null;
  isLoading: boolean;
  error: string | null;
  
  // Search form data
  searchForm: SearchFormData;
  
  // Actions
  setProtocolData: (data: ProtocolData | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateSearchForm: (updates: Partial<SearchFormData>) => void;
  resetSearchForm: () => void;
  
  // API Actions
  fetchAllProtocols: () => Promise<void>;
  searchByCarNumber: (carNumber: string) => Promise<void>;
  searchByPersonalData: (personalId: string, surname: string, birthDate: string) => Promise<void>;
}

const initialSearchForm: SearchFormData = {
  receiptNumber: '',
  merchantName: '',
  searchQuery: '',
  searchMode: 'car',
};

export const useAppStore = create<AppState>()((set, get) => ({
  protocolData: null,
  isLoading: false,
  error: null,
  searchForm: initialSearchForm,
  
  setProtocolData: (data: ProtocolData | null) => set({ protocolData: data }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
  
  updateSearchForm: (updates: Partial<SearchFormData>) => set((state) => ({
    searchForm: { ...state.searchForm, ...updates }
  })),
  
  resetSearchForm: () => set({ searchForm: initialSearchForm }),
  
  fetchAllProtocols: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.getAllProtocols();
      if (response.success && response.data) {
        set({ protocolData: response.data });
      } else {
        set({ 
          protocolData: { count: 0, results: [] }, 
          error: response.message 
        });
      }
    } catch (err) {
      set({ 
        protocolData: { count: 0, results: [] }, 
        error: 'Failed to fetch protocols' 
      });
    } finally {
      set({ isLoading: false });
    }
  },
  
  searchByCarNumber: async (carNumber: string) => {
    if (!carNumber.trim()) {
      get().fetchAllProtocols();
      return;
    }
    
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.searchByCarNumber(carNumber);
      if (response.success && response.data) {
        set({ protocolData: response.data });
      } else {
        set({ 
          protocolData: { count: 0, results: [] }, 
          error: response.message 
        });
      }
    } catch (err) {
      set({ 
        protocolData: { count: 0, results: [] }, 
        error: 'Failed to search by car number' 
      });
    } finally {
      set({ isLoading: false });
    }
  },
  
  searchByPersonalData: async (personalId: string, surname: string, birthDate: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.searchByPersonalData(personalId, surname, birthDate);
      if (response.success && response.data) {
        set({ protocolData: response.data });
      } else {
        set({ 
          protocolData: { count: 0, results: [] }, 
          error: response.message || 'Personal search not implemented yet'
        });
      }
    } catch (err) {
      set({ 
        protocolData: { count: 0, results: [] }, 
        error: 'Failed to search by personal data' 
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));