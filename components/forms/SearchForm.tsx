import { SearchFormData } from '@/types/api';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

interface SearchFormProps {
  formData: SearchFormData;
  isLoading: boolean;
  onUpdateForm: (updates: Partial<SearchFormData>) => void;
  onSearch: () => void;
  onClear: () => void;
}

export function SearchForm({ formData, isLoading, onUpdateForm, onSearch, onClear }: SearchFormProps) {
  return (
    <View style={{ paddingHorizontal: 24, paddingBottom: 24 }}>
      {/* Clean Tab Headers */}
      <View style={{ 
        flexDirection: 'row', 
        backgroundColor: '#F9FAFB', 
        borderRadius: 12, 
        overflow: 'hidden', 
        marginBottom: 24 
      }}>
        <View style={{ 
          flex: 1, 
          backgroundColor: '#3B82F6', 
          paddingVertical: 16, 
          paddingHorizontal: 16, 
          alignItems: 'center' 
        }}>
          <Text style={{ color: 'white', fontWeight: '500', fontSize: 14 }}>ჯარიმების ძიება</Text>
        </View>
        <View style={{ 
          flex: 1, 
          paddingVertical: 16, 
          paddingHorizontal: 16, 
          alignItems: 'center' 
        }}>
          <Text style={{ color: '#9CA3AF', fontWeight: '500', fontSize: 14 }}>ქვითრები</Text>
        </View>
      </View>

      {/* Clean Search Card */}
      <View style={{ 
        backgroundColor: 'white', 
        borderRadius: 12, 
        borderWidth: 1, 
        borderColor: '#E5E7EB' 
      }}>
        <View style={{ padding: 24 }}>
          {/* Simple Mode Selection */}
          <View style={{ 
            flexDirection: 'row', 
            backgroundColor: '#F3F4F6', 
            borderRadius: 8, 
            marginBottom: 24 
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
              onPress={() => onUpdateForm({ searchMode: 'personal' })}
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
              onPress={() => onUpdateForm({ searchMode: 'car' })}
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

          {/* Clean Action Buttons */}
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
            <TouchableOpacity 
              style={{
                flex: 1,
                backgroundColor: '#3B82F6',
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: 'center',
                opacity: isLoading ? 0.5 : 1
              }}
              onPress={onSearch}
              disabled={isLoading}
            >
              <Text style={{ color: 'white', fontWeight: '500' }}>
                {isLoading ? 'ძიება...' : 'ძიება'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={{
                backgroundColor: '#9CA3AF',
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 8,
                alignItems: 'center'
              }}
              onPress={onClear}
            >
              <Text style={{ color: 'white', fontWeight: '500' }}>გასუფთავება</Text>
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
  return (
    <View style={{ gap: 16 }}>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#D1D5DB',
          borderRadius: 8,
          paddingVertical: 12,
          paddingHorizontal: 16,
          fontSize: 16
        }}
        placeholder="პირადი ნომერი"
        placeholderTextColor="#9CA3AF"
        value={formData.receiptNumber}
        onChangeText={(text) => onUpdateForm({ receiptNumber: text })}
      />
      
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <TextInput
          style={{
            flex: 1,
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
        />
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#D1D5DB',
            borderRadius: 8,
            paddingVertical: 12,
            paddingHorizontal: 16,
            fontSize: 16
          }}
          placeholder="დდ/თთ/წწწწ"
          placeholderTextColor="#9CA3AF"
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
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#D1D5DB',
          borderRadius: 8,
          paddingVertical: 12,
          paddingHorizontal: 16,
          fontSize: 16
        }}
        placeholder="მაგ: AB123CD"
        placeholderTextColor="#9CA3AF"
        value={formData.receiptNumber}
        onChangeText={(text) => onUpdateForm({ receiptNumber: text.toUpperCase() })}
        autoCapitalize="characters"
      />
    </View>
  );
}