import React from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { MotiView } from "moti";
import { Link } from "expo-router";

export default function HeroScreen() {
    return (
        <ImageBackground
            source={{
                uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/images/hero-food-DoURHJtmysXKiMVXJ3vSAPQVTOEcrj.jpg",
            }}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay} />

            <View style={styles.content}>
                <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ delay: 200 }}>
                    <Text style={styles.subtitle}>Established 1987</Text>
                </MotiView>

                <MotiView from={{ opacity: 0, translateY: 30 }} animate={{ opacity: 1, translateY: 0 }} transition={{ delay: 400 }}>
                    <Text style={styles.title}>Maison Élégance</Text>
                </MotiView>

                <MotiView from={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 600 }} style={styles.divider} />

                <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ delay: 800 }}>
                    <Text style={styles.description}>
                        Where culinary artistry meets timeless tradition. Experience the finest ingredients transformed into unforgettable moments.
                    </Text>
                </MotiView>

                <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1000 }} style={styles.buttons}>
                    <TouchableOpacity style={styles.primaryButton}>
                        <Link href="/create" style={styles.primaryText}>Create Account</Link>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.secondaryButton}>
                        <Link href="/login" style={styles.secondaryText}>Login</Link>
                    </TouchableOpacity>
                </MotiView>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.6)",
    },
    content: {
        alignItems: "center",
        paddingHorizontal: 20,
    },
    subtitle: {
        color: "#FFD700",
        fontSize: 14,
        letterSpacing: 2,
        marginBottom: 8,
    },
    title: {
        color: "#FFF",
        fontSize: 46,
        fontWeight: "300",
        textAlign: "center",
    },
    divider: {
        width: 96,
        height: 2,
        backgroundColor: "#FFD700",
        marginVertical: 20,
    },
    description: {
        color: "#CCC",
        fontSize: 16,
        textAlign: "center",
        maxWidth: 320,
        lineHeight: 22,
    },
    buttons: {
        flexDirection: "row",
        marginTop: 24,
        gap: 16,
    },
    primaryButton: {
        backgroundColor: "#FFD700",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
    },
    primaryText: {
        color: "#000",
        fontWeight: "bold",
    },
    secondaryButton: {
        borderWidth: 1,
        borderColor: "#FFF",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
    },
    secondaryText: {
        color: "#FFF",
        fontWeight: "bold",
    },
});
