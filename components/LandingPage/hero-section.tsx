import React from "react";
import { View, Text, ImageBackground, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Animated, { SharedValue, useAnimatedStyle, interpolate } from "react-native-reanimated";
import { MotiView } from "moti";
import { Link } from "expo-router";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const HERO_HEIGHT = SCREEN_HEIGHT * 0.8;

type HeroSectionProps = {
    scrollY?: SharedValue<number>;
};

export default function HeroSection({ scrollY }: HeroSectionProps) {

    const internalScrollY = scrollY ?? { value: 0 };

    const parallaxStyle = useAnimatedStyle(() => {
        const y = internalScrollY.value;
        return {
            transform: [
                { translateY: interpolate(y, [0, HERO_HEIGHT], [0, -HERO_HEIGHT / 3]) },
                { scale: interpolate(y, [0, HERO_HEIGHT], [1, 1.1]) },
            ],
        };
    });

    return (
        <Animated.View style={styles.heroWrapper}>
            <Animated.View style={[styles.parallaxContainer, parallaxStyle]}>
                <ImageBackground
                    source={{
                        uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/images/hero-food-DoURHJtmysXKiMVXJ3vSAPQVTOEcrj.jpg",
                    }}
                    style={styles.backgroundImage}
                >
                    <View style={styles.overlay} />
                </ImageBackground>
            </Animated.View>

            <View style={styles.content}>
                <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ duration: 800, delay: 200 }}>
                    <Text style={styles.subtitle}>Established 1987</Text>
                </MotiView>
                <MotiView from={{ opacity: 0, translateY: 30 }} animate={{ opacity: 1, translateY: 0 }} transition={{ duration: 800, delay: 400 }}>
                    <Text style={styles.title}>Maison Élégance</Text>
                </MotiView>
                <MotiView from={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 800, delay: 600 }} style={styles.divider} />
                <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ duration: 800, delay: 800 }}>
                    <Text style={styles.description}>
                        Where culinary artistry meets timeless tradition. Experience the finest ingredients transformed into unforgettable moments.
                    </Text>
                </MotiView>
                <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ duration: 800, delay: 1000 }} style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.primaryButton}>
                        <Link href='/create' style={styles.primaryButtonText}>Create Account</Link>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryButton}>
                        <Link href="/login" style={styles.secondaryButtonText}>
                            Login
                        </Link>
                    </TouchableOpacity>
                </MotiView>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    heroWrapper: {
        height: HERO_HEIGHT,
        width: "100%",
        overflow: "hidden",
    },
    parallaxContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    backgroundImage: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.6)",
    },
    content: {
        position: "absolute",
        height: HERO_HEIGHT,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    subtitle: { color: "#FFD700", fontSize: 14, letterSpacing: 2, marginBottom: 8 },
    title: { color: "#FFF", fontSize: 46, fontWeight: "300", textAlign: "center" },
    divider: { width: 96, height: 2, backgroundColor: "#FFD700", marginVertical: 20 },
    description: { color: "#CCC", fontSize: 16, textAlign: "center", maxWidth: 320, lineHeight: 22 },
    buttonsContainer: { flexDirection: "row", marginTop: 24, gap: 16 },
    primaryButton: { paddingVertical: 12, paddingHorizontal: 24, backgroundColor: "#FFD700", borderRadius: 4 },
    primaryButtonText: { color: "#000", fontWeight: "bold", letterSpacing: 1 },
    secondaryButton: { paddingVertical: 12, paddingHorizontal: 24, borderWidth: 1, borderColor: "#FFF", borderRadius: 4 },
    secondaryButtonText: { color: "#FFF", fontWeight: "bold", letterSpacing: 1 },
});
