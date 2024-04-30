import 'react-native-gesture-handler';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import CollectWaste from './src/screens/CollectWaste';
import Account from './src/screens/Account';
import SignUp from './src/screens/auth/SignUp';
import Login from './src/screens/auth/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BinDetails from './src/screens/bin/BinDetails';
import AddBin from './src/screens/bin/AddBin';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="tabs"
          component={Tabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="bindetails"
          component={BinDetails}
          options={{headerTitle: 'Bin '}}
        />
        <Stack.Screen
          name="addbin"
          component={AddBin}
          options={{headerTitle: 'Bin '}}
        />
        <Stack.Screen
          name="signup"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Tabs = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarActiveTintColor: '#91ED8E',
    }}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Trash Collected"
      component={CollectWaste}
      options={{
        tabBarLabel: 'Trash',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="delete" color={color} size={size} />
        ),
        tabBarBadge: 3,
      }}
    />
    <Tab.Screen
      name="Account"
      component={Account}
      options={{
        tabBarLabel: 'Account',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);
export default App;

const styles = StyleSheet.create({});
