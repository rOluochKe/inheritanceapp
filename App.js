import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import { AddItem, EditDetail, ItemDetail, Login, NewRivals, Profile, Register, Search } from './screens';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require('./assets/fonts/Poppins-Regular.ttf'),
    light: require('./assets/fonts/Poppins-Light.ttf'),
    bold: require('./assets/fonts/Poppins-Bold.ttf'),
    medium: require('./assets/fonts/Poppins-Medium.ttf'),
    semiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
    xtrabold: require('./assets/fonts/Poppins-ExtraBold.ttf'),
  })

  const onLayoutRootView = useCallback(async() => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Bottom Navigation'
          component={BottomTabNavigation}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name='ItemDetail'
          component={ItemDetail}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name='EditDetail'
          component={EditDetail}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name='AddItem'
          component={AddItem}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name='ItemList'
          component={NewRivals}
          options={{headerShown: false}}
        />

<       Stack.Screen
          name='Search'
          component={Search}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name='Login'
          component={Login}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name='Register'
          component={Register}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name='Profile'
          component={Profile}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
