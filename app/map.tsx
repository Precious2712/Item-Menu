import { Button, StyleSheet, Text, View, Platform } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useState, useRef } from "react";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useProduct } from "@/context/useContext";

export default function MapScreen() {
    const mapRef = useRef<MapView | null>(null);

    const { setResults } = useProduct();

    const [address, setAddress] = useState("");
    const [location, setLocation] = useState({
        latitude: 6.5244,
        longitude: 3.3792,
    });


    const moveToLocation = async (lat: number, lng: number) => {
        const newLocation = { latitude: lat, longitude: lng };
        setLocation(newLocation);

        mapRef.current?.animateToRegion({
            ...newLocation,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });

        const res = await Location.reverseGeocodeAsync(newLocation);

        if (res.length > 0) {
            const p = res[0];

            const formattedAddress =
                `${p.name ?? ""} ${p.street ?? ""}, ${p.city ?? ""}, ${p.region ?? ""}`;

            setAddress(formattedAddress);
            setResults(formattedAddress); 
        }

    };

    return (
        <View style={styles.container}>

            {/* <View style={styles.searchWrapper}>
                <GooglePlacesAutocomplete
                    placeholder="Search address or place"
                    fetchDetails
                    minLength={2}
                    debounce={300}
                    keyboardShouldPersistTaps="always"
                    enablePoweredByContainer={false}

                    query={{
                        key: "",
                        language: "en",
                    }}

                    onPress={(data, details) => {
                        if (!details) return;

                        const { lat, lng } = details.geometry.location;
                        moveToLocation(lat, lng);
                    }}

                    styles={{
                        textInputContainer: styles.textInputContainer,
                        textInput: styles.textInput,
                        listView: styles.listView,
                    }}
                />
            </View> */}


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


                onPoiClick={(e) => {
                    const { latitude, longitude } = e.nativeEvent.coordinate;
                    moveToLocation(latitude, longitude);
                }}
            >
                <Marker coordinate={location} draggable />
            </MapView>


            <View style={styles.bottom}>
                <Text>{address}</Text>
                {/* <Button title="Use My Location" onPress={() =>
                    moveToLocation(6.5244, 3.3792)
                } /> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },

    map: { flex: 1 },

    searchWrapper: {
        position: "absolute",
        top: Platform.OS === "ios" ? 60 : 40,
        width: "90%",
        alignSelf: "center",
        zIndex: 9999,
    },

    textInputContainer: {
        backgroundColor: "white",
        borderRadius: 10,
    },

    textInput: {
        height: 50,
        paddingHorizontal: 15,
        borderRadius: 10,
    },


    listView: {
        backgroundColor: "white",
        elevation: 10,
    },

    bottom: {
        position: "absolute",
        bottom: 40,
        width: "90%",
        alignSelf: "center",
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        elevation: 5,
    },
});
