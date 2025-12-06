import { useAppStore } from '@/store/appStore';
import { useEffect } from 'react';

export function useProtocolData() {
  const {
    protocolData,
    error,
    loadingState,
    errorState,
    searchForm,
    updateSearchForm,
    resetSearchForm,
    fetchAllProtocols,
    searchByCarNumber,
    searchByPersonalData,
    retryLastSearch,
    clearError
  } = useAppStore();

  // Get isLoading from loadingState directly
  const isLoading = loadingState.isLoading;

  // Load all protocols on mount
  useEffect(() => {
    fetchAllProtocols();
  }, [fetchAllProtocols]);

  const handleSearch = () => {
    if (searchForm.searchMode === 'car') {
      searchByCarNumber(searchForm.carPlate);
    } else {
      searchByPersonalData(
        searchForm.receiptNumber,
        searchForm.merchantName,
        searchForm.searchQuery
      );
    }
  };

  const handleClear = () => {
    clearError();
    resetSearchForm();
    fetchAllProtocols();
  };
  
  const handleRetry = () => {
    retryLastSearch();
  };

  return {
    protocolData,
    isLoading,
    error,
    loadingState,
    errorState,
    searchForm,
    updateSearchForm,
    handleSearch,
    handleClear,
    handleRetry,
    clearError
  };
}