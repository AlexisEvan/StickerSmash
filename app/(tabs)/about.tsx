import { StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About Screen</Text>
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
});
