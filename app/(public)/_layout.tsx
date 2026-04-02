import { useAuth } from "@/features/shared/hooks/useAuth";
import { Redirect, Slot } from "expo-router";
import { Text, View } from "react-native";

export default function PublicLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/calendar" />;
  }

  return <Slot />;
}
