import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native';

import { useForm, Controller } from 'react-hook-form';
import { INITIAL_STATE_LOCAL } from '../store/constants';

import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';

import { actPermohonan } from '../store/actions/permohonanAction';
import { formatAmount } from '../core/ppt';

const SearchScreen = React.memo(({ navigation }) => {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();

  const [isData, setIsData] = useState({
    ...INITIAL_STATE_LOCAL,
    data: [],
    refreshing: false,
  });

  const paging = {
    page: 1,
  };

  const onLoadPermohonan = useCallback(
    (value, onIsDataChange) => dispatch(actPermohonan(value, onIsDataChange)),
    [dispatch],
  );

  const onIsDataChange = (value) => {
    setIsData((prevState) => ({
      ...prevState,
      ...value,
    }));
  };

  const onSearch = (value) => {
    Keyboard.dismiss();
    onLoadPermohonan(
      {
        ...paging,
        ...value,
      },
      onIsDataChange,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          paddingHorizontal: 16,
        }}>
        <View
          style={{
            backgroundColor: '#ffffff',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            marginVertical: 16,
            borderRadius: 10,
            elevation: 3,
          }}>
          <View>
            <TouchableOpacity onPress={handleSubmit(onSearch)}>
              <Icon name={'md-search'} style={{ fontSize: 24 }} />
            </TouchableOpacity>
          </View>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                multiline={true}
                style={{ fontSize: 24, marginLeft: 15, flex: 1 }}
                label="Search"
                placeholder="Search"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="search"
            rules={{ required: true }}
            defaultValue=""
          />
        </View>
      </View>

      <View style={styles.body}>
        {isData.loading && (
          <View style={styles.body}>
            <ActivityIndicator size="large" color="#ED64A6" />
          </View>
        )}
        <View>
          <FlatList
            style={{
              backgroundColor: '#ffffff',
            }}
            data={isData.data}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('MainStackScreen', {
                    screen: 'DetailStackScreen',
                    params: {
                      screen: 'DetailTabScreen',
                      params: {
                        permohonan_id: item.id,
                        nama_penerima: item.nama_penerima,
                        initialLayout: 'Detail',
                      },
                    },
                  });
                }}
                style={{
                  backgroundColor: '#EDF2F7',
                  borderRadius: 24,
                  marginVertical: 16,
                  elevation: 3,
                }}>
                <View
                  style={{
                    paddingVertical: 16,
                    paddingHorizontal: 16,
                  }}>
                  <View>
                    <Text style={styles.titleRows}>Tanggal</Text>
                    <Text style={styles.subTitleRows}>
                      {item.permoh_create}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.titleRows}>Nop</Text>
                    <Text style={styles.subTitleRows}>{item.nop}</Text>
                  </View>
                  <View>
                    <Text style={styles.titleRows}>Nama Penerima</Text>
                    <Text style={styles.subTitleRows}>
                      {item.nama_penerima}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.titleRows}>Nama Pemberi</Text>
                    <Text style={styles.subTitleRows}>{item.nama_pemberi}</Text>
                  </View>
                  <View>
                    <Text style={styles.titleRows}>Nama PPAT</Text>
                    <Text style={styles.subTitleRows}>{item.ppat}</Text>
                  </View>
                  <View>
                    <Text style={styles.titleRows}>Status</Text>
                    <View>
                      {item.status_verifikasi ? (
                        item.status_verifikasi.kode_verifikasi === 1 ? (
                          <Text
                            style={[
                              styles.subTitleRows,
                              {
                                backgroundColor: '#48BB78',
                                alignSelf: 'flex-start',
                                color: '#ffffff',
                                borderRadius: 16,
                                paddingHorizontal: 10,
                                paddingVertical: 2,
                              },
                            ]}>
                            {item.status_verifikasi.keterangan_verifikasi
                              ? item.status_verifikasi.keterangan_verifikasi
                              : '-'}
                          </Text>
                        ) : (
                          <Text
                            style={[
                              styles.subTitleRows,
                              {
                                backgroundColor: '#718096',
                                alignSelf: 'flex-start',
                                color: '#ffffff',
                                borderRadius: 16,
                                paddingHorizontal: 10,
                                paddingVertical: 2,
                              },
                            ]}>
                            {item.status_verifikasi.keterangan_verifikasi
                              ? item.status_verifikasi.keterangan_verifikasi
                              : '-'}
                          </Text>
                        )
                      ) : (
                        <Text
                          style={[
                            styles.subTitleRows,
                            {
                              backgroundColor: '#718096',
                              alignSelf: 'flex-start',
                              color: '#ffffff',
                              borderRadius: 16,
                              paddingHorizontal: 10,
                              paddingVertical: 2,
                            },
                          ]}>
                          -
                        </Text>
                      )}
                    </View>
                  </View>
                  <View>
                    <Text style={styles.titleRows}>Keterangan</Text>
                    <Text style={styles.subTitleRows}>{item.ket_permoh}</Text>
                  </View>
                  <View>
                    <Text style={styles.titleRows}>Jenis Perolehan</Text>
                    <Text style={styles.subTitleRows}>
                      {item.jenis_perolehan}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.titleRows}>Harga Transaksi</Text>
                    <Text
                      style={{
                        ...styles.subTitleRows,
                        fontSize: 24,
                        fontWeight: '700',
                      }}>
                      Rp.{' '}
                      {item.harga_transaksi
                        ? formatAmount(item.harga_transaksi)
                        : 0}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => `${item.uuid}oo`}
            ListFooterComponent={() => {
              return <View style={{ paddingBottom: 100 }} />;
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
});

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    paddingHorizontal: 24,
  },
  titleRows: {
    fontSize: 14,
    color: '#ED64A6',
    fontWeight: '700',
  },
  subTitleRows: {
    fontSize: 18,
    color: '#1A202C',
  },
});
