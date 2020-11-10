import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        marginHorizontal: 16,
        paddingVertical: 12,
        elevation: 4,
      }}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.toggleDrawer());
          }}>
          <Ionicons
            style={{
              marginLeft: 16,
              alignContent: 'center',
            }}
            iconName="ios-home"
            name="md-menu"
            size={24}
            color="#1A202C"
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            marginLeft: 16,
            color: '#1A202C',
            fontWeight: '600',
          }}>
          Admin BPHTB
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginRight: 16,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('App', {
              screen: 'MainStackScreen',
              params: {
                screen: 'SearchScreen',
              },
            });
          }}>
          <Ionicons
            name="md-search"
            size={25}
            color="#1A202C"
            style={{
              marginRight: 16,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('App', {
              screen: 'MainStackScreen',
              params: {
                screen: 'DrawerStackScreen',
                params: {
                  screen: 'ProfileScreen',
                },
              },
            });
          }}>
          <MaterialCommunityIcons
            name="account-circle"
            size={25}
            color="#1A202C"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
