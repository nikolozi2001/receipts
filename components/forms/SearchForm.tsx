import { BORDER_RADIUS, COLORS, SHADOWS, SPACING, TYPOGRAPHY } from '@/constants/design';
import { ErrorState, LoadingState, SearchFormData } from '@/types/api';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Validation patterns inline to avoid import issues
const VALIDATION = {
  CAR_NUMBER: /^[A-Za-zა-ჰ]{1,3}-?\d{2,4}-?[A-Za-zა-ჰ]{1,3}$|^\d{2,4}[A-Za-zა-ჰ]{1,3}$/,
  PERSONAL_ID: /^\d{11}$/,
};

interface SearchFormProps {
  formData: SearchFormData;
  isLoading: boolean;
  loadingState: LoadingState;
  errorState: ErrorState;
  onUpdateForm: (updates: Partial<SearchFormData>) => void;
  onSearch: () => void;
  onClear: () => void;
  onRetry?: () => void;
  clearError?: () => void;
}

export function SearchForm({ 
  formData, 
  isLoading, 
  loadingState, 
  errorState, 
  onUpdateForm, 
  onSearch, 
  onClear, 
  onRetry, 
  clearError 
}: SearchFormProps) {
  
  const canSearch = () => {
    if (formData.searchMode === 'car') {
      return formData.receiptNumber.trim().length > 0;
    } else {
      return formData.receiptNumber.trim().length > 0 && 
             formData.merchantName.trim().length > 0 && 
             formData.searchQuery.trim().length > 0;
    }
  };
  
  const handleSearch = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    clearError?.();
    onSearch();
  };
  return (
    <View style={{ paddingHorizontal: SPACING['2xl'], paddingBottom: SPACING['2xl'] }}>
      {/* Modern Tab Headers with Glassmorphism */}
      <View style={{ 
        flexDirection: 'row', 
        backgroundColor: COLORS.neutral[50], 
        borderRadius: BORDER_RADIUS.lg, 
        overflow: 'hidden', 
        marginBottom: SPACING['2xl'],
        ...SHADOWS.sm
      }}>
        <View style={{ 
          flex: 1, 
          backgroundColor: COLORS.primary[500], 
          paddingVertical: SPACING.lg, 
          paddingHorizontal: SPACING.lg, 
          alignItems: 'center',
          ...SHADOWS.md
        }}>
          <Text style={{ color: COLORS.white, fontWeight: TYPOGRAPHY.fontWeight.medium, fontSize: TYPOGRAPHY.fontSize.sm }}>ჯარიმების ძიება</Text>
        </View>
        <View style={{ 
          flex: 1, 
          paddingVertical: SPACING.lg, 
          paddingHorizontal: SPACING.lg, 
          alignItems: 'center' 
        }}>
          <Text style={{ color: COLORS.neutral[400], fontWeight: TYPOGRAPHY.fontWeight.medium, fontSize: TYPOGRAPHY.fontSize.sm }}>ქვითრები</Text>
        </View>
      </View>

      {/* Enhanced Error/Success Display */}
      {(errorState.hasError || (!errorState.hasError && errorState.errorMessage)) && (
        <View style={{
          backgroundColor: errorState.hasError ? COLORS.error[50] : COLORS.success[50],
          borderLeftWidth: 4,
          borderLeftColor: errorState.hasError ? COLORS.error[500] : COLORS.success[500],
          borderRadius: BORDER_RADIUS.md,
          padding: SPACING.lg,
          marginBottom: SPACING.lg,
          ...SHADOWS.sm
        }}>
          <Text style={{
            color: errorState.hasError ? COLORS.error[600] : COLORS.success[600],
            fontWeight: TYPOGRAPHY.fontWeight.medium,
            fontSize: TYPOGRAPHY.fontSize.sm,
            lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.sm
          }}>
            {errorState.errorMessage}
          </Text>
          {errorState.hasError && errorState.canRetry && onRetry && (
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.error[500],
                paddingVertical: SPACING.xs + 2,
                paddingHorizontal: SPACING.lg,
                borderRadius: BORDER_RADIUS.sm,
                marginTop: SPACING.sm,
                alignSelf: 'flex-start',
                ...SHADOWS.sm
              }}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                onRetry?.();
              }}
            >
              <Text style={{ color: COLORS.white, fontWeight: TYPOGRAPHY.fontWeight.medium, fontSize: TYPOGRAPHY.fontSize.xs }}>
                თავიდან ცდა
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Modern Search Card with Glassmorphism */}
      <View style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
        borderRadius: BORDER_RADIUS.xl, 
        borderWidth: 1, 
        borderColor: 'rgba(255, 255, 255, 0.2)',
        ...SHADOWS.lg
      }}>
        <View style={{ padding: SPACING['2xl'] }}>
          {/* Simple Mode Selection */}
          <View style={{ 
            flexDirection: 'row', 
            backgroundColor: COLORS.neutral[100], 
            borderRadius: BORDER_RADIUS.md, 
            marginBottom: SPACING['2xl'],
            padding: SPACING.xs
          }}>
            <TouchableOpacity 
              style={{
                flex: 1,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor: formData.searchMode === 'personal' ? 'white' : 'transparent',
                shadowColor: formData.searchMode === 'personal' ? '#000' : 'transparent',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: formData.searchMode === 'personal' ? 0.05 : 0,
                shadowRadius: 2,
                elevation: formData.searchMode === 'personal' ? 1 : 0
              }}
              onPress={() => {
                Haptics.selectionAsync();
                onUpdateForm({ searchMode: 'personal' });
              }}
            >
              <Text style={{
                textAlign: 'center',
                fontWeight: '500',
                color: formData.searchMode === 'personal' ? '#2563EB' : '#6B7280'
              }}>
                პირადი ნომერი
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={{
                flex: 1,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor: formData.searchMode === 'car' ? 'white' : 'transparent',
                shadowColor: formData.searchMode === 'car' ? '#000' : 'transparent',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: formData.searchMode === 'car' ? 0.05 : 0,
                shadowRadius: 2,
                elevation: formData.searchMode === 'car' ? 1 : 0
              }}
              onPress={() => {
                Haptics.selectionAsync();
                onUpdateForm({ searchMode: 'car' });
              }}
            >
              <Text style={{
                textAlign: 'center',
                fontWeight: '500',
                color: formData.searchMode === 'car' ? '#2563EB' : '#6B7280'
              }}>
                ავტო ნომერი
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* Form Fields */}
          {formData.searchMode === 'personal' ? (
            <PersonalSearchFields 
              formData={formData}
              onUpdateForm={onUpdateForm}
            />
          ) : (
            <CarSearchFields 
              formData={formData}
              onUpdateForm={onUpdateForm}
            />
          )}

          {/* Enhanced Action Buttons */}
          <View style={{ flexDirection: 'row', gap: SPACING.lg, marginTop: SPACING['2xl'] }}>
            <TouchableOpacity 
              style={{
                flex: 1,
                backgroundColor: canSearch() ? COLORS.primary[500] : COLORS.neutral[400],
                paddingVertical: SPACING.lg,
                borderRadius: BORDER_RADIUS.md,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                opacity: (isLoading || !canSearch()) ? 0.7 : 1,
                ...SHADOWS.md
              }}
              onPress={handleSearch}
              disabled={isLoading || !canSearch()}
            >
              {isLoading ? (
                <ActivityIndicator 
                  size="small" 
                  color="white" 
                  style={{ marginRight: 8 }} 
                />
              ) : (
                <Ionicons name="search" size={16} color="white" style={{ marginRight: 8 }} />
              )}
              <Text style={{ color: 'white', fontWeight: '500' }}>
                {isLoading ? (loadingState.loadingMessage || 'ძიება...') : 'ძიება'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={{
                backgroundColor: COLORS.neutral[400],
                paddingVertical: SPACING.lg,
                paddingHorizontal: SPACING['2xl'],
                borderRadius: BORDER_RADIUS.md,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                opacity: isLoading ? 0.5 : 1,
                ...SHADOWS.sm
              }}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                clearError?.();
                onClear();
              }}
              disabled={isLoading}
            >
              <Ionicons name="refresh" size={16} color="white" style={{ marginRight: 6 }} />
              <Text style={{ color: COLORS.white, fontWeight: TYPOGRAPHY.fontWeight.semibold, fontSize: TYPOGRAPHY.fontSize.base }}>გასუფთავება</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

interface FieldsProps {
  formData: SearchFormData;
  onUpdateForm: (updates: Partial<SearchFormData>) => void;
}

function PersonalSearchFields({ formData, onUpdateForm }: FieldsProps) {
  const [personalIdError, setPersonalIdError] = React.useState('');
  const [birthDateError, setBirthDateError] = React.useState('');
  
  const validatePersonalId = (value: string) => {
    if (!value.trim()) {
      setPersonalIdError('');
      return;
    }
    if (!/^\d{11}$/.test(value.trim())) {
      setPersonalIdError('პირადი ნომერი უნდა შეიცავდეს 11 ციფრს');
    } else {
      setPersonalIdError('');
    }
  };
  
  const validateBirthDate = (value: string) => {
    if (!value.trim()) {
      setBirthDateError('');
      return;
    }
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value.trim())) {
      setBirthDateError('ფორმატი: DD/MM/YYYY');
    } else {
      setBirthDateError('');
    }
  };
  
  return (
    <View style={{ gap: 16 }}>
      <View>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: personalIdError ? '#DC2626' : '#D1D5DB',
            borderRadius: 8,
            paddingVertical: 12,
            paddingHorizontal: 16,
            fontSize: 16
          }}
          placeholder="პირადი ნომერი (11 ციფრი)"
          placeholderTextColor="#9CA3AF"
          value={formData.receiptNumber}
          onChangeText={(text) => {
            const cleanText = text.replace(/\D/g, '').substring(0, 11);
            onUpdateForm({ receiptNumber: cleanText });
            validatePersonalId(cleanText);
          }}
          keyboardType="numeric"
          maxLength={11}
        />
        {personalIdError ? (
          <Text style={{ color: '#DC2626', fontSize: 12, marginTop: 4 }}>
            {personalIdError}
          </Text>
        ) : null}
      </View>
      
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <View style={{ flex: 1 }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#D1D5DB',
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 16,
              fontSize: 16
            }}
            placeholder="გვარი"
            placeholderTextColor="#9CA3AF"
            value={formData.merchantName}
            onChangeText={(text) => onUpdateForm({ merchantName: text })}
            autoCapitalize="words"
          />
        </View>
        
        <View style={{ flex: 1 }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: birthDateError ? '#DC2626' : '#D1D5DB',
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 16,
              fontSize: 16
            }}
            placeholder="DD/MM/YYYY"
            placeholderTextColor="#9CA3AF"
            value={formData.searchQuery}
            onChangeText={(text) => {
              // Auto-format date input
              let formatted = text.replace(/\D/g, '');
              if (formatted.length >= 3) formatted = formatted.slice(0,2) + '/' + formatted.slice(2);
              if (formatted.length >= 6) formatted = formatted.slice(0,5) + '/' + formatted.slice(5,9);
              onUpdateForm({ searchQuery: formatted });
              validateBirthDate(formatted);
            }}
            keyboardType="numeric"
            maxLength={10}
          />
          {birthDateError ? (
            <Text style={{ color: '#DC2626', fontSize: 12, marginTop: 4 }}>
              {birthDateError}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}

function CarSearchFields({ formData, onUpdateForm }: FieldsProps) {
  const [carNumberError, setCarNumberError] = React.useState('');
  
  const validateCarNumber = (value: string) => {
    if (!value.trim()) {
      setCarNumberError('');
      return;
    }
    if (!VALIDATION.CAR_NUMBER.test(value.trim())) {
      setCarNumberError('არასწორი ავტო ნომრის ფორმატი');
    } else {
      setCarNumberError('');
    }
  };
  
  return (
    <View>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: carNumberError ? '#DC2626' : '#D1D5DB',
          borderRadius: 8,
          paddingVertical: 12,
          paddingHorizontal: 16,
          fontSize: 16
        }}
        placeholder="მაგ: AB123CD ან 123ABC"
        placeholderTextColor="#9CA3AF"
        value={formData.receiptNumber}
        onChangeText={(text) => {
          const cleanText = text.toUpperCase().trim();
          onUpdateForm({ receiptNumber: cleanText });
          validateCarNumber(cleanText);
        }}
        autoCapitalize="characters"
        maxLength={8}
      />
      {carNumberError ? (
        <Text style={{ color: '#DC2626', fontSize: 12, marginTop: 4 }}>
          {carNumberError}
        </Text>
      ) : null}
    </View>
  );
}