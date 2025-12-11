import { COLORS, SPACING, TYPOGRAPHY } from '@/constants/design';
import { useLanguage } from '@/contexts/LanguageContext';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface LanguageSwitcherProps {
  showLabel?: boolean;
  compact?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  showLabel = true,
  compact = false 
}) => {
  const { t } = useTranslation();
  const { language, changeLanguage, isLoading } = useLanguage();

  const languages = [
    { code: 'ka', label: 'Georgian', flag: '🇬🇪' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
  ];

  if (isLoading) {
    return null;
  }

  return (
    <View style={compact ? styles.compactContainer : styles.container}>
      {showLabel && !compact && (
        <Text style={styles.label}>{t('common.language')}</Text>
      )}
      <View style={styles.buttonsContainer}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              compact ? styles.compactButton : styles.button,
              language === lang.code && styles.activeButton,
            ]}
            onPress={() => changeLanguage(lang.code)}
          >
            <Text style={styles.flag}>{lang.flag}</Text>
            {!compact && (
              <Text
                style={[
                  styles.buttonText,
                  language === lang.code && styles.activeButtonText,
                ]}
              >
                {lang.label}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.md,
  },
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.neutral[700],
    marginBottom: SPACING.xs,
  },
  buttonsContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: COLORS.neutral[100],
    padding: 2,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 6,
    minHeight: 44,
  },
  compactButton: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: 6,
    marginHorizontal: 2,
  },
  activeButton: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.neutral[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  flag: {
    fontSize: 18,
    marginRight: SPACING.xs,
  },
  buttonText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.neutral[600],
  },
  activeButtonText: {
    color: COLORS.neutral[900],
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },
});