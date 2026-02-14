import { useState } from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity, FlatList, Keyboard } from "react-native";
import { IconSymbol } from "../ui/icon-symbol";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Link } from "expo-router";

export default function TabHeader() {
    const [item, setItem] = useState("");
    const [open, setOpen] = useState(false);
    const insets = useSafeAreaInsets();

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

    return (
        <View style={[styles.header, { paddingTop: insets.top, backgroundColor: theme.colors.background }]}>

            <View style={styles.container}>
                <Link style={styles.home} href='/'>
                    <IconSymbol name="house.fill" size={26} color={theme.colors.text} />
                </Link>

                <View style={styles.searchContainer}>
                    <IconSymbol name="magnifyingglass" size={20} color="#777" style={styles.searchIcon} />
                    <TextInput
                        value={item}
                        onChangeText={setItem}
                        placeholder="Search..."
                        placeholderTextColor="#999"
                        style={styles.input}
                        onFocus={() => setOpen(true)}
                    />
                </View>
            </View>

            {open && (
                <View style={styles.dropdown}>

                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingBottom: 12,
        borderBottomWidth: 2,
        borderBottomColor: 'gray',
        overflow: 'visible',
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        paddingHorizontal: 2,
        marginTop: 9,
        gap: 32,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 15,
        // backgroundColor: 'red'
        // width: '90%'
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
    searchIcon: { marginRight: 6 },
    input: { flex: 1, height: 40, fontSize: 16, color: "#000" },
    dropdown: {
        position: "absolute",
        top: 60,
        left: 16,
        right: 16,
        backgroundColor: "#fff",
        borderRadius: 8,
        zIndex: 1000,
        elevation: 20,
        maxHeight: 300,
    },

    dropdownItem: {
        padding: 10,
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
    },
    dropdownText: { fontSize: 16, color: "#000" },

    home: {
        padding: 2,
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: 'gray'
    }
});
