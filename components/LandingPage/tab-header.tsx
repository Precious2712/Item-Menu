import { useState } from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { IconSymbol } from "../ui/icon-symbol";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabHeader() {
    const [item, setItem] = useState("");
    const [open, setOpen] = useState(false);
    const insets = useSafeAreaInsets();

    // Example dropdown items
    const suggestions = ["Pizza", "Burger", "Pasta", "Salad", "Sushi", "Taco", "Noodles", "Steak", "Ice Cream"];

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[styles.header, { paddingTop: insets.top }]}>

                <View style={styles.container}>
                    <IconSymbol name="house.fill" size={26} color="#fff" />

                    <View style={styles.searchContainer}>
                        <IconSymbol name="magnifyingglass" size={20} color="#777" style={styles.searchIcon} />

                        <TextInput
                            value={item}
                            onChangeText={setItem}
                            placeholder="Search..."
                            placeholderTextColor="#999"
                            style={styles.input}
                            onFocus={() => setOpen(true)}
                            onBlur={() => setOpen(false)}
                        />
                    </View>
                </View>

                {/* Dropdown */}
                {open && (
                    <View style={styles.dropdown}>
                        <ScrollView nestedScrollEnabled style={{ maxHeight: 300 }}>
                            {suggestions
                                .filter((s) => s.toLowerCase().includes(item.toLowerCase()))
                                .map((s, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setItem(s);
                                            setOpen(false);
                                        }}
                                    >
                                        <Text style={styles.dropdownText}>{s}</Text>
                                    </TouchableOpacity>
                                ))}
                        </ScrollView>
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "black",
        paddingBottom: 12,
        borderBottomWidth: 2,
        borderBottomColor: 'gray'
    },

    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginTop: 9,
        gap: 12,
    },

    searchContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
        borderRadius: 10,
        paddingHorizontal: 10,
        position: "relative",
    },

    searchIcon: {
        marginRight: 6,
    },

    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: "#000",
    },

    dropdown: {
        position: "absolute",
        top: 62, // below the search input
        left: 16,
        right: 16,
        backgroundColor: "#fff",
        borderRadius: 8,
        zIndex: 1000,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        // no fixed height here, handled by ScrollView
    },

    dropdownItem: {
        padding: 10,
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
    },

    dropdownText: {
        fontSize: 16,
        color: "#000",
    },
});
