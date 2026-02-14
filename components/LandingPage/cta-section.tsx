import { View, Text, StyleSheet, Pressable } from "react-native"
import { MotiView } from "moti"
import { Link } from "expo-router"

export default function CTASection() {
    return (
        <View style={styles.section}>
            <View style={styles.container}>
                <MotiView
                    from={{ opacity: 0, translateY: 30 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: "timing", duration: 800 }}
                    style={styles.content}
                >
                    <Text style={styles.joinText}>JOIN US</Text>

                    <View style={styles.headingGroup}>
                        <Text style={styles.heading}>Begin Your</Text>
                        <Text style={styles.heading}>Culinary Journey</Text>
                        <View style={styles.divider} />
                    </View>

                    <Text style={styles.description}>
                        Reserve your table and experience the artistry of fine dining at
                        Maison Élégance. Every meal is a masterpiece waiting to be savored.
                    </Text>

                    <MotiView
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: "timing", duration: 600, delay: 200 }}
                        style={styles.buttonGroup}
                    >
                        <Pressable style={[styles.button, styles.primaryBtn]}>
                            <Link href='/cart' style={styles.primaryText}>VIEW CART</Link>
                        </Pressable>

                        {/* <Pressable style={[styles.button, styles.outlineBtn]}>
                            <Text style={styles.outlineText}>CONTACT US</Text>
                        </Pressable> */}
                    </MotiView>
                </MotiView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: "center",
    },
    container: {
        maxWidth: 640,
        alignSelf: "center",
        alignItems: "center",
    },
    content: {
        alignItems: "center",
    },
    joinText: {
        color: "#C49A6C",
        fontSize: 12,
        letterSpacing: 4,
        marginBottom: 16,
        textAlign: "center",
    },
    headingGroup: {
        alignItems: "center",
        marginBottom: 32,
    },
    heading: {
        fontSize: 42,
        textAlign: "center",
        fontWeight: "300",
        lineHeight: 48,
    },
    divider: {
        width: 64,
        height: 1,
        backgroundColor: "#C49A6C",
        marginTop: 16,
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        lineHeight: 26,
        marginBottom: 48,
        color: "#6B7280",
        paddingHorizontal: 10,
    },
    buttonGroup: {
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
    },
    button: {
        paddingVertical: 16,
        paddingHorizontal: 40,
        alignItems: "center",
        minWidth: 220,
    },
    primaryBtn: {
        backgroundColor: "#C49A6C",
    },
    primaryText: {
        color: "#fff",
        letterSpacing: 3,
        fontSize: 12,
    },
    outlineBtn: {
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.3)",
    },
    outlineText: {
        letterSpacing: 3,
        fontSize: 12,
    },
})
