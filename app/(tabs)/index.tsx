import Button from "@/components/buttons";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.footerContainer}>
      <Text>Welcome to To-Do App</Text>
      <View style={styles.footerContainer}>
        <Button
          label="Go to the To-Do Page"
          onPress={() => router.push("/calendar")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    transform: [{ translateY: -26 }],
    alignItems: "center",
    gap: 12,
  },
});
