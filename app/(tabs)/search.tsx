import { SearchForm } from '@/components/forms/SearchForm';
import { ResultsTable } from '@/components/tables/ResultsTable';
import { Header, TitleSection } from '@/components/ui/Header';
import { useProtocolData } from '@/hooks/useProtocolData';
import { hasSearchQuery } from '@/utils/helpers';
import React from 'react';
import { ScrollView, StatusBar, View } from 'react-native';

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
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <Header 
        title="საქართველოს პოლიცია"
        subtitle="ადმინისტრაციული ჯარიმების მონაცემთა ბაზა"
        lastUpdated="17.11.2025"
      />

      <ScrollView 
        style={{ flex: 1, backgroundColor: '#F9FAFB' }} 
        showsVerticalScrollIndicator={false}
      >
        <TitleSection
          title="ადმინისტრაციული ჯარიმების ძიება"
          description="მოძებნეთ აქტიური ადმინისტრაციული ჯარიმები ავტომობილის ნომრით ან პირადი ნომრით. სისტემა წარმოადგენს ოფიციალურ ინფორმაციას."
        />

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

        <ResultsTable
          protocolData={protocolData}
          isLoading={isLoading}
          searchMode={searchForm.searchMode}
          hasSearchQuery={hasSearchQuery(searchForm)}
        />

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}