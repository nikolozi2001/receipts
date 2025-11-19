export const API_CONFIG = {
  BASE_URL: 'https://police.ge/protocol/index.php?url=protocols',
  ENDPOINTS: {
    ALL_PROTOCOLS: '',
    SEARCH_BY_CAR: '/searchByAuto',
    SEARCH_BY_PERSON: '/searchByPersonal', // Future endpoint
  },
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
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