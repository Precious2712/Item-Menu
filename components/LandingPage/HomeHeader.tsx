import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid, Platform } from "react-native";
import { Text, View, FlatList, StyleSheet, Dimensions, Pressable } from "react-native";
import { navItem } from "@/data/item/nav";
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { AnimatePresence, MotiView } from 'moti';
import { Link, useRouter } from "expo-router";

const { height } = Dimensions.get('window');

export default function HomeHeader() {
    const [open, setOpen] = useState(false);
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

    const [activeItem, setActiveItem] = useState<number | null>(null);

    const router = useRouter();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("token");

            if (Platform.OS === "android") {
                ToastAndroid.show("Logged out successfully", ToastAndroid.SHORT);
            } else {

                console.log("Logged out successfully");
            }

            router.replace("/login");
        } catch (error) {
            console.log("Logout error:", error);
        }
    };

    return (
        <View>

            <View style={[styles.head, { backgroundColor: theme.colors.card }]}>
                <Text style={[styles.logo, { color: theme.colors.text }]}>Maison Élégance</Text>
                <Text
                    style={{ color: theme.colors.primary, fontWeight: '600' }}
                    onPress={() => setOpen(!open)}
                >
                    {open ? "Close" : "Menu"}
                </Text>
            </View>


            <AnimatePresence>
                {open && (
                    <MotiView
                        from={{ opacity: 0, translateY: -20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        exit={{ opacity: 0, translateY: -20 }}
                        style={[styles.drop, { backgroundColor: 'gray', paddingTop: 60 }]}
                    >
                        <FlatList
                            data={navItem}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item, index }) => (
                                <Link
                                    href={item.path}
                                    style={{
                                        color: activeItem === index ? theme.colors.primary : theme.colors.text,
                                        fontWeight: '600',
                                        fontSize: 15,
                                        paddingVertical: 16,
                                        paddingHorizontal: 15,
                                    }}
                                    onPressIn={() => setActiveItem(index)}
                                    onPressOut={() => setActiveItem(null)}
                                >
                                    {item.text}
                                </Link>
                            )}
                            contentContainerStyle={{ paddingTop: 8 }}
                            showsVerticalScrollIndicator={true}
                        />



                        <Pressable
                            style={{
                                position: 'absolute',
                                bottom: 40,
                                left: 15,
                                backgroundColor: 'red',
                                width: '80%',
                                padding: 10,
                                borderRadius: 10
                            }}
                            onPress={handleLogout}
                        >
                            <Text style={{ color: theme.colors.text, fontWeight: '700', fontSize: 16, }}>Logout</Text>
                        </Pressable>

                    </MotiView>
                )}
            </AnimatePresence>
        </View>
    );
}

const styles = StyleSheet.create({
    head: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 16,
        // borderBottomWidth: 1,
        position: 'relative',
        zIndex: 20,
    },
    logo: {
        fontSize: 16,
        fontWeight: "700",
    },
    drop: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '85%',
        height: height,
        zIndex: 15,
    },
});
