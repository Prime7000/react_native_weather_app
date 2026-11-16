import { Text, View } from "react-native";

export default function Header() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <Text style={{ color: "#52627A", fontWeight: "bold" }}>Weather</Text>
        <Text style={{ color: "#14213D", fontSize: 30, fontWeight: "bold" }}>
          Lagos
        </Text>
      </View>

      <View>
        <Text
          style={{
            color: "#166534",
            backgroundColor: "#DCFCE7",
            paddingVertical: 3,
            paddingHorizontal: 10,
            fontWeight: "bold",
            borderRadius: 5,
          }}
        >
          Status:OK
        </Text>
      </View>
    </View>
  );
}
