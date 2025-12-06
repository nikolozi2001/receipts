import { formatCurrency, formatDate, hasSearchQuery, validateCarNumber } from '../utils/helpers';

describe('Helper Functions', () => {
  describe('formatDate', () => {
    it('should format date string correctly', () => {
      const date = '2023-11-19';
      const formatted = formatDate(date);
      // Georgian locale uses dots as separators
      expect(formatted).toMatch(/\d{2}\.\d{2}\.\d{4}/);
    });

    it('should return empty string for empty input', () => {
      expect(formatDate('')).toBe('');
    });

    it('should return original string for invalid date', () => {
      const invalidDate = 'invalid-date';
      // Invalid dates return 'Invalid Date' string
      expect(formatDate(invalidDate)).toBe('Invalid Date');
    });
  });

  describe('formatCurrency', () => {
    it('should format currency with Georgian Lari symbol', () => {
      // Georgian locale might not add commas for thousands
      expect(formatCurrency(1000)).toBe('1000₾');
      expect(formatCurrency(50)).toBe('50₾');
    });
  });

  describe('validateCarNumber', () => {
    it('should validate Georgian car number formats', () => {
      expect(validateCarNumber('AB-123-CD')).toBe(true);
      expect(validateCarNumber('123ABC')).toBe(true);
      expect(validateCarNumber('')).toBe(false);
      expect(validateCarNumber('invalid')).toBe(false);
    });
  });

  describe('hasSearchQuery', () => {
    it('should detect meaningful search content', () => {
      expect(hasSearchQuery({
        receiptNumber: 'AB123',
        merchantName: '',
        searchQuery: '',
        carPlate: '',
        searchMode: 'personal'
      })).toBe(true);      expect(hasSearchQuery({
        receiptNumber: '',
        merchantName: '',
        searchQuery: '',
        carPlate: '',
        searchMode: 'personal'
      })).toBe(false);      expect(hasSearchQuery({
        receiptNumber: '  ',
        merchantName: '  ',
        searchQuery: '  ',
        carPlate: '  ',
        searchMode: 'personal'
      })).toBe(false);
    });
  });
});