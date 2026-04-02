import Button from "@/components/ui/buttons";
import { useAuth } from "@/features/shared/hooks/useAuth";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-do app</Text>
      <Text style={styles.subtitle}>You are logged in.</Text>
      <View style={styles.actions}>
        <Button
          label="Go to the Calendar"
          onPress={() => router.push("/calendar")}
        />
        <Button label="Logout" onPress={handleLogout} />
      </View>
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
  actions: {
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
});
