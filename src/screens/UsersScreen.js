import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';

import { Appbar } from 'react-native-paper';

import { INITIAL_STATE_LOCAL } from '../store/constants';

import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { actPpat } from '../store/actions/ppatAction';

type AvoidingViewProps = {
  navigation: StackNavigationProp<{}>,
};

const Item = React.memo(({ name, username, ...props }) => {
  const [taPressed, setTaPressed] = useState(false);

  const onTaPressed = () => {
    setTaPressed(!taPressed);
  };

  return (
    <View>
      <Pressable
        onPress={() => onTaPressed()}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#C3DAFEAA' : '#ffffff',
          },
          styles.wrapperCustom,
        ]}>
        <View style={styles.item}>
          <Text style={styles.title}>{name}</Text>
          <Text style={{ ...styles.title, fontSize: 18 }}>
            Tgl{' '}
            {props.created_at
              ? new Date(props.created_at)
                  .toLocaleString()
                  .split(',')[0]
                  .toString()
              : '-'}
          </Text>
        </View>
      </Pressable>
      {taPressed ? (
        <View style={styles.logBox}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text
              style={{
                fontSize: 12,
              }}>
              Nama PPAT :{' '}
            </Text>
            <Text
              style={{
                alignSelf: 'flex-start',
                flex: 1,
                fontSize: 14,
              }}>
              {name}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text
              style={{
                fontSize: 12,
              }}>
              Username :{' '}
            </Text>
            <Text
              style={{
                alignSelf: 'flex-start',
                flex: 1,
                fontSize: 14,
              }}>
              {'********'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text
              style={{
                fontSize: 12,
              }}>
              Alamat :{' '}
            </Text>
            <Text
              style={{
                alignSelf: 'flex-start',
                flex: 1,
                fontSize: 14,
              }}>
              {'Kota Gorontalo'}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
});

const UsersScreen = React.memo(({ navigation }: AvoidingViewProps) => {
  const dispatch = useDispatch();
  const [isData, setIsData] = useState({
    ...INITIAL_STATE_LOCAL,
    data: [],
    current_page: 0,
    per_page: 0,
    page_count: 0,
    total: 0,
    last_page: 0,
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
          <Appbar.Content title="Users PPAT" />
        </Appbar.Header>
      ),
    });
  }, [navigation]);

  const getUser = useCallback(
    (value, changeData) => dispatch(actPpat(value, changeData)),
    [dispatch],
  );

  useEffect(() => {
    getUser({ page: 1 }, changeData);
  }, []);

  const changeData = (value) => {
    setIsData(value);
  };

  const renderItem = ({ item }) => (
    <Item name={item.fullname_ppat} username={item.username_ppat} {...item} />
  );

  return (
    <SafeAreaView>
      <View style={{ ...styles.body, paddingHorizontal: 24 }}>
        <Text
          style={{
            fontSize: 32,
            marginVertical: 16,
            color: '#1A202C',
          }}>
          Data
        </Text>
      </View>

      <FlatList
        data={isData.data}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}pp`}
        ListFooterComponent={() => (
          <View>
            {isData.loading && (
              <ActivityIndicator size={75} color={'#7F9CF5'} />
            )}
            <View style={{ paddingBottom: 100 }} />
          </View>
        )}
      />
    </SafeAreaView>
  );
});

const Stack = createStackNavigator();

const UsersStakScreen = () => {
  return (
    <Stack.Navigator initialRouteName="UsersScreen">
      <Stack.Screen name="UsersScreen" component={UsersScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  body: {
    backgroundColor: '#ffffff',
  },
  item: {
    backgroundColor: '#7F9CF5',
    paddingHorizontal: 24,
    paddingVertical: 24,
    marginVertical: 12,
    marginHorizontal: 24,
    borderRadius: 16,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  logBox: {
    padding: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#EDF2F7',
    backgroundColor: '#F7FAFC',
  },
});

export default UsersStakScreen;
