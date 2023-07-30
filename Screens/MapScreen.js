import { useRoute } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-svg";

export default function MapScreen() {
  const {
    params: { coordinate, locationName },
  } = useRoute();
  const { latitude, longitude } = coordinate;

  console.log("MAP_SCREEN", "latitude", latitude, "longitude", longitude);

  return (
    <View style={styles.contaner}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        loadingEnabled={true}
        loadingIndicatorColor="#666666"
        loadingBackgroundColor="#eeeeee"
        moveOnMarkerPress={false}
        showsCompass={true}
        showsPointsOfInterest={false}
        provider="google"
      >
        <Marker title={locationName} coordinate={{ latitude, longitude }} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
