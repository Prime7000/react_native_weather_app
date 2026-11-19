import axios from "axios";
import { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

async function set_city(city: String) {
  try {
    const response = await axios.post("http://10.0.2.2:8000/city", {
      city: city,
    });

    console.log(response.data);
  } catch (error) {
    console.error(error);
    Alert.alert("could not submit, probably the network");
  }
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [cityName, setCity] = useState("Lagos");

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ color: "#52627A", fontWeight: "bold" }}>Weather</Text>
          <Pressable onPress={() => setIsOpen(true)} accessibilityRole="button">
            <Text
              style={{ color: "#14213D", fontSize: 30, fontWeight: "bold" }}
            >
              {cityName}
            </Text>
          </Pressable>
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
      // modal
      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.card}>
            <View style={styles.formSection1}>
              <TextInput
                accessibilityLabel="Type city name"
                value={cityName}
                onChangeText={setCity}
                placeholder="Type city name"
                style={{ borderWidth: 1, padding: 12, width: 250 }}
              />
            </View>
            <View style={styles.formSection2}>
              <Pressable
                style={styles.button}
                onPress={() => {
                  set_city(cityName);
                }}
                accessibilityRole="button"
              >
                <Text style={styles.button}>Submit</Text>
              </Pressable>

              <Pressable
                style={styles.button}
                onPress={() => setIsOpen(false)}
                accessibilityRole="button"
              >
                <Text style={styles.button}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: "24",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  card: {
    backgroundColor: "#EFF6FF",
    height: 300,
    width: 300,
    borderRadius: 12,
  },

  formSection1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "70",
  },
  formSection2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 30,
  },
  button: {
    // flex: 1,
    backgroundColor: "#2563EB",
    color: "white",
    padding: 7,
    borderRadius: 10,
  },
});
