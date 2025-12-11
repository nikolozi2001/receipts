// App configuration constants
export const CONFIG = {
  API: {
    BASE_URL: __DEV__ ? 'http://192.168.3.3:3001' : 'https://api.police.ge',
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
    ENDPOINTS: {
      CAR_SEARCH: '/api/receipt-by-car',
      PERSONAL_SEARCH: '/api/receipt-by-personal',
      ALL_PROTOCOLS: '/api/protocols'
    }
  },
  UI: {
    DEBOUNCE_DELAY: 500,
    ANIMATION_DURATION: 300
  }
};

// Legacy support for existing code
export const API_CONFIG = {
  BASE_URL: CONFIG.API.BASE_URL,
  ENDPOINTS: {
    ALL_PROTOCOLS: '',
    SEARCH_BY_CAR: '/searchByAuto',
    SEARCH_BY_PERSON: '/searchByPersonal',
  },
  TIMEOUT: CONFIG.API.TIMEOUT,
  RETRY_ATTEMPTS: CONFIG.API.RETRY_ATTEMPTS,
} as const;

export const UI_CONFIG = {
  COLORS: {
    PRIMARY: '#1e5099',
    SUCCESS: '#28a745',
    ERROR: '#dc3545',
    WARNING: '#ffc107',
    INFO: '#17a2b8',
    LIGHT: '#f8f9fa',
    DARK: '#343a40',
    GRAY: '#6c757d',
  },
  SPACING: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  BORDER_RADIUS: {
    sm: 4,
    md: 8,
    lg: 12,
    full: 9999,
  },
} as const;

export const STORAGE_KEYS = {
  SEARCH_HISTORY: '@receipts/search_history',
  USER_PREFERENCES: '@receipts/user_preferences',
  CACHE: '@receipts/cache',
} as const;

export const VALIDATION = {
  CAR_NUMBER: /^[A-Za-zა-ჰ]{1,3}-?\d{2,4}-?[A-Za-zა-ჰ]{1,3}$|^\d{2,4}[A-Za-zა-ჰ]{1,3}$/,
  PERSONAL_ID: /^\d{11}$/,
  MAX_SEARCH_HISTORY: 10,
} as const;

// Message translation keys
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'errors.networkError',
  SERVER_ERROR: 'errors.serverError',
  TIMEOUT_ERROR: 'errors.timeoutError',
  INVALID_INPUT: 'errors.invalidInput',
  NO_DATA: 'errors.noData',
  VALIDATION_ERROR: 'errors.validationError'
};

// Success messages
export const SUCCESS_MESSAGES = {
  DATA_LOADED: 'success.dataLoaded',
  SEARCH_COMPLETED: 'success.searchCompleted'
};

// Loading messages
export const LOADING_MESSAGES = {
  SEARCHING: 'loading.searching',
  LOADING: 'loading.loading',
  VALIDATING: 'loading.validating',
  CONNECTING: 'loading.connecting'
};