import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import NotificationsScreen from './NotificationsScreen';
import PermohonanScreen from './PermohonanScreen';

import database from '@react-native-firebase/database';

const Tabs = createBottomTabNavigator();

const HomeTabScreen = React.memo(() => {
  const [countNotifikasi, setCountNotifikasi] = useState(0);

  const onCountNotifikasi = (value) => {
    setCountNotifikasi(value);
  };

  useEffect(() => {
    const onValueChange = database()
      .ref(`/notifikasi`)
      .orderByChild('set_aktip')
      .equalTo(1)
      .on('value', (snapshot) => {
        onCountNotifikasi(snapshot.numChildren());
      });

    return () => database().ref(`/notifikasi`).off('value', onValueChange);
  }, []);

  return (
    <Tabs.Navigator
      initialRouteName="PermohonanScreen"
      tabBarOptions={{
        labelStyle: {
          marginBottom: 5,
        },
      }}>
      <Tabs.Screen
        name="PermohonanScreen"
        component={PermohonanScreen}
        options={{
          tabBarLabel: 'Permohonan',
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons
                name="email-outline"
                color={color}
                size={size}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{
          tabBarBadge: countNotifikasi
            ? countNotifikasi >= 99
              ? '99+'
              : countNotifikasi
            : 0,
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              style={{
                marginVertical: 100,
              }}
              name="bell-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
});

export default HomeTabScreen;
