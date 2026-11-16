import Body from "@/components/body";
import Header from "@/components/header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView style={{ padding: 10, flex: 1, backgroundColor: "#EFF6FF" }}>
      <Header />
      <Body />
    </SafeAreaView>
  );
}
