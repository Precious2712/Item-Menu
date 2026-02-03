// HomeScreenPage.tsx
import { ScrollView, StyleSheet, View } from "react-native";
import HomeHeader from "@/components/LandingPage/HomeHeader";
import HeroSection from "@/components/LandingPage/hero-section";
import Animated, { useSharedValue, useAnimatedScrollHandler } from "react-native-reanimated";
import FoodCarousel from "@/components/LandingPage/food-caurosel";
import AboutSection from "@/components/LandingPage/about-section";
import { ThemedView } from "@/components/themed-view";
import CTASection from "@/components/LandingPage/cta-section";
import Footer from "@/components/LandingPage/footer";

export default function HomeScreenPage() {
    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });


    return (
        <ThemedView safe style={styles.container}>
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

                <CTASection />

                <Footer />
            </Animated.ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
});
