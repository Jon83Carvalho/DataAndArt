import { createDrawerNavigator } from '@react-navigation/drawer';
import { Art2 } from './Art2'
import { Art1 } from './Art1';
import { Art3 } from './Art3';
import { StyleSheet } from 'react-native';
import {
  useFonts,
  YanoneKaffeesatz_200ExtraLight,
  YanoneKaffeesatz_300Light,
  YanoneKaffeesatz_400Regular,
  YanoneKaffeesatz_500Medium,
  YanoneKaffeesatz_600SemiBold,
  YanoneKaffeesatz_700Bold,
} from '@expo-google-fonts/yanone-kaffeesatz';



const Drawer = createDrawerNavigator();

const styles = {
  baseText: {
    color:"#fff",
    fontFamily:"YanoneKaffeesatz_400Regular",
    fontSize:"1.7rem"
  },
  innerText: {
    color:"#fff",
    fontFamily:"YanoneKaffeesatz_400Regular",
    fontSize:"1.7rem"
  }
};



export function MyDrawer() {

  let [fontsLoaded] = useFonts({
    YanoneKaffeesatz_200ExtraLight,
    YanoneKaffeesatz_300Light,
    YanoneKaffeesatz_400Regular,
    YanoneKaffeesatz_500Medium,
    YanoneKaffeesatz_600SemiBold,
    YanoneKaffeesatz_700Bold,
  })

  return (
    <Drawer.Navigator useLegacyImplementation initialRouteName="Feed"
      screenOptions={{
        drawerStyle: {
          backgroundColor:"#6667AB",
          opacity:"95%",

        },
        headerStyle: {
          backgroundColor:"#6667AB",
          opacity: "100%"
          
        },
        headerTitleStyle: {
          fontFamily:styles.baseText.fontFamily,
          fontSize:styles.baseText.fontSize
        },
        sceneContainerStyle: {
          backgroundColor:"#999AFG"
      } 
      }}

         
     
    >
      <Drawer.Screen
        name="Art 1 - Female internet"
        component={Art1}
        options={{ drawerLabel: 'Art 1 - ',
        drawerActiveBackgroundColor:"#444589",
        drawerInactiveBackgroundColor:"#999BHF",
        drawerActiveTintColor:"#ggg",
        drawerLabelStyle: {
          color:styles.innerText.color,
          fontFamily:styles.innerText.fontFamily,
          fontSize:styles.innerText.fontSize        
        }
       }}
        
      />
      <Drawer.Screen
        name="Art 2- LoveWord"
        component={Art2}
        options={{ drawerLabel: 'Updates' ,
        drawerActiveBackgroundColor:"#444589",
        drawerInactiveBackgroundColor:"#999BHF",
        drawerLabelStyle: {
          color:styles.innerText.color,
          fontFamily:styles.innerText.fontFamily,
          fontSize:styles.innerText.fontSize        
        }

      }}
      />
      <Drawer.Screen
        name="Profile"
        component={Art3}
        options={{ drawerLabel: 'Profile',
        drawerActiveBackgroundColor:"#444589",
        drawerInactiveBackgroundColor:"#999BHF",
        drawerLabelStyle: {
          color:styles.innerText.color,
          fontFamily:styles.innerText.fontFamily,
          fontSize:styles.innerText.fontSize

        }


      }}
        
      />
    </Drawer.Navigator>
  );
}

