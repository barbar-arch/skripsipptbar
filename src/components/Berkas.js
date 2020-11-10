import React, { useCallback, useEffect, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableHighlight,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { actBerkas } from '../store/actions/permohonanAction';
import { INITIAL_STATE_LOCAL } from '../store/constants';

const RowItem = (props) => {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      activeOpacity={0.6}
      underlayColor="#edf2f7"
      style={{
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 11,
        paddingRight: 16,
        paddingVertical: 11,
        borderRadius: 16,
        backgroundColor: '#F7FAFC',
        marginTop: 5,
      }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={styles.content}>
          <Text style={styles.title}>{props.judul}</Text>
          <Text style={[styles.subtitle, { fontSize: 11, marginBottom: 5 }]}>
            {props.tgl_create
              ? ` Tanggal upload: ${new Date(props.tgl_create)
                  .toLocaleString()
                  .split(',')[0]
                  .toString()}`
              : '-'}
          </Text>
          {props.status_verifikasi === 1 ? (
            <Text
              style={{
                backgroundColor: '#48BB78',
                alignSelf: 'flex-start',
                color: '#ffffff',
                borderRadius: 16,
                paddingHorizontal: 10,
                fontSize: 10,
                paddingVertical: 1,
              }}>
              Sukses
            </Text>
          ) : (
            <Text
              style={{
                backgroundColor: '#718096',
                alignSelf: 'flex-start',
                color: '#ffffff',
                borderRadius: 16,
                paddingHorizontal: 10,
                fontSize: 10,
                paddingVertical: 1,
              }}>
              Belum Valid
            </Text>
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
};

const Berkas = React.memo((props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const permohonan = useSelector((state) => state.permohonan.detail);

  const [isData, setIsData] = useState({
    ...INITIAL_STATE_LOCAL,
    data: [],
    refreshing: false,
  });

  const berkas = useCallback(
    (value, changeData) => dispatch(actBerkas(value, changeData)),
    [dispatch],
  );

  useEffect(() => {
    if (permohonan) {
      berkas(permohonan.id, onIsDataChange);
    }
  }, [permohonan]);

  const onIsDataChange = (value) => {
    setIsData((prevState) => ({
      ...prevState,
      ...value,
    }));
  };

  const handleRefresh = (permohonan_id) => () => {
    setIsData((prevState) => ({
      ...prevState,
      refreshing: true,
    }));
    berkas(permohonan_id, onIsDataChange);
  };

  if (isData.loading) {
    return (
      <SafeAreaView>
        <View
          style={{
            marginTop: 32,
            paddingHorizontal: 24,
          }}>
          <ActivityIndicator size="large" color="#ED64A6" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.body}>
      <View
        style={{
          backgroundColor: '#ffffff',
        }}>
        <View
          style={{
            marginTop: 32,
            paddingHorizontal: 24,
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '600',
              color: '#1A202C',
            }}>
            Berkas Kelengkapan
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <View
          style={{
            paddingHorizontal: 24,
          }}>
          <Text style={{ ...styles.sectionDescription, marginBottom: 16 }}>
            Tracking berkas bphtb.
          </Text>
        </View>
      </View>

      <SafeAreaView style={styles.sectionContainer}>
        <FlatList
          data={isData.data}
          renderItem={({ item }) => {
            return (
              <RowItem
                onPress={() =>
                  // Alert.alert('Info Sementara', `data: ${JSON.stringify(item)}`)
                  navigation.navigate('MainStackScreen', {
                    screen: 'DetailStackScreen',
                    params: {
                      screen: 'BerkasScreen',
                      params: {
                        ...item,
                        id: item.id,
                        judul: item.judul,
                        file: item.file,
                        user: item.user,
                      },
                    },
                  })
                }
                {...item}
              />
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={isData.refreshing ? isData.refreshing : false}
              onRefresh={handleRefresh(permohonan?.id)}
            />
          }
          ListFooterComponent={() => <View style={{ paddingBottom: 350 }} />}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
});

export default Berkas;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: '#ffffff',
  },
  sectionContainer: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A202C',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#1A202C',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: '#1A202C',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
