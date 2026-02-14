import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Pressable,
    FlatList,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useProduct } from "@/context/useContext";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function ViewPage() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const {
        asian,
        food,
        snacks,
        handleOrderCartItem,
        pickUpLocation,
        cartLoading
    } = useProduct();

    const allItems = [...asian, ...food, ...snacks];
    const item = allItems.find((i) => i._id === id);

    const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
    const [location, setLocation] = useState("");

    if (!item) {
        return (
            <View style={styles.center}>
                <Text>Item not found</Text>
            </View>
        );
    }


    const toggleExtra = (extraId: string) => {
        setSelectedExtras((prev) =>
            prev.includes(extraId)
                ? prev.filter((id) => id !== extraId)
                : [...prev, extraId]
        );
    };


    const handleAddToCart = async () => {
        if (!location) {
            console.log("Select pickup location first");
            Toast.show({
                type: "error",
                text1: "Pick up location required"
            })
            return;
        }

        const selectedExtraObjects = item.subMenu.filter((sub) =>
            selectedExtras.includes(sub._id)
        );

        await handleOrderCartItem(item, selectedExtraObjects, location);
    };


    const handlePickLocation = async () => {
        const loc = await pickUpLocation();
        if (loc) setLocation(loc);
    };



    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>₦{item.price}</Text>

            <Text style={styles.description}>{item.description}</Text>


            {item.subMenu.length > 0 && (
                <View style={styles.extrasContainer}>
                    <Text style={styles.extrasTitle}>Extras</Text>

                    <FlatList
                        data={item.subMenu}
                        keyExtractor={(sub) => sub._id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item: sub }) => {
                            const selected = selectedExtras.includes(sub._id);

                            return (
                                <Pressable
                                    style={[
                                        styles.extraCard,
                                        selected && styles.extraCardSelected,
                                    ]}
                                    onPress={() => toggleExtra(sub._id)}
                                >
                                    <Image
                                        source={{ uri: sub.image }}
                                        style={styles.extraImage}
                                    />
                                    <Text style={styles.extraName}>{sub.name}</Text>
                                    <Text style={styles.extraPrice}>₦{sub.price}</Text>
                                </Pressable>
                            );
                        }}
                    />
                </View>
            )}


            <View>
                <Pressable
                    onPress={handleAddToCart}
                    style={styles.addButton}
                >
                    <Text style={styles.addButtonText}>
                        {cartLoading ? 'Product added to cart' : 'Add to cart'}
                    </Text>
                </Pressable>

                <Pressable
                    style={styles.addButton}
                    onPress={handlePickLocation}
                >
                    <Text style={styles.addButtonText}>
                        {location ? "Location Selected ✅" : "Pick up location"}
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
        flex: 1,
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    image: {
        width: "100%",
        height: 220,
        borderRadius: 12,
        marginBottom: 16,
    },

    name: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 8,
    },

    price: {
        fontSize: 18,
        color: "#0a7ea4",
        marginBottom: 12,
    },

    description: {
        fontSize: 14,
        color: "#555",
        marginBottom: 20,
    },

    extrasContainer: {
        marginBottom: 24,
    },

    extrasTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 12,
    },

    extraCard: {
        width: 120,
        marginRight: 12,
        borderRadius: 12,
        padding: 8,
        backgroundColor: "#f5f5f5",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#f5f5f5",
    },

    extraCardSelected: {
        borderColor: "#0a7ea4",
        borderWidth: 2,
    },

    extraImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginBottom: 6,
    },

    extraName: {
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center",
    },

    extraPrice: {
        fontSize: 12,
        color: "#555",
        marginTop: 4,
    },

    addButton: {
        backgroundColor: "#0a7ea4",
        padding: 10,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 24,
    },

    addButtonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
});
