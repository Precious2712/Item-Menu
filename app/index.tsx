import { StyleSheet, ScrollView, Pressable, Text } from "react-native";
import { useEffect, useState } from "react";
import HomeHeader from "@/components/LandingPage/HomeHeader";
import HeroScreen from "@/components/LandingPage/hero-screen";
import FoodCarousel from "@/components/LandingPage/food-caurosel";
import AboutSection from "@/components/LandingPage/about-section";
import CTASection from "@/components/LandingPage/cta-section";
import Footer from "@/components/LandingPage/footer";
import { ThemedView } from "@/components/themed-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreenPage() {
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchEmail = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem("email");
                if (storedEmail) {
                    setEmail(storedEmail);
                }
            } catch (error) {
                console.log("Error fetching email:", error);
            }
        };

        fetchEmail();
    }, []);

    return (
        <ThemedView safe style={styles.container}>
            <HomeHeader />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <HeroScreen />
                <FoodCarousel />
                <AboutSection />
                <CTASection />
                <Footer />
            </ScrollView>

            <Pressable style={styles.email}>
                <Text>{email || "No email found"}</Text>
            </Pressable>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    scrollContent: {
        paddingBottom: 20,
    },
    email: {
        position: 'absolute',
        bottom: 10,
        left: 20,
        backgroundColor: "#eee",
        padding: 10,
        borderRadius: 5,
    },
});
