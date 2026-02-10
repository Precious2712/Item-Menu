import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
    runOnJS,
} from "react-native-reanimated";

import { dishes } from "@/data/item/dishes";

const CARD_WIDTH = 250;
const GAP = 16;


const items = [...dishes, ...dishes, ...dishes];

export default function FoodCarousel() {
    const translateX = useSharedValue(0);

    useEffect(() => {
        const totalWidth = CARD_WIDTH * dishes.length + GAP * dishes.length;

        const animate = () => {
            translateX.value = withTiming(-totalWidth, {
                duration: 100000,
                easing: Easing.linear,
            }, () => {
                translateX.value = 0;
                runOnJS(animate)();
            });
        };

        animate();
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Featured Dishes</Text>
            <Animated.View style={[styles.carousel, animatedStyle]}>
                {items.map((item, idx) => (
                    <View style={styles.card} key={idx}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.price}>{item.price}</Text>
                    </View>
                ))}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        backgroundColor: 'white'
    },
    header: {
        fontSize: 28,
        fontWeight: "600",
        marginBottom: 16,
        color: "black",
        paddingLeft: 16
    },
    carousel: {
        flexDirection: "row",
        width: '95%',
    },
    card: {
        width: CARD_WIDTH,
        marginRight: GAP,
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: "#222",
        paddingBottom: 12,
    },
    image: {
        width: "100%",
        height: 150,
        resizeMode: "cover"
    },
    name: {
        color: "#FFD700",
        fontSize: 16,
        fontWeight: "600",
        marginTop: 8,
        paddingHorizontal: 8
    },
    price: {
        color: "#fff",
        fontSize: 14,
        paddingHorizontal: 8
    },
});
