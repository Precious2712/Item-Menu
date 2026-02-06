import { useProduct } from "@/context/useContext";
import { StyleSheet, Text, View } from "react-native";

export default function MealSreenPage() {

    const { food } = useProduct();

    console.log('food', food);
    

    return (
        <View>
            <Text>Hello</Text>
        </View>
    )
};


const styles = StyleSheet.create({});