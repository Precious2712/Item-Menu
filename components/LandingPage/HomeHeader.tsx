import { useState } from "react";
import { Text, View, FlatList, StyleSheet, Dimensions, Pressable } from "react-native";
import { navItem } from "@/data/item/nav";
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { AnimatePresence, MotiView } from 'moti';

const { height } = Dimensions.get('window');

export default function HomeHeader() {
    const [open, setOpen] = useState(false);
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

    const [activeItem, setActiveItem] = useState<number | null>(null);

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.primary}]}>
            
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
                        style={[styles.drop, { backgroundColor: 'green' }]}
                    >
                        <FlatList
                            data={navItem}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item, index }) => (
                                <Text
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
                                </Text>
                            )}
                            contentContainerStyle={{ paddingTop: 8 }}
                            showsVerticalScrollIndicator={true}
                        />
                    </MotiView>
                )}
            </AnimatePresence>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        zIndex: 10,
    },
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
