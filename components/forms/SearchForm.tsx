import { ErrorState, LoadingState, SearchFormData } from '@/types/api';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';

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

interface FieldsProps {
  formData: SearchFormData;
  onUpdateForm: (updates: Partial<SearchFormData>) => void;
}

function PersonalSearchFields({ formData, onUpdateForm }: FieldsProps) {
  return (
    <View style={{ gap: 16 }}>
      <View>
        <Text style={{
          fontSize: 14,
          fontWeight: '500',
          color: '#374151',
          marginBottom: 6
        }}>
          ქვითრის ნომერი *
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#d1d5db',
            borderRadius: 6,
            paddingHorizontal: 12,
            paddingVertical: 10,
            fontSize: 16,
            backgroundColor: 'white'
          }}
          placeholder="შეიყვანეთ ქვითრის ნომერი"
          placeholderTextColor="#9ca3af"
          value={formData.receiptNumber}
          onChangeText={(text) => onUpdateForm({ receiptNumber: text })}
          autoCapitalize="none"
        />
      </View>

      <View>
        <Text style={{
          fontSize: 14,
          fontWeight: '500',
          color: '#374151',
          marginBottom: 6
        }}>
          მერჩანტი *
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#d1d5db',
            borderRadius: 6,
            paddingHorizontal: 12,
            paddingVertical: 10,
            fontSize: 16,
            backgroundColor: 'white'
          }}
          placeholder="შეიყვანეთ მერჩანტის სახელი"
          placeholderTextColor="#9ca3af"
          value={formData.merchantName}
          onChangeText={(text) => onUpdateForm({ merchantName: text })}
        />
      </View>

      <View>
        <Text style={{
          fontSize: 14,
          fontWeight: '500',
          color: '#374151',
          marginBottom: 6
        }}>
          ძიების ტექსტი *
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#d1d5db',
            borderRadius: 6,
            paddingHorizontal: 12,
            paddingVertical: 10,
            fontSize: 16,
            backgroundColor: 'white'
          }}
          placeholder="შეიყვანეთ ძიების ტექსტი"
          placeholderTextColor="#9ca3af"
          value={formData.searchQuery}
          onChangeText={(text) => onUpdateForm({ searchQuery: text })}
        />
      </View>
    </View>
  );
}

function CarSearchFields({ formData, onUpdateForm }: FieldsProps) {
  return (
    <View>
      <Text style={{
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 6
      }}>
        ქვითრის ნომერი *
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#d1d5db',
          borderRadius: 6,
          paddingHorizontal: 12,
          paddingVertical: 10,
          fontSize: 16,
          backgroundColor: 'white'
        }}
        placeholder="შეიყვანეთ ქვითრის ნომერი"
        placeholderTextColor="#9ca3af"
        value={formData.receiptNumber}
        onChangeText={(text) => onUpdateForm({ receiptNumber: text })}
        autoCapitalize="none"
      />
    </View>
  );
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
    <View style={{ marginHorizontal: 24, marginTop: 16 }}>
      
      {/* Main Section Buttons */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        gap: 12
      }}>
        <TouchableOpacity
          style={{
            flex: 1,
            maxWidth: 180,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#1a237e',
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderRadius: 6
          }}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            // Already active - video fines
          }}
        >
          <Ionicons name="videocam" size={20} color="white" style={{ marginRight: 8 }} />
          <Text style={{
            color: 'white',
            fontWeight: '600',
            fontSize: 14
          }}>
            ვიდეოჯარიმა
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            maxWidth: 180,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: '#1a237e',
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderRadius: 6
          }}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            // Switch to receipts mode
          }}
        >
          <Ionicons name="receipt" size={20} color="#1a237e" style={{ marginRight: 8 }} />
          <Text style={{
            color: '#1a237e',
            fontWeight: '600',
            fontSize: 14
          }}>
            ქვითარი
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Error Display */}
      {errorState.hasError && (
        <View style={{
          marginBottom: 16,
          padding: 16,
          backgroundColor: '#fef2f2',
          borderLeftWidth: 3,
          borderLeftColor: '#dc2626',
          borderRadius: 4
        }}>
          <Text style={{
            color: '#dc2626',
            fontSize: 14,
            lineHeight: 20
          }}>
            {errorState.errorMessage}
          </Text>
          {errorState.canRetry && onRetry && (
            <TouchableOpacity
              style={{
                backgroundColor: '#dc2626',
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 4,
                marginTop: 8,
                alignSelf: 'flex-start'
              }}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                onRetry?.();
              }}
            >
              <Text style={{ color: 'white', fontWeight: '500', fontSize: 12 }}>
                თავიდან ცდა
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Loading Status */}
      {isLoading && (
        <View style={{
          padding: 16,
          backgroundColor: '#e3f2fd',
          borderLeftWidth: 3,
          borderLeftColor: '#1976d2',
          borderRadius: 4,
          marginBottom: 16
        }}>
          <Text style={{
            color: '#1565c0',
            fontSize: 14
          }}>
            {loadingState.loadingMessage || 'მუშავდება...'}
          </Text>
        </View>
      )}

      {/* Main Search Form */}
      <View style={{
        backgroundColor: '#fafafa',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e5e5e5'
      }}>
        <View style={{ padding: 24 }}>
          
          {/* Mode Selection */}
          <View style={{
            flexDirection: 'row',
            backgroundColor: '#f5f5f5',
            borderRadius: 6,
            marginBottom: 20,
            padding: 2
          }}>
            <TouchableOpacity
              style={{
                flex: 1,
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 4,
                backgroundColor: formData.searchMode === 'personal' ? '#1a237e' : 'transparent',
                alignItems: 'center'
              }}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onUpdateForm({ searchMode: 'personal' });
              }}
            >
              <Text style={{
                color: formData.searchMode === 'personal' ? 'white' : '#666',
                fontWeight: '500',
                fontSize: 14
              }}>
                პირადი მონაცემები
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={{
                flex: 1,
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 4,
                backgroundColor: formData.searchMode === 'car' ? '#1a237e' : 'transparent',
                alignItems: 'center'
              }}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onUpdateForm({ searchMode: 'car' });
              }}
            >
              <Text style={{
                color: formData.searchMode === 'car' ? 'white' : '#666',
                fontWeight: '500',
                fontSize: 14
              }}>
                ავტომობილი
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

          {/* Action Buttons */}
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 20 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: canSearch() ? '#1a237e' : '#9e9e9e',
                paddingVertical: 12,
                borderRadius: 6,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                opacity: (isLoading || !canSearch()) ? 0.7 : 1
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
              <Text style={{ color: 'white', fontWeight: '500', fontSize: 16 }}>
                {isLoading ? (loadingState.loadingMessage || 'ძიება...') : 'ძიება'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: '#757575',
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 6,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                opacity: isLoading ? 0.5 : 1
              }}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                clearError?.();
                onClear();
              }}
              disabled={isLoading}
            >
              <Ionicons name="refresh" size={16} color="white" style={{ marginRight: 6 }} />
              <Text style={{ color: 'white', fontWeight: '500', fontSize: 16 }}>გაწმენდა</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}