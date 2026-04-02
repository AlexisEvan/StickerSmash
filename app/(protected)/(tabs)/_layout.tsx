import { Tabs } from "expo-router";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ede200ff",
        headerStyle: { backgroundColor: "#4cd4f9ff" },
        headerTintColor: "#1e9540ff",
        tabBarStyle: { backgroundColor: "#f4f5f5ff" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
        }}
      />
      <Tabs.Screen
        name="not-found"
        options={{
          href: null,
          title: "Not Found",
        }}
      />
    </Tabs>
  );
}
