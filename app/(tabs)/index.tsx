import { Header, TitleSection } from '@/components/ui/Header';
import { BORDER_RADIUS, COLORS, SHADOWS, SPACING, TYPOGRAPHY } from '@/constants/design';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  const quickActions = [
    {
      title: 'ჯარიმების ძიება',
      description: 'მოძებნეთ აქტიური ადმინისტრაციული ჯარიმები',
      icon: 'search',
      color: COLORS.primary[500],
      action: () => router.push('/(tabs)/search')
    },
    {
      title: 'ქვითრების ძიება',
      description: 'მომავალი ფუნქციონალობა',
      icon: 'receipt',
      color: COLORS.neutral[400],
      action: () => {}
    },
    {
      title: 'ინფორმაცია',
      description: 'დამატებითი ინფორმაცია და კონტაქტები',
      icon: 'information-circle',
      color: COLORS.accent[500],
      action: () => {}
    }
  ];

  const statistics = [
    { label: 'სულ მომხმარებლები', value: '25,000+', icon: 'people' },
    { label: 'ძიებები დღეში', value: '1,500+', icon: 'analytics' },
    { label: 'ბოლო განახლება', value: '17.11.2025', icon: 'time' }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      <Header 
        title="საქართველოს პოლიცია"
        subtitle="ადმინისტრაციული ჯარიმების მონაცემთა ბაზა"
        lastUpdated="17.11.2025"
      />

      <ScrollView 
        style={{ flex: 1, backgroundColor: COLORS.neutral[50] }} 
        showsVerticalScrollIndicator={false}
      >
        <TitleSection
          title="მთავარი გვერდი"
          description="კეთილი იყოს თქვენი მობრძანება საქართველოს პოლიციის ოფიციალურ პლატფორმაზე"
        />

        {/* Quick Actions Section */}
        <View style={{ paddingHorizontal: SPACING['2xl'], paddingVertical: SPACING.lg }}>
          <Text style={{
            fontSize: TYPOGRAPHY.fontSize.lg,
            fontWeight: TYPOGRAPHY.fontWeight.semibold,
            color: COLORS.neutral[900],
            marginBottom: SPACING.lg
          }}>
            სწრაფი მოქმედებები
          </Text>
          
          <View style={{ gap: SPACING.lg }}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: COLORS.white,
                  borderRadius: BORDER_RADIUS.xl,
                  padding: SPACING.lg,
                  flexDirection: 'row',
                  alignItems: 'center',
                  ...SHADOWS.md,
                  borderWidth: 1,
                  borderColor: COLORS.neutral[200]
                }}
                onPress={action.action}
                activeOpacity={0.7}
              >
                <View style={{
                  width: 48,
                  height: 48,
                  backgroundColor: action.color + '20',
                  borderRadius: BORDER_RADIUS.lg,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: SPACING.lg
                }}>
                  <Ionicons name={action.icon as any} size={24} color={action.color} />
                </View>
                
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: TYPOGRAPHY.fontSize.base,
                    fontWeight: TYPOGRAPHY.fontWeight.semibold,
                    color: COLORS.neutral[900],
                    marginBottom: SPACING.xs
                  }}>
                    {action.title}
                  </Text>
                  <Text style={{
                    fontSize: TYPOGRAPHY.fontSize.sm,
                    color: COLORS.neutral[600]
                  }}>
                    {action.description}
                  </Text>
                </View>
                
                <Ionicons name="chevron-forward" size={20} color={COLORS.neutral[400]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Statistics Section */}
        <View style={{ paddingHorizontal: SPACING['2xl'], paddingVertical: SPACING.lg }}>
          <Text style={{
            fontSize: TYPOGRAPHY.fontSize.lg,
            fontWeight: TYPOGRAPHY.fontWeight.semibold,
            color: COLORS.neutral[900],
            marginBottom: SPACING.lg
          }}>
            სტატისტიკა
          </Text>
          
          <View style={{ 
            flexDirection: 'row', 
            gap: SPACING.lg,
            flexWrap: 'wrap'
          }}>
            {statistics.map((stat, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  minWidth: 100,
                  backgroundColor: COLORS.white,
                  borderRadius: BORDER_RADIUS.lg,
                  padding: SPACING.lg,
                  alignItems: 'center',
                  ...SHADOWS.sm,
                  borderWidth: 1,
                  borderColor: COLORS.neutral[200]
                }}
              >
                <Ionicons name={stat.icon as any} size={24} color={COLORS.primary[500]} style={{ marginBottom: SPACING.sm }} />
                <Text style={{
                  fontSize: TYPOGRAPHY.fontSize.xl,
                  fontWeight: TYPOGRAPHY.fontWeight.bold,
                  color: COLORS.neutral[900],
                  marginBottom: SPACING.xs
                }}>
                  {stat.value}
                </Text>
                <Text style={{
                  fontSize: TYPOGRAPHY.fontSize.xs,
                  color: COLORS.neutral[600],
                  textAlign: 'center'
                }}>
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Information Section */}
        <View style={{ paddingHorizontal: SPACING['2xl'], paddingBottom: SPACING['4xl'] }}>
          <View style={{
            backgroundColor: COLORS.primary[50],
            borderRadius: BORDER_RADIUS.xl,
            padding: SPACING.lg,
            borderWidth: 1,
            borderColor: COLORS.primary[200]
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.lg }}>
              <MaterialIcons name="info" size={24} color={COLORS.primary[600]} style={{ marginRight: SPACING.sm }} />
              <Text style={{
                fontSize: TYPOGRAPHY.fontSize.base,
                fontWeight: TYPOGRAPHY.fontWeight.semibold,
                color: COLORS.primary[800]
              }}>
                მნიშვნელოვანი ინფორმაცია
              </Text>
            </View>
            
            <Text style={{
              fontSize: TYPOGRAPHY.fontSize.sm,
              color: COLORS.primary[700],
              lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.sm
            }}>
              ეს აპლიკაცია წარმოადგენს საქართველოს პოლიციის ოფიციალურ პლატფორმას ადმინისტრაციული ჯარიმების შესასწავლად. ყველა ინფორმაცია რეალურ დროშია განახლებული და ოფიციალური წყაროებიდან მოდის.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}