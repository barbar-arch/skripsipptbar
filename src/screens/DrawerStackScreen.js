import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeTabScreen from './HomeTabScreen';
import DrawerContent from './DrawerContentScreen';

import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import UsersScreen from './UsersScreen';

import PenetapanScreen from './PenetapanScreen';
import PembayaranScreen from './PembayaranScreen';

const Drawer = createDrawerNavigator();

const DrawerStackScreen = React.memo(() => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeTabScreen"
      drawerStyle={{
        width: 320,
      }}
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        itemStyle: {
          marginLeft: 0,
          marginVertical: 0,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderTopRightRadius: 25,
          borderBottomRightRadius: 25,
        },
      }}
      drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="HomeTabScreen"
        component={HomeTabScreen}
        options={() => ({
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
              style={styles.icon}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="PenetapanScreen"
        component={PenetapanScreen}
        options={() => ({
          title: 'Penetapan',
          drawerLabel: 'Penetapan',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="bookmark-outline"
              color={color}
              size={size}
              style={styles.icon}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="PembayaranScreen"
        component={PembayaranScreen}
        options={() => ({
          title: 'Pembayaran',
          drawerLabel: 'Pembayaran',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="currency-usd-circle-outline"
              color={color}
              size={size}
              style={styles.icon}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="UsersScreen"
        component={UsersScreen}
        options={() => ({
          title: 'Users',
          drawerLabel: 'Users',
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="people-outline"
              color={color}
              size={size}
              style={styles.icon}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={() => ({
          title: 'Profile',
          drawerLabel: 'Profile',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={size}
              style={styles.icon}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={() => ({
          title: 'Settings',
          drawerLabel: 'Settings',
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="settings-outline"
              color={color}
              size={size}
              style={styles.icon}
            />
          ),
        })}
      />
    </Drawer.Navigator>
  );
});

export default DrawerStackScreen;

const styles = StyleSheet.create({
  icon: {
    marginLeft: 16,
    marginRight: -16,
  },
});
