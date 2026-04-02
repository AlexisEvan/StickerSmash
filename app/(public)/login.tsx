import Button from "@/components/ui/buttons";
import { useAuth } from "@/features/shared/hooks/useAuth";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
  const { login, isLoading } = useAuth();

  const handleLogin = async () => {
    await login();
    router.replace("/calendar");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-do app</Text>
      <Text style={styles.subtitle}>
        Welcome to the app. Login to access all pages.
      </Text>
      <Button
        label={isLoading ? "Loading..." : "Login"}
        onPress={handleLogin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
    textAlign: "center",
  },
});
