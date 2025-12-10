import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Slot } from "expo-router";
import { Platform, StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "./globals.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#1a237e"
        translucent={Platform.OS === 'android'}
      />
      <SafeAreaView 
        style={{ flex: 1 }} 
        edges={Platform.OS === 'android' ? ['left', 'right'] : ['left', 'right', 'bottom']}
      >
        <ErrorBoundary>
          <Slot />
        </ErrorBoundary>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
