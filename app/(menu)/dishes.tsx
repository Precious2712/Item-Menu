import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, Pressable } from "react-native";
import { useProduct } from "@/context/useContext";

export default function DishesSreenPage() {
    const { food, loading, handleSelectItem } = useProduct();

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!food.length) {
        return (
            <View style={styles.center}>
                <Text>No dishes available</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={food}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.price}>₦{item.price}</Text>


                        <Pressable
                            style={styles.button}
                            onPress={() => handleSelectItem(item._id)}
                        >
                            <Text>Click</Text>
                        </Pressable>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        marginBottom: 16,
        padding: 12,
        borderRadius: 10,
        backgroundColor: "#fff",
        elevation: 3,
    },
    image: {
        width: "100%",
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
    },
    price: {
        marginTop: 4,
        fontSize: 14,
        color: "#555",
    },


    button: {
        backgroundColor: "#0a7ea4",
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 15,
        alignItems: "center",
    },
});
