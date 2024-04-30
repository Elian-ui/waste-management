import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AddTrashModal = ({open, onClose, bin}) => {
  const wasteCategories = [
    {id: 1, name: 'Plastic', icon: 'recycle'},
    {id: 2, name: 'Paper', icon: 'file-document'},
    {id: 3, name: 'Glass', icon: 'bottle-wine'},
    {id: 4, name: 'Organic', icon: 'leaf'},
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quantity, setQuantity] = useState('');

  const navigation = useNavigation();
  const renderCategoryItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory &&
          selectedCategory.id === item.id &&
          styles.selectedCategory,
      ]}
      onPress={() => setSelectedCategory(item)}>
      <MaterialCommunityIcons name={item.icon} size={24} color="black" />
      <Text style={{color: 'black', marginLeft: 5}}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleSubmit = async ({item}) => {
    // Handle submit logic here, for example, console.log selectedCategory and quantity
    console.log('Selected Category:', selectedCategory);
    console.log('Quantity:', quantity);
    // Check if binName, latitude, and longitude are not empty
    if (!quantity.trim()) {
      alert('Please enter quantity.');
      return;
    }

    // Fetch existing bins array from AsyncStorage
    const existingCollectedTrashJSON = await AsyncStorage.getItem('trash');
    let existingBins = existingCollectedTrashJSON
      ? JSON.parse(existingCollectedTrashJSON)
      : [];

    // Append new bin to the existing bins array
    setQuantity('');
    existingBins.push({item, quantity, bin, category: selectedCategory});

    // Save updated bins array back to AsyncStorage
    await AsyncStorage.setItem('trash', JSON.stringify(existingBins));
    alert('Trash added successfully.');
    navigation.navigate('tabs');
  };

  return (
    <Modal visible={open} transparent>
      <View
        style={{
          justifyContent: 'flex-end',
          flex: 1,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.title}>AddTrashModal</Text>
            <MaterialCommunityIcons
              onPress={onClose}
              name={'close'}
              size={24}
              color="black"
            />
          </View>
          <Text style={styles.title}>Waste Category</Text>
          <FlatList
            data={wasteCategories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id.toString()}
            horizontal={true} // Display items horizontally
            showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
          />
          <TextInput
            placeholder="Quantity (kg)"
            value={quantity}
            onChangeText={setQuantity}
            style={styles.input}
            placeholderTextColor={'gray'}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  selectedCategory: {
    backgroundColor: 'lightblue',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: 'black',
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddTrashModal;
