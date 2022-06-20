import { createDrawerNavigator } from '@react-navigation/drawer';
import { Art2 } from './Art2'
import { Art1 } from './Art1';
import { Art3 } from './Art3';


const Drawer = createDrawerNavigator();

export function MyDrawer() {
  return (
    <Drawer.Navigator useLegacyImplementation initialRouteName="Feed">
      <Drawer.Screen
        name="Art 1 - Female internet"
        component={Art1}
        options={{ drawerLabel: 'Home' }}
      />
      <Drawer.Screen
        name="Art 2- LoveWord"
        component={Art2}
        options={{ drawerLabel: 'Updates' }}
      />
      <Drawer.Screen
        name="Profile"
        component={Art3}
        options={{ drawerLabel: 'Profile' }}
      />
    </Drawer.Navigator>
  );
}