import { BORDER_RADIUS, COLORS, SHADOWS, SPACING, TYPOGRAPHY } from '@/constants/design';
import { MaterialIcons } from '@expo/vector-icons';
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
      backgroundColor: COLORS.white,
      paddingTop: SPACING['6xl'],
      paddingBottom: SPACING['2xl'],
      paddingHorizontal: SPACING['2xl'],
      borderBottomWidth: 1,
      borderBottomColor: COLORS.neutral[100],
      ...SHADOWS.sm
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <View style={{
          width: 40,
          height: 40,
          backgroundColor: COLORS.primary[500],
          borderRadius: BORDER_RADIUS.md,
          marginRight: SPACING.lg,
          justifyContent: 'center',
          alignItems: 'center',
          ...SHADOWS.md
        }}>
          <MaterialIcons name="account-balance" size={20} color={COLORS.white} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{
            color: COLORS.neutral[900],
            fontSize: TYPOGRAPHY.fontSize.xl,
            fontWeight: TYPOGRAPHY.fontWeight.semibold
          }}>
            {title}
          </Text>
          {subtitle && (
            <Text style={{
              color: COLORS.neutral[500],
              fontSize: TYPOGRAPHY.fontSize.sm,
              marginTop: SPACING.xs
            }}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      
      {lastUpdated && (
        <Text style={{
          color: COLORS.neutral[400],
          fontSize: TYPOGRAPHY.fontSize.xs,
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
    <View style={{ paddingHorizontal: SPACING['2xl'], paddingVertical: SPACING['2xl'], backgroundColor: COLORS.white }}>
      <Text style={{
        fontSize: TYPOGRAPHY.fontSize['2xl'],
        fontWeight: TYPOGRAPHY.fontWeight.semibold,
        color: COLORS.neutral[900],
        textAlign: 'center',
        marginBottom: SPACING.lg
      }}>
        {title}
      </Text>
      <Text style={{
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.neutral[500],
        textAlign: 'center',
        lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.sm,
        paddingHorizontal: SPACING.lg
      }}>
        {description}
      </Text>
    </View>
  );
}