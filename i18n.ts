import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const ka = {
  common: {
    search: "ძიება",
    searching: "ძებნა...",
    home: "მთავარი",
    profile: "პროფილი",
    language: "ენა",
    settings: "პარამეტრები",
    loading: "იტვირთება...",
    error: "შეცდომა",
    retry: "თავიდან ცდა",
    clear: "გასუფთავება",
    submit: "ძიება",
    cancel: "გაუქმება"
  },
  header: {
    ministry: "შინაგან საქმეთა სამინისტრო",
    police: "საქართველოს პოლიცია",
    database: "ადმინისტრაციული ჯარიმების მონაცემთა ბაზა",
    officialPlatform: "საქართველოს შინაგან საქმეთა სამინისტროს ოფიციალური პლატფორმა"
  },
  home: {
    title: "მთავარი გვერდი",
    description: "საქართველოს შინაგან საქმეთა სამინისტროს ოფიციალური პლატფორმა",
    announcement: "ოფიციალური განცხადება",
    announcementText: "ეს პლატფორმა საშუალებას გაძლევთ შეამოწმოთ ადმინისტრაციული ჯარიმების სტატუსი და მონაცემები ოფიციალური სახელმწიფო წყაროებიდან.",
    features: "ფუნქციები",
    searchFines: "ჯარიმების ძიება",
    searchDescription: "მოიძიეთ ჯარიმები პირადი ნომრით ან პროტოკოლის ნომრით",
    viewDetails: "დეტალების ნახვა",
    detailsDescription: "ნახეთ ჯარიმის დეტალური ინფორმაცია და სტატუსი",
    paymentInfo: "გადახდის ინფორმაცია",
    paymentDescription: "მიიღეთ ინფორმაცია გადახდის მეთოდებისა და სტატუსის შესახებ"
  },
  search: {
    video: "ვიდეოჯარიმა",
    receipt: "ქვითარი",
    title: "ჯარიმების ძიება",
    personalData: "პიროვნების მონაცემებით ძიება",
    vehicleData: "ავტომობილის ნომრით ძიება",
    personalNumber: "პირადი ნომერი",
    protocolNumber: "პროტოკოლის ნომერი",
    birthDate: "დაბადების თარიღი",
    placeholder: {
      personalNumber: "შეიყვანეთ თქვენი 11-ციფრიანი პირადი ნომერი",
      protocolNumber: "შეიყვანეთ პროტოკოლის ნომერი",
      birthDate: "აირჩიეთ დაბადების თარიღი"
    },
    validation: {
      personalNumberRequired: "პირადი ნომერი აუცილებელია",
      personalNumberLength: "პირადი ნომერი უნდა შეიცავდეს 11 ციფრს",
      birthDateRequired: "დაბადების თარიღი აუცილებელია",
      protocolNumberRequired: "პროტოკოლის ნომერი აუცილებელია"
    },
    results: {
      noData: "მონაცემები ვერ მოიძებნა",
      protocol: "პროტოკოლი",
      amount: "თანხა",
      date: "თარიღი",
      status: "სტატუსი",
      paid: "გადახდილი",
      unpaid: "გადაუხდელი"
    }
  }
};

const en = {
  common: {
    search: "Search",
    searching: "Searching...",
    home: "Home",
    profile: "Profile",
    language: "Language",
    settings: "Settings",
    loading: "Loading...",
    error: "Error",
    retry: "Retry",
    clear: "Clear",
    submit: "Search",
    cancel: "Cancel"
  },
  header: {
    ministry: "Ministry of Internal Affairs",
    police: "Georgian Police",
    database: "Administrative Fines Database",
    officialPlatform: "Official platform of the Ministry of Internal Affairs of Georgia"
  },
  home: {
    title: "Home Page",
    description: "Official platform of the Ministry of Internal Affairs of Georgia",
    announcement: "Official Announcement",
    announcementText: "This platform allows you to check the status and data of administrative fines from official government sources.",
    features: "Features",
    searchFines: "Search Fines",
    searchDescription: "Search for fines by personal number or protocol number",
    viewDetails: "View Details",
    detailsDescription: "View detailed information and status of fines",
    paymentInfo: "Payment Information",
    paymentDescription: "Get information about payment methods and status"
  },
  search: {
    video: "Video Fine",
    receipt: "Fine Receipt",
    personalData: "Search By Personal Data",
    vehicleData: "Search By Vehicle Number Plate",
    title: "Search Fines",
    personalNumber: "Personal Number",
    protocolNumber: "Protocol Number",
    birthDate: "Birth Date",
    placeholder: {
      personalNumber: "Enter your 11-digit personal number",
      protocolNumber: "Enter protocol number",
      birthDate: "Select birth date"
    },
    validation: {
      personalNumberRequired: "Personal number is required",
      personalNumberLength: "Personal number must contain 11 digits",
      birthDateRequired: "Birth date is required",
      protocolNumberRequired: "Protocol number is required"
    },
    results: {
      noData: "No data found",
      protocol: "Protocol",
      amount: "Amount",
      date: "Date",
      status: "Status",
      paid: "Paid",
      unpaid: "Unpaid"
    }
  }
};

const LANGUAGE_DETECTOR = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lng: string) => void) => {
    try {
      // Try to get saved language from AsyncStorage first
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) {
        callback(savedLanguage);
        return;
      }
      
      // Fall back to device locale
      const deviceLocale = Localization.getLocales()[0]?.languageCode || 'en';
      
      // Default to Georgian if locale is Georgian, otherwise English
      const defaultLang = deviceLocale === 'ka' ? 'ka' : 'en';
      callback(defaultLang);
    } catch (error) {
      console.log('Error detecting language:', error);
      callback('ka'); // Default to Georgian
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      await AsyncStorage.setItem('language', lng);
    } catch (error) {
      console.log('Error saving language:', error);
    }
  },
};

i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources: {
      ka: { translation: ka },
      en: { translation: en },
    },
    fallbackLng: 'ka',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;