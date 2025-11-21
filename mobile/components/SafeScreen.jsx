// mobile/components/SafeScreen.jsx
import { SafeAreaView } from "react-native-safe-area-context"; // ✅ Correct

const SafeScreen = ({ children }) => {
  return <SafeAreaView className="flex-1">{children}</SafeAreaView>;
};

export default SafeScreen;
