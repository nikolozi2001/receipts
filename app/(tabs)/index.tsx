import { Header, TitleSection } from "@/components/ui/Header";
import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from "@/constants/design";
import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";

export default function Index() {
  const { t } = useTranslation();
  
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>

      <Header />

      <ScrollView
        style={{ flex: 1, backgroundColor: COLORS.white }}
        showsVerticalScrollIndicator={false}
      >
        <TitleSection />

        {/* Official Announcement Section */}
        <View style={{ paddingHorizontal: SPACING["2xl"], paddingTop: SPACING.xl }}>
          <View style={{
            backgroundColor: '#fafafa',
            borderRadius: 8,
            padding: SPACING.xl,
            borderLeftWidth: 4,
            borderLeftColor: '#1a237e',
            borderWidth: 1,
            borderColor: '#e0e0e0'
          }}>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: SPACING.xl
            }}>
              <MaterialIcons
                name="announcement"
                size={24}
                color="#1a237e"
                style={{ marginRight: SPACING.md }}
              />
              <Text style={{
                fontSize: TYPOGRAPHY.fontSize.lg,
                fontWeight: TYPOGRAPHY.fontWeight.bold,
                color: '#1a237e',
                flex: 1
              }}>
                {t('home.announcement')}
              </Text>
            </View>

            <Text style={{
              fontSize: TYPOGRAPHY.fontSize.base,
              color: '#424242',
              lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.base,
              marginBottom: SPACING.lg
            }}>
              {t('home.announcementText')}
            </Text>

            <View style={{
              backgroundColor: '#f5f5f5',
              borderRadius: 6,
              padding: SPACING.lg,
              borderLeftWidth: 3,
              borderLeftColor: '#757575'
            }}>
              <Text style={{
                fontSize: TYPOGRAPHY.fontSize.sm,
                color: '#616161',
                lineHeight: TYPOGRAPHY.lineHeight.normal * TYPOGRAPHY.fontSize.sm,
                fontWeight: TYPOGRAPHY.fontWeight.medium
              }}>
                {t('home.importantNote')}
              </Text>
            </View>
          </View>
        </View>

        {/* Official Information Section */}
        <View style={{
          paddingHorizontal: SPACING["2xl"],
          paddingVertical: SPACING.xl,
          paddingBottom: SPACING["4xl"]
        }}>
          <View style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 8,
            padding: SPACING.xl,
            borderWidth: 1,
            borderColor: '#e9ecef'
          }}>
            <View style={{
              alignItems: "center",
              marginBottom: SPACING.lg
            }}>
              <MaterialIcons
                name="verified"
                size={32}
                color="#1a237e"
                style={{ marginBottom: SPACING.sm }}
              />
              <Text style={{
                fontSize: TYPOGRAPHY.fontSize.lg,
                fontWeight: TYPOGRAPHY.fontWeight.semibold,
                color: '#1a237e',
                textAlign: 'center'
              }}>
                {t('home.officialPlatformTitle')}
              </Text>
            </View>

            <Text style={{
              fontSize: TYPOGRAPHY.fontSize.base,
              color: '#495057',
              lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.base,
              textAlign: "center"
            }}>
              {t('home.officialPlatformText')}
            </Text>
            
            <View style={{
              height: 1,
              backgroundColor: '#dee2e6',
              marginVertical: SPACING.lg
            }} />
            
            <Text style={{
              fontSize: TYPOGRAPHY.fontSize.sm,
              color: '#6c757d',
              textAlign: "center",
              fontStyle: 'italic'
            }}>
              {t('home.realTimeInfo')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
