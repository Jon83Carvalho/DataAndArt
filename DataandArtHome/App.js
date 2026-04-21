import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './StartScreen';
import ArtGallery from './ArtGallery';
import Art1 from './Art1';
import Art2 from './Art2';
import Art3 from './Art3';
import Art4 from './Art4';
import Art5 from './Art5';
import Art6 from './Art6';

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
        <RootStack.Screen
          name="Art4" 
          component={Art4}
        />
        <RootStack.Screen
          name="Art5" 
          component={Art5}
        />
        <RootStack.Screen
          name="Art6" 
          component={Art6}
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
