
import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    interpolate,
    Extrapolate,
} from "react-native-reanimated";

const { height } = Dimensions.get("window");

export default function AboutSection() {
    const scrollY = useSharedValue(0);

    const imageAnimatedStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollY.value,
            [0, height],
            [20, -20],
            Extrapolate.CLAMP
        );

        return {
            transform: [{ translateY }],
        };
    });

    return (
        <Animated.ScrollView
            onScroll={(e) => {
                scrollY.value = e.nativeEvent.contentOffset.y;
            }}
            scrollEventThrottle={16}
            contentContainerStyle={styles.container}
        >
            <View style={styles.content}>
                <Text style={styles.tag}>OUR PHILOSOPHY</Text>

                <Text style={styles.title}>
                    Allier tradition et innovation culinaire
                </Text>

                <View style={styles.divider} />

                <Text style={styles.paragraph}>
                    At Maison Élégance, we believe that dining is more than
                    sustenance—it is an art form, a celebration, a moment of pure pleasure.
                    Our culinary philosophy centers on respecting the integrity of each
                    ingredient while pushing the boundaries of flavor and presentation.
                </Text>

                <Text style={styles.paragraph}>
                    We source only the finest seasonal produce from local artisan farmers,
                    pristine seafood from sustainable fisheries, and premium meats from
                    heritage breeds. Every dish tells a story of craftsmanship and dedication.
                </Text>

                <View style={styles.statsRow}>
                    <Stat number="35+" label="Years of Excellence" />
                    <Stat number="3" label="Michelin Stars" />
                    <Stat number="150+" label="Signature Dishes" />
                </View>
            </View>

            <View style={styles.imageWrapper}>
                <Animated.View style={[styles.imageInner, imageAnimatedStyle]}>
                    <Image
                        source={{ uri: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/images/chef-6B9kM1BlE8RugU043sxSObSODwbzUF.jpg' }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </Animated.View>
            </View>

        </Animated.ScrollView>
    );
}

function Stat({ number, label }: { number: string; label: string }) {
    return (
        <View style={styles.stat}>
            <Text style={styles.statNumber}>{number}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingVertical: 25,
        paddingHorizontal: 20,
        backgroundColor: 'white'
    },

    imageWrapper: {
        height: 420,
        overflow: "hidden",
        borderRadius: 16,
        marginBottom: 48,
    },

    imageInner: {
        height: "120%",
        width: "100%",
    },

    image: {
        height: "100%",
        width: "100%",
    },

    content: {
        flexDirection: "column",
    },

    tag: {
        color: "#C6A15B",
        letterSpacing: 4,
        fontSize: 12,
        marginBottom: 12,
    },

    title: {
        fontSize: 32,
        fontWeight: "300",
        marginBottom: 24,
        color: 'black'
    },

    divider: {
        width: 60,
        height: 1,
        backgroundColor: "#C6A15B",
        marginBottom: 24,
    },

    paragraph: {
        fontSize: 16,
        lineHeight: 26,
        opacity: 0.75,
        marginBottom: 16,
    },

    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 32,
    },

    stat: {
        alignItems: "center",
    },

    statNumber: {
        fontSize: 28,
        color: "#C6A15B",
        marginBottom: 6,
    },

    statLabel: {
        fontSize: 12,
        opacity: 0.6,
        textAlign: "center",
    },
});
