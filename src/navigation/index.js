import React, { useCallback, useEffect } from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  useNavigation,
} from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { Alert } from 'react-native';

import messaging from '@react-native-firebase/messaging';

import DrawerStackScreen from '../screens/DrawerStackScreen';
import DetailTabScreen from '../screens/DetailTabScreen';

import InvoiceScreen from '../screens/InvoiceScreen';
import StartupScreen from '../screens/StartupScreen';
import AuthScreen from '../screens/AuthScreen';
import SearchScreen from '../screens/SearchScreen';
import BerkasScreen from '../screens/BerkasScreen';
import SspdScreen from '../screens/SspdScreen';

const MyTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#d53f8c',
    background: '#ffffff',
    card: '#ffffff',
    text: '#1a202c',
    border: '#f7fafc',
  },
};

const DetailStack = createStackNavigator();

const DetailStackScreen = () => {
  return (
    <DetailStack.Navigator>
      <DetailStack.Screen
        name="DetailTabScreen"
        component={DetailTabScreen}
        options={({ route }) => ({
          animationEnabled: false,
          title: route.params.nama_penerima || `Detail`,
          headerStyle: {
            backgroundColor: '#ffffff',
            shadowOpacity: 0,
            elevation: 0,
          },
          headerTintColor: '#1a202c',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 16,
          },
        })}
      />
      <DetailStack.Screen
        name="BerkasScreen"
        component={BerkasScreen}
        options={({ route }) => ({
          title: route.params.judul || `Berkas`,
          animationEnabled: false,
          headerStyle: {
            backgroundColor: '#ffffff',
            shadowOpacity: 0,
            elevation: 0,
          },
          headerTintColor: '#1a202c',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 16,
          },
          headerShown: true,
        })}
      />
      <DetailStack.Screen
        name="SspdScreen"
        component={SspdScreen}
        options={({ route }) => ({
          title: route.params.nama_penerima || `Cetak SSPD`,
          animationEnabled: false,
          headerStyle: {
            backgroundColor: '#ffffff',
            shadowOpacity: 0,
            elevation: 0,
          },
          headerTintColor: '#1a202c',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 16,
          },
          headerShown: true,
        })}
      />
    </DetailStack.Navigator>
  );
};

const MainStack = createStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        options={{
          animationEnabled: false,
          headerShown: false,
        }}
        name="DrawerStackScreen"
        component={DrawerStackScreen}
      />
      <MainStack.Screen
        options={{
          animationEnabled: false,
          headerShown: false,
        }}
        name="DetailStackScreen"
        component={DetailStackScreen}
      />
      <MainStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={() => ({
          animationEnabled: false,
          title: `Search`,
          headerStyle: {
            backgroundColor: '#ffffff',
            shadowOpacity: 0,
            elevation: 0,
          },
          headerTintColor: '#1a202c',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 16,
          },
          headerShown: true,
        })}
      />
    </MainStack.Navigator>
  );
}

messaging().setBackgroundMessageHandler(async () => null);

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
  if (enabled) {
    messaging().subscribeToTopic('ppat');
  }
}

const RootStack = createStackNavigator();

function RootNavigation() {
  const isAuth = useSelector((state) => !!state.auth.access_token);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

  const navigation = useNavigation();

  const klikItem = useCallback(
    (remoteMessage) => {
      navigation.navigate('MainStackScreen', {
        screen: 'DetailStackScreen',
        params: {
          screen: 'DetailTabScreen',
          params: {
            permohonan_id: remoteMessage.data.id,
            nama_penerima: remoteMessage.data.nama,
            initialLayout: 'Detail',
          },
        },
      });
    },
    [navigation],
  );

  useEffect(() => {
    requestUserPermission();

    messaging().onNotificationOpenedApp(() => null);

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          klikItem(remoteMessage);
        }
      });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert(
        `${remoteMessage.notification.title}`,
        `${remoteMessage.notification.body}`,
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'Detail', onPress: () => klikItem(remoteMessage) },
        ],
        { cancelable: false },
      );
    });

    return unsubscribe;
  }, []);

  return (
    <RootStack.Navigator
      headerMode="none"
      mode="modal"
      screenOptions={() => {
        return {
          gestureEnabled: true,
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        };
      }}>
      {isAuth && (
        <>
          <RootStack.Screen
            name="MainStackScreen"
            component={MainStackScreen}
            options={{
              animationEnabled: false,
            }}
          />
          <RootStack.Screen name="MyModal" component={InvoiceScreen} />
        </>
      )}

      {!isAuth && didTryAutoLogin && (
        <RootStack.Screen name="AuthScreen" component={AuthScreen} />
      )}

      {!isAuth && !didTryAutoLogin && (
        <RootStack.Screen name="StartupScreen" component={StartupScreen} />
      )}
    </RootStack.Navigator>
  );
}

const NavigationStack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer theme={MyTheme}>
      <NavigationStack.Navigator headerMode={'none'}>
        <NavigationStack.Screen name="App" component={RootNavigation} />
      </NavigationStack.Navigator>
    </NavigationContainer>
  );
}
