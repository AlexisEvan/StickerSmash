import { Pressable, StyleSheet, Text } from "react-native";
type Props = {
  label: string;
  onPress?: () => void;
};

export default function Button({ label, onPress }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#ffffffff",
    fontSize: 12,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#237ef4ff",
    width: 260,
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonlabel: {
    color: "#f5f5f5ff",
    fontSize: 20,
    textAlign: "center",
  },
});
