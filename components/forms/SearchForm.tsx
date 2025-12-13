import { ErrorState, LoadingState, SearchFormData } from "@/types/api";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type MainMode = "video" | "receipts";
type ReceiptMode = "lawbreaker" | "protocol";

interface SearchFormProps {
  formData: SearchFormData;
  isLoading: boolean;
  loadingState: LoadingState;
  errorState: ErrorState;
  onUpdateForm: (updates: Partial<SearchFormData>) => void;
  onSearch: (searchType?: 'video-personal' | 'video-car' | 'receipt-lawbreaker' | 'receipt-protocol') => void;
  onClear: () => void;
  onRetry?: () => void;
  clearError?: () => void;
}

interface FieldsProps {
  formData: SearchFormData;
  onUpdateForm: (updates: Partial<SearchFormData>) => void;
  t: (key: string) => string;
}

function PersonalSearchFields({ formData, onUpdateForm, t }: FieldsProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Initialize date from existing searchQuery or default to current date
  const getInitialDate = () => {
    if (formData.searchQuery) {
      try {
        const parts = formData.searchQuery.split(".");
        if (parts.length === 3) {
          const [day, month, year] = parts;
          return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        }
      } catch {
        // Fallback to current date if parsing fails
      }
    }
    return new Date();
  };

  const [selectedDate, setSelectedDate] = useState(getInitialDate);

  const onDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (date) {
      setSelectedDate(date);
      const formattedDate = date
        .toLocaleDateString("ka-GE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, ".");
      onUpdateForm({ searchQuery: formattedDate });
    }
  };

  const showDatePickerHandler = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowDatePicker(true);
  };

  return (
    <View style={{ gap: 16 }}>
      <View>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#d1d5db",
            borderRadius: 6,
            paddingHorizontal: 12,
            paddingVertical: 10,
            fontSize: 16,
            backgroundColor: "white",
          }}
          placeholder={t('search.placeholder.personalNumber')}
          placeholderTextColor="#9ca3af"
          value={formData.receiptNumber}
          onChangeText={(text) => onUpdateForm({ receiptNumber: text })}
          autoCapitalize="none"
        />
      </View>

      <View>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#d1d5db",
            borderRadius: 6,
            paddingHorizontal: 12,
            paddingVertical: 10,
            fontSize: 16,
            backgroundColor: "white",
          }}
          placeholder={t('search.placeholder.lastName')}
          placeholderTextColor="#9ca3af"
          value={formData.merchantName}
          onChangeText={(text) => onUpdateForm({ merchantName: text })}
        />
      </View>

      <View>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "#d1d5db",
            borderRadius: 6,
            paddingHorizontal: 12,
            paddingVertical: 10,
            backgroundColor: "white",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          onPress={showDatePickerHandler}
        >
          <Text
            style={{
              fontSize: 16,
              color: formData.searchQuery ? "#000" : "#9ca3af",
            }}
          >
            {formData.searchQuery || t('search.birthDate')}
          </Text>
          <Ionicons name="calendar" size={20} color="#9ca3af" />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onDateChange}
            maximumDate={new Date()}
          />
        )}
      </View>
    </View>
  );
}

function CarSearchFields({ formData, onUpdateForm, t }: FieldsProps) {
  
  return (
    <View>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#d1d5db",
          borderRadius: 6,
          paddingHorizontal: 12,
          paddingVertical: 10,
          fontSize: 16,
          backgroundColor: "white",
        }}
        placeholder={t("search.placeholder.carPlate")}
        placeholderTextColor="#9ca3af"
        value={formData.carPlate}
        onChangeText={(text) => onUpdateForm({ carPlate: text })}
        autoCapitalize="characters"
      />
    </View>
  );
}

function LawBreakerSearchFields({ formData, onUpdateForm, t }: FieldsProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Initialize date from existing searchQuery or default to current date
  const getInitialDate = () => {
    if (formData.searchQuery) {
      try {
        const parts = formData.searchQuery.split(".");
        if (parts.length === 3) {
          const [day, month, year] = parts;
          return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        }
      } catch {
        // Fallback to current date if parsing fails
      }
    }
    return new Date();
  };

  const [selectedDate, setSelectedDate] = useState(getInitialDate);

  const onDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (date) {
      setSelectedDate(date);
      const formattedDate = date
        .toLocaleDateString("ka-GE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, ".");
      onUpdateForm({ searchQuery: formattedDate });
    }
  };

  const showDatePickerHandler = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowDatePicker(true);
  };

  return (
    <View style={{ gap: 16 }}>
      <View>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#d1d5db",
            borderRadius: 6,
            paddingHorizontal: 12,
            paddingVertical: 10,
            fontSize: 16,
            backgroundColor: "white",
          }}
          placeholder="პირადი ნომერი"
          placeholderTextColor="#9ca3af"
          value={formData.receiptNumber}
          onChangeText={(text) => onUpdateForm({ receiptNumber: text })}
          autoCapitalize="none"
        />
      </View>

      <View>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#d1d5db",
            borderRadius: 6,
            paddingHorizontal: 12,
            paddingVertical: 10,
            fontSize: 16,
            backgroundColor: "white",
          }}
          placeholder="დოკუმენტის ნომერი"
          placeholderTextColor="#9ca3af"
          value={formData.merchantName}
          onChangeText={(text) => onUpdateForm({ merchantName: text })}
        />
      </View>

      <View>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "#d1d5db",
            borderRadius: 6,
            paddingHorizontal: 12,
            paddingVertical: 10,
            backgroundColor: "white",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          onPress={showDatePickerHandler}
        >
          <Text
            style={{
              fontSize: 16,
              color: formData.searchQuery ? "#000" : "#9ca3af",
            }}
          >
            {formData.searchQuery || "დაბადების თარიღი"}
          </Text>
          <Ionicons name="calendar" size={20} color="#9ca3af" />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onDateChange}
            maximumDate={new Date()}
          />
        )}
      </View>
    </View>
  );
}

function ProtocolSearchFields({ formData, onUpdateForm, t }: FieldsProps) {
  return (
    <View style={{ gap: 16 }}>
      <View>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#d1d5db",
            borderRadius: 6,
            paddingHorizontal: 12,
            paddingVertical: 10,
            fontSize: 16,
            backgroundColor: "white",
          }}
          placeholder="პირადი/დოკუმენტის/საიდენტიფიკაციო ნომერი"
          placeholderTextColor="#9ca3af"
          value={formData.receiptNumber}
          onChangeText={(text) => onUpdateForm({ receiptNumber: text })}
          autoCapitalize="none"
        />
      </View>

      <View>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#d1d5db",
            borderRadius: 6,
            paddingHorizontal: 12,
            paddingVertical: 10,
            fontSize: 16,
            backgroundColor: "white",
          }}
          placeholder="ქვითრის ნომერი"
          placeholderTextColor="#9ca3af"
          value={formData.merchantName}
          onChangeText={(text) => onUpdateForm({ merchantName: text })}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
}

export function SearchForm({
  formData,
  isLoading,
  loadingState,
  errorState,
  onUpdateForm,
  onSearch,
  onClear,
  onRetry,
  clearError,
}: SearchFormProps) {
  const [mainMode, setMainMode] = useState<MainMode>("video");
  const [receiptMode, setReceiptMode] = useState<ReceiptMode>("protocol");

  const canSearch = () => {
    if (mainMode === "receipts") {
      if (receiptMode === "protocol") {
        return (
          formData.receiptNumber.trim().length > 0 &&
          formData.merchantName.trim().length > 0
        );
      } else {
        return (
          formData.receiptNumber.trim().length > 0 &&
          formData.merchantName.trim().length > 0 &&
          formData.searchQuery.trim().length > 0
        );
      }
    } else if (formData.searchMode === "car") {
      return formData.carPlate.trim().length > 0;
    } else {
      return (
        formData.receiptNumber.trim().length > 0 &&
        formData.merchantName.trim().length > 0 &&
        formData.searchQuery.trim().length > 0
      );
    }
  };

  const handleSearch = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    clearError?.();
    
    let searchType: 'video-personal' | 'video-car' | 'receipt-lawbreaker' | 'receipt-protocol';
    
    console.log('SearchForm handleSearch - mainMode:', mainMode, 'receiptMode:', receiptMode);
    console.log('SearchForm handleSearch - formData:', {
      receiptNumber: formData.receiptNumber,
      merchantName: formData.merchantName,
      searchQuery: formData.searchQuery
    });
    
    if (mainMode === "receipts") {
      if (receiptMode === "lawbreaker") {
        searchType = 'receipt-lawbreaker';
        console.log('SearchForm handleSearch - Using receipt-lawbreaker search type');
      } else {
        searchType = 'receipt-protocol';
        console.log('SearchForm handleSearch - Using receipt-protocol search type');
      }
    } else {
      if (formData.searchMode === "car") {
        searchType = 'video-car';
        console.log('SearchForm handleSearch - Using video-car search type');
      } else {
        searchType = 'video-personal';
        console.log('SearchForm handleSearch - Using video-personal search type');
      }
    }
    
    console.log('SearchForm handleSearch - Calling onSearch with type:', searchType);
    onSearch(searchType);
  };

  const { t } = useTranslation();

  return (
    <View style={{ marginHorizontal: 24, marginTop: 16 }}>
      {/* Main Section Buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 24,
          gap: 12,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            maxWidth: 180,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: mainMode === "video" ? "#1a237e" : "transparent",
            borderWidth: mainMode === "video" ? 0 : 1,
            borderColor: "#1a237e",
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderRadius: 6,
          }}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setMainMode("video");
          }}
        >
          <Ionicons
            name="videocam"
            size={20}
            color={mainMode === "video" ? "white" : "#1a237e"}
            style={{ marginRight: 8 }}
          />
          <Text
            style={{
              color: mainMode === "video" ? "white" : "#1a237e",
              fontWeight: "600",
              fontSize: 14,
            }}
          >
            {t("search.video")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            maxWidth: 180,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: mainMode === "receipts" ? "#1a237e" : "transparent",
            borderWidth: mainMode === "receipts" ? 0 : 1,
            borderColor: "#1a237e",
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderRadius: 6,
          }}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setMainMode("receipts");
          }}
        >
          <Ionicons
            name="receipt"
            size={20}
            color={mainMode === "receipts" ? "white" : "#1a237e"}
            style={{ marginRight: 8 }}
          />
          <Text
            style={{
              color: mainMode === "receipts" ? "white" : "#1a237e",
              fontWeight: "600",
              fontSize: 14,
            }}
          >
            {t("search.receipt")}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Error Display */}
      {errorState.hasError && (
        <View
          style={{
            marginBottom: 16,
            padding: 16,
            backgroundColor: "#fef2f2",
            borderLeftWidth: 3,
            borderLeftColor: "#dc2626",
            borderRadius: 4,
          }}
        >
          <Text
            style={{
              color: "#dc2626",
              fontSize: 14,
              lineHeight: 20,
            }}
          >
            {errorState.errorMessage}
          </Text>
          {errorState.canRetry && onRetry && (
            <TouchableOpacity
              style={{
                backgroundColor: "#dc2626",
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 4,
                marginTop: 8,
                alignSelf: "flex-start",
              }}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                onRetry?.();
              }}
            >
              <Text style={{ color: "white", fontWeight: "500", fontSize: 12 }}>
                თავიდან ცდა
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Success Message Display */}
      {!errorState.hasError && errorState.errorMessage && (
        <View
          style={{
            marginBottom: 16,
            padding: 16,
            backgroundColor: "#f0f9ff",
            borderLeftWidth: 3,
            borderLeftColor: "#0ea5e9",
            borderRadius: 4,
          }}
        >
          <Text
            style={{
              color: "#0c4a6e",
              fontSize: 14,
              lineHeight: 20,
            }}
          >
            {errorState.errorMessage}
          </Text>
        </View>
      )}

      {/* Loading Status */}
      {isLoading && (
        <View
          style={{
            padding: 16,
            backgroundColor: "#e3f2fd",
            borderLeftWidth: 3,
            borderLeftColor: "#1976d2",
            borderRadius: 4,
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              color: "#1565c0",
              fontSize: 14,
            }}
          >
            {loadingState.loadingMessage || t("common.searching")}
          </Text>
        </View>
      )}

      {/* Main Search Form */}
      <View
        style={{
          backgroundColor: "#fafafa",
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#e5e5e5",
        }}
      >
        <View style={{ padding: 24 }}>
          {/* Search Method Tabs */}
          {mainMode === "receipts" ? (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "white",
                marginBottom: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#e5e5e5",
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderBottomWidth: 2,
                  borderBottomColor:
                    receiptMode === "lawbreaker"
                      ? "#1a237e"
                      : "transparent",
                }}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setReceiptMode("lawbreaker");
                }}
              >
                <Ionicons
                  name="person"
                  size={18}
                  color={receiptMode === "lawbreaker" ? "#1a237e" : "#666"}
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={{
                    color:
                      receiptMode === "lawbreaker" ? "#1a237e" : "#666",
                    fontWeight:
                      receiptMode === "lawbreaker" ? "600" : "500",
                    fontSize: 14,
                  }}
                >
                  სამართალდამრღვევი
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderBottomWidth: 2,
                  borderBottomColor:
                    receiptMode === "protocol" ? "#1a237e" : "transparent",
                }}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setReceiptMode("protocol");
                }}
              >
                <Ionicons
                  name="receipt"
                  size={18}
                  color={receiptMode === "protocol" ? "#1a237e" : "#666"}
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={{
                    color: receiptMode === "protocol" ? "#1a237e" : "#666",
                    fontWeight: receiptMode === "protocol" ? "600" : "500",
                    fontSize: 14,
                  }}
                >
                  ოქმი
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "white",
                marginBottom: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#e5e5e5",
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderBottomWidth: 2,
                  borderBottomColor:
                    formData.searchMode === "personal"
                      ? "#1a237e"
                      : "transparent",
                }}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  onUpdateForm({ searchMode: "personal" });
                }}
              >
                <Ionicons
                  name="person"
                  size={18}
                  color={formData.searchMode === "personal" ? "#1a237e" : "#666"}
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={{
                    color:
                      formData.searchMode === "personal" ? "#1a237e" : "#666",
                    fontWeight:
                      formData.searchMode === "personal" ? "600" : "500",
                    fontSize: 14,
                  }}
                >
                  {t("search.personalData")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderBottomWidth: 2,
                  borderBottomColor:
                    formData.searchMode === "car" ? "#1a237e" : "transparent",
                }}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  onUpdateForm({ searchMode: "car" });
                }}
              >
                <Ionicons
                  name="car"
                  size={18}
                  color={formData.searchMode === "car" ? "#1a237e" : "#666"}
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={{
                    color: formData.searchMode === "car" ? "#1a237e" : "#666",
                    fontWeight: formData.searchMode === "car" ? "600" : "500",
                    fontSize: 14,
                  }}
                >
                  {t("search.vehicleData")}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Form Fields */}
          {mainMode === "receipts" ? (
            receiptMode === "lawbreaker" ? (
              <LawBreakerSearchFields
                formData={formData}
                onUpdateForm={onUpdateForm}
                t={t}
              />
            ) : (
              <ProtocolSearchFields
                formData={formData}
                onUpdateForm={onUpdateForm}
                t={t}
              />
            )
          ) : formData.searchMode === "personal" ? (
            <PersonalSearchFields
              formData={formData}
              onUpdateForm={onUpdateForm}
              t={t}
            />
          ) : (
            <CarSearchFields formData={formData} onUpdateForm={onUpdateForm} t={t} />
          )}

          {/* Action Buttons */}
          <View style={{ flexDirection: "row", gap: 12, marginTop: 24 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: isLoading
                  ? "#4f46e5"
                  : canSearch()
                  ? "#1a237e"
                  : "#9e9e9e",
                paddingVertical: 14,
                paddingHorizontal: 16,
                borderRadius: 8,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                opacity: isLoading || !canSearch() ? 0.8 : 1,
                transform: isLoading ? [{ scale: 0.98 }] : [{ scale: 1 }],
                shadowColor: canSearch() ? "#1a237e" : "#9e9e9e",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 4,
              }}
              onPress={handleSearch}
              disabled={isLoading || !canSearch()}
            >
              {isLoading ? (
                <ActivityIndicator
                  size="small"
                  color="white"
                  style={{ marginRight: 8 }}
                />
              ) : (
                <Ionicons
                  name="search"
                  size={18}
                  color="white"
                  style={{ marginRight: 8 }}
                />
              )}
              <Text
                style={{
                  color: "white",
                  fontWeight: "600",
                  fontSize: 16,
                  opacity: isLoading ? 0.9 : 1,
                  letterSpacing: 0.3,
                }}
              >
                {isLoading
                  ? loadingState.loadingMessage || t("common.searching")
                  : t("common.search")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                minWidth: 120,
                backgroundColor: "#6b7280",
                paddingVertical: 14,
                paddingHorizontal: 20,
                borderRadius: 8,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                opacity: isLoading ? 0.5 : 1,
              }}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                clearError?.();
                onClear();
              }}
              disabled={isLoading}
            >
              <Ionicons
                name="close-circle"
                size={16}
                color="white"
                style={{ marginRight: 8 }}
              />
              <Text
                style={{
                  color: "white",
                  fontWeight: "500",
                  fontSize: 15,
                  letterSpacing: 0.2,
                }}
              >
                {t("common.clear")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
