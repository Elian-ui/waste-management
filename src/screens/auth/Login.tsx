import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Button, Image} from 'react-native';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    // Your login logic here, e.g., validation and authentication
    console.log('Username/Email:', username);
    console.log('Password:', password);

    // Retrieve existing users from AsyncStorage
    const existingUsersJSON = await AsyncStorage.getItem('users');
    let existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];

    // Find the user with matching username and password
    const user = existingUsers.find(
      u => u.username === username && u.password === password,
    );
    await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));

    if (user) {
      // User found, perform login actions (e.g., set authentication state, navigate to home screen)
      console.log('Logged in successfully as:', user.username);
      // Example of setting authentication state
      // setLoggedIn(true);
      // Example of navigation
      navigation.navigate('tabs');
    } else {
      // User not found, handle invalid credentials (e.g., display error message)
      console.log('Invalid username or password.');
      alert('Invalid username or password.');
      // Example of displaying an error message
      // setError('Invalid username or password.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../../../assets/trash.png')} // Replace with actual path to your logo
        style={styles.logo}
      />

      {/* Login Form */}
      <Text style={[styles.title, {fontSize: 18, textAlign: 'center'}]}>
        WASTE MANAGEMENT OPTIMIZATION
      </Text>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username or Email"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="gray"
      />
      <Button title="Login" onPress={handleLogin} />

      {/* Sign-Up Option */}
      <Text style={styles.signUpText}>Don't have an account?</Text>
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('signup')}
        color="#0080FF" // Customize button color as needed
      />
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

export default Login;
