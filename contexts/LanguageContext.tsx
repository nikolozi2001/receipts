import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  language: string;
  changeLanguage: (lng: string) => void;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'ka');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('language');
        if (savedLanguage && savedLanguage !== language) {
          setLanguage(savedLanguage);
          await i18n.changeLanguage(savedLanguage);
        }
      } catch (error) {
        console.log('Error initializing language:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeLanguage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeLanguage = async (lng: string) => {
    try {
      setLanguage(lng);
      await i18n.changeLanguage(lng);
      await AsyncStorage.setItem('language', lng);
    } catch (error) {
      console.log('Error changing language:', error);
    }
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        changeLanguage, 
        isLoading 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};