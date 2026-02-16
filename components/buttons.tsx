import { Pressable, StyleSheet, Text } from "react-native";
type Props = {
  label: string;
};

export default function Button({ label }: Props) {
  return (
    <Pressable
      style={styles.button}
      onPress={() => {
        alert("Button Pressed");
      }}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#1e9540ff",
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4cd4f9ff",
    width: 260,
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonlabel: {
    color: "#1e9540ff",
    fontSize: 18,
    textAlign: "center",
  },
});
