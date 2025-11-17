import { useEffect, useState } from "react";
import { ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";

// Type definitions for the protocol API response
interface ProtocolItem {
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

interface ProtocolData {
  count: number;
  results: ProtocolItem[];
}

interface ApiResponse {
  success: boolean;
  message: string | null;
  data: ProtocolData;
}

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [receiptNumber, setReceiptNumber] = useState("");
  const [merchantName, setMerchantName] = useState("");
  const [searchMode, setSearchMode] = useState("personal"); // "personal" or "car"
  const [isLoading, setIsLoading] = useState(false);
  const [protocolData, setProtocolData] = useState<ProtocolData | null>(null);

  // Function to fetch all protocols (default)
  const fetchAllProtocols = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://police.ge/protocol/index.php?url=protocols", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if response is actually JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.log("API returned non-JSON response");
        setProtocolData({ count: 0, results: [] });
        return;
      }

      const text = await response.text();
      let data: ApiResponse;
      
      try {
        data = JSON.parse(text) as ApiResponse;
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError);
        console.log("Response text:", text.substring(0, 200)); // Log first 200 chars
        setProtocolData({ count: 0, results: [] });
        return;
      }
      
      if (data.success && data.data) {
        setProtocolData(data.data);
      } else {
        console.error("API returned error:", data.message);
        setProtocolData({ count: 0, results: [] });
      }
    } catch (error) {
      console.error("API Error:", error);
      setProtocolData({ count: 0, results: [] });
    } finally {
      setIsLoading(false);
    }
  };

  // Load all protocols on component mount
  useEffect(() => {
    fetchAllProtocols();
  }, []);

  // Function to search by car number
  const searchByCarNumber = async () => {
    if (!receiptNumber.trim()) {
      // If no car number entered, fetch all protocols
      fetchAllProtocols();
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("https://police.ge/protocol/index.php?url=protocols/searchByAuto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          auto: receiptNumber.trim().toUpperCase()
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if response is actually JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.log("API returned non-JSON response");
        setProtocolData({ count: 0, results: [] });
        return;
      }

      const text = await response.text();
      let data: ApiResponse;
      
      try {
        data = JSON.parse(text) as ApiResponse;
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError);
        console.log("Response text:", text.substring(0, 200)); // Log first 200 chars
        setProtocolData({ count: 0, results: [] });
        return;
      }
      
      if (data.success && data.data) {
        setProtocolData(data.data);
      } else {
        console.error("API returned error:", data.message);
        setProtocolData({ count: 0, results: [] });
      }
    } catch (error) {
      console.error("API Error:", error);
      setProtocolData({ count: 0, results: [] });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle search button press
  const handleSearch = () => {
    if (searchMode === "car") {
      searchByCarNumber();
    } else {
      // Handle personal search here
      console.log("Personal search not implemented yet");
      setProtocolData({ count: 0, results: [] }); // Show empty results
    }
  };

  // Function to clear form
  const handleClear = () => {
    setReceiptNumber("");
    setMerchantName("");
    setSearchQuery("");
    setProtocolData(null);
  };

    // Function to search by car number

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="light-content" backgroundColor="#1e5099" />
      
      {/* Blue Header */}
      <View style={{
        backgroundColor: "#1e5099",
        paddingTop: 60,
        paddingBottom: 30,
        paddingHorizontal: 20,
      }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
          <View style={{
            width: 40,
            height: 40,
            backgroundColor: "#fff",
            borderRadius: 20,
            marginRight: 15,
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Text style={{ fontSize: 20 }}>🧾</Text>
          </View>
          <Text style={{
            color: "#fff",
            fontSize: 18,
            fontWeight: "600",
          }}>
            Receipt Management System
          </Text>
        </View>
        
        <Text style={{
          color: "#fff",
          fontSize: 14,
          opacity: 0.9,
          textAlign: "right",
        }}>
          Last updated: 17.11.2025
        </Text>
      </View>

      {/* Main Content */}
      <ScrollView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        {/* Title */}
        <View style={{ padding: 20, backgroundColor: "#fff" }}>
          <Text style={{
            fontSize: 24,
            fontWeight: "600",
            color: "#1e5099",
            textAlign: "center",
            marginBottom: 10,
          }}>
            Digital Receipt Archive
          </Text>
          <Text style={{
            fontSize: 14,
            color: "#666",
            textAlign: "center",
            lineHeight: 20,
          }}>
            Manage and track all your digital receipts in one place. Search by receipt number, merchant name, or date range.
          </Text>
        </View>

        {/* Search Section */}
        <View style={{ backgroundColor: "#fff", margin: 15, borderRadius: 8, elevation: 2, shadowOpacity: 0.1 }}>
          {/* Tab Headers */}
          <View style={{ flexDirection: "row" }}>
            <View style={{
              flex: 1,
              backgroundColor: "#1e5099",
              paddingVertical: 15,
              alignItems: "center",
            }}>
              <Text style={{ color: "#fff", fontWeight: "600" }}>🎥 ვიდეოჯარიმა</Text>
            </View>
            <View style={{
              flex: 1,
              backgroundColor: "#e8f0fe",
              paddingVertical: 15,
              alignItems: "center",
            }}>
              <Text style={{ color: "#666" }}>📄 ქვითარი</Text>
            </View>
          </View>

          {/* Search Form */}
          <View style={{ padding: 20 }}>
            <Text style={{ color: "#1e5099", marginBottom: 15, fontWeight: "600" }}>
              {searchMode === "personal" ? "👤 პიროვნების მონაცემებით ძიება" : "🚗 ავტომობილის ნომრით ძიება"}
            </Text>
            
            {/* Choice Options */}
            <View style={{ marginBottom: 20 }}>
              <View style={{ flexDirection: "row", gap: 10, marginBottom: 15 }}>
                <TouchableOpacity 
                  style={{
                    flex: 1,
                    backgroundColor: searchMode === "personal" ? "#f8f9fa" : "#e8f0fe",
                    borderWidth: searchMode === "personal" ? 2 : 1,
                    borderColor: searchMode === "personal" ? "#1e5099" : "#ddd",
                    paddingVertical: 12,
                    paddingHorizontal: 15,
                    borderRadius: 4,
                    alignItems: "center",
                  }}
                  onPress={() => setSearchMode("personal")}
                >
                  <Text style={{ 
                    color: searchMode === "personal" ? "#1e5099" : "#666", 
                    fontWeight: "600" 
                  }}>
                    👤 პიროვნების მონაცემებით ძიება
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity 
                style={{
                  backgroundColor: searchMode === "car" ? "#f8f9fa" : "#e8f0fe",
                  borderWidth: searchMode === "car" ? 2 : 1,
                  borderColor: searchMode === "car" ? "#1e5099" : "#ddd",
                  paddingVertical: 12,
                  paddingHorizontal: 15,
                  borderRadius: 4,
                  alignItems: "center",
                  marginBottom: 15,
                }}
                onPress={() => setSearchMode("car")}
              >
                <Text style={{ 
                  color: searchMode === "car" ? "#1e5099" : "#666", 
                  fontWeight: "600" 
                }}>
                  🚗 ავტომობილის ნომრით ძიება
                </Text>
              </TouchableOpacity>
            </View>
            
            {/* Conditional Form Fields */}
            {searchMode === "personal" ? (
              // Personal Search Fields
              <>
                <View style={{ marginBottom: 15 }}>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor: "#ddd",
                      borderRadius: 4,
                      paddingVertical: 12,
                      paddingHorizontal: 15,
                      fontSize: 16,
                    }}
                    placeholder="პირადი ნომერი"
                    value={receiptNumber}
                    onChangeText={setReceiptNumber}
                  />
                </View>

                <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
                  <TextInput
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: "#ddd",
                      borderRadius: 4,
                      paddingVertical: 12,
                      paddingHorizontal: 15,
                      fontSize: 16,
                    }}
                    placeholder="გვარი"
                    value={merchantName}
                    onChangeText={setMerchantName}
                  />
                  <TextInput
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: "#ddd",
                      borderRadius: 4,
                      paddingVertical: 12,
                      paddingHorizontal: 15,
                      fontSize: 16,
                    }}
                    placeholder="დაბადების თარიღი"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                </View>
              </>
            ) : (
              // Car Search Field
              <View style={{ marginBottom: 20 }}>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: "#ddd",
                    borderRadius: 4,
                    paddingVertical: 12,
                    paddingHorizontal: 15,
                    fontSize: 16,
                  }}
                  placeholder="ავტომობილის სახელმწიფო ნომერი"
                  value={receiptNumber}
                  onChangeText={setReceiptNumber}
                />
              </View>
            )}

            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity 
                style={{
                  flex: 1,
                  backgroundColor: "#1e5099",
                  paddingVertical: 12,
                  borderRadius: 4,
                  alignItems: "center",
                  opacity: isLoading ? 0.6 : 1,
                }}
                onPress={handleSearch}
                disabled={isLoading}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>
                  {isLoading ? "⏳ ძიება..." : "🔍 ძიება"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={{
                  flex: 1,
                  backgroundColor: "#6c757d",
                  paddingVertical: 12,
                  borderRadius: 4,
                  alignItems: "center",
                }}
                onPress={handleClear}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>🗑️ გასუფთავება</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Results Table */}
        <View style={{ backgroundColor: "#fff", margin: 15, borderRadius: 8, elevation: 2, shadowOpacity: 0.1 }}>
          {/* Table Header */}
          <View style={{
            flexDirection: "row",
            backgroundColor: "#f8f9fa",
            paddingVertical: 15,
            paddingHorizontal: 10,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}>
            {searchMode === "car" && protocolData ? (
              <>
                <Text style={{ flex: 2, fontWeight: "600", color: "#495057" }}>პროტოკოლის №</Text>
                <Text style={{ flex: 2, fontWeight: "600", color: "#495057" }}>თარიღი</Text>
                <Text style={{ flex: 2, fontWeight: "600", color: "#495057" }}>ადგილი</Text>
                <Text style={{ flex: 1, fontWeight: "600", color: "#495057" }}>თანხა</Text>
                <Text style={{ flex: 1, fontWeight: "600", color: "#495057" }}>დღე</Text>
              </>
            ) : (
              <>
                <Text style={{ flex: 2, fontWeight: "600", color: "#495057" }}>Receipt Number</Text>
                <Text style={{ flex: 2, fontWeight: "600", color: "#495057" }}>Issue Date</Text>
                <Text style={{ flex: 2, fontWeight: "600", color: "#495057" }}>Merchant</Text>
                <Text style={{ flex: 2, fontWeight: "600", color: "#495057" }}>Amount</Text>
                <Text style={{ flex: 1, fontWeight: "600", color: "#495057" }}>View</Text>
              </>
            )}
          </View>

          {/* Table Rows */}
          {searchMode === "car" && protocolData?.results ? (
            // Show protocol data
            protocolData.results.map((protocol, index) => (
              <View
                key={protocol.protocolNo}
                style={{
                  flexDirection: "row",
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                  borderBottomWidth: index < protocolData.results.length - 1 ? 1 : 0,
                  borderBottomColor: "#e9ecef",
                }}
              >
                <Text style={{ flex: 2, color: "#1e5099", fontWeight: "600", fontSize: 12 }}>
                  {protocol.protocolNo}
                </Text>
                <Text style={{ flex: 2, color: "#495057", fontSize: 12 }}>
                  {protocol.violationDate}
                </Text>
                <Text style={{ flex: 2, color: "#495057", fontSize: 10 }} numberOfLines={2}>
                  {protocol.protocolPlace}
                </Text>
                <Text style={{ flex: 1, color: "#495057", fontSize: 12 }}>
                  {protocol.protocolAmount}₾
                </Text>
                <Text style={{ flex: 1, color: protocol.remainingDays > 0 ? "#28a745" : "#dc3545", fontSize: 10 }}>
                  {protocol.remainingDays}დღე
                </Text>
              </View>
            ))
          ) : searchMode === "car" && protocolData?.results?.length === 0 ? (
            // No results found for car search
            <View style={{ paddingVertical: 30, alignItems: "center" }}>
              <Text style={{ color: "#28a745", fontSize: 16 }}>✅ ჯარიმები არ არის ნაპოვნი</Text>
              <Text style={{ color: "#666", fontSize: 12, marginTop: 5 }}>
                ამ ავტომობილის ნომერზე აქტიური ჯარიმები არ არის
              </Text>
            </View>
          ) : protocolData === null ? (
            // Initial state - no search performed yet
            <View style={{ paddingVertical: 30, alignItems: "center" }}>
              <Text style={{ color: "#666", fontSize: 16 }}>🔍 ძიების შესასრულებლად</Text>
              <Text style={{ color: "#666", fontSize: 12, marginTop: 5 }}>
                შეიყვანეთ ავტომობილის სახელმწიფო ნომერი და დააჭირეთ ძიებას
              </Text>
            </View>
          ) : (
            // Empty results for other cases
            <View style={{ paddingVertical: 30, alignItems: "center" }}>
              <Text style={{ color: "#666", fontSize: 16 }}>📄 მონაცემები არ არის ნაპოვნი</Text>
              <Text style={{ color: "#666", fontSize: 12, marginTop: 5 }}>
                სცადეთ სხვა ძიების პარამეტრები
              </Text>
            </View>
          )}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}
