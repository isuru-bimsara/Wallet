// mobile/app/(auth)/sign-up.jsx
import * as React from "react";
import { Text, TextInput, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    if (!emailAddress || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", "Sign-up failed. Try again.");
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
        Alert.alert("Error", "Verification incomplete");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", "Verification failed");
    }
  };

  if (pendingVerification) {
    return (
      <SafeAreaView className="flex-1 bg-[#FFF8F3]">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 justify-center items-center px-6"
        >
          <View className="w-full max-w-md">
            <Text className="text-2xl font-bold text-[#4A3428] mb-6 text-center">Verify Your Email</Text>
            <TextInput
              value={code}
              placeholder="Enter verification code"
              onChangeText={setCode}
              className="bg-white border-2 border-[#E5D3B7] rounded-xl p-4 mb-6 text-[#4A3428]"
              keyboardType="number-pad"
            />
            <TouchableOpacity
              onPress={onVerifyPress}
              className="bg-[#8B593E] rounded-2xl p-4 mb-4 items-center"
            >
              <Text className="text-white font-bold text-lg">Verify</Text>
            </TouchableOpacity>
            <Link href="/sign-in" asChild>
              <TouchableOpacity className="bg-[#E5D3B7] rounded-2xl p-4 items-center">
                <Text className="text-[#4A3428] font-semibold">Back to Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#FFF8F3]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center items-center px-6"
      >
        <View className="w-full max-w-md">
          <Text className="text-3xl font-bold text-[#4A3428] mb-8 text-center">Sign Up</Text>

          {/* Email Input */}
          <Text className="text-[#4A3428] font-semibold mb-2">Email</Text>
          <TextInput
            value={emailAddress}
            placeholder="Enter your email"
            onChangeText={setEmailAddress}
            autoCapitalize="none"
            className="bg-white border-2 border-[#E5D3B7] rounded-xl p-4 mb-6 text-[#4A3428]"
          />

          {/* Password Input */}
          <Text className="text-[#4A3428] font-semibold mb-2">Password</Text>
          <TextInput
            value={password}
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={setPassword}
            className="bg-white border-2 border-[#E5D3B7] rounded-xl p-4 mb-6 text-[#4A3428]"
          />

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={onSignUpPress}
            className="bg-[#8B593E] rounded-2xl p-4 mb-4 items-center"
          >
            <Text className="text-white font-bold text-lg">Continue</Text>
          </TouchableOpacity>

          {/* Sign In Link */}
          <View className="flex-row justify-center mt-2">
            <Text className="text-[#4A3428] mr-1">Already have an account?</Text>
            <Link href="/sign-in">
              <Text className="text-[#8B593E] font-semibold">Sign In</Text>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
