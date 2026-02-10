import { StyleSheet } from "react-native";
import HomeHeader from "@/components/LandingPage/HomeHeader";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import HeroScreen from "@/components/LandingPage/hero-screen";
import FoodCarousel from "@/components/LandingPage/food-caurosel";
import AboutSection from "@/components/LandingPage/about-section";
import CTASection from "@/components/LandingPage/cta-section";
import Footer from "@/components/LandingPage/footer";
import { ThemedView } from "@/components/themed-view";

export default function HomeScreenPage() {
    return (
        <ThemedView safe style={styles.container}>
            <HomeHeader />

            <ParallaxScrollView
                headerBackgroundColor={{ light: "#000", dark: "#000" }}
                headerImage={<HeroScreen />}
            >
                <FoodCarousel />
                <AboutSection />
                <CTASection />
                <Footer />
            </ParallaxScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
});
