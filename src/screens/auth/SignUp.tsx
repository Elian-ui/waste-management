import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Button, Image} from 'react-native';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();

  const handleSignUp = async () => {
    // Your sign-up logic here, e.g., validation and submission
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    // Fetch existing bins array from AsyncStorage
    const existingUsersJSON = await AsyncStorage.getItem('users');
    let existingUsers = existingUsersJSON
      ? JSON.parse(existingUsersJSON)
      : [
          {
            username: 'admin',
            password: 'admin',
            role: 'admin',
          },
        ];

    // Append new bin to the existing bins array
    const newBin = {
      username: username.trim(),
      password: password.trim(),
      role: 'user',
    };
    existingUsers.push(newBin);

    // Save updated bins array back to AsyncStorage
    await AsyncStorage.setItem('users', JSON.stringify(existingUsers));
    alert('User added successfully.');
    navigation.navigate('login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/trash.png')} // Replace with actual path to your logo
        style={styles.logo}
      />
      <Text style={[styles.title, {fontSize: 18, textAlign: 'center'}]}>
        WASTE MANAGEMENT OPTIMIZATION
      </Text>
      <Text>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={'gray'}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor={'gray'}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        placeholderTextColor={'gray'}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text style={styles.signUpText}>Already have an account?</Text>
      <Button title="Login" onPress={() => navigation.navigate('login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  input: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'black',
  },
  signUpText: {
    marginTop: 20,
    marginBottom: 10,
    color: 'black',
  },
});

export default SignUp;
