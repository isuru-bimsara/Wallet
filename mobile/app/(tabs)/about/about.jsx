// mobile/app/(tabs)/about.jsx
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const About = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8F3]">
      <ScrollView showsVerticalScrollIndicator={false} className="p-6">
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#4A3428" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-[#4A3428]">About Us</Text>
        </View>

        {/* About Text */}
        <View className="mb-6">
          <Text className="text-[#4A3428] text-base mb-4">
            Welcome to our Garment Management System! This app helps you manage
            your garment inventory efficiently and keep track of your transactions
            easily. Whether it's purchases, sales, or stock management, we provide
            an intuitive interface to stay organized.
          </Text>
          <Text className="text-[#4A3428] text-base mb-4">
            Our goal is to make garment business management simple, fast, and
            visually appealing. Track your products, monitor your income and
            expenses, and make better decisions with the help of this app.
          </Text>
        </View>

        {/* Team Info */}
        <View className="mb-6">
          <Text className="text-[#4A3428] text-xl font-semibold mb-3">
            Our Team
          </Text>
          <Text className="text-[#4A3428] text-base mb-2">• John Doe - CEO</Text>
          <Text className="text-[#4A3428] text-base mb-2">• Jane Smith - CTO</Text>
          <Text className="text-[#4A3428] text-base mb-2">• Alex Johnson - Lead Developer</Text>
        </View>

        {/* Contact Section */}
        <View className="mb-6">
          <Text className="text-[#4A3428] text-xl font-semibold mb-3">
            Contact Us
          </Text>
          <Text className="text-[#4A3428] text-base mb-2">
            Email: support@garmentapp.com
          </Text>
          <Text className="text-[#4A3428] text-base mb-2">
            Phone: +1 234 567 890
          </Text>
        </View>

        {/* Back to Home Button */}
        <Link href="/(tabs)/index" asChild>
          <TouchableOpacity className="mt-4 bg-[#8B593E] px-4 py-3 rounded-2xl items-center">
            <Text className="text-white font-bold text-lg">Back to Home</Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;
