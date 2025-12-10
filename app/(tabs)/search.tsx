import { SearchForm } from "@/components/forms/SearchForm";
import { ResultsTable } from "@/components/tables/ResultsTable";
import { Header } from "@/components/ui/Header";
import { useProtocolData } from "@/hooks/useProtocolData";
import { hasSearchQuery } from "@/utils/helpers";
import React from "react";
import { ScrollView, View } from "react-native";

export default function Search() {
  const {
    protocolData,
    isLoading,
    loadingState,
    errorState,
    searchForm,
    updateSearchForm,
    handleSearch,
    handleClear,
    handleRetry,
    clearError,
  } = useProtocolData();

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>

      <Header
        title="საქართველოს პოლიცია"
        subtitle="ადმინისტრაციული ჯარიმების მონაცემთა ბაზა"
      />

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

        {((searchForm.searchMode === 'car' && searchForm.carPlate.trim().length > 0) || 
          (searchForm.searchMode === 'personal' && searchForm.receiptNumber.trim().length > 0)) && (
          <ResultsTable
            protocolData={protocolData}
            isLoading={isLoading}
            searchMode={searchForm.searchMode}
            hasSearchQuery={hasSearchQuery(searchForm)}
          />
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}
