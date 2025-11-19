import { ProtocolData, ProtocolItem } from '@/types/api';
import React from 'react';
import { Text, View } from 'react-native';

interface ResultsTableProps {
  protocolData: ProtocolData | null;
  isLoading: boolean;
  searchMode: 'personal' | 'car';
  hasSearchQuery: boolean;
}

export function ResultsTable({ protocolData, isLoading, searchMode, hasSearchQuery }: ResultsTableProps) {
  const renderTableHeader = () => {
    if (protocolData?.results && protocolData.results.length > 0) {
      return (
        <View className="flex-row bg-gradient-to-r from-gray-50 to-blue-50 py-4 px-4 border-b border-gray-200">
          <Text className="flex-2 font-bold text-gray-800 text-sm">📋 პროტოკოლის №</Text>
          <Text className="flex-2 font-bold text-gray-800 text-sm">📅 თარიღი</Text>
          <Text className="flex-2 font-bold text-gray-800 text-sm">📍 ადგილი</Text>
          <Text className="flex-1 font-bold text-gray-800 text-sm">💰 თანხა</Text>
          <Text className="flex-1 font-bold text-gray-800 text-sm">⏰ დღე</Text>
        </View>
      );
    }
    return (
      <View className="flex-row bg-gradient-to-r from-gray-50 to-blue-50 py-4 px-4 border-b border-gray-200">
        <Text className="flex-2 font-bold text-gray-800 text-sm">📋 ქვითრის №</Text>
        <Text className="flex-2 font-bold text-gray-800 text-sm">📅 გამოცემის თარიღი</Text>
        <Text className="flex-2 font-bold text-gray-800 text-sm">🏪 მაღაზია</Text>
        <Text className="flex-2 font-bold text-gray-800 text-sm">💰 თანხა</Text>
        <Text className="flex-1 font-bold text-gray-800 text-sm">👁️ ნახვა</Text>
      </View>
    );
  };

  const renderEmptyState = () => {
    if (protocolData?.results?.length === 0) {
      return (
        <View className="py-16 items-center">
          <Text className="text-6xl mb-4">✅</Text>
          <Text className="text-green-600 text-lg font-medium mb-2">ჯარიმები არ არის</Text>
          <Text className="text-gray-500 text-center px-8">
            {searchMode === 'car' 
              ? 'ამ ავტომობილის ნომერზე აქტიური ჯარიმები არ არის' 
              : 'მოცემულ მონაცემებზე ინფორმაცია არ მოიძებნა'
            }
          </Text>
        </View>
      );
    }

    if (!protocolData || (!isLoading && !hasSearchQuery)) {
      return (
        <View className="py-16 items-center">
          {isLoading ? (
            <>
              <Text className="text-6xl mb-4">⏳</Text>
              <Text className="text-blue-600 text-lg font-medium mb-2">დატვირთვა...</Text>
              <Text className="text-gray-500 text-center px-8">გთხოვთ მოიცადოთ</Text>
            </>
          ) : (
            <>
              <Text className="text-6xl mb-4">🔍</Text>
              <Text className="text-gray-600 text-lg font-medium mb-2">ძიების დასაწყებად</Text>
              <Text className="text-gray-500 text-center px-8">
                შეიყვანეთ ავტომობილის ნომერი ან პირადი ნომერი
              </Text>
            </>
          )}
        </View>
      );
    }

    return (
      <View className="py-16 items-center">
        <Text className="text-6xl mb-4">📄</Text>
        <Text className="text-orange-600 text-lg font-medium mb-2">მონაცემები არ მოიძებნა</Text>
        <Text className="text-gray-500 text-center px-8">
          სცადეთ სხვა ძიების პარამეტრები
        </Text>
      </View>
    );
  };

  return (
    <View style={{ paddingHorizontal: 24 }}>
      <View style={{
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        overflow: 'hidden'
      }}>
        {protocolData?.results && protocolData.results.length > 0 ? (
          <View>
            {/* Clean Table Header */}
            <View style={{
              backgroundColor: '#F9FAFB',
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderBottomWidth: 1,
              borderBottomColor: '#E5E7EB'
            }}>
              <Text style={{
                color: '#6B7280',
                fontSize: 14,
                fontWeight: '500',
                textAlign: 'center'
              }}>
                ნაპოვნია {protocolData.results.length} ჯარიმა
              </Text>
            </View>
            
            {/* Results List */}
            {protocolData.results.map((protocol, index) => (
              <ProtocolRow
                key={protocol.protocolNo}
                protocol={protocol}
                isLast={index === protocolData.results.length - 1}
              />
            ))}
          </View>
        ) : (
          renderEmptyState()
        )}
      </View>
    </View>
  );
}

interface ProtocolRowProps {
  protocol: ProtocolItem;
  isLast: boolean;
}

function ProtocolRow({ protocol, isLast }: ProtocolRowProps) {
  const isOverdue = protocol.remainingDays <= 0;
  const isUrgent = protocol.remainingDays <= 5 && protocol.remainingDays > 0;
  
  return (
    <View style={{
      padding: 16,
      borderBottomWidth: isLast ? 0 : 1,
      borderBottomColor: '#F3F4F6'
    }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8
      }}>
        <Text style={{
          color: '#2563EB',
          fontWeight: '600'
        }}>
          {protocol.protocolNo}
        </Text>
        <View style={{
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 9999,
          backgroundColor: isOverdue ? '#FEE2E2' : isUrgent ? '#FEF3C7' : '#D1FAE5'
        }}>
          <Text style={{
            fontSize: 12,
            fontWeight: '500',
            color: isOverdue ? '#DC2626' : isUrgent ? '#D97706' : '#059669'
          }}>
            {protocol.remainingDays}დღე
          </Text>
        </View>
      </View>
      
      <Text style={{
        color: '#6B7280',
        fontSize: 14,
        marginBottom: 4
      }}>
        {protocol.violationDate} • {protocol.protocolPlace}
      </Text>
      
      <Text style={{
        color: '#111827',
        fontWeight: '500'
      }}>
        {protocol.protocolAmount}₾
      </Text>
    </View>
  );
}