import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddTrashModal from './AddTrashModal';
import useCurrentLocation from '../../hooks/useLocation';
import calculateDistance from '../lib/calculateDistance';

const BinDetails = ({navigation, route}) => {
  const {binLocation, bin} = route.params; // Assuming binLocation is passed as a parameter
  const [isModalOpen, setisModalOpen] = useState(false);
  const {loading, location} = useCurrentLocation();
  const distance = !loading
    ? calculateDistance(
        bin?.latitude,
        bin?.longitude,
        location?.latitude,
        location?.longitude,
      )
    : 'Getting Distance';

  return (
    <View style={styles.container}>
      <AddTrashModal
        open={isModalOpen}
        onClose={() => setisModalOpen(false)}
        bin={bin}
      />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: binLocation.latitude,
          longitude: binLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: binLocation.latitude,
            longitude: binLocation.longitude,
          }}
          title="Bin Location"
          description="This is the bin location"
        />
      </MapView>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
          }}>
          <View style={styles.binItem}>
            <View
              style={{
                width: 80,
                height: 80,
                justifyContent: 'center',
                alignItems: 'center',
                // borderWidth: 1,
                // borderColor: 'gray',
                borderRadius: 7,
                backgroundColor: '#D0D0D0',
              }}>
              <MaterialCommunityIcons
                name={'map-marker'}
                size={24}
                color="black"
              />
            </View>
            <View>
              <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
                {bin.name}
              </Text>
              <Text style={{color: 'black'}}>{bin.location}</Text>
              <View
                style={{
                  backgroundColor: '#91ED8E',
                  borderRadius: 7,
                  padding: 2,
                }}>
                <Text style={{color: 'black', textAlign: 'center'}}>
                  {distance}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setisModalOpen(!isModalOpen)}
            style={{
              marginRight: 10,
              backgroundColor: '#91ED8E',
              flexDirection: 'row',
              padding: 10,
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons name={'plus'} size={24} color="black" />
            <Text style={{color: 'black', fontWeight: 'bold'}}>Trash</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  map: {
    flex: 1,
  },
  binItem: {
    padding: 10,
    // backgroundColor: '#f0f0f0',
    backgroundColor: 'white',

    marginBottom: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});

export default BinDetails;
