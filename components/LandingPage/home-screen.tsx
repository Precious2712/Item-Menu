import ParallaxScrollView from "../parallax-scroll-view";
import HeroScreen from "./hero-screen";
import { View, Text } from "react-native";

export default function HomeScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#000", dark: "#000" }}
            headerImage={<HeroScreen />}
        >
        </ParallaxScrollView>
    );
}
