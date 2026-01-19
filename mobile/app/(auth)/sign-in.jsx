// // mobile/app/%28auth%29/sign-in.jsx
// import { useSignIn } from "@clerk/clerk-expo";
// import { Link, useRouter } from "expo-router";
// import {
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from "react-native";
// import React from "react";
// import { Ionicons } from "@expo/vector-icons";
// import "../../app/global.css";


// export default function Page() {
//   const { signIn, setActive, isLoaded } = useSignIn();
//   const router = useRouter();
//   const [errorMessage, setErrorMessage] = React.useState("");

//   const [emailAddress, setEmailAddress] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [showPassword, setShowPassword] = React.useState(false);
//   const [loading, setLoading] = React.useState(false);

//   const onSignInPress = async () => {
//     if (!isLoaded) return;
//     setErrorMessage(""); // clear previous error
//     setLoading(true);

//     try {
//       const attempt = await signIn.create({
//         identifier: emailAddress,
//         password,
//       });

//       if (attempt.status === "complete") {
//         await setActive({ session: attempt.createdSessionId });
//         router.replace("/");
//       } else {
//         console.log(attempt);
//       }
//     } catch (err) {
//       console.error(err);
//       setErrorMessage("Incorrect email or password. Please try again.");
//     }
//   };

//   return (
//     {/* Display error message above the form */}
// {errorMessage ? (
//   <Text className="text-red-500 text-center mb-4 font-semibold">
//     {errorMessage}
//   </Text>
// ) : null}

//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       className="flex-1 bg-[#FFF8F3]"
//     >
//       <ScrollView
//         contentContainerStyle={{ flexGrow: 1 }}
//         showsVerticalScrollIndicator={false}
//       >
//         <View className="flex-1 justify-center px-6 py-10">
//           {/* Header */}
//           <View className="items-center mb-10">
//             <View className="bg-[#8B593E] w-20 h-20 rounded-full items-center justify-center mb-4">
//               <Ionicons name="wallet" size={40} color="#FFF8F3" />
//             </View>
//             <Text className="text-4xl font-bold text-[#4A3428] mb-2">
//               Welcome Back
//             </Text>
//             <Text className="text-[#9A8478] text-center text-base">
//               Sign in to continue managing your finances
//             </Text>
//           </View>

//           {/* Form */}
//           <View className="mb-6 space-y-4">
//             {/* Email */}
//             <View>
//               <Text className="text-[#4A3428] font-semibold mb-2 ml-1">
//                 Email Address
//               </Text>
//               <View className="bg-white border-2 border-[#E5D3B7] rounded-xl flex-row items-center px-4">
//                 <Ionicons name="mail-outline" size={20} color="#9A8478" />
//                 <TextInput
//                   className="flex-1 p-4 text-[#4A3428] text-base"
//                   placeholder="your@email.com"
//                   placeholderTextColor="#9A8478"
//                   value={emailAddress}
//                   autoCapitalize="none"
//                   keyboardType="email-address"
//                   onChangeText={setEmailAddress}
//                 />
//               </View>
//             </View>

//             {/* Password */}
//             <View>
//               <Text className="text-[#4A3428] font-semibold mb-2 ml-1">
//                 Password
//               </Text>
//               <View className="bg-white border-2 border-[#E5D3B7] rounded-xl flex-row items-center px-4">
//                 <Ionicons
//                   name="lock-closed-outline"
//                   size={20}
//                   color="#9A8478"
//                 />
//                 <TextInput
//                   className="flex-1 p-4 text-[#4A3428] text-base"
//                   placeholder="Enter your password"
//                   placeholderTextColor="#9A8478"
//                   secureTextEntry={!showPassword}
//                   value={password}
//                   onChangeText={setPassword}
//                 />
//                 <TouchableOpacity
//                   onPress={() => setShowPassword(!showPassword)}
//                 >
//                   <Ionicons
//                     name={showPassword ? "eye-outline" : "eye-off-outline"}
//                     size={20}
//                     color="#9A8478"
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>

//           {/* Sign In Button */}
//           <TouchableOpacity
//             className={`bg-[#8B593E] rounded-xl py-4 mb-4 ${
//               loading ? "opacity-50" : ""
//             }`}
//             onPress={onSignInPress}
//             disabled={loading}
//           >
//             <Text className="text-white font-bold text-lg text-center">
//               {loading ? "Signing In..." : "Sign In"}
//             </Text>
//           </TouchableOpacity>

//           {/* Sign Up Link */}
//           <View className="flex-row justify-center items-center mt-4">
//             <Text className="text-[#4A3428] text-base">
//               Don't have an account?{" "}
//             </Text>
//             <Link href="/sign-up" asChild>
//               <TouchableOpacity>
//                 <Text className="text-[#8B593E] font-bold text-base">
//                   Sign Up
//                 </Text>
//               </TouchableOpacity>
//             </Link>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }


// mobile/app/%28auth%29/sign-in.jsx
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import "../../app/global.css";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(""); // Moved inside component

  const onSignInPress = async () => {
    if (!isLoaded) return;

    setErrorMessage(""); // Clear previous error
    setLoading(true);

    try {
      const attempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (attempt.status === "complete") {
        await setActive({ session: attempt.createdSessionId });
        router.replace("/");
      } else {
        console.log(attempt);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Incorrect email or password. Please try again.");
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#FFF8F3]"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center px-6 py-10">
          {/* Header */}
          <View className="items-center mb-10">
            <View className="bg-[#8B593E] w-20 h-20 rounded-full items-center justify-center mb-4">
              <Ionicons name="wallet" size={40} color="#FFF8F3" />
            </View>
            <Text className="text-4xl font-bold text-[#4A3428] mb-2">
              Welcome Back
            </Text>
            <Text className="text-[#9A8478] text-center text-base">
              Sign in to continue managing your finances
            </Text>
          </View>

          {/* Error Message */}
          {errorMessage ? (
            <Text className="text-red-500 text-center mb-4 font-semibold">
              {errorMessage}
            </Text>
          ) : null}

          {/* Form */}
          <View className="mb-6 space-y-4">
            {/* Email */}
            <View>
              <Text className="text-[#4A3428] font-semibold mb-2 ml-1">
                Email Address
              </Text>
              <View className="bg-white border-2 border-[#E5D3B7] rounded-xl flex-row items-center px-4">
                <Ionicons name="mail-outline" size={20} color="#9A8478" />
                <TextInput
                  className="flex-1 p-4 text-[#4A3428] text-base"
                  placeholder="your@email.com"
                  placeholderTextColor="#9A8478"
                  value={emailAddress}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={setEmailAddress}
                />
              </View>
            </View>

            {/* Password */}
            <View>
              <Text className="text-[#4A3428] font-semibold mb-2 ml-1">
                Password
              </Text>
              <View className="bg-white border-2 border-[#E5D3B7] rounded-xl flex-row items-center px-4">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#9A8478"
                />
                <TextInput
                  className="flex-1 p-4 text-[#4A3428] text-base"
                  placeholder="Enter your password"
                  placeholderTextColor="#9A8478"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="#9A8478"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            className={`bg-[#8B593E] rounded-xl py-4 mb-4 ${
              loading ? "opacity-50" : ""
            }`}
            onPress={onSignInPress}
            disabled={loading}
          >
            <Text className="text-white font-bold text-lg text-center">
              {loading ? "Signing In..." : "Sign In"}
            </Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View className="flex-row justify-center items-center mt-4">
            <Text className="text-[#4A3428] text-base">
              Don't have an account?{" "}
            </Text>
            <Link href="/sign-up" asChild>
              <TouchableOpacity>
                <Text className="text-[#8B593E] font-bold text-base">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
