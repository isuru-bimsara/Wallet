

// // // mobile/app/%28tabs%29/index.jsx
// // import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
// // import { Link, useRouter } from "expo-router";
// // import {
// //   Text,
// //   View,
// //   ActivityIndicator,
// //   ScrollView,
// //   TouchableOpacity,
// //   RefreshControl,
// //   Alert,
// // } from "react-native";
// // import { SignOutButton } from "@/components/SignOutButton";
// // import { useTransaction } from "../../hooks/useTransaction";
// // import { useEffect, useState } from "react";
// // import { Ionicons } from "@expo/vector-icons";

// // export default function Page() {
// //   const { user, isLoaded } = useUser();
// //   const router = useRouter();

// //   const { transactions, summary, isLoading, loadData, deleteTransaction } =
// //     useTransaction({
// //       userId: user?.id,
// //     });

// //   const [refreshing, setRefreshing] = useState(false);

// //   useEffect(() => {
// //     if (isLoaded && user?.id) {
// //       loadData();
// //     }
// //   }, [isLoaded, user?.id, loadData]);

// //   const onRefresh = async () => {
// //     setRefreshing(true);
// //     await loadData();
// //     setRefreshing(false);
// //   };

// //   const handleDelete = async (transaction) => {
// //     if (!transaction?.id) {
// //       alert("Cannot delete: Transaction ID not found");
// //       return;
// //     }

// //     // Use window.confirm for web, Alert.alert for mobile
// //     if (typeof window !== "undefined" && window.confirm) {
// //       // Web browser
// //       const confirmed = window.confirm(
// //         `Are you sure you want to delete "${transaction.title}"?`
// //       );
// //       if (confirmed) {
// //         console.log("Calling deleteTransaction with ID:", transaction.id);
// //         await deleteTransaction(transaction.id);
// //       }
// //     } else {
// //       // Mobile (React Native)
// //       Alert.alert(
// //         "Delete Transaction",
// //         `Are you sure you want to delete "${transaction.title}"?`,
// //         [
// //           { text: "Cancel", style: "cancel" },
// //           {
// //             text: "Delete",
// //             style: "destructive",
// //             onPress: async () => {
// //               console.log("Calling deleteTransaction with ID:", transaction.id);
// //               await deleteTransaction(transaction.id);
// //             },
// //           },
// //         ]
// //       );
// //     }
// //   };

// //   if (!isLoaded) {
// //     return (
// //       <View className="flex-1 justify-center items-center bg-[#FFF8F3]">
// //         <ActivityIndicator size="large" color="#8B593E" />
// //         <Text className="text-[#9A8478] mt-2">Loading...</Text>
// //       </View>
// //     );
// //   }

// //   return (
// //     <ScrollView
// //       className="flex-1 bg-[#FFF8F3]"
// //       refreshControl={
// //         <RefreshControl
// //           refreshing={refreshing}
// //           onRefresh={onRefresh}
// //           colors={["#8B593E"]}
// //           tintColor="#8B593E"
// //           title="Pull to refresh"
// //           titleColor="#9A8478"
// //         />
// //       }
// //     >
// //       <SignedIn>
// //         <View className="p-6">
// //           {/* Header Section */}
// //           <View className="flex-row justify-between items-center mb-6">
// //             <View className="flex-row items-center">
// //               <View className="bg-[#8B593E] w-12 h-12 rounded-full items-center justify-center mr-3">
// //                 <Ionicons name="wallet" size={24} color="#FFF8F3" />
// //               </View>
// //               <View>
// //                 <Text className="text-[#9A8478] text-xs">Welcome</Text>
// //                 <Text className="text-[#4A3428] font-bold text-base">
// //                   {user?.emailAddresses[0].emailAddress.split("@")[0]}
// //                 </Text>
// //               </View>
// //             </View>
// //             <View className="flex-row items-center">
// //               <TouchableOpacity
// //                 className="bg-[#8B593E] px-4 py-2 rounded-full flex-row items-center mr-2"
// //                 onPress={() => router.push("/create")}
// //               >
// //                 <Ionicons name="add" size={20} color="#FFF8F3" />
// //                 <Text className="text-white font-semibold ml-1">Add</Text>
// //               </TouchableOpacity>
// //               <SignOutButton />
// //             </View>
// //           </View>

// //           {isLoading ? (
// //             <View className="items-center py-10">
// //               <ActivityIndicator size="large" color="#8B593E" />
// //             </View>
// //           ) : (
// //             <>
// //               {/* Balance Card */}
// //               <View className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
// //                 <Text className="text-[#9A8478] text-sm mb-2">
// //                   Total Balance
// //                 </Text>
// //                 <Text className="text-[#4A3428] text-5xl font-bold mb-6">
// //                   ${Number(summary.balance || 0).toFixed(2)}
// //                 </Text>

// //                 <View className="flex-row justify-between">
// //                   <View className="flex-1">
// //                     <Text className="text-[#9A8478] text-xs mb-1">Income</Text>
// //                     <Text className="text-[#2ECC71] text-xl font-bold">
// //                       +${Number(summary.income || 0).toFixed(2)}
// //                     </Text>
// //                   </View>

// //                   <View className="flex-1 items-end">
// //                     <Text className="text-[#9A8478] text-xs mb-1">
// //                       Expenses
// //                     </Text>
// //                     <Text className="text-[#E74C3C] text-xl font-bold">
// //                       -${Math.abs(Number(summary.expences || 0)).toFixed(2)}
// //                     </Text>
// //                   </View>
// //                 </View>
// //               </View>

// //               {/* Recent Transactions Section */}
// //               <View>
// //                 <View className="flex-row justify-between items-center mb-4">
// //                   <Text className="text-[#4A3428] text-lg font-bold">
// //                     Recent Transactions
// //                   </Text>
// //                   <TouchableOpacity
// //                     onPress={onRefresh}
// //                     className="p-2"
// //                     disabled={refreshing}
// //                   >
// //                     <Ionicons
// //                       name="refresh"
// //                       size={24}
// //                       color={refreshing ? "#E5D3B7" : "#8B593E"}
// //                     />
// //                   </TouchableOpacity>
// //                 </View>

// //                 {!Array.isArray(transactions) ? (
// //                   <View className="bg-white rounded-2xl p-4">
// //                     <Text className="text-[#E74C3C] text-center">
// //                       Error loading transactions
// //                     </Text>
// //                   </View>
// //                 ) : transactions.length === 0 ? (
// //                   <View className="bg-white rounded-2xl p-6">
// //                     <Text className="text-[#9A8478] text-center">
// //                       No transactions yet
// //                     </Text>
// //                   </View>
// //                 ) : (
// //                   transactions.map((t, index) => (
// //                     <View
// //                       key={t.id || index}
// //                       className="bg-white rounded-2xl p-4 mb-3 flex-row items-center justify-between"
// //                     >
// //                       <View className="flex-row items-center flex-1">
// //                         <View
// //                           className={`w-12 h-12 rounded-full items-center justify-center mr-3 ${
// //                             t.amount >= 0 ? "bg-[#D4EDDA]" : "bg-[#F8D7DA]"
// //                           }`}
// //                         >
// //                           <Ionicons
// //                             name={t.amount >= 0 ? "arrow-down" : "arrow-up"}
// //                             size={24}
// //                             color={t.amount >= 0 ? "#2ECC71" : "#E74C3C"}
// //                           />
// //                         </View>

// //                         <View className="flex-1">
// //                           <Text className="text-[#4A3428] font-semibold text-base">
// //                             {t.title}
// //                           </Text>
// //                           <Text className="text-[#9A8478] text-xs">
// //                             {t.category}
// //                           </Text>
// //                         </View>
// //                       </View>

// //                       <View className="items-end flex-row">
// //                         <View className="mr-2">
// //                           <Text
// //                             className={`font-bold text-base ${
// //                               t.amount >= 0
// //                                 ? "text-[#2ECC71]"
// //                                 : "text-[#E74C3C]"
// //                             }`}
// //                           >
// //                             {t.amount >= 0 ? "+" : "-"}$
// //                             {Math.abs(Number(t.amount)).toFixed(2)}
// //                           </Text>
// //                           <Text className="text-[#9A8478] text-xs text-right">
// //                             {new Date(t.created_at).toLocaleDateString(
// //                               "en-US",
// //                               {
// //                                 month: "short",
// //                                 day: "numeric",
// //                                 year: "numeric",
// //                               }
// //                             )}
// //                           </Text>
// //                         </View>

// //                         <TouchableOpacity
// //                           className="p-2"
// //                           onPress={() => handleDelete(t)}
// //                         >
// //                           <Ionicons
// //                             name="trash-outline"
// //                             size={20}
// //                             color="#E74C3C"
// //                           />
// //                         </TouchableOpacity>
// //                       </View>
// //                     </View>
// //                   ))
// //                 )}
// //               </View>
// //             </>
// //           )}
// //         </View>
// //       </SignedIn>

// //       <SignedOut>
// //         <View className="flex-1 justify-center items-center p-6">
// //           <View className="bg-[#8B593E] w-24 h-24 rounded-full items-center justify-center mb-6">
// //             <Ionicons name="wallet" size={48} color="#FFF8F3" />
// //           </View>

// //           <Text className="text-[#4A3428] text-3xl font-bold mb-2">
// //             Finance Tracker
// //           </Text>
// //           <Text className="text-[#9A8478] text-center mb-8">
// //             Track your income and expenses easily
// //           </Text>

// //           <Link href="/(auth)/sign-in" asChild>
// //             <TouchableOpacity className="bg-[#8B593E] px-8 py-4 rounded-2xl mb-3 w-full">
// //               <Text className="text-white text-center font-bold text-lg">
// //                 Sign in
// //               </Text>
// //             </TouchableOpacity>
// //           </Link>

// //           <Link href="/(auth)/sign-up" asChild>
// //             <TouchableOpacity className="bg-[#E5D3B7] px-8 py-4 rounded-2xl w-full">
// //               <Text className="text-[#4A3428] text-center font-bold text-lg">
// //                 Sign up
// //               </Text>
// //             </TouchableOpacity>
// //           </Link>
// //         </View>
// //       </SignedOut>
// //     </ScrollView>
// //   );
// // }


// import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
// import { Link, useRouter } from "expo-router";
// import {
//   Text,
//   View,
//   ActivityIndicator,
//   ScrollView,
//   TouchableOpacity,
//   RefreshControl,
//   Alert,
// } from "react-native";
// import { SignOutButton } from "@/components/SignOutButton";
// import { useTransaction } from "../../hooks/useTransaction";
// import { useEffect, useState } from "react";
// import { Ionicons } from "@expo/vector-icons";

// export default function Page() {
//   const { user, isLoaded } = useUser();
//   const router = useRouter();

//   const { transactions, summary, isLoading, loadData, deleteTransaction } =
//     useTransaction({
//       userId: user?.id,
//     });

//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     if (isLoaded && user?.id) {
//       loadData();
//     }
//   }, [isLoaded, user?.id, loadData]);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await loadData();
//     setRefreshing(false);
//   };

//   const handleDelete = async (transaction) => {
//     if (!transaction?.id) {
//       alert("Cannot delete: Transaction ID not found");
//       return;
//     }

//     // Use window.confirm for web, Alert.alert for mobile
//     if (typeof window !== "undefined" && window.confirm) {
//       // Web browser
//       const confirmed = window.confirm(
//         `Are you sure you want to delete "${transaction.title}"?`
//       );
//       if (confirmed) {
//         console.log("Calling deleteTransaction with ID:", transaction.id);
//         await deleteTransaction(transaction.id);
//       }
//     } else {
//       // Mobile (React Native)
//       Alert.alert(
//         "Delete Transaction",
//         `Are you sure you want to delete "${transaction.title}"?`,
//         [
//           { text: "Cancel", style: "cancel" },
//           {
//             text: "Delete",
//             style: "destructive",
//             onPress: async () => {
//               console.log("Calling deleteTransaction with ID:", transaction.id);
//               await deleteTransaction(transaction.id);
//             },
//           },
//         ]
//       );
//     }
//   };

//   if (!isLoaded) {
//     return (
//       <View className="flex-1 justify-center items-center bg-[#FFF8F3]">
//         <ActivityIndicator size="large" color="#8B593E" />
//         <Text className="text-[#9A8478] mt-2">Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       className="flex-1 bg-[#FFF8F3]"
//       refreshControl={
//         <RefreshControl
//           refreshing={refreshing}
//           onRefresh={onRefresh}
//           colors={["#8B593E"]}
//           tintColor="#8B593E"
//           title="Pull to refresh"
//           titleColor="#9A8478"
//         />
//       }
//     >
//       <SignedIn>
//         <View className="p-6">
//           {/* Header Section */}
//           <View className="flex-row justify-between items-center mb-6">
//             <View className="flex-row items-center">
//               <View className="bg-[#8B593E] w-12 h-12 rounded-full items-center justify-center mr-3">
//                 <Ionicons name="wallet" size={24} color="#FFF8F3" />
//               </View>
//               <View>
//                 <Text className="text-[#9A8478] text-xs">Welcome</Text>
//                 <Text className="text-[#4A3428] font-bold text-base">
//                   {user?.emailAddresses[0].emailAddress.split("@")[0]}
//                 </Text>
//               </View>
//             </View>
//             <SignOutButton />
//           </View>

//           {isLoading ? (
//             <View className="items-center py-10">
//               <ActivityIndicator size="large" color="#8B593E" />
//             </View>
//           ) : (
//             <>
//               {/* Balance Card */}
//               <View className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
//                 <Text className="text-[#9A8478] text-sm mb-2">
//                   Total Balance
//                 </Text>
//                 <Text className="text-[#4A3428] text-5xl font-bold mb-6">
//                   ${Number(summary.balance || 0).toFixed(2)}
//                 </Text>

//                 <View className="flex-row justify-between">
//                   <View className="flex-1">
//                     <Text className="text-[#9A8478] text-xs mb-1">Income</Text>
//                     <Text className="text-[#2ECC71] text-xl font-bold">
//                       +${Number(summary.income || 0).toFixed(2)}
//                     </Text>
//                   </View>

//                   <View className="flex-1 items-end">
//                     <Text className="text-[#9A8478] text-xs mb-1">
//                       Expenses
//                     </Text>
//                     <Text className="text-[#E74C3C] text-xl font-bold">
//                       -${Math.abs(Number(summary.expences || 0)).toFixed(2)}
//                     </Text>
//                   </View>
//                 </View>
//               </View>

//               {/* Recent Transactions Section */}
//               <View>
//                 <View className="flex-row justify-between items-center mb-4">
//                   <Text className="text-[#4A3428] text-lg font-bold">
//                     Recent Transactions
//                   </Text>
//                   <TouchableOpacity
//                     onPress={onRefresh}
//                     className="p-2"
//                     disabled={refreshing}
//                   >
//                     <Ionicons
//                       name="refresh"
//                       size={24}
//                       color={refreshing ? "#E5D3B7" : "#8B593E"}
//                     />
//                   </TouchableOpacity>
//                 </View>

//                 {!Array.isArray(transactions) ? (
//                   <View className="bg-white rounded-2xl p-4">
//                     <Text className="text-[#E74C3C] text-center">
//                       Error loading transactions
//                     </Text>
//                   </View>
//                 ) : transactions.length === 0 ? (
//                   <View className="bg-white rounded-2xl p-6">
//                     <Text className="text-[#9A8478] text-center">
//                       No transactions yet
//                     </Text>
//                   </View>
//                 ) : (
//                   transactions.map((t, index) => (
//                     <View
//                       key={t.id || index}
//                       className="bg-white rounded-2xl p-4 mb-3 flex-row items-center justify-between"
//                     >
//                       <View className="flex-row items-center flex-1">
//                         <View
//                           className={`w-12 h-12 rounded-full items-center justify-center mr-3 ${
//                             t.amount >= 0 ? "bg-[#D4EDDA]" : "bg-[#F8D7DA]"
//                           }`}
//                         >
//                           <Ionicons
//                             name={t.amount >= 0 ? "arrow-down" : "arrow-up"}
//                             size={24}
//                             color={t.amount >= 0 ? "#2ECC71" : "#E74C3C"}
//                           />
//                         </View>

//                         <View className="flex-1">
//                           <Text className="text-[#4A3428] font-semibold text-base">
//                             {t.title}
//                           </Text>
//                           <Text className="text-[#9A8478] text-xs">
//                             {t.category}
//                           </Text>
//                         </View>
//                       </View>

//                       <View className="items-end flex-row">
//                         <View className="mr-2">
//                           <Text
//                             className={`font-bold text-base ${
//                               t.amount >= 0
//                                 ? "text-[#2ECC71]"
//                                 : "text-[#E74C3C]"
//                             }`}
//                           >
//                             {t.amount >= 0 ? "+" : "-"}$
//                             {Math.abs(Number(t.amount)).toFixed(2)}
//                           </Text>
//                           <Text className="text-[#9A8478] text-xs text-right">
//                             {new Date(t.created_at).toLocaleDateString(
//                               "en-US",
//                               {
//                                 month: "short",
//                                 day: "numeric",
//                                 year: "numeric",
//                               }
//                             )}
//                           </Text>
//                         </View>

//                         <TouchableOpacity
//                           className="p-2"
//                           onPress={() => handleDelete(t)}
//                         >
//                           <Ionicons
//                             name="trash-outline"
//                             size={20}
//                             color="#E74C3C"
//                           />
//                         </TouchableOpacity>
//                       </View>
//                     </View>
//                   ))
//                 )}
//               </View>
//             </>
//           )}
//         </View>
//       </SignedIn>

//       <SignedOut>
//         <View className="flex-1 justify-center items-center p-6">
//           <View className="bg-[#8B593E] w-24 h-24 rounded-full items-center justify-center mb-6">
//             <Ionicons name="wallet" size={48} color="#FFF8F3" />
//           </View>

//           <Text className="text-[#4A3428] text-3xl font-bold mb-2">
//             Finance Tracker
//           </Text>
//           <Text className="text-[#9A8478] text-center mb-8">
//             Track your income and expenses easily
//           </Text>

//           <Link href="/(auth)/sign-in" asChild>
//             <TouchableOpacity className="bg-[#8B593E] px-8 py-4 rounded-2xl mb-3 w-full">
//               <Text className="text-white text-center font-bold text-lg">
//                 Sign in
//               </Text>
//             </TouchableOpacity>
//           </Link>

//           <Link href="/(auth)/sign-up" asChild>
//             <TouchableOpacity className="bg-[#E5D3B7] px-8 py-4 rounded-2xl w-full">
//               <Text className="text-[#4A3428] text-center font-bold text-lg">
//                 Sign up
//               </Text>
//             </TouchableOpacity>
//           </Link>
//         </View>
//       </SignedOut>
//     </ScrollView>
//   );
// }

import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";
import { SignOutButton } from "@/components/SignOutButton";
import { useTransaction } from "../../hooks/useTransaction";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Page() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const { transactions, summary, isLoading, loadData, deleteTransaction } =
    useTransaction({
      userId: user?.id,
    });

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (isLoaded && user?.id) {
      loadData();
    }
  }, [isLoaded, user?.id, loadData]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleDelete = async (transaction) => {
    if (!transaction?.id) {
      alert("Cannot delete: Transaction ID not found");
      return;
    }

    // Use window.confirm for web, Alert.alert for mobile
    if (typeof window !== "undefined" && window.confirm) {
      const confirmed = window.confirm(
        `Are you sure you want to delete "${transaction.title}"?`
      );
      if (confirmed) {
        console.log("Calling deleteTransaction with ID:", transaction.id);
        await deleteTransaction(transaction.id);
      }
    } else {
      Alert.alert(
        "Delete Transaction",
        `Are you sure you want to delete "${transaction.title}"?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              console.log("Calling deleteTransaction with ID:", transaction.id);
              await deleteTransaction(transaction.id);
            },
          },
        ]
      );
    }
  };

  if (!isLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-[#FFF8F3]">
        <ActivityIndicator size="large" color="#8B593E" />
        <Text className="text-[#9A8478] mt-2">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-[#FFF8F3]"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#8B593E"]}
          tintColor="#8B593E"
          title="Pull to refresh"
          titleColor="#9A8478"
        />
      }
    >
      {/* Content for Signed-in User */}
      <SignedIn>
        <View className="p-6">
          {/* Header Section */}
          <View className="flex-row justify-between items-center mb-6">
            <View className="flex-row items-center">
              <View className="bg-[#8B593E] w-12 h-12 rounded-full items-center justify-center mr-3">
                <Ionicons name="wallet" size={24} color="#FFF8F3" />
              </View>
              <View>
                <Text className="text-[#9A8478] text-xs">Welcome Back</Text>
                <Text className="text-[#4A3428] font-bold text-base">
                  {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
                </Text>
              </View>
            </View>
            <SignOutButton />
          </View>

          {isLoading ? (
            <View className="items-center py-10">
              <ActivityIndicator size="large" color="#8B593E" />
            </View>
          ) : (
            <>
              {/* Balance Card */}
              <View className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
                <Text className="text-[#9A8478] text-sm mb-2">
                  Total Balance
                </Text>
                <Text className="text-[#4A3428] text-5xl font-bold mb-6">
                  ${Number(summary.balance || 0).toFixed(2)}
                </Text>

                <View className="flex-row justify-between">
                  <View className="flex-1">
                    <Text className="text-[#9A8478] text-xs mb-1">Income</Text>
                    <Text className="text-[#2ECC71] text-xl font-bold">
                      +${Number(summary.income || 0).toFixed(2)}
                    </Text>
                  </View>

                  <View className="flex-1 items-end">
                    <Text className="text-[#9A8478] text-xs mb-1">
                      Expenses
                    </Text>
                    <Text className="text-[#E74C3C] text-xl font-bold">
                      -${Math.abs(Number(summary.expences || 0)).toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Recent Transactions Section */}
              {/* Customized Display */}
              <View>
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-[#4A3428] text-lg font-bold">
                    Your Wallet Transactions
                  </Text>
                  <TouchableOpacity
                    onPress={onRefresh}
                    className="p-2"
                    disabled={refreshing}
                  >
                    <Ionicons
                      name="refresh"
                      size={24}
                      color={refreshing ? "#E5D3B7" : "#8B593E"}
                    />
                  </TouchableOpacity>
                </View>
                {transactions?.map((t, index) => (
                  <View
                    key={t.id || index}
                    className="bg-white rounded-2xl p-4 mb-3 flex-row items-center justify-between"
                  >
                    <Text>Welcome Index</Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </View>
      </SignedIn>

      {/* Sign-in Options */}
      <SignedOut>
        <View className="flex-1 justify-center items-center p-6">
          <View className="bg-[#8B593E] w-24 h-24 rounded-full items-center justify-center mb-6">
            <Ionicons name="wallet" size={48} color="#FFF8F3" />
          </View>

          <Text className="text-[#4A3428] text-3xl font-bold mb-2">
            Finance Tracker
          </Text>
          <Text className="text-[#9A8478] text-center mb-8">
            Sign in to track and review your transactions easily
          </Text>

          <Link href="/(auth)/sign-in" asChild>
            <TouchableOpacity className="bg-[#8B593E] px-8 py-4 rounded-2xl mb-3 w-full">
              <Text className="text-white text-center font-bold text-lg">
                Sign in
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/(auth)/sign-up" asChild>
            <TouchableOpacity className="bg-[#E5D3B7] px-8 py-4 rounded-2xl w-full">
              <Text className="text-[#4A3428] text-center font-bold text-lg">
                Sign up
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </SignedOut>
    </ScrollView>
  );
}