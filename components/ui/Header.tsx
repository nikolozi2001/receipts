import React from 'react';
import { Text, View } from 'react-native';

interface HeaderProps {
  title: string;
  subtitle?: string;
  lastUpdated?: string;
}

export function Header({ title, subtitle, lastUpdated }: HeaderProps) {
  return (
    <View style={{
      backgroundColor: 'white',
      paddingTop: 64,
      paddingBottom: 24,
      paddingHorizontal: 24,
      borderBottomWidth: 1,
      borderBottomColor: '#F3F4F6'
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <View style={{
          width: 32,
          height: 32,
          backgroundColor: '#3B82F6',
          borderRadius: 8,
          marginRight: 12,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>🏛</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{
            color: '#111827',
            fontSize: 18,
            fontWeight: '600'
          }}>
            {title}
          </Text>
          {subtitle && (
            <Text style={{
              color: '#6B7280',
              fontSize: 14,
              marginTop: 2
            }}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      
      {lastUpdated && (
        <Text style={{
          color: '#9CA3AF',
          fontSize: 12,
          textAlign: 'center'
        }}>
          ბოლო განახლება: {lastUpdated}
        </Text>
      )}
    </View>
  );
}

interface TitleSectionProps {
  title: string;
  description: string;
}

export function TitleSection({ title, description }: TitleSectionProps) {
  return (
    <View style={{ paddingHorizontal: 24, paddingVertical: 24, backgroundColor: 'white' }}>
      <Text style={{
        fontSize: 20,
        fontWeight: '500',
        color: '#111827',
        textAlign: 'center',
        marginBottom: 12
      }}>
        {title}
      </Text>
      <Text style={{
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 16
      }}>
        {description}
      </Text>
    </View>
  );
}