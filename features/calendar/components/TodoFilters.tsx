import { Pressable, StyleSheet, Text, View } from "react-native";

export type TodoFilter = "all" | "active" | "completed";

type Props = {
  value: TodoFilter;
  allCount: number;
  activeCount: number;
  completedCount: number;
  onChange: (filter: TodoFilter) => void;
};

export default function TodoFilters({
  value,
  allCount,
  activeCount,
  completedCount,
  onChange,
}: Props) {
  return (
    <View style={styles.filtersRow}>
      <Pressable
        style={[styles.filterBtn, value === "all" && styles.filterBtnActive]}
        onPress={() => onChange("all")}
      >
        <Text
          style={[styles.filterText, value === "all" && styles.filterTextActive]}
        >
          All ({allCount})
        </Text>
      </Pressable>

      <Pressable
        style={[styles.filterBtn, value === "active" && styles.filterBtnActive]}
        onPress={() => onChange("active")}
      >
        <Text
          style={[
            styles.filterText,
            value === "active" && styles.filterTextActive,
          ]}
        >
          Active ({activeCount})
        </Text>
      </Pressable>

      <Pressable
        style={[
          styles.filterBtn,
          value === "completed" && styles.filterBtnActive,
        ]}
        onPress={() => onChange("completed")}
      >
        <Text
          style={[
            styles.filterText,
            value === "completed" && styles.filterTextActive,
          ]}
        >
          Completed ({completedCount})
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  filtersRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  filterBtn: {
    backgroundColor: "#e7e8ea",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  filterBtnActive: {
    backgroundColor: "#1677ff",
  },
  filterText: {
    color: "#2a2f36",
    fontWeight: "700",
    fontSize: 12,
  },
  filterTextActive: {
    color: "white",
  },
});
