import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useState, useRef, useEffect } from "react";
import * as Location from "expo-location";
import { ThemedView } from "@/components/themed-view";
import { useProduct } from "@/context/useContext";

export default function MapScreen() {
    const mapRef = useRef<MapView | null>(null);
    const { setResults } = useProduct();

    const [address, setAddress] = useState("");
    const [location, setLocation] = useState({
        latitude: 6.5244,
        longitude: 3.3792,
    });

    // Request location permission on mount
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                alert("Permission to access location was denied");
                return;
            }

            // Optionally, get device location
            const currentLocation = await Location.getCurrentPositionAsync({});
            const coords = {
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
            };
            setLocation(coords);
            moveToLocation(coords.latitude, coords.longitude);
        })();
    }, []);

    // Update marker & reverse geocode
    const moveToLocation = async (lat: number, lng: number) => {
        const newLocation = { latitude: lat, longitude: lng };
        setLocation(newLocation);

        mapRef.current?.animateToRegion({
            ...newLocation,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });

        try {
            const res = await Location.reverseGeocodeAsync(newLocation);
            if (res.length > 0) {
                const p = res[0];
                const formattedAddress =
                    `${p.name ?? ""} ${p.street ?? ""}, ${p.city ?? ""}, ${p.region ?? ""}`;
                setAddress(formattedAddress);
                setResults(formattedAddress);
            }
        } catch (err) {
            console.log("Reverse geocode failed:", err);
        }
    };

    return (
        <ThemedView style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                ref={mapRef}
                style={styles.map}
                region={{
                    ...location,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                onPress={(e) => {
                    const { latitude, longitude } = e.nativeEvent.coordinate;
                    moveToLocation(latitude, longitude);
                }}
            >
                <Marker coordinate={location} />
            </MapView>

            <View style={styles.bottom}>
                <Text style={{ fontWeight: "500" }}>
                    {address || "Tap on the map to select a location"}
                </Text>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },

    map: { flex: 1 },

    bottom: {
        position: "absolute",
        bottom: 100,
        width: "90%",
        alignSelf: "center",
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        elevation: 5,
    },
});
