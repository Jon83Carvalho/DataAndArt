import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './StartScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ArtGallery from './ArtGallery';
import Art1 from './Art1';
import Art2 from './Art2';
import Art3 from './Art3';

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown:false}} initialRouteName="Data and Art">
        <RootStack.Screen
          name="Data and Art" 
          component={StartScreen}
        />
        <RootStack.Screen
          name="Art Gallery" 
          component={ArtGallery}
        />
        <RootStack.Screen
          name="Art1" 
          component={Art1}
        />
        <RootStack.Screen
          name="Art2" 
          component={Art2}
        />
        <RootStack.Screen
          name="Art3" 
          component={Art3}
        />
      </RootStack.Navigator> 
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
