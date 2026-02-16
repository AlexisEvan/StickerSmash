import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Oops! Page Not Found</Text>
      <Link href="/" style={styles.button}>
        Go to Home Screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5959afff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#1e9540ff",
    fontSize: 36,
  },
  button: {
    fontSize: 36,
    color: "#a22896ff",
    textDecorationLine: "underline",
  },
});
