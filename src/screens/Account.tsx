import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
} from 'react-native';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingOption {
  title: string;
  onPress: () => void;
  additionalInfo: string;
}

const Settings = () => {
  const [loggedInUser, setloggedInUser] = useState(null);

  const getExistinguser = async () => {
    try {
      //   await AsyncStorage.removeItem('bins');
      const loggedInUserJSON = await AsyncStorage.getItem('loggedInUser');
      const user = loggedInUserJSON ? JSON.parse(loggedInUserJSON) : null;
      setloggedInUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getExistinguser();
    }, []),
  );
  const navigation = useNavigation();
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    address: '123 Main Street, City, Country',
    role: 'admin',
  };

  const navigateToScreen = (screenName: string) => {
    // @ts-ignore
    navigation.navigate(screenName);
  };

  const handleLogoutPress = async () => {
    console.log('Perform logout action');

    try {
      navigateToScreen('login');
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccountPress = () => {
    console.log('Navigate to Account Settings screen');
    // Add navigation logic here
  };

  const handleNotificationsPress = () => {
    console.log('Navigate to Notifications Settings screen');
    // @ts-ignore
    navigation.navigate('Notifications');
    // Add navigation logic here
  };

  const renderSettingsOption = (option: SettingOption, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={option.onPress}
        style={styles.section}>
        <Text style={styles.sectionTitle}>{option.title}</Text>
        {option.additionalInfo && (
          <Text style={{color: 'gray'}}>{option.additionalInfo}</Text>
        )}
      </TouchableOpacity>
    );
  };

  const renderProfileSection = () => {
    return (
      <TouchableOpacity
        onPress={() => navigateToScreen('Profile')}
        style={styles.section}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <View style={styles.profileContainer}>
          <View>
            {
              <Image
                source={require('../../assets/person.png')}
                style={styles.profileImage}
              />
            }
          </View>

          <View style={styles.profileInfo}>
            <Text style={{color: 'black', textTransform: 'capitalize'}}>
              {loggedInUser?.username ?? 'No name'}
            </Text>

            <Text style={{textTransform: 'capitalize', color: 'black'}}>
              {loggedInUser?.role}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  let settingsOptions: SettingOption[] = [];

  if (user?.role === 'admin') {
    settingsOptions.push({
      title: 'Add Bin Center',
      onPress: () => navigateToScreen('addbin'),
      additionalInfo: 'Add Trash Center',
    });
  }
  settingsOptions = [
    ...settingsOptions,
    ...[
      {
        title: 'Stats',
        onPress: handleAccountPress,
        additionalInfo: 'My Usage Info',
      },

      {
        title: 'FAQ',
        onPress: handleAccountPress,
        additionalInfo: 'Frequently asked questions',
      },
      {
        title: 'Feedback',
        onPress: handleAccountPress,
        additionalInfo: 'Submit feedback',
      },
    ],
  ];

  settingsOptions.push({
    title: 'Logout',
    onPress: handleLogoutPress,
    additionalInfo: '',
  });

  const renderSettingsOptions = () => {
    return settingsOptions.map((option, index) =>
      renderSettingsOption(option, index),
    );
  };

  return (
    <ScrollView style={styles.container}>
      {renderProfileSection()}
      {renderSettingsOptions()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    objectFit: 'fill',
  },
  profileInfo: {
    flex: 1,
  },
});

export default Settings;
