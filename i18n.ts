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
    cancel: "გაუქმება",
    tryAgain: "თავიდან ცდა",
    close: "დახურვა",
    statistics: "სტატისტიკა",
    help: "დახმარება",
    contact: "კონტაქტი",
    information: "ინფორმაცია",
    anonymousMode: "ანონიმური რეჟიმი",
    payment: "გადახდა",
    currency: "ლარი"
  },
  errors: {
    networkError: "ინტერნეტ კავშირი არ არის ხელმისაწვდომი",
    serverError: "სერვერთან კავშირის პრობლემა",
    timeoutError: "მოთხოვნის დრო ამოიწურა",
    invalidInput: "შეიყვანეთ სწორი მონაცემები",
    noData: "მონაცემები არ მოიძებნა",
    validationError: "მონაცემების ვალიდაცია ვერ მოხერხდა",
    somethingWentWrong: "რაღაც არასწორად მოხდა",
    unexpectedError: "მოულოდნელი შეცდომა მოხდა"
  },
  success: {
    dataLoaded: "მონაცემები წარმატებით ჩაიტვირთა",
    searchCompleted: "ძიება წარმატებით დასრულდა"
  },
  loading: {
    searching: "მოძებნა...",
    loading: "იტვირთება...",
    validating: "ამოწმდება...",
    connecting: "სერვერთან დაკავშირება..."
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
    importantNote: "მნიშვნელოვანი: საჯარიმო ქვითარი პირისათვის ჩაბარებულად მიიჩნევა საჯაროდ გამოქვეყნებიდან 30-ე დღეს.",
    officialPlatformTitle: "ოფიციალური პლატფორმა",
    officialPlatformText: "ეს აპლიკაცია წარმოადგენს საქართველოს შინაგან საქმეთა სამინისტროს ოფიციალურ პლატფორმას ადმინისტრაციული ჯარიმების შესასწავლად.",
    realTimeInfo: "ყველა ინფორმაცია რეალურ დროშია განახლებული",
    features: "ფუნქციები",
    searchFines: "ჯარიმების ძიება",
    searchDescription: "მოიძიეთ ჯარიმები პირადი ნომრით ან პროტოკოლის ნომრით",
    viewDetails: "დეტალების ნახვა",
    detailsDescription: "ნახეთ ჯარიმის დეტალური ინფორმაცია და სტატუსი",
    paymentInfo: "გადახდის ინფორმაცია",
    paymentDescription: "მიიღეთ ინფორმაცია გადახდის მეთოდებისა და სტატუსის შესახებ"
  },
  profile: {
    settingsSubtitle: "აპლიკაციის კონფიგურაცია",
    statistics: "სტატისტიკა",
    statisticsSubtitle: "ძიების ისტორია",
    help: "დახმარება",
    helpSubtitle: "ინსტრუქციები და ხშირი კითხვები",
    contact: "კონტაქტი",
    information: "ინფორმაცია",
    appDescription: "ეს აპლიკაცია უზრუნველყოფს წვდომას საქართველოს პოლიციის ადმინისტრაციული ჯარიმების ღია მონაცემთა ბაზაზე."
  },
  search: {
    video: "ვიდეოჯარიმა",
    receipt: "ქვითარი",
    title: "ჯარიმების ძიება",
    personalData: "პიროვნების მონაცემებით ძიება",
    vehicleData: "ავტომობილის ნომრით ძიება",
    personalNumber: "პირადი ნომერი",
    protocolNumber: "პროტოკოლის ნომერი",
    lastName: "გვარი",
    birthDate: "დაბადების თარიღი",
    carPlate: "ავტომობილის სახელმწიფო ნომერი",
    placeholder: {
      personalNumber: "შეიყვანეთ თქვენი 11-ციფრიანი პირადი ნომერი",
      protocolNumber: "შეიყვანეთ პროტოკოლის ნომერი",
      lastName: "შეიყვანეთ გვარი",
      birthDate: "აირჩიეთ დაბადების თარიღი",
      carPlate: "შეიყვანეთ ავტომობილის ნომერი"
    },
    validation: {
      personalNumberRequired: "შეიყვანეთ პირადი ნომერი",
      personalNumberLength: "პირადი ნომერი უნდა შეიცავდეს 11 ციფრს",
      lastNameRequired: "შეიყვანეთ გვარი",
      birthDateRequired: "შეიყვანეთ დაბადების თარიღი",
      birthDateFormat: "დაბადების თარიღი უნდა იყოს ფორმატში: DD.MM.YYYY",
      protocolNumberRequired: "შეიყვანეთ პროტოკოლის ნომერი",
      carPlateRequired: "შეიყვანეთ ავტომობილის ნომერი"
    },
    results: {
      noData: "მონაცემები ვერ მოიძებნა",
      noViolations: "ჯარიმები არ არის",
      noViolationsCar: "ამ ავტომობილის ნომერზე აქტიური ჯარიმები არ არის",
      noViolationsPersonal: "მოცემულ მონაცემებზე ინფორმაცია არ მოიძებნა",
      loading: "დატვირთვა...",
      pleaseWait: "გთხოვთ მოიცადოთ",
      toStartSearch: "ძიების დასაწყებად",
      enterSearchParams: "შეიყვანეთ ავტომობილის ნომერი ან პირადი ნომერი",
      dataNotFound: "მონაცემები არ მოიძებნა",
      tryOtherParams: "სცადეთ სხვა ძიების პარამეტრები",
      violationDate: "დარღვევის თარიღი",
      lawArticle: "ასკ მუხლი",
      found: "ნაპოვნია {{count}} ჯარიმა",
      publishDate: "გამოქვეყნების თარიღი",
      paymentDue: "გადახდის ვადა",
      remaining: "დარჩენილია",
      protocol: "ქვითარი",
      plate: "ნომერი",
      amount: "თანხა",
      date: "ვადა",
      status: "სტატუსი",
      paid: "გადახდილი",
      unpaid: "გადაუხდელი",
      expired: "ვადაგასულია",
      daysLeft: "დღე"
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
    cancel: "Cancel",
    tryAgain: "Try Again",
    close: "Close",
    statistics: "Statistics",
    help: "Help",
    contact: "Contact",
    information: "Information",
    anonymousMode: "Anonymous Mode",
    payment: "Payment",
    currency: "GEL"
  },
  errors: {
    networkError: "Internet connection is not available",
    serverError: "Server connection problem",
    timeoutError: "Request timeout exceeded",
    invalidInput: "Please enter valid data",
    noData: "No data found",
    validationError: "Data validation failed",
    somethingWentWrong: "Something went wrong",
    unexpectedError: "An unexpected error occurred"
  },
  success: {
    dataLoaded: "Data loaded successfully",
    searchCompleted: "Search completed successfully"
  },
  loading: {
    searching: "Searching...",
    loading: "Loading...",
    validating: "Validating...",
    connecting: "Connecting to server..."
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
    importantNote: "Important: Fine receipt is considered delivered to person on the 30th day from public announcement.",
    officialPlatformTitle: "Official Platform", 
    officialPlatformText: "This application represents the official platform of the Ministry of Internal Affairs of Georgia for studying administrative fines.",
    realTimeInfo: "All information is updated in real time",
    features: "Features",
    searchFines: "Search Fines",
    searchDescription: "Search for fines by personal number or protocol number",
    viewDetails: "View Details",
    detailsDescription: "View detailed information and status of fines",
    paymentInfo: "Payment Information",
    paymentDescription: "Get information about payment methods and status"
  },
  profile: {
    settingsSubtitle: "Application configuration",
    statistics: "Statistics",
    statisticsSubtitle: "Search history",
    help: "Help",
    helpSubtitle: "Instructions and FAQ",
    contact: "Contact",
    information: "Information",
    appDescription: "This application provides access to the open database of administrative fines of the Police of Georgia."
  },
  search: {
    video: "Video Fine",
    receipt: "Fine Receipt",
    personalData: "Search By Personal Data",
    vehicleData: "Search By Vehicle Number Plate",
    title: "Search Fines",
    personalNumber: "Personal Number",
    protocolNumber: "Protocol Number",
    lastName: "Last Name",
    birthDate: "Birth Date",
    carPlate: "Car License Plate Number",
    placeholder: {
      personalNumber: "Enter your 11-digit personal number",
      protocolNumber: "Enter protocol number",
      lastName: "Enter last name",
      birthDate: "Select birth date",
      carPlate: "Enter car license plate"
    },
    validation: {
      personalNumberRequired: "Enter personal number",
      personalNumberLength: "Personal number must contain 11 digits",
      lastNameRequired: "Enter last name",
      birthDateRequired: "Enter birth date",
      birthDateFormat: "Birth date must be in format: DD.MM.YYYY",
      protocolNumberRequired: "Enter protocol number",
      carPlateRequired: "Enter car license plate"
    },
    results: {
      noData: "Data could not be found",
      noViolations: "No fines",
      noViolationsCar: "No active fines for this car number",
      noViolationsPersonal: "No information found for the provided data",
      loading: "Loading...",
      pleaseWait: "Please wait",
      toStartSearch: "To start search",
      enterSearchParams: "Enter car number or personal number",
      dataNotFound: "Data not found",
      tryOtherParams: "Try other search parameters",
      violationDate: "Violation Date",
      lawArticle: "Law Article",
      found: "Found {{count}} fines",
      publishDate: "Publication Date",
      paymentDue: "Payment Due",
      remaining: "Remaining",
      protocol: "Receipt",
      plate: "Plate",
      amount: "Amount",
      date: "Due Date",
      status: "Status",
      paid: "Paid",
      unpaid: "Unpaid",
      expired: "Expired",
      daysLeft: "days"
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