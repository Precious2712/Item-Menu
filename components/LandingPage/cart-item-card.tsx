import { CartItem } from "@/data/screen/user-cart-item";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native";

export const CartItemCard = ({
    item,
    onUpdate,
    onDelete,
}: {
    item: CartItem;
    onUpdate: (id: string, action: "plus" | "minus") => void;
    onDelete: (id: string) => void;
}) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: item.imagery }} style={styles.image} />

            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <Text style={styles.itemPrice}>₦{item.price}</Text>
                    <View style={styles.totalPriceBadge}>
                        <Text style={styles.totalPriceText}>Total: ₦{item.totalPrice}</Text>
                    </View>
                </View>

                <View style={styles.bottomRow}>
                    <View style={styles.qtyContainer}>
                        <TouchableOpacity
                            style={[styles.btn, item.quantity <= 1 && styles.btnDisabled]}
                            onPress={() => onUpdate(item._id, "minus")}
                            disabled={item.quantity <= 1}
                        >
                            <Text style={styles.btnText}>−</Text>
                        </TouchableOpacity>

                        <View style={styles.qtyWrapper}>
                            <Text style={styles.qty}>{item.quantity}</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => onUpdate(item._id, "plus")}
                        >
                            <Text style={styles.btnText}>+</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => onDelete(item._id)}
                    >
                        <Text style={styles.deleteBtnText}>🗑️</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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

    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    qtyContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
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

    deleteBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF0F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        borderWidth: 1,
        borderColor: '#FFCDD2',
    },

    deleteBtnText: {
        fontSize: 18,
    },
});