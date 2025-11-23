//mobile/app/_layout.jsx
// import { Slot } from "expo-router";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import SafeScreen from "../components/SafeScreen";
// import { ClerkProvider } from "@clerk/clerk-expo";

// export default function RootLayout() {
//   return (
//     <ClerkProvider>
//       <SafeScreen>
//         <Slot /> 
//       </SafeScreen>
//     </ClerkProvider>
//   );
// }


// mobile/app/%28auth%29/-layout.jsx
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ClerkProvider } from "@clerk/clerk-expo";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </ClerkProvider>
  );
}