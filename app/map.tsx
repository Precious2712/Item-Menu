import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { useState, useRef, useEffect } from "react";
import * as Location from "expo-location";
import { ThemedView } from "@/components/themed-view";
import { useProduct } from "@/context/useContext";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function MapScreen() {
    const mapRef = useRef<MapView | null>(null);
    const { setResults } = useProduct();

    const [address, setAddress] = useState("");

    const [location, setLocation] = useState({
        latitude: 6.5244,
        longitude: 3.3792,
    });

    
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                alert("Permission to access location was denied");
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            const coords = {
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
            };

            moveToLocation(coords.latitude, coords.longitude);
        })();
    }, []);

    
    const moveToLocation = async (lat: number, lng: number) => {
        const newLocation = { latitude: lat, longitude: lng };
        setLocation(newLocation);

        
        const region: Region = {
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        };

        mapRef.current?.animateToRegion(region, 600);

        try {
            const res = await Location.reverseGeocodeAsync(newLocation);

            if (res.length > 0) {
                const p = res[0];

                const formattedAddress = `${p.name ?? ""} ${p.street ?? ""}, ${p.city ?? ""
                    }, ${p.region ?? ""}`;

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
                initialRegion={{
                    ...location,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                showsUserLocation
                showsMyLocationButton

                
                onPress={(e) => {
                    const { latitude, longitude } = e.nativeEvent.coordinate;
                    moveToLocation(latitude, longitude);
                }}

                
                onPoiClick={(e) => {
                    const { latitude, longitude } = e.nativeEvent.coordinate;
                    moveToLocation(latitude, longitude);
                }}
            >
                
                <Marker coordinate={location} tappable={false}>
                    <IconSymbol
                        name="map.pin"
                        size={50}
                        color="#E53935"
                        style={{ marginBottom: 40 }}
                    />
                </Marker>
            </MapView>

            
            <View style={styles.bottom} pointerEvents="box-none">
                <Text style={{ fontWeight: "500" }}>
                    {address || "Tap anywhere on the map to select a location"}
                </Text>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    map: {
        flex: 1,
    },

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
