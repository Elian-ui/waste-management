import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const AddBin = () => {
  const [binName, setBinName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [location, setLocation] = useState('');
  const navigation = useNavigation();

  const handleSave = async () => {
    try {
      //   await AsyncStorage.removeItem('bins');
      // Check if binName, latitude, and longitude are not empty
      if (!binName.trim() || !latitude.trim() || !longitude.trim()) {
        alert('Please enter bin name, latitude, and longitude.');
        return;
      }

      // Fetch existing bins array from AsyncStorage
      const existingBinsJSON = await AsyncStorage.getItem('bins');
      let existingBins = existingBinsJSON ? JSON.parse(existingBinsJSON) : [];

      // Append new bin to the existing bins array
      const newBin = {
        name: binName.trim(),
        location,
        latitude: latitude.trim(),
        longitude: longitude.trim(),
      };
      existingBins.push(newBin);

      // Save updated bins array back to AsyncStorage
      await AsyncStorage.setItem('bins', JSON.stringify(existingBins));
      alert('Bin added successfully.');
      navigation.navigate('tabs');

      // Clear input fields after saving
      setBinName('');
      setLatitude('');
      setLongitude('');
    } catch (error) {
      console.error('Error adding bin:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Bin</Text>
      <TextInput
        placeholder="Enter bin name"
        value={binName}
        onChangeText={setBinName}
        style={styles.input}
        placeholderTextColor={'gray'}
      />
      <TextInput
        placeholder="Enter bin location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
        placeholderTextColor={'gray'}
      />
      <TextInput
        placeholder="Enter latitude"
        value={latitude}
        onChangeText={setLatitude}
        style={styles.input}
        placeholderTextColor={'gray'}
        keyboardType="numeric" // Set keyboard type to numeric for latitude and longitude inputs
      />
      <TextInput
        placeholder="Enter longitude"
        value={longitude}
        onChangeText={setLongitude}
        placeholderTextColor={'gray'}
        style={styles.input}
        keyboardType="numeric" // Set keyboard type to numeric for latitude and longitude inputs
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Bin Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
    color: 'black',
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddBin;
