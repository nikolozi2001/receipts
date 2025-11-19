import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3B82F6",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -1 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "მთავარი",
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size + 2, color }}>🏠</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "ძიება",
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size + 2, color }}>🔍</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "პროფილი",
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size + 2, color }}>👤</Text>
          ),
        }}
      />
    </Tabs>
  );
}
