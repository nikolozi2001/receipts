import { useAppStore } from '@/store/appStore';
import { useEffect } from 'react';

export function useProtocolData() {
  const {
    protocolData,
    error,
    loadingState,
    errorState,
    searchForm,
    lastSearchType,
    updateSearchForm,
    resetSearchForm,
    fetchAllProtocols,
    searchByCarNumber,
    searchByPersonalData,
    searchLawBreaker,
    retryLastSearch,
    clearError
  } = useAppStore();

  // Get isLoading from loadingState directly
  const isLoading = loadingState.isLoading;

  // Load all protocols on mount
  useEffect(() => {
    fetchAllProtocols();
  }, [fetchAllProtocols]);

  const handleSearch = (searchType?: 'video-personal' | 'video-car' | 'receipt-lawbreaker' | 'receipt-protocol') => {
    console.log('useProtocolData handleSearch - searchType:', searchType);
    console.log('useProtocolData handleSearch - searchForm:', searchForm);
    
    if (searchType === 'receipt-lawbreaker') {
      // For receipt law breaker search: personalNo, documentNo, birthDate
      console.log('useProtocolData handleSearch - Calling searchLawBreaker with:', {
        personalNo: searchForm.receiptNumber,
        documentNo: searchForm.merchantName,
        birthDate: searchForm.searchQuery
      });
      searchLawBreaker(
        searchForm.receiptNumber,
        searchForm.merchantName,
        searchForm.searchQuery
      );
    } else if (searchType === 'receipt-protocol') {
      // For receipt protocol search (not implemented yet, can use existing personal search)
      console.log('useProtocolData handleSearch - Calling searchByPersonalData for receipt-protocol');
      searchByPersonalData(
        searchForm.receiptNumber,
        searchForm.merchantName,
        searchForm.searchQuery
      );
    } else if (searchForm.searchMode === 'car') {
      console.log('useProtocolData handleSearch - Calling searchByCarNumber');
      searchByCarNumber(searchForm.carPlate);
    } else {
      console.log('useProtocolData handleSearch - Calling searchByPersonalData for video-personal');
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
    lastSearchType,
    updateSearchForm,
    handleSearch,
    handleClear,
    handleRetry,
    clearError
  };
}