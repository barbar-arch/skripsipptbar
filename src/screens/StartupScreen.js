import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { actAuthenticate, actSetDidTryAL } from '../store/actions/authAction';
import { getObjData } from '../store/storage';

const StartupScreen = React.memo(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await getObjData();
      if (!userData) {
        dispatch(actSetDidTryAL());
        return;
      }
      dispatch(actAuthenticate(userData));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color="red" />
    </View>
  );
});

export default StartupScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
