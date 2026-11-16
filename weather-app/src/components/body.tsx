import Fontisto from "@expo/vector-icons/Fontisto";
import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

async function weather() {
  const rain_icon = <Fontisto name="rain" size={100} color="#2563EB" />;
  const sunny = <Fontisto name="day-sunny" size={100} color="#2563EB" />;
  const cloudy = <Fontisto name="cloudy" size={100} color="#2563EB" />;

  const forecast = await axios.get("http://10.0.2.2:8000");
  const temp = forecast.data.temperature;
  const humid = forecast.data.humidity;
  const weather = forecast.data.weather;
  let icon;

  if (forecast.data.weather === "raining") {
    icon = rain_icon;
  } else if (forecast.data.weather === "sunny") {
    icon = sunny;
  } else {
    icon = cloudy;
  }

  return {
    icon,
    temp,
    humid,
    weather,
  };
}

export default function Body() {
  const [data, setData] = useState<Awaited<ReturnType<typeof weather>> | null>(
    null,
  );

  useEffect(() => {
    let active = true;

    async function updateWeather() {
      try {
        const result = await weather();

        if (active) {
          setData(result);
        }
      } catch (error) {
        console.error("Weather update failed", error);
      }
    }

    updateWeather();
    const interval = setInterval(updateWeather, 10000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  if (!data) {
    return <Text>Loading weather...</Text>;
  }

  return (
    <View style={style.main_card}>
      <View style={style.card1}>
        {data.icon}
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            includeFontPadding: false,
            color: "#14213D",
            // lineHeight: 28,
          }}
        >
          {data.weather}
        </Text>
        <Text
          style={{
            fontSize: 90,
            fontWeight: "bold",
            includeFontPadding: false,
            lineHeight: 85,
            color: "#14213D",
          }}
        >
          {data.temp}
        </Text>
        <Text
          style={{
            lineHeight: 10,
            fontSize: 15,
            fontWeight: "bold",
            color: "#52627A",
          }}
        >
          celsius
        </Text>
      </View>

      <View style={style.card2}>
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "#14213D" }}>
          Humidity
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "#2563EB" }}>
          {data.humid}
        </Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  main_card: {
    gap: 10,
    paddingTop: 20,
  },
  card1: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    padding: 20,
    gap: 1,
    borderRadius: 15,
  },
  card2: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 15,
  },
});
