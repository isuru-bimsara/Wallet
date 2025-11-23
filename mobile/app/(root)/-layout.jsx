// mobile/app/%28root%29/-layout.jsx
import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";


export default function Layout() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null; // this is for a better ux

  if (!isSignedIn) return <Redirect href={"/sign-in"} />;

  // return <Stack screenOptions={{ headerShown: false }} />;

  // Redirect to tabs
  return <Redirect href="/(tabs)" />;
}
