import { formatCarNumber, hasSearchQuery, validateCarNumber } from '../utils/helpers';

describe('Helper Functions', () => {
  describe('hasSearchQuery', () => {
    it('should return true when receiptNumber has content', () => {
      const searchForm = {
        receiptNumber: 'AB-123-CD',
        merchantName: '',
        searchQuery: '',
        carPlate: '',
        searchMode: 'personal' as const,
      };
      expect(hasSearchQuery(searchForm)).toBe(true);
    });

    it('should return false when all fields are empty', () => {
      const searchForm = {
        receiptNumber: '',
        merchantName: '',
        searchQuery: '',
        carPlate: '',
        searchMode: 'personal' as const,
      };
      expect(hasSearchQuery(searchForm)).toBe(false);
    });

    it('should return false when all fields are only whitespace', () => {
      const searchForm = {
        receiptNumber: '   ',
        merchantName: '  ',
        searchQuery: ' ',
        carPlate: '  ',
        searchMode: 'personal' as const,
      };
      expect(hasSearchQuery(searchForm)).toBe(false);
    });
  });

  describe('validateCarNumber', () => {
    it('should validate Georgian car number format', () => {
      expect(validateCarNumber('AB-123-CD')).toBe(true);
      expect(validateCarNumber('123ABC')).toBe(true);
      expect(validateCarNumber('')).toBe(false);
      expect(validateCarNumber('   ')).toBe(false);
    });
  });

  describe('formatCarNumber', () => {
    it('should format car number to uppercase and trim whitespace', () => {
      expect(formatCarNumber(' ab-123-cd ')).toBe('AB-123-CD');
      expect(formatCarNumber('abc123')).toBe('ABC123');
    });
  });
});