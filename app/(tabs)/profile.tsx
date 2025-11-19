import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const profileOptions = [
    { icon: "⚙️", title: "პარამეტრები", subtitle: "აპლიკაციის კონფიგურაცია" },
    { icon: "📊", title: "სტატისტიკა", subtitle: "ძიების ისტორია" },
    { icon: "❓", title: "დახმარება", subtitle: "ინსტრუქციები და FAQ" },
    { icon: "📞", title: "კონტაქტი", subtitle: "საქართველოს პოლიცია" },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Clean Profile Header */}
      <View style={{
        backgroundColor: 'white',
        paddingTop: 64,
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
          }}>მომხმარებელი</Text>
          <Text style={{ color: '#6B7280', fontSize: 14 }}>ანონიმური რეჟიმი</Text>
        </View>
      </View>

      {/* Clean Settings Section */}
      <View style={{ paddingHorizontal: 24, paddingVertical: 24 }}>
        <Text style={{
          color: '#111827',
          fontSize: 18,
          fontWeight: '500',
          marginBottom: 16
        }}>პარამეტრები</Text>
        
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
  );
}