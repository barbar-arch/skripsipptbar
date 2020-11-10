import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import { INITIAL_STATE_LOCAL } from '../store/constants';
import { actLogin } from '../store/actions/authAction';

const Error = () => {
  return (
    <View style={[styles.error, { opacity: 1 }]}>
      <Text style={styles.errorText}>X</Text>
    </View>
  );
};

const AuthScreen = React.memo(() => {
  const dispatch = useDispatch();
  const [isData, setIsData] = useState(INITIAL_STATE_LOCAL);
  const { control, handleSubmit, errors } = useForm();

  const login = useCallback(
    (value, onChangeData) => dispatch(actLogin(value, onChangeData)),
    [dispatch],
  );

  const onAuth = (data) => {
    Keyboard.dismiss();
    login(data, onChangeData);
  };

  const onChangeData = (value) => {
    setIsData(value);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      keyboardVerticalOffset={25}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: 42,
        }}>
        <Text style={styles.headerText}>Login Administrator BPHTB</Text>
        <Text style={{ color: '#4A5568', fontSize: 12, marginBottom: 16 }}>
          Inputkan username dan password anda pada form dibawah ini.
        </Text>
        {isData.errors && (
          <Text style={{ color: '#ED64A6', fontSize: 12, marginBottom: 16 }}>
            Gagal login
          </Text>
        )}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Username</Text>
          <View style={styles.row}>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  label="Username"
                  placeholder="Username"
                  autoCapitalize="none"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="username"
              rules={{ required: true }}
              defaultValue=""
            />
            {errors.username && <Error />}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Username</Text>
          <View style={styles.row}>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  label="Password"
                  placeholder="***"
                  secureTextEntry
                  autoCapitalize="none"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="password"
              rules={{ required: true }}
              defaultValue=""
            />
            {errors.password && <Error />}
          </View>
        </View>
        <TouchableOpacity onPress={handleSubmit(onAuth)} style={styles.button}>
          {isData.loading && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                marginTop: 2,
                marginLeft: 2,
              }}>
              <ActivityIndicator size="small" color="#e2f8e0" />
            </View>
          )}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 16,
            }}>
            <Text style={styles.buttonText}>Masuk</Text>
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
});

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    color: '#1A202C',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: -4,
  },
  inputContainer: {
    backgroundColor: '#f4f6f8',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputLabel: {
    fontSize: 10,
    color: '#b4b6b8',
    paddingBottom: 2,
    marginBottom: -10,
  },
  input: {
    color: '#353031',
    fontWeight: '700',
    fontSize: 14,
    marginRight: 10,
    flex: 1,
    paddingBottom: 0,
  },
  error: {
    backgroundColor: '#f56565',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#718096',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});
