import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "@/i18n";
import { Slot } from "expo-router";
import { Platform, StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "./globals.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={Platform.OS === 'android' ? "#1a237e" : undefined}
        translucent={Platform.OS === 'android'}
      />
      <SafeAreaView 
        style={{ flex: 1 }} 
        edges={Platform.OS === 'android' ? ['left', 'right'] : ['top', 'left', 'right', 'bottom']}
      >
        <LanguageProvider>
          <ErrorBoundary>
            <Slot />
          </ErrorBoundary>
        </LanguageProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
