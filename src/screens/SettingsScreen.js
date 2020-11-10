import * as React from 'react';
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  Alert,
} from 'react-native';
import { TextInput, Appbar, Button } from 'react-native-paper';
import { inputReducer } from '../store/inputReduce'; 
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

const initialState = {
  text: '',
  maxLengthName: '',
};

type AvoidingViewProps = {
  children: React.ReactNode,
  navigation: StackNavigationProp<{}>,
};

const TextInputAvoidingView = React.memo(({ children }: AvoidingViewProps) => {
  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior="padding"
      keyboardVerticalOffset={80}>
      {children}
    </KeyboardAvoidingView>
  ) : (
    <>{children}</>
  );
});

const SettingsScreen = React.memo(({ navigation }: AvoidingViewProps) => {
  const [state, dispatch] = React.useReducer(inputReducer, initialState);
  const {
    name,
    username,
    password_confirm,
    password,
    password_lama,
    flatTextArea,
    phone,
    email,
    nim,
  } = state;

  const inputActionHandler = (type: string, payload: string) =>
    dispatch({
      type: type,
      payload: payload,
    });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Appbar.Header
          style={{ backgroundColor: '#ffffff', elevation: 0 }}
          theme={{
            mode: 'exact',
          }}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Settings" />
        </Appbar.Header>
      ),
    });
  }, [navigation]);
  

  return (
    <TextInputAvoidingView>
      <ScrollView
        style={[styles.container, { backgroundColor: '#ffffff' }]}
        keyboardShouldPersistTaps={'always'}
        removeClippedSubviews={false}>
        <View
          style={{
            paddingBottom: 75,
          }}>
          <View
            style={{
              marginVertical: 24,
            }}>
            <Text
              style={{
                fontSize: 24,
              }}>
              Update profil data
            </Text>
          </View>
          <TextInput
            style={styles.inputContainerStyle}
            label="NIM"
            placeholder="NIM"
            value={nim ? nim : '75720010101'}
            onChangeText={(text) => inputActionHandler('nim', text)}
          />

          <TextInput
            style={styles.inputContainerStyle}
            label="Name"
            placeholder="Name"
            value={name ? name : 'Nurul Putri Ahmad'}
            onChangeText={(text) => inputActionHandler('name', text)}
          />

          <TextInput
            style={[styles.inputContainerStyle, styles.textArea]}
            label="Address"
            multiline
            placeholder="Address"
            value={flatTextArea ? flatTextArea : 'Jln. Pangeran Hidayat'}
            onChangeText={(flatTextArea) =>
              inputActionHandler('flatTextArea', flatTextArea)
            }
          />

          <TextInput
            style={styles.inputContainerStyle}
            label="Phone"
            placeholder="Phone"
            value={phone ? phone : '082187617384'}
            onChangeText={(text) => inputActionHandler('phone', text)}
          />

          <TextInput
            style={styles.inputContainerStyle}
            label="Email"
            placeholder="Email"
            value={email ? email : 'nurulputri.ahmad@gmail.com'}
            onChangeText={(text) => inputActionHandler('email', text)}
          />

          <TextInput
            style={styles.inputContainerStyle}
            label="Username"
            placeholder="Username"
            value={username ? username : '@ppt'}
            onChangeText={(text) => inputActionHandler('username', text)}
          />

          <TextInput
            style={styles.inputContainerStyle}
            label="Current Password"
            placeholder="Current Password"
            value={password_lama}
            onChangeText={(text) => inputActionHandler('password_lama', text)}
          />

          <TextInput
            style={styles.inputContainerStyle}
            label="New Password"
            placeholder="New Password"
            value={password}
            onChangeText={(text) => inputActionHandler('password', text)}
          />

          <TextInput
            style={styles.inputContainerStyle}
            label="Password Confirm"
            placeholder="Password Confirm"
            value={password_confirm}
            onChangeText={(text) =>
              inputActionHandler('password_confirm', text)
            }
          />

          <Button
            style={{
              backgroundColor: '#ED64A6',
              borderRadius: 10,
              elevation: 4,
              marginVertical: 16,
              marginHorizontal: 24,
            }}
            uppercase={false}
            color={'#ffffff'}
            contentStyle={{
              paddingVertical: 10,
            }}
            onPress={() => {
              Alert.alert(
                'Info',
                `Update poto profile!`,
              );
            }}>
            Update
          </Button>
        </View>
      </ScrollView>
    </TextInputAvoidingView>
  );
});

SettingsScreen.title = 'TextInput';

const Stack = createStackNavigator();

const SettingsStakScreen = () => {
  return (
    <Stack.Navigator initialRouteName="SettingsScreen">
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  helpersWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: {
    flex: 1,
  },
  helper: {
    flexShrink: 1,
  },
  counterHelper: {
    textAlign: 'right',
  },
  inputContainerStyle: {
    marginBottom: 16,
    backgroundColor: '#E2E8F0',
    color: '#1A202C',
  },
  fontSize: {
    fontSize: 24,
  },
  textArea: {
    height: 80,
  },
});

export default SettingsStakScreen;
