import { ErrorState, LoadingState } from '@/types/api';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

interface ErrorHandlerProps {
  errorState: ErrorState;
  loadingState: LoadingState;
  onRetry?: () => void;
  onClear?: () => void;
}

export function ErrorHandler({ errorState, loadingState, onRetry, onClear }: ErrorHandlerProps) {
  if (loadingState.isLoading) {
    return (
      <View style={{
        backgroundColor: '#EBF8FF',
        borderRadius: 8,
        padding: 16,
        margin: 16,
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <ActivityIndicator size="small" color="#3B82F6" style={{ marginRight: 12 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#1E40AF', fontWeight: '500' }}>
            {loadingState.loadingMessage || 'იტვირთება...'}
          </Text>
          {loadingState.progress && (
            <View style={{
              height: 4,
              backgroundColor: '#DBEAFE',
              borderRadius: 2,
              marginTop: 8,
              overflow: 'hidden'
            }}>
              <View style={{
                height: '100%',
                width: `${loadingState.progress}%`,
                backgroundColor: '#3B82F6'
              }} />
            </View>
          )}
        </View>
      </View>
    );
  }

  if (errorState.hasError) {
    return (
      <View style={{
        backgroundColor: '#FEF2F2',
        borderLeftWidth: 4,
        borderLeftColor: '#DC2626',
        borderRadius: 8,
        padding: 16,
        margin: 16
      }}>
        <Text style={{ 
          color: '#DC2626', 
          fontWeight: '500', 
          fontSize: 14,
          marginBottom: 8 
        }}>
          {errorState.errorMessage}
        </Text>
        
        {errorState.retryCount > 0 && (
          <Text style={{ 
            color: '#9CA3AF', 
            fontSize: 12,
            marginBottom: 8 
          }}>
            ცდა {errorState.retryCount}/3
          </Text>
        )}
        
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {errorState.canRetry && onRetry && (
            <TouchableOpacity
              style={{
                backgroundColor: '#DC2626',
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 6
              }}
              onPress={onRetry}
            >
              <Text style={{ color: 'white', fontWeight: '500', fontSize: 12 }}>
                თავიდან ცდა
              </Text>
            </TouchableOpacity>
          )}
          
          {onClear && (
            <TouchableOpacity
              style={{
                backgroundColor: '#6B7280',
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 6
              }}
              onPress={onClear}
            >
              <Text style={{ color: 'white', fontWeight: '500', fontSize: 12 }}>
                გაუქმება
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  // Success state (non-error message)
  if (!errorState.hasError && errorState.errorMessage) {
    return (
      <View style={{
        backgroundColor: '#F0FDF4',
        borderLeftWidth: 4,
        borderLeftColor: '#059669',
        borderRadius: 8,
        padding: 16,
        margin: 16
      }}>
        <Text style={{ 
          color: '#059669', 
          fontWeight: '500', 
          fontSize: 14 
        }}>
          {errorState.errorMessage}
        </Text>
      </View>
    );
  }

  return null;
}