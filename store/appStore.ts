import { apiService } from '@/services/api';
import { ErrorState, LoadingState, ProtocolData, SearchFormData } from '@/types/api';
import { create } from 'zustand';

// Loading and error messages inline to avoid import issues
const LOADING_MESSAGES = {
  SEARCHING: 'მოძებნა...',
  LOADING: 'იტვირთება...',
  VALIDATING: 'ამოწმდება...',
  CONNECTING: 'სერვერთან დაკავშირება...'
};

const ERROR_MESSAGES = {
  NETWORK_ERROR: 'ინტერნეტ კავშირი არ არის ხელმისაწვდომი',
  SERVER_ERROR: 'სერვერთან კავშირის პრობლემა',
  TIMEOUT_ERROR: 'მოთხოვნის დრო ამოიწურა',
  INVALID_INPUT: 'შეიყვანეთ სწორი მონაცემები',
  NO_DATA: 'მონაცემები არ მოიძებნა',
  VALIDATION_ERROR: 'მონაცემების ვალიდაცია ვერ მოხერხდა'
};

interface AppState {
  // Protocol data
  protocolData: ProtocolData | null;
  
  // Enhanced loading state
  loadingState: LoadingState;
  
  // Enhanced error state
  errorState: ErrorState;
  
  // Search form data
  searchForm: SearchFormData;
  
  // Actions
  setProtocolData: (data: ProtocolData | null) => void;
  setLoadingState: (state: Partial<LoadingState>) => void;
  setErrorState: (state: Partial<ErrorState>) => void;
  clearError: () => void;
  updateSearchForm: (updates: Partial<SearchFormData>) => void;
  resetSearchForm: () => void;
  
  // API Actions
  fetchAllProtocols: () => Promise<void>;
  searchByCarNumber: (carNumber: string) => Promise<void>;
  searchByPersonalData: (personalId: string, surname: string, birthDate: string) => Promise<void>;
  retryLastSearch: () => Promise<void>;
  
  // Legacy getters for backward compatibility
  isLoading: boolean;
  error: string | null;
}

const initialSearchForm: SearchFormData = {
  receiptNumber: '',
  merchantName: '',
  searchQuery: '',
  searchMode: 'car',
};

export const useAppStore = create<AppState>()((set, get) => ({
  protocolData: null,
  
  // Enhanced loading state
  loadingState: {
    isLoading: false,
    loadingMessage: '',
    progress: undefined
  },
  
  // Enhanced error state
  errorState: {
    hasError: false,
    errorMessage: '',
    canRetry: false,
    retryCount: 0
  },
  
  searchForm: initialSearchForm,
  
  // Legacy getters
  get isLoading() {
    return get().loadingState.isLoading;
  },
  
  get error() {
    const state = get().errorState;
    return state.hasError ? state.errorMessage : null;
  },
  
  setProtocolData: (data: ProtocolData | null) => set({ protocolData: data }),
  
  setLoadingState: (state: Partial<LoadingState>) => set((prev) => ({
    loadingState: { ...prev.loadingState, ...state }
  })),
  
  setErrorState: (state: Partial<ErrorState>) => set((prev) => ({
    errorState: { ...prev.errorState, ...state }
  })),
  
  clearError: () => set((prev) => ({
    errorState: {
      hasError: false,
      errorMessage: '',
      canRetry: false,
      retryCount: 0
    }
  })),
  
  updateSearchForm: (updates: Partial<SearchFormData>) => set((state) => ({
    searchForm: { ...state.searchForm, ...updates }
  })),
  
  resetSearchForm: () => set({ searchForm: initialSearchForm }),
  
  fetchAllProtocols: async () => {
    const { setLoadingState, setErrorState, clearError } = get();
    
    setLoadingState({ 
      isLoading: true, 
      loadingMessage: LOADING_MESSAGES.LOADING 
    });
    clearError();
    
    try {
      const response = await apiService.getAllProtocols();
      if (response.success && response.data) {
        set({ protocolData: response.data });
      } else {
        set({ protocolData: { count: 0, results: [] } });
        if (response.message) {
          setErrorState({
            hasError: true,
            errorMessage: response.message,
            canRetry: false,
            retryCount: 0
          });
        }
      }
    } catch (err) {
      set({ protocolData: { count: 0, results: [] } });
      setErrorState({
        hasError: true,
        errorMessage: ERROR_MESSAGES.NETWORK_ERROR,
        canRetry: true,
        retryCount: 0
      });
    } finally {
      setLoadingState({ isLoading: false, loadingMessage: '' });
    }
  },
  
  searchByCarNumber: async (carNumber: string) => {
    if (!carNumber.trim()) {
      get().fetchAllProtocols();
      return;
    }
    
    const { setLoadingState, setErrorState, clearError } = get();
    
    setLoadingState({ 
      isLoading: true, 
      loadingMessage: LOADING_MESSAGES.SEARCHING 
    });
    clearError();
    
    try {
      const response = await apiService.searchByCarNumber(carNumber);
      if (response.success) {
        set({ protocolData: response.data });
        
        // Show success message briefly
        if (response.message) {
          setErrorState({
            hasError: false,
            errorMessage: response.message,
            canRetry: false,
            retryCount: 0
          });
          // Clear message after 3 seconds
          setTimeout(() => {
            get().clearError();
          }, 3000);
        }
      } else {
        set({ protocolData: { count: 0, results: [] } });
        setErrorState({
          hasError: true,
          errorMessage: response.message || ERROR_MESSAGES.NO_DATA,
          canRetry: true,
          retryCount: 0
        });
      }
    } catch (err) {
      set({ protocolData: { count: 0, results: [] } });
      setErrorState({
        hasError: true,
        errorMessage: ERROR_MESSAGES.NETWORK_ERROR,
        canRetry: true,
        retryCount: 0
      });
    } finally {
      setLoadingState({ isLoading: false, loadingMessage: '' });
    }
  },
  
  searchByPersonalData: async (personalId: string, surname: string, birthDate: string) => {
    const { setLoadingState, setErrorState, clearError } = get();
    
    setLoadingState({ 
      isLoading: true, 
      loadingMessage: LOADING_MESSAGES.SEARCHING 
    });
    clearError();
    
    try {
      const response = await apiService.searchByPersonalData(personalId, surname, birthDate);
      if (response.success) {
        set({ protocolData: response.data });
        
        // Show success message briefly
        if (response.message) {
          setErrorState({
            hasError: false,
            errorMessage: response.message,
            canRetry: false,
            retryCount: 0
          });
          // Clear message after 3 seconds
          setTimeout(() => {
            get().clearError();
          }, 3000);
        }
      } else {
        set({ protocolData: { count: 0, results: [] } });
        setErrorState({
          hasError: true,
          errorMessage: response.message || ERROR_MESSAGES.NO_DATA,
          canRetry: true,
          retryCount: 0
        });
      }
    } catch (err) {
      set({ protocolData: { count: 0, results: [] } });
      setErrorState({
        hasError: true,
        errorMessage: ERROR_MESSAGES.NETWORK_ERROR,
        canRetry: true,
        retryCount: 0
      });
    } finally {
      setLoadingState({ isLoading: false, loadingMessage: '' });
    }
  },
  
  retryLastSearch: async () => {
    const { searchForm, errorState } = get();
    
    if (!errorState.canRetry) return;
    
    // Increment retry count
    const newRetryCount = errorState.retryCount + 1;
    get().setErrorState({ retryCount: newRetryCount });
    
    // Retry the last search based on search mode
    if (searchForm.searchMode === 'car') {
      await get().searchByCarNumber(searchForm.receiptNumber);
    } else {
      await get().searchByPersonalData(
        searchForm.receiptNumber,
        searchForm.merchantName,
        searchForm.searchQuery
      );
    }
  },
}));