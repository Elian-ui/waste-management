import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useCurrentLocation from '../hooks/useLocation';
import calculateDistance from './lib/calculateDistance';

const Home = () => {
  const navigation = useNavigation();
  // Dummy data for waste categories and bins
  const wasteCategories = [
    {id: 1, name: 'Plastic', icon: 'recycle'},
    {id: 2, name: 'Paper', icon: 'file-document'},
    {id: 3, name: 'Glass', icon: 'bottle-wine'},
    {id: 4, name: 'Organic', icon: 'leaf'},
  ];
  const [loggedInUser, setloggedInUser] = useState(null);

  const [bins, setBins] = useState([]);
  const getBins = async () => {
    try {
      //   await AsyncStorage.removeItem('bins');
      const loggedInUserJSON = await AsyncStorage.getItem('loggedInUser');
      const user = loggedInUserJSON ? JSON.parse(loggedInUserJSON) : null;
      setloggedInUser(user);
      const existingBinsJSON = await AsyncStorage.getItem('bins');

      let existingBins = existingBinsJSON ? JSON.parse(existingBinsJSON) : [];
      setBins(existingBins);
      console.log(existingBins);
    } catch (error) {
      console.log(error);
    }
  };
  const {location, loading} = useCurrentLocation();
  useFocusEffect(
    React.useCallback(() => {
      getBins();
    }, []),
  );
  const renderCategoryItem = ({item}) => (
    <View style={styles.categoryItem}>
      <MaterialCommunityIcons name={item.icon} size={24} color="black" />
      <Text style={{color: 'black', marginLeft: 5}}>{item.name}</Text>
    </View>
  );

  const renderBinItem = ({item}) => {
    const distance = !loading
      ? calculateDistance(
          item?.latitude,
          item?.longitude,
          location?.latitude,
          location?.longitude,
        )
      : 'Getting Distance';

    return (
      <TouchableOpacity
        onPress={() => {
          const binLocation = {
            latitude: location?.latitude,
            longitude: location?.longitude,
          };

          navigation.navigate('bindetails', {binLocation, bin: item});
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          paddingHorizontal: 10, // Added for spacing
          paddingVertical: 5, // Added for spacing
          marginVertical: 5, // Added for spacing
          borderRadius: 7, // Added for consistency
          elevation: 3, // Added for visual depth
          shadowColor: 'black', // Added for visual depth
          shadowOffset: {width: 0, height: 2}, // Added for visual depth
          shadowOpacity: 0.2, // Added for visual depth
          shadowRadius: 4, // Added for visual depth
        }}>
        <View style={styles.binItem}>
          <View
            style={{
              width: 80,
              height: 80,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 7,
              backgroundColor: '#D0D0D0',
            }}>
            <MaterialCommunityIcons
              name={'map-marker'}
              size={24}
              color="black"
            />
          </View>
          <View style={{marginLeft: 10}}>
            <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
              {item.name}
            </Text>
            <Text style={{color: 'black'}}>{item.location}</Text>
            <View
              style={{
                backgroundColor: '#91ED8E',
                borderRadius: 7,
                paddingVertical: 2,
                paddingHorizontal: 5,
                marginTop: 5,
              }}>
              <Text style={{color: 'black', textAlign: 'center'}}>
                {distance}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={{marginRight: 10}}>
          <MaterialCommunityIcons
            name={'dots-vertical'}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
        <Image
          source={require('../../assets/person.png')}
          style={{width: 80, height: 80, borderRadius: 40, marginRight: 10}}
        />
        <View>
          <Text style={{fontSize: 18, color: 'black'}}>Good morning</Text>
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              fontWeight: 'bold',
              textTransform: 'capitalize',
            }}>
            {loggedInUser?.username ?? 'User'}
          </Text>
        </View>
      </View>

      <Text style={styles.title}>Waste Category</Text>
      <FlatList
        data={wasteCategories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id.toString()}
        horizontal={true} // Display items horizontally
        showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
      />
      <Text style={styles.title}>Near By Bin Stations</Text>
      <FlatList
        data={bins}
        renderItem={renderBinItem}
        keyExtractor={item => item.location.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    marginTop: 10,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#e0e0e0',
    marginBottom: 5,
    marginRight: 10, // Add space between items
    borderRadius: 5,
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

export default Home;
