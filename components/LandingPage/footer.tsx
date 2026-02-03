import { View, Text, StyleSheet, Dimensions } from "react-native"
import { MotiView } from "moti"

const { width } = Dimensions.get("window")
const isLargeScreen = width >= 768

export default function Footer() {
    const columnWidth = isLargeScreen ? "50%" : "100%"

    return (
        <View style={styles.footer}>
            <View style={styles.container}>
               
                <View style={styles.grid}>
                    <MotiView
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        style={[
                            styles.column,
                            { width: isLargeScreen ? "100%" : "100%" },
                        ]}
                    >
                        <Text style={styles.brand}>Maison Élégance</Text>
                        <Text style={styles.brandText}>
                            A culinary journey through the finest traditions of French
                            gastronomy, reimagined for the modern palate.
                        </Text>
                    </MotiView>

                    
                    <MotiView
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ delay: 100 }}
                        style={[styles.column, { width: columnWidth }]}
                    >
                        <Text style={styles.title}>HOURS</Text>
                        <Text style={styles.text}>Tuesday - Thursday: 6pm - 10pm</Text>
                        <Text style={styles.text}>Friday - Saturday: 6pm - 11pm</Text>
                        <Text style={styles.text}>Sunday: 5pm - 9pm</Text>
                        <Text style={styles.text}>Monday: Closed</Text>
                    </MotiView>

                    
                    <MotiView
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ delay: 200 }}
                        style={[styles.column, { width: columnWidth }]}
                    >
                        <Text style={styles.title}>CONTACT</Text>
                        <Text style={styles.text}>123 Gourmet Avenue</Text>
                        <Text style={styles.text}>New York, NY 10001</Text>
                        <Text style={[styles.text, { marginTop: 8 }]}>
                            +1 (555) 123-4567
                        </Text>
                        <Text style={styles.text}>
                            reservations@maisonelegance.com
                        </Text>
                    </MotiView>
                </View>

                
                <View style={styles.bottom}>
                    <Text style={styles.copy}>
                        © 2026 Maison Élégance. All rights reserved.
                    </Text>

                    <View style={styles.socials}>
                        {["Instagram", "Facebook", "Twitter"].map((item) => (
                            <Text key={item} style={styles.social}>
                                {item}
                            </Text>
                        ))}
                    </View>
                </View>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    footer: {
        paddingVertical: 64,
        paddingHorizontal: 24,
        borderTopWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#FAFAFA",
        marginTop: 20
    },
    container: {
        maxWidth: 1280,
        alignSelf: "center",
        width: "100%",
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap", // 👈 enables grid behavior
        marginBottom: 64,
    },
    column: {
        paddingRight: 24,
        marginBottom: 32,
    },
    brand: {
        fontSize: 22,
        marginBottom: 16,
    },
    brandText: {
        color: "#6B7280",
        lineHeight: 24,
        maxWidth: 420,
    },
    title: {
        fontSize: 12,
        letterSpacing: 3,
        color: "#C49A6C",
        marginBottom: 24,
    },
    text: {
        fontSize: 13,
        color: "#6B7280",
        marginBottom: 8,
    },
    bottom: {
        borderTopWidth: 1,
        borderColor: "#E5E7EB",
        paddingTop: 24,
        flexDirection: isLargeScreen ? "row" : "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
    },
    copy: {
        fontSize: 12,
        color: "#6B7280",
    },
    socials: {
        flexDirection: "row",
        gap: 24,
    },
    social: {
        fontSize: 12,
        color: "#6B7280",
    },
})
