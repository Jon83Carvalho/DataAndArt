import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {MyNewDrawer} from './MyNewDrawer';
import StartScreen from './StartScreen';


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
            name="Content" 
            component={MyNewDrawer}
          />
        </RootStack.Navigator> 
      </NavigationContainer>
        
        
    )
  
}
