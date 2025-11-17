import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 18, color: "#333" }}>Welcome to Receipts</Text>
      <Text style={{ fontSize: 14, color: "#666", marginTop: 8 }}>
        Manage your receipts with ease
      </Text>
    </View>
  );
}
