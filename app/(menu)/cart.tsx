import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    FlatList,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
} from "react-native";

import { CartItemCard } from "@/components/LandingPage/cart-item-card";
import { useProduct } from "@/context/useContext";
import { Link } from "expo-router";


export default function CartScreenPage() {
    const { updateQuantity, isloading, setRefreshing, refreshing, cart, fetchCart, handleDeleteItem } = useProduct();

    const handleRefresh = () => {
        setRefreshing(true);
        fetchCart();
    };

    if (isloading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#FF6B6B" />
                <Text style={styles.loadingText}>Loading your cart...</Text>
            </View>
        );
    }

    if (!cart || (cart.item.length === 0 && cart.itemOne.length === 0)) {
        return (
            <View style={styles.center}>
                <View style={styles.emptyCartIcon}>
                    <Text style={styles.emptyCartEmoji}>🛒</Text>
                </View>
                <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
                <Text style={styles.emptyCartSubtitle}>Looks like you haven't added anything yet</Text>
            </View>
        );
    }


    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
        >
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Cart</Text>
                <Text style={styles.headerSubtitle}>{cart.item.length + cart.itemOne.length} items</Text>
            </View>

            <View style={styles.locationCard}>
                <View style={styles.locationIconContainer}>
                    <Text style={styles.locationIcon}>📍</Text>
                </View>
                <View style={styles.locationContent}>
                    <Text style={styles.locationLabel}>Pickup Location</Text>
                    <Text style={styles.locationText}>{cart.pickUpLocation}</Text>
                </View>
            </View>

            {cart.item.length > 0 && (
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Food Items</Text>
                        <Text style={styles.sectionCount}>{cart.item.length} items</Text>
                    </View>
                    <FlatList
                        data={cart.item}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <CartItemCard item={item} onUpdate={updateQuantity} onDelete={handleDeleteItem} />
                        )}
                        scrollEnabled={false}
                    />
                </View>
            )}

            {cart.itemOne.length > 0 && (
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Other Items</Text>
                        <Text style={styles.sectionCount}>{cart.itemOne.length} items</Text>
                    </View>
                    <FlatList
                        data={cart.itemOne}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <CartItemCard item={item} onUpdate={updateQuantity} onDelete={handleDeleteItem} />
                        )}
                        scrollEnabled={false}
                    />
                </View>
            )}

            <View style={styles.totalBox}>
                <View style={styles.totalContent}>
                    <Text style={styles.totalLabel}>Cart Total</Text>
                    <Text style={styles.totalText}>
                        ₦{Number(cart?.cartTotal || 0).toLocaleString()}
                    </Text>

                </View>
                <TouchableOpacity style={styles.checkoutButton}>
                    <Link href='/check-out' style={styles.checkoutButtonText}>Proceed to Checkout</Link>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#FFFFFF',
        padding: 20,
    },

    loadingText: {
        marginTop: 12,
        fontSize: 10,
        color: '#666',
        fontWeight: '500',
    },

    emptyCartIcon: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },

    emptyCartEmoji: {
        fontSize: 60,
    },

    emptyCartTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },

    emptyCartSubtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },

    header: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },

    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },

    headerSubtitle: {
        fontSize: 14,
        color: '#666',
    },

    locationCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginTop: 20,
        padding: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },

    locationIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },

    locationIcon: {
        fontSize: 24,
    },

    locationContent: {
        flex: 1,
        justifyContent: 'center',
    },

    locationLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },

    locationText: {
        fontSize: 12,
        color: '#333',
        fontWeight: '500',
    },

    section: {
        marginTop: 24,
        paddingHorizontal: 20,
    },

    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },

    sectionCount: {
        fontSize: 14,
        color: '#666',
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },

    card: {
        flexDirection: "row",
        marginBottom: 12,
        padding: 12,
        borderRadius: 16,
        backgroundColor: "#FFFFFF",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },

    image: {
        width: 80,
        height: 80,
        borderRadius: 12,
        marginRight: 12,
    },

    cardContent: {
        flex: 1,
        justifyContent: "space-between",
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },

    itemPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },

    totalPriceBadge: {
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },

    totalPriceText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },

    qtyContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    btn: {
        backgroundColor: "#FF6B6B",
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },

    btnDisabled: {
        backgroundColor: "#E0E0E0",
    },

    btnText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "600",
        lineHeight: 24,
    },

    qtyWrapper: {
        minWidth: 40,
        alignItems: 'center',
    },

    qty: {
        fontSize: 16,
        fontWeight: "600",
        color: '#333',
    },

    totalBox: {
        margin: 20,
        padding: 20,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },

    totalContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },

    totalLabel: {
        fontSize: 16,
        color: '#666',
    },

    totalText: {
        fontSize: 24,
        fontWeight: "bold",
        color: '#333',
    },

    checkoutButton: {
        backgroundColor: '#FF6B6B',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },

    checkoutButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});