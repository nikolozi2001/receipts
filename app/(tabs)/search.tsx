import { Text, View } from "react-native";

export default function Search() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <View style={{ alignItems: 'center', paddingHorizontal: 32 }}>
        <Text style={{ fontSize: 32, marginBottom: 24 }}>🔍</Text>
        <Text style={{ fontSize: 20, fontWeight: '500', color: '#111827', marginBottom: 12 }}>მოძებნე ჯარიმები</Text>
        <Text style={{ 
          color: '#6B7280', 
          textAlign: 'center', 
          fontSize: 16, 
          lineHeight: 24 
        }}>
          ეს გვერდი განკუთვნილია დამატებითი ძიების ფუნქციისთვის
        </Text>
        
        <View style={{ 
          backgroundColor: '#EFF6FF', 
          borderRadius: 8, 
          padding: 16, 
          marginTop: 24 
        }}>
          <Text style={{ 
            color: '#2563EB', 
            fontSize: 14, 
            textAlign: 'center' 
          }}>
            💡 ძირითადი ძიება ხელმისაწვდომია "მთავარ" გვერდზე
          </Text>
        </View>
      </View>
    </View>
  );
}