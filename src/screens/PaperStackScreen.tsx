import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
} from './paper-ppt';

const PaperStack = createStackNavigator();

const PaperStackScreen = () => {
  return (
    <PaperStack.Navigator initialRouteName="HomePaperPpt">
      <PaperStack.Screen
        name="HomeScreenPaperPpt"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <PaperStack.Screen
        name="LoginScreenPaperPpt"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <PaperStack.Screen
        name="RegisterScreenPaperPpt"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
      <PaperStack.Screen
        name="ForgotPasswordScreenPaperPpt"
        component={ForgotPasswordScreen}
        options={{
          headerShown: false,
        }}
      />
      <PaperStack.Screen
        name="DashboardPaperPpt"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
    </PaperStack.Navigator>
  );
};

export default PaperStackScreen;
