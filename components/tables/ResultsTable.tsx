import { BORDER_RADIUS, COLORS, SHADOWS, SPACING, TYPOGRAPHY } from '@/constants/design';
import { ProtocolData, ProtocolItem } from '@/types/api';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ResultsTableProps {
  protocolData: ProtocolData | null;
  isLoading: boolean;
  searchMode: 'personal' | 'car';
  hasSearchQuery: boolean;
}

export function ResultsTable({ protocolData, isLoading, searchMode, hasSearchQuery }: ResultsTableProps) {

  const renderEmptyState = () => {
    if (protocolData?.results?.length === 0) {
      return (
        <View style={{ paddingVertical: SPACING['6xl'], alignItems: 'center' }}>
          <Ionicons name="checkmark-circle" size={64} color={COLORS.success[500]} style={{marginBottom: SPACING.lg}} />
          <Text style={{ color: COLORS.success[600], fontSize: TYPOGRAPHY.fontSize.lg, fontWeight: TYPOGRAPHY.fontWeight.medium, marginBottom: SPACING.sm }}>ჯარიმები არ არის</Text>
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
              <Ionicons name="time" size={64} color={COLORS.primary[500]} style={{marginBottom: SPACING.lg}} />
              <Text style={{ color: COLORS.primary[600], fontSize: TYPOGRAPHY.fontSize.lg, fontWeight: TYPOGRAPHY.fontWeight.medium, marginBottom: SPACING.sm }}>დატვირთვა...</Text>
              <Text className="text-gray-500 text-center px-8">გთხოვთ მოიცადოთ</Text>
            </>
          ) : (
            <>
              <Ionicons name="search" size={64} color={COLORS.neutral[500]} style={{marginBottom: SPACING.lg}} />
              <Text style={{ color: COLORS.neutral[600], fontSize: TYPOGRAPHY.fontSize.lg, fontWeight: TYPOGRAPHY.fontWeight.medium, marginBottom: SPACING.sm }}>ძიების დასაწყებად</Text>
              <Text className="text-gray-500 text-center px-8">
                შეიყვანეთ ავტომობილის ნომერი ან პირადი ნომერი
              </Text>
            </>
          )}
        </View>
      );
    }

    return (
      <View style={{ paddingVertical: SPACING['6xl'], alignItems: 'center' }}>
        <MaterialIcons name="description" size={64} color={COLORS.warning[500]} style={{marginBottom: SPACING.lg}} />
        <Text style={{ color: COLORS.warning[600], fontSize: TYPOGRAPHY.fontSize.lg, fontWeight: TYPOGRAPHY.fontWeight.medium, marginBottom: SPACING.sm }}>მონაცემები არ მოიძებნა</Text>
        <Text className="text-gray-500 text-center px-8">
          სცადეთ სხვა ძიების პარამეტრები
        </Text>
      </View>
    );
  };

  return (
    <View style={{ paddingHorizontal: SPACING['2xl'] }}>
      <View style={{
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.xl,
        borderWidth: 1,
        borderColor: COLORS.neutral[200],
        overflow: 'hidden',
        ...SHADOWS.lg
      }}>
        {protocolData?.results && protocolData.results.length > 0 ? (
          <View>
            {/* Clean Table Header */}
            <View style={{
              backgroundColor: COLORS.primary[50],
              paddingVertical: SPACING.lg,
              paddingHorizontal: SPACING.lg,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.neutral[200]
            }}>
              <Text style={{
                color: COLORS.primary[700],
                fontSize: TYPOGRAPHY.fontSize.sm,
                fontWeight: TYPOGRAPHY.fontWeight.semibold,
                textAlign: 'center'
              }}>
                ნაპოვნია {protocolData.results.length} ჯარიმა
              </Text>
            </View>
            {/* Modern Card-based Results */}
            <View>
              {protocolData.results.map((protocol, index) => (
                <ProtocolRow
                  key={protocol.protocolNo}
                  protocol={protocol}
                  isLast={index === protocolData.results.length - 1}
                />
              ))}
            </View>
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
  
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Future: Navigate to protocol details or show more info
  };

  const getStatusColor = () => {
    if (isOverdue) return {
      bg: COLORS.error[50],
      text: COLORS.error[600],
      border: COLORS.error[200]
    };
    if (isUrgent) return {
      bg: COLORS.warning[50],
      text: COLORS.warning[600],
      border: COLORS.warning[200]
    };
    return {
      bg: COLORS.success[50],
      text: COLORS.success[600],
      border: COLORS.success[200]
    };
  };

  const statusColor = getStatusColor();
  
  return (
    <TouchableOpacity
      style={{
        marginHorizontal: SPACING.lg,
        marginVertical: SPACING.sm,
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        borderWidth: 1,
        borderColor: statusColor.border,
        padding: SPACING.lg,
        ...SHADOWS.md
      }}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {/* Card Header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SPACING.lg
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name="description" size={20} color={COLORS.primary[500]} style={{ marginRight: SPACING.sm }} />
          <Text style={{
            color: COLORS.primary[600],
            fontSize: TYPOGRAPHY.fontSize.base,
            fontWeight: TYPOGRAPHY.fontWeight.semibold
          }}>
            {protocol.protocolNo}
          </Text>
        </View>
        <View style={{
          paddingHorizontal: SPACING.lg,
          paddingVertical: SPACING.xs,
          borderRadius: BORDER_RADIUS.full,
          backgroundColor: statusColor.bg,
          borderWidth: 1,
          borderColor: statusColor.border
        }}>
          <Text style={{
            color: statusColor.text,
            fontSize: TYPOGRAPHY.fontSize.xs,
            fontWeight: TYPOGRAPHY.fontWeight.medium
          }}>
            {isOverdue ? 'გადაცილებული' : isUrgent ? 'ტერმინი ამოიწურება' : `${protocol.remainingDays} დღე`}
          </Text>
        </View>
      </View>

      {/* Card Content */}
      <View style={{ gap: SPACING.sm }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="calendar" size={16} color={COLORS.neutral[500]} style={{ marginRight: SPACING.sm, width: 20 }} />
          <Text style={{ color: COLORS.neutral[600], fontSize: TYPOGRAPHY.fontSize.sm }}>
            {protocol.violationDate}
          </Text>
        </View>
        
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="location" size={16} color={COLORS.neutral[500]} style={{ marginRight: SPACING.sm, width: 20 }} />
          <Text style={{ 
            color: COLORS.neutral[600], 
            fontSize: TYPOGRAPHY.fontSize.sm,
            flex: 1
          }}>
            {protocol.protocolPlace}
          </Text>
        </View>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: SPACING.sm }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="cash" size={16} color={COLORS.neutral[500]} style={{ marginRight: SPACING.sm, width: 20 }} />
            <Text style={{ 
              color: COLORS.neutral[800], 
              fontSize: TYPOGRAPHY.fontSize.base,
              fontWeight: TYPOGRAPHY.fontWeight.semibold
            }}>
              {protocol.protocolAmount}₾
            </Text>
          </View>
          
          <Ionicons name="chevron-forward" size={16} color={COLORS.neutral[400]} />
        </View>
      </View>
    </TouchableOpacity>
  );
}