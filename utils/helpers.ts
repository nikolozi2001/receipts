import { VALIDATION } from '@/constants';

/**
 * Format date string to a more readable format
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('ka-GE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch {
    return dateString;
  }
};

/**
 * Format currency amount
 */
export const formatCurrency = (amount: number): string => {
  return `${amount.toLocaleString('ka-GE')}₾`;
};

/**
 * Validate car number format
 */
export const validateCarNumber = (carNumber: string): boolean => {
  if (!carNumber.trim()) return false;
  return VALIDATION.CAR_NUMBER.test(carNumber.trim());
};

/**
 * Validate personal ID format (Georgian)
 */
export const validatePersonalId = (personalId: string): boolean => {
  if (!personalId.trim()) return false;
  return VALIDATION.PERSONAL_ID.test(personalId.trim());
};

/**
 * Clean and format car number
 */
export const formatCarNumber = (carNumber: string): string => {
  return carNumber.trim().toUpperCase();
};

/**
 * Check if search query has meaningful content
 */
export const hasSearchQuery = (searchForm: { receiptNumber: string; merchantName: string; searchQuery: string }): boolean => {
  return !!(searchForm.receiptNumber.trim() || searchForm.merchantName.trim() || searchForm.searchQuery.trim());
};

/**
 * Validate birth date format and value
 */
export const validateBirthDate = (birthDate: string): { isValid: boolean; error?: string } => {
  if (!birthDate.trim()) {
    return { isValid: false, error: 'შეიყვანეთ დაბადების თარიღი' };
  }

  const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!datePattern.test(birthDate.trim())) {
    return { isValid: false, error: 'გამოიყენეთ ფორმატი: DD/MM/YYYY' };
  }

  const [day, month, year] = birthDate.trim().split('/').map(Number);
  
  if (month < 1 || month > 12) {
    return { isValid: false, error: 'არასწორი თვე (1-12)' };
  }

  if (day < 1 || day > 31) {
    return { isValid: false, error: 'არასწორი დღე (1-31)' };
  }

  const currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear) {
    return { isValid: false, error: `არასწორი წელი (1900-${currentYear})` };
  }

  // Additional validation for day/month combinations
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day > daysInMonth) {
    return { isValid: false, error: `ამ თვეში ${daysInMonth} დღეა` };
  }

  return { isValid: true };
};

/**
 * Format personal ID for display
 */
export const formatPersonalId = (personalId: string): string => {
  const clean = personalId.replace(/\D/g, '');
  return clean.substring(0, 11);
};

/**
 * Check if error is network related
 */
export const isNetworkError = (error: string): boolean => {
  const networkKeywords = ['network', 'connection', 'timeout', 'fetch', 'internet'];
  return networkKeywords.some(keyword => error.toLowerCase().includes(keyword));
};