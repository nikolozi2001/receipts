import { COLORS, SHADOWS } from '@/constants/design';
import { ProtocolData, ProtocolItem } from '@/types/api';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ResultsTableProps {
  protocolData: ProtocolData | null;
  isLoading: boolean;
  searchMode: 'personal' | 'car';
  hasSearchQuery: boolean;
}

export function ResultsTable({ protocolData, isLoading, searchMode, hasSearchQuery }: ResultsTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (protocolNo: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(protocolNo)) {
      newExpanded.delete(protocolNo);
    } else {
      newExpanded.add(protocolNo);
    }
    setExpandedRows(newExpanded);
  };

  const renderEmptyState = () => {
    if (protocolData?.results?.length === 0) {
      return (
        <View style={{ paddingVertical: 32, alignItems: 'center' }}>
          <Ionicons name="checkmark-circle" size={48} color={COLORS.success[500]} style={{marginBottom: 12}} />
          <Text style={{ color: COLORS.success[600], fontSize: 16, fontWeight: '600', marginBottom: 8 }}>ჯარიმები არ არის</Text>
          <Text style={{ color: '#6b7280', textAlign: 'center', paddingHorizontal: 24, fontSize: 14 }}>
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
        <View style={{ paddingVertical: 32, alignItems: 'center' }}>
          {isLoading ? (
            <>
              <Ionicons name="time" size={48} color={COLORS.primary[500]} style={{marginBottom: 12}} />
              <Text style={{ color: COLORS.primary[600], fontSize: 16, fontWeight: '600', marginBottom: 8 }}>დატვირთვა...</Text>
              <Text style={{ color: '#6b7280', textAlign: 'center', paddingHorizontal: 24, fontSize: 14 }}>გთხოვთ მოიცადოთ</Text>
            </>
          ) : (
            <>
              <Ionicons name="search" size={48} color={COLORS.neutral[500]} style={{marginBottom: 12}} />
              <Text style={{ color: COLORS.neutral[600], fontSize: 16, fontWeight: '600', marginBottom: 8 }}>ძიების დასაწყებად</Text>
              <Text style={{ color: '#6b7280', textAlign: 'center', paddingHorizontal: 24, fontSize: 14 }}>
                შეიყვანეთ ავტომობილის ნომერი ან პირადი ნომერი
              </Text>
            </>
          )}
        </View>
      );
    }

    return (
      <View style={{ paddingVertical: 32, alignItems: 'center' }}>
        <MaterialIcons name="description" size={48} color={COLORS.warning[500]} style={{marginBottom: 12}} />
        <Text style={{ color: COLORS.warning[600], fontSize: 16, fontWeight: '600', marginBottom: 8 }}>მონაცემები არ მოიძებნა</Text>
        <Text style={{ color: '#6b7280', textAlign: 'center', paddingHorizontal: 24, fontSize: 14 }}>
          სცადეთ სხვა ძიების პარამეტრები
        </Text>
      </View>
    );
  };

  // Show each violation individually
  const violations = protocolData?.results || [];

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <View style={{
        backgroundColor: COLORS.white,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.neutral[200],
        overflow: 'hidden',
        ...SHADOWS.lg
      }}>
        {protocolData?.results && protocolData.results.length > 0 ? (
          <View>
            {/* Table Header */}
            <View style={{
              backgroundColor: '#1a237e',
              paddingVertical: 12,
              paddingHorizontal: 12
            }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Text style={{
                  color: 'white',
                  fontSize: 11,
                  fontWeight: '600',
                  flex: 2
                }}>ნომერი</Text>
                <Text style={{
                  color: 'white',
                  fontSize: 11,
                  fontWeight: '600',
                  flex: 2,
                  textAlign: 'center'
                }}>ქვითარი</Text>
                <Text style={{
                  color: 'white',
                  fontSize: 11,
                  fontWeight: '600',
                  flex: 2,
                  textAlign: 'center'
                }}>თანხა</Text>
                <Text style={{
                  color: 'white',
                  fontSize: 11,
                  fontWeight: '600',
                  flex: 2,
                  textAlign: 'center'
                }}>ვადა</Text>
                <View style={{ width: 24 }} />
              </View>
            </View>

            {/* Table Rows */}
            <View>
              {violations.map((violation, index) => (
                <View key={violation.protocolNo}>
                  {/* Main Row */}
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 12,
                      paddingHorizontal: 12,
                      borderBottomWidth: index === violations.length - 1 ? 0 : 1,
                      borderBottomColor: '#f1f5f9',
                      backgroundColor: expandedRows.has(violation.protocolNo) ? '#f8fafc' : 'white'
                    }}
                    onPress={() => toggleRow(violation.protocolNo)}
                    activeOpacity={0.7}
                  >
                    <Text style={{
                      color: '#0f172a',
                      fontSize: 13,
                      fontWeight: '600',
                      flex: 2
                    }}>{violation.protocolAuto}</Text>
                    
                    <Text style={{
                      color: '#475569',
                      fontSize: 11,
                      flex: 2,
                      textAlign: 'center'
                    }}>{violation.protocolNo}</Text>
                    
                    <Text style={{
                      color: '#dc2626',
                      fontSize: 12,
                      fontWeight: '600',
                      flex: 2,
                      textAlign: 'center'
                    }}>{violation.protocolAmount}₾</Text>
                    
                    <View style={{ flex: 2, alignItems: 'center' }}>
                      <Text style={{
                        color: violation.remainingDays <= 5 ? '#dc2626' : '#0f172a',
                        fontSize: 11,
                        fontWeight: violation.remainingDays <= 5 ? '600' : '400'
                      }}>{violation.lastDate}</Text>
                      {violation.remainingDays <= 5 && (
                        <Text style={{
                          color: '#dc2626',
                          fontSize: 9,
                          marginTop: 1
                        }}>{violation.remainingDays <= 0 ? 'ვადაგასულია' : `${violation.remainingDays} დღე`}</Text>
                      )}
                    </View>
                    
                    <View style={{ width: 24, alignItems: 'center' }}>
                      <Ionicons 
                        name={expandedRows.has(violation.protocolNo) ? "chevron-up" : "chevron-down"} 
                        size={14} 
                        color="#64748b" 
                      />
                    </View>
                  </TouchableOpacity>

                  {/* Expanded Details */}
                  {expandedRows.has(violation.protocolNo) && (
                    <ViolationDetails violation={violation} />
                  )}
                </View>
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

interface ViolationDetailsProps {
  violation: ProtocolItem;
}

function ViolationDetails({ violation }: ViolationDetailsProps) {
  const handlePayment = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // TODO: Implement payment functionality
    console.log('Payment for:', violation.protocolNo, violation.protocolAuto);
  };

  return (
    <View style={{
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: 'white',
      marginHorizontal: 12,
      marginVertical: 6,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: COLORS.neutral[200],
      ...SHADOWS.sm
    }}>
      {/* Payment Card Header */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.neutral[100]
      }}>
        <Text style={{
          color: COLORS.neutral[900],
          fontSize: 14,
          fontWeight: '600'
        }}>ქვითრის ნომერი: {violation.protocolNo}</Text>
        
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLORS.primary[500],
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 4
          }}
          onPress={handlePayment}
          activeOpacity={0.8}
        >
          <Ionicons name="card" size={12} color="white" style={{ marginRight: 4 }} />
          <Text style={{
            color: 'white',
            fontSize: 10,
            fontWeight: '600'
          }}>გადახდა</Text>
        </TouchableOpacity>
      </View>

      {/* Violation Details */}
      <View style={{ gap: 6 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: COLORS.neutral[600], fontSize: 12, fontWeight: '500' }}>დარღვევის თარიღი: </Text>
          <Text style={{ color: COLORS.neutral[900], fontSize: 12 }}>{violation.violationDate}</Text>
        </View>

        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Text style={{ color: COLORS.neutral[600], fontSize: 12, fontWeight: '500' }}>დარღვევის ადგილი: </Text>
          <Text style={{ color: COLORS.neutral[900], fontSize: 12, flex: 1, flexWrap: 'wrap' }}>{violation.protocolPlace}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: COLORS.neutral[600], fontSize: 12, fontWeight: '500' }}>ასკ მუხლი: </Text>
          <Text style={{ color: COLORS.neutral[900], fontSize: 12 }}>{violation.protocolLaw}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: COLORS.neutral[600], fontSize: 12, fontWeight: '500' }}>თანხა: </Text>
          <Text style={{ color: COLORS.error[600], fontSize: 12, fontWeight: '600' }}>{violation.protocolAmount} ლარი</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: COLORS.neutral[600], fontSize: 12, fontWeight: '500' }}>გამოქვეყნების თარიღი: </Text>
          <Text style={{ color: COLORS.neutral[900], fontSize: 12 }}>{violation.publishDate}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: COLORS.neutral[600], fontSize: 12, fontWeight: '500' }}>გადახდის ვადა: </Text>
          <Text style={{ color: COLORS.neutral[900], fontSize: 12 }}>{violation.lastDate}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: COLORS.neutral[600], fontSize: 12, fontWeight: '500' }}>დარჩენილია: </Text>
          <Text style={{ 
            color: violation.remainingDays <= 5 ? COLORS.error[600] : COLORS.success[600], 
            fontSize: 12, 
            fontWeight: '600' 
          }}>
            {violation.remainingDays <= 0 ? 'ვადა გავიდა' : `${violation.remainingDays} დღე`}
          </Text>
        </View>
      </View>
    </View>
  );
}