import { Header } from "@/components/ui/Header";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { COLORS } from "@/constants/design";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const { t } = useTranslation();
  
  const profileOptions = [
    { icon: "⚙️", title: t('common.settings'), subtitle: "Application configuration" },
    { icon: "📊", title: "Statistics", subtitle: "Search history" },
    { icon: "❓", title: "Help", subtitle: "Instructions and FAQ" },
    { icon: "📞", title: "Contact", subtitle: t('header.police') },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Header />
      
      <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
        {/* Clean Profile Header */}
        <View style={{
          backgroundColor: 'white',
          paddingTop: 32,
          paddingBottom: 32,
          paddingHorizontal: 24,
          borderBottomWidth: 1,
          borderBottomColor: '#F3F4F6'
        }}>
          <View style={{ alignItems: 'center' }}>
            <View style={{
              width: 64,
              height: 64,
              backgroundColor: '#F3F4F6',
              borderRadius: 32,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16
            }}>
              <Text style={{ fontSize: 24 }}>👤</Text>
            </View>
            <Text style={{
              color: '#111827',
              fontSize: 20,
              fontWeight: '500',
              marginBottom: 4
            }}>{t('common.profile')}</Text>
            <Text style={{ color: '#6B7280', fontSize: 14 }}>Anonymous Mode</Text>
          </View>
        </View>

        {/* Clean Settings Section */}
        <View style={{ paddingHorizontal: 24, paddingVertical: 24 }}>
          <Text style={{
            color: '#111827',
            fontSize: 18,
            fontWeight: '500',
            marginBottom: 16
          }}>{t('common.settings')}</Text>
          
          {/* Language Switcher Section */}
          <View style={{
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#F3F4F6',
            marginBottom: 8
          }}>
            <LanguageSwitcher />
          </View>
          
          {profileOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 16,
                borderBottomWidth: index < profileOptions.length - 1 ? 1 : 0,
                borderBottomColor: '#F3F4F6'
              }}
            >
              <Text style={{ fontSize: 20, marginRight: 16 }}>{option.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{
                  color: '#111827',
                  fontWeight: '500',
                  fontSize: 16,
                  marginBottom: 4
                }}>
                  {option.title}
                </Text>
                <Text style={{ color: '#6B7280', fontSize: 14 }}>
                  {option.subtitle}
                </Text>
              </View>
              <Text style={{ color: '#D1D5DB', fontSize: 20 }}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Clean Info Card */}
        <View style={{ paddingHorizontal: 24, paddingBottom: 32 }}>
          <View style={{
            backgroundColor: '#EFF6FF',
            borderRadius: 8,
            padding: 16,
            borderWidth: 1,
            borderColor: '#DBEAFE'
          }}>
            <Text style={{
              color: '#1E3A8A',
              fontWeight: '500',
              marginBottom: 8
            }}>ინფორმაცია</Text>
            <Text style={{
              color: '#1D4ED8',
              fontSize: 14,
              lineHeight: 20
            }}>
              ეს აპლიკაცია უზრუნველყოფს წვდომას საქართველოს პოლიციის ადმინისტრაციული ჯარიმების ღია მონაცემთა ბაზაზე.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}