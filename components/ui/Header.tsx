import { COLORS, SHADOWS, SPACING, TYPOGRAPHY } from '@/constants/design';
import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';

interface HeaderProps {
  title: string;
  subtitle?: string;
  lastUpdated?: string;
}

export function Header({ title, subtitle, lastUpdated }: HeaderProps) {
  return (
    <ImageBackground
      source={require('../../assets/images/services_bg_1440.png')}
      style={{
        paddingTop: SPACING['6xl'],
        paddingBottom: SPACING['2xl'],
        paddingHorizontal: SPACING['2xl'],
        borderBottomWidth: 3,
        borderBottomColor: '#ffd700',
        ...SHADOWS.lg
      }}
      resizeMode="cover"
    >
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-start',
        marginBottom: 16 
      }}>
        {/* Left SHSS Logo */}
        <View style={{ alignItems: 'flex-start', marginRight: SPACING.lg }}>
          <Image
            source={require('../../assets/images/shss.png')}
            style={{
              width: 60,
              height: 60,
              resizeMode: 'contain'
            }}
          />
        </View>

        {/* Center Title */}
        <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: SPACING.md }}>
          <Text style={{
            color: COLORS.white,
            fontSize: TYPOGRAPHY.fontSize.lg,
            fontWeight: TYPOGRAPHY.fontWeight.bold,
            textAlign: 'center',
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2,
            letterSpacing: 0.5
          }}>
            შინაგან საქმეთა სამინისტრო
          </Text>
          {subtitle && (
            <Text style={{
              color: '#ffd700',
              fontSize: TYPOGRAPHY.fontSize.sm,
              marginTop: SPACING.xs,
              textAlign: 'center',
              textShadowColor: 'rgba(0, 0, 0, 0.5)',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 2,
              fontWeight: TYPOGRAPHY.fontWeight.semibold
            }}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
    </ImageBackground>
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