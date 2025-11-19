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
  // Georgian car number format: AA-123-AA or similar patterns
  const georgianCarPattern = /^[A-Za-zა-ჰ]{1,3}-?\d{2,4}-?[A-Za-zა-ჰ]{1,3}$|^\d{2,4}[A-Za-zა-ჰ]{1,3}$/;
  return georgianCarPattern.test(carNumber.trim());
};

/**
 * Validate personal ID format (Georgian)
 */
export const validatePersonalId = (personalId: string): boolean => {
  if (!personalId.trim()) return false;
  // Georgian personal ID: 11 digits
  const personalIdPattern = /^\d{11}$/;
  return personalIdPattern.test(personalId.trim());
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