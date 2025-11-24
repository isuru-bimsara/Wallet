// mobile/app/%28tabs%29/create.jsx
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { useTransaction } from "../../hooks/useTransaction";

const CATEGORIES = [
  { name: "Salary", icon: "cash", type: "income" },
  { name: "Freelance", icon: "laptop", type: "income" },
  { name: "Business", icon: "briefcase", type: "income" },
  { name: "Investment", icon: "trending-up", type: "income" },
  { name: "Food", icon: "restaurant", type: "expense" },
  { name: "Transport", icon: "car", type: "expense" },
  { name: "Shopping", icon: "cart", type: "expense" },
  { name: "Bills", icon: "receipt", type: "expense" },
  { name: "Entertainment", icon: "game-controller", type: "expense" },
  { name: "Health", icon: "medkit", type: "expense" },
  { name: "Education", icon: "school", type: "expense" },
  { name: "Other", icon: "ellipsis-horizontal", type: "both" },
];

const Create = () => {
  const router = useRouter();
  const { user } = useUser();
  const { createTransaction } = useTransaction({ userId: user?.id });

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [transactionType, setTransactionType] = useState("expense"); // 'income' or 'expense'
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Validation
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a title");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }
    if (!selectedCategory) {
      Alert.alert("Error", "Please select a category");
      return;
    }

    setLoading(true);

    // Convert amount to positive/negative based on type
    const finalAmount =
      transactionType === "income"
        ? Math.abs(Number(amount))
        : -Math.abs(Number(amount));

    const success = await createTransaction({
      title: title.trim(),
      category: selectedCategory,
      amount: finalAmount,
    });

    setLoading(false);

    if (success) {
      /// Clear form
      setTitle("");
      setAmount("");
      setSelectedCategory("");
      setTransactionType("expense");

      // Navigate to home tab
      router.push("/(tabs)/index");
    }
  };

  const filteredCategories = CATEGORIES.filter(
    (cat) => cat.type === transactionType || cat.type === "both"
  );

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8F3]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="p-6">
            {/* Header */}
            <View className="flex-row items-center mb-6">
              <TouchableOpacity onPress={() => router.back()} className="mr-4">
                <Ionicons name="arrow-back" size={24} color="#4A3428" />
              </TouchableOpacity>
              <Text className="text-2xl font-bold text-[#4A3428]">
                Add Transaction
              </Text>
            </View>

            {/* Transaction Type Toggle */}
            <View className="flex-row mb-6">
              <TouchableOpacity
                onPress={() => setTransactionType("expense")}
                className={`flex-1 p-4 rounded-l-2xl border-2 ${
                  transactionType === "expense"
                    ? "bg-[#E74C3C] border-[#E74C3C]"
                    : "bg-white border-[#E5D3B7]"
                }`}
              >
                <Text
                  className={`text-center font-semibold ${
                    transactionType === "expense"
                      ? "text-white"
                      : "text-[#4A3428]"
                  }`}
                >
                  Expense
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setTransactionType("income")}
                className={`flex-1 p-4 rounded-r-2xl border-2 ${
                  transactionType === "income"
                    ? "bg-[#2ECC71] border-[#2ECC71]"
                    : "bg-white border-[#E5D3B7]"
                }`}
              >
                <Text
                  className={`text-center font-semibold ${
                    transactionType === "income"
                      ? "text-white"
                      : "text-[#4A3428]"
                  }`}
                >
                  Income
                </Text>
              </TouchableOpacity>
            </View>

            {/* Amount Input */}
            <View className="mb-6">
              <Text className="text-[#4A3428] font-semibold mb-2 ml-1">
                Amount
              </Text>
              <View className="bg-white border-2 border-[#E5D3B7] rounded-xl flex-row items-center px-4">
                <Text className="text-[#9A8478] text-2xl mr-2">$</Text>
                <TextInput
                  className="flex-1 p-4 text-[#4A3428] text-2xl font-bold"
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="0.00"
                  placeholderTextColor="#E5D3B7"
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            {/* Title Input */}
            <View className="mb-6">
              <Text className="text-[#4A3428] font-semibold mb-2 ml-1">
                Title
              </Text>
              <View className="bg-white border-2 border-[#E5D3B7] rounded-xl flex-row items-center px-4">
                <Ionicons name="pricetag-outline" size={20} color="#9A8478" />
                <TextInput
                  className="flex-1 p-4 text-[#4A3428] text-base"
                  value={title}
                  onChangeText={setTitle}
                  placeholder="e.g., Grocery shopping"
                  placeholderTextColor="#9A8478"
                />
              </View>
            </View>

            {/* Category Selection */}
            <View className="mb-6">
              <Text className="text-[#4A3428] font-semibold mb-3 ml-1">
                Category
              </Text>
              <View className="flex-row flex-wrap">
                {filteredCategories.map((category) => (
                  <TouchableOpacity
                    key={category.name}
                    onPress={() => setSelectedCategory(category.name)}
                    className={`w-[30%] mr-[3.33%] mb-3 p-4 rounded-2xl border-2 items-center ${
                      selectedCategory === category.name
                        ? "bg-[#8B593E] border-[#8B593E]"
                        : "bg-white border-[#E5D3B7]"
                    }`}
                  >
                    <Ionicons
                      name={category.icon}
                      size={28}
                      color={
                        selectedCategory === category.name
                          ? "#FFF8F3"
                          : "#8B593E"
                      }
                    />
                    <Text
                      className={`mt-2 text-xs font-semibold ${
                        selectedCategory === category.name
                          ? "text-white"
                          : "text-[#4A3428]"
                      }`}
                    >
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={loading}
              className={`bg-[#8B593E] rounded-2xl p-4 ${
                loading ? "opacity-50" : ""
              }`}
            >
              <Text className="text-white text-center font-bold text-lg">
                {loading ? "Creating..." : "Add Transaction"}
              </Text>
            </TouchableOpacity>

            <Link href="/about" asChild>
              <TouchableOpacity className="mt-4 bg-[#E5D3B7] px-4 py-3 rounded-2xl items-center">
                <Text className="text-[#4A3428] font-semibold">About</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Create;
