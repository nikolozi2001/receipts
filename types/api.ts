// Type definitions for the protocol API
export interface ProtocolItem {
  protocolAuto: string;
  activeDate: string | null;
  violationDate: string;
  protocolPlace: string;
  protocolLaw: string;
  protocolAmount: number;
  publishDate: string;
  lastDate: string;
  remainingDays: number;
  protocolDate: string;
  protocolNo: string;
}

export interface ProtocolData {
  count: number;
  results: ProtocolItem[];
}

export interface ApiResponse {
  success: boolean;
  message: string | null;
  data: ProtocolData;
}

export interface SearchFormData {
  receiptNumber: string;
  merchantName: string;
  searchQuery: string;
  searchMode: 'personal' | 'car';
}
