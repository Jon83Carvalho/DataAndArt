import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyDrawer } from './MyDrawer';
import StartScreen from './StartScreen';


const RootStack = createNativeStackNavigator();


export default function App() {
  
  
    return (
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{headerShown:false}}>
          <RootStack.Screen
            name="StartScreen" 
            component={StartScreen}
          />
          <RootStack.Screen
            name="Content" 
            component={MyDrawer}
          />
        </RootStack.Navigator> 
      </NavigationContainer>
        
        
    )
  
}
