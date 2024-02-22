import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';
import { Home, Profile, AddItem } from '../screens';

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  tabBarHideKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 70
  }
}

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return <Ionicons name={focused ? 'home' : 'home-outline'}
            size={24}
            color={focused ? COLORS.primary : COLORS.gray} />
          }
        }}
      />

      <Tab.Screen
        name='AddItem'
        component={AddItem}
        options={{
          tabBarIcon: ({focused}) => {
            return <Ionicons  name={'add-circle'}
            size={24}
            color={focused ? COLORS.primary : COLORS.gray} />
          }
        }}
      />

      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => {
            return <Ionicons name={focused ? 'person' : 'person-outline'}
            size={24}
            color={focused ? COLORS.primary : COLORS.gray} />
          }
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigation
