import { StyleSheet, ScrollView } from "react-native";
import HomeHeader from "@/components/LandingPage/HomeHeader";
import HeroScreen from "@/components/LandingPage/hero-screen";
import FoodCarousel from "@/components/LandingPage/food-caurosel";
import AboutSection from "@/components/LandingPage/about-section";
import CTASection from "@/components/LandingPage/cta-section";
import Footer from "@/components/LandingPage/footer";
import { ThemedView } from "@/components/themed-view";

export default function HomeScreenPage() {
    return (
        <ThemedView safe style={styles.container}>
            {/* Header stays at the top */}
            <HomeHeader />

            {/* Scrollable content */}
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Hero section */}
                <HeroScreen />

                {/* Other sections */}
                <FoodCarousel />
                <AboutSection />
                <CTASection />
                <Footer />
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    scrollContent: {
        paddingBottom: 50, // optional spacing at the bottom
    },
});
