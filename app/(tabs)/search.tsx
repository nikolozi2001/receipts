import { SearchForm } from "@/components/forms/SearchForm";
import { ResultsTable } from "@/components/tables/ResultsTable";
import { Header } from "@/components/ui/Header";
import { useProtocolData } from "@/hooks/useProtocolData";
import { hasSearchQuery } from "@/utils/helpers";
import { ScrollView, View } from "react-native";

export default function Search() {
  const {
    protocolData,
    isLoading,
    loadingState,
    errorState,
    searchForm,
    lastSearchType,
    updateSearchForm,
    handleSearch,
    handleClear,
    handleRetry,
    clearError,
  } = useProtocolData();


  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>

      <Header/>

      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        <SearchForm
          formData={searchForm}
          isLoading={isLoading}
          loadingState={loadingState}
          errorState={errorState}
          onUpdateForm={updateSearchForm}
          onSearch={handleSearch}
          onClear={handleClear}
          onRetry={handleRetry}
          clearError={clearError}
        />

        {(((searchForm.searchMode === 'car' && searchForm.carPlate.trim().length > 0) || 
          (searchForm.searchMode === 'personal' && searchForm.receiptNumber.trim().length > 0)) ||
          (lastSearchType && (lastSearchType === 'receipt-lawbreaker' || lastSearchType === 'receipt-protocol') && searchForm.receiptNumber.trim().length > 0)) && (
          <ResultsTable
            protocolData={protocolData}
            isLoading={isLoading}
            searchMode={searchForm.searchMode}
            hasSearchQuery={hasSearchQuery(searchForm)}
            searchType={lastSearchType || undefined}
          />
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}
