import { useAppStore } from '@/store/appStore';
import { useEffect } from 'react';

export function useProtocolData() {
  const {
    protocolData,
    isLoading,
    error,
    searchForm,
    updateSearchForm,
    resetSearchForm,
    fetchAllProtocols,
    searchByCarNumber,
    searchByPersonalData,
  } = useAppStore();

  // Load all protocols on mount
  useEffect(() => {
    fetchAllProtocols();
  }, [fetchAllProtocols]);

  const handleSearch = () => {
    if (searchForm.searchMode === 'car') {
      searchByCarNumber(searchForm.receiptNumber);
    } else {
      searchByPersonalData(
        searchForm.receiptNumber,
        searchForm.merchantName,
        searchForm.searchQuery
      );
    }
  };

  const handleClear = () => {
    resetSearchForm();
    fetchAllProtocols();
  };

  return {
    protocolData,
    isLoading,
    error,
    searchForm,
    updateSearchForm,
    handleSearch,
    handleClear,
  };
}