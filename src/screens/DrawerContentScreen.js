import React, { useCallback } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { Avatar, Title, Caption } from 'react-native-paper';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import logoKota from '../assets/images/abott-adorable.png';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { actLogout } from '../store/actions/authAction';

import { useNavigation } from '@react-navigation/native';

const DrawerContent = React.memo(({ ...props }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const logout = useCallback(() => dispatch(actLogout()), [dispatch]);

  const signOut = () => {
    Alert.alert(
      'Logout',
      'Logout aplikasi?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            logout();
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 16 }}>
              <TouchableWithoutFeedback
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
                <Avatar.Image source={logoKota} size={55} />
              </TouchableWithoutFeedback>
              <View style={{ marginLeft: 16, flexDirection: 'column' }}>
                <Title style={styles.title}>Administrator</Title>
                <Caption style={styles.caption}>@administrator</Caption>
              </View>
            </View>
          </View>

          <View style={styles.drawerSection}>
            <DrawerItemList {...props} />
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          style={{
            marginLeft: 0,
            marginRight: 10,
            borderTopRightRadius: 24,
            borderBottomRightRadius: 24,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="exit-to-app"
              color={color}
              size={size}
              style={{
                marginLeft: 16,
                marginRight: -16,
              }}
            />
          )}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </View>
    </SafeAreaView>
  );
});

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: '500',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerSection: {
    marginTop: 16,
  },
  bottomDrawerSection: {
    marginBottom: 16,
    borderColor: '#edf2f7',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    margin: 0,
    padding: 0,
  },
});
