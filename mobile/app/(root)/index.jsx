// mobile/app/(root)/index.jsx
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View, ActivityIndicator } from "react-native";
import { SignOutButton } from "@/components/SignOutButton";
import { useTransaction } from "../../hooks/useTransaction";
import { useEffect } from "react";

export default function Page() {
  const { user, isLoaded } = useUser();

  const { transactions, summary, isLoading, loadData } = useTransaction({
    userId: user?.id,
  });

  useEffect(() => {
    if (isLoaded && user?.id) {
      loadData();
    }
  }, [isLoaded, user?.id, loadData]);

  if (!isLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" color="#8B593E" />
        <Text className="text-textLight mt-2">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-background">
      <SignedIn>
        <Text className="text-2xl font-bold text-text mb-2">
          Hello {user?.emailAddresses[0].emailAddress}
        </Text>

        <Text className="text-sm text-textLight mb-4">
          User ID: {user?.id || "No ID"}
        </Text>

        {isLoading ? (
          <ActivityIndicator size="large" color="#8B593E" />
        ) : (
          <View>
            <Text className="text-lg font-semibold text-text mb-2">
              Summary:
            </Text>
            <Text className="text-text">
              Balance: ${Number(summary.balance || 0).toFixed(2)}
            </Text>
            <Text className="text-income">
              Income: ${Number(summary.income || 0).toFixed(2)}
            </Text>
            <Text className="text-expense">
              Expenses: ${Math.abs(Number(summary.expences || 0)).toFixed(2)}
            </Text>

            <Text className="text-lg font-semibold text-text mt-4 mb-2">
              Transactions (
              {Array.isArray(transactions) ? transactions.length : 0}):
            </Text>
            {!Array.isArray(transactions) ? (
              <Text className="text-red-600">Error loading transactions</Text>
            ) : transactions.length === 0 ? (
              <Text className="text-textLight">No transactions yet</Text>
            ) : (
              transactions.map((t, index) => (
                <View
                  key={t.id || index}
                  className="bg-card p-3 rounded-lg mb-2 border border-border"
                >
                  <Text className="text-text font-semibold">{t.title}</Text>
                  <Text
                    className={t.amount >= 0 ? "text-income" : "text-expense"}
                  >
                    ${Number(t.amount).toFixed(2)}
                  </Text>
                  <Text className="text-textLight text-xs">{t.category}</Text>
                </View>
              ))
            )}
          </View>
        )}

        <View className="mt-4">
          <SignOutButton />
        </View>
      </SignedIn>

      <SignedOut>
        <View className="flex-1 justify-center items-center">
          <Link href="/(auth)/sign-in">
            <Text className="text-primary text-lg">Sign in</Text>
          </Link>
          <Link href="/(auth)/sign-up" className="mt-4">
            <Text className="text-primary text-lg">Sign up</Text>
          </Link>
        </View>
      </SignedOut>
    </View>
  );
}
