import React from "react";
import { Stack } from "expo-router";

export default function AboutLayout() {
  // Render a Stack for the "about" subtree so its screens don't become Tabs entries.
  return <Stack screenOptions={{ headerShown: false }} />;
}
