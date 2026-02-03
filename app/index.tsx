// HomeScreenPage.tsx
import { ScrollView, StyleSheet, View } from "react-native";
import HomeHeader from "@/components/LandingPage/HomeHeader";
import HeroSection from "@/components/LandingPage/hero-section";
import Animated, { useSharedValue, useAnimatedScrollHandler } from "react-native-reanimated";
import FoodCarousel from "@/components/LandingPage/food-caurosel";
import AboutSection from "@/components/LandingPage/about-section";

export default function HomeScreenPage() {
    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    return (
        <View style={styles.container}>
            <HomeHeader />
            <Animated.ScrollView
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 0 }}
            >
                <HeroSection scrollY={scrollY} />
                <FoodCarousel />

                <AboutSection />
            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
});
