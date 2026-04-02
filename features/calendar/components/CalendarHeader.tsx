import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  onAddPress: () => void;
};

export default function CalendarHeader({ onAddPress }: Props) {
  return (
    <View>
      <Text style={styles.header}>Calendar</Text>

      <Pressable style={styles.addBtn} onPress={onAddPress}>
        <Text style={styles.addBtnText}>Add Todo</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 12,
  },
  addBtn: {
    alignSelf: "center",
    backgroundColor: "#1677ff",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
    marginBottom: 12,
  },
  addBtnText: {
    color: "white",
    fontWeight: "800",
    fontSize: 16,
  },
});
