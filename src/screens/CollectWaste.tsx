import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CollectWaste = () => {
  const [refreshing, setRefreshing] = useState(false);

  const [trash, setTrash] = useState([]);
  const getTrash = async () => {
    try {
      //   await AsyncStorage.removeItem('Trash');
      const existingTrashJSON = await AsyncStorage.getItem('trash');
      let existingTrash = existingTrashJSON
        ? JSON.parse(existingTrashJSON)
        : [];
      setTrash(existingTrash);
      console.log(existingTrash);
    } catch (error) {
      console.log(error);
    }
  };
  const totalCost = trash.reduce((acc, item) => acc + 1000 * +item.quantity, 0);
  useFocusEffect(
    React.useCallback(() => {
      getTrash();
    }, []),
  );
  const renderWasteItem = ({item, index}) => (
    <View style={styles.wasteItem}>
      <MaterialCommunityIcons
        name={item.category.icon} // Assuming category object has an icon property
        size={24}
        color="black"
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{item.category.name}</Text>
        <Text style={styles.text}>Quantity: {item.quantity} kg</Text>
        <Text style={styles.text}>Cost: UGX {item.quantity * 1000}</Text>
      </View>
    </View>
  );

  const handleRefresh = () => {
    // Add your refresh logic here, e.g., fetch updated data
    setRefreshing(true);
    getTrash();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Collected Waste</Text> */}
      <FlatList
        data={trash}
        renderItem={renderWasteItem}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Cost: UGX {totalCost}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  wasteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    color: 'black',
    marginBottom: 5,
  },
  totalContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
  },
});

export default CollectWaste;
