import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Linking,
} from "react-native";

import { ThemedView } from "@/components/themed-view";

export default function CheckoutScreen() {
    return (
        <ThemedView style={styles.container}>
            
            <View style={styles.content}>
               
                <View style={styles.iconContainer}>
                    <View style={styles.iconCircle}>
                        <Text style={styles.iconEmoji}>🚧</Text>
                    </View>
                    <View style={[styles.iconCircle, styles.iconCircle2]}>
                        <Text style={styles.iconEmoji}>⚙️</Text>
                    </View>
                    <View style={[styles.iconCircle, styles.iconCircle3]}>
                        <Text style={styles.iconEmoji}>🔧</Text>
                    </View>
                </View>

                
                <Text style={styles.title}>
                    Checkout{'\n'}Coming Soon!
                </Text>

                
                <Text style={styles.description}>
                    We're working hard to bring you a seamless checkout experience.
                    This feature will be available in the next update.
                </Text>

                
                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View style={styles.progressFill} />
                    </View>
                    <Text style={styles.progressText}>75% ready</Text>
                </View>

                
                <View style={styles.featuresContainer}>
                    <Text style={styles.featuresTitle}>What's coming:</Text>

                    <View style={styles.featureItem}>
                        <Text style={styles.featureIcon}>✅</Text>
                        <Text style={styles.featureText}>Multiple payment options</Text>
                    </View>

                    <View style={styles.featureItem}>
                        <Text style={styles.featureIcon}>✅</Text>
                        <Text style={styles.featureText}>Secure transactions</Text>
                    </View>

                    <View style={styles.featureItem}>
                        <Text style={styles.featureIcon}>🔄</Text>
                        <Text style={styles.featureText}>Order tracking</Text>
                    </View>

                    <View style={styles.featureItem}>
                        <Text style={styles.featureIcon}>⏳</Text>
                        <Text style={styles.featureText}>Delivery scheduling</Text>
                    </View>
                </View>
            </View>

            <View style={styles.decorativeCircle1} />
            <View style={styles.decorativeCircle2} />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },

    backButton: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },

    backButtonText: {
        fontSize: 16,
        color: '#FF6B6B',
        fontWeight: '600',
    },

    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingBottom: 40,
    },

    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },

    iconCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#FFE5E5',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: -5,
        shadowColor: '#FF6B6B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },

    iconCircle2: {
        backgroundColor: '#FFF0E5',
        transform: [{ scale: 1.1 }],
        zIndex: 2,
    },

    iconCircle3: {
        backgroundColor: '#E5F0FF',
    },

    iconEmoji: {
        fontSize: 32,
    },

    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 16,
        lineHeight: 44,
    },

    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 24,
        paddingHorizontal: 20,
    },

    progressContainer: {
        width: '100%',
        marginBottom: 30,
    },

    progressBar: {
        width: '100%',
        height: 8,
        backgroundColor: '#F0F0F0',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 8,
    },

    progressFill: {
        width: '75%',
        height: '100%',
        backgroundColor: '#FF6B6B',
        borderRadius: 4,
    },

    progressText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'right',
        fontWeight: '500',
    },

    featuresContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },

    featuresTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
    },

    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },

    featureIcon: {
        fontSize: 18,
        marginRight: 12,
        width: 24,
    },

    featureText: {
        fontSize: 15,
        color: '#555',
        flex: 1,
    },

    actionButtons: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },

    notifyButton: {
        backgroundColor: '#FF6B6B',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
        flex: 1,
        alignItems: 'center',
        shadowColor: '#FF6B6B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },

    notifyButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },

    contactButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
        flex: 1,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FF6B6B',
    },

    contactButtonText: {
        color: '#FF6B6B',
        fontSize: 16,
        fontWeight: '600',
    },

    noteText: {
        fontSize: 13,
        color: '#999',
        textAlign: 'center',
        marginTop: 10,
        paddingHorizontal: 20,
        lineHeight: 18,
    },

    decorativeCircle1: {
        position: 'absolute',
        top: -50,
        right: -50,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#FFE5E5',
        opacity: 0.3,
        zIndex: -1,
    },

    decorativeCircle2: {
        position: 'absolute',
        bottom: -50,
        left: -50,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#E5F0FF',
        opacity: 0.3,
        zIndex: -1,
    },
});