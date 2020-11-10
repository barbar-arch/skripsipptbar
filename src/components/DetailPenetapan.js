import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  RefreshControl,
  Image,
  Alert,
  ToastAndroid,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import { Button } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { actDetailPermohonan } from '../store/actions/permohonanAction';

import { INITIAL_STATE_LOCAL } from '../store/constants';
import { formatAmount } from '../core/ppt';
import TextAreaInput from './paper-ppt/TextAreaInput';
import { actHapusPenetapan, actProsesPenetapan } from '../store/actions/penetapanAction';

const Detail = ({ data, onSetModalVisible, hapusPenetapan, detail }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.body}>
      <View style={[styles.rowContainer, styles.sectionContainer]}>
        <View style={styles.row}>
          <View style={[styles.col, styles.bgGray, styles.roundedLg, styles.p]}>
            <Text style={styles.sectionTitle}>STATUS PENETAPAN</Text>
          </View>
        </View>
        <View style={[styles.row, styles.mt]}>
          <View style={[styles.col, styles.px]}>
            <Text style={styles.textSm}>Keterangan</Text>
          </View>
          <View style={[styles.colMd, styles.px]}>
            <Text style={styles.textXs}>
              {data.ket_penet ? data.ket_penet : '-'}
            </Text>
          </View>
        </View>
        <View style={[styles.row, styles.mt]}>
          <View style={[styles.col, styles.px]}>
            <Text style={styles.textSm}>Status</Text>
          </View>
          <View style={[styles.colMd, styles.px]}>
            {data.penetapan ? (
              data.penetapan.valid_penetapan === 1 ? (
                <Text
                  style={[
                    styles.textXs,
                    {
                      backgroundColor: '#48BB78',
                      alignSelf: 'flex-start',
                      color: '#ffffff',
                      borderRadius: 16,
                      paddingHorizontal: 10,
                      paddingVertical: 2,
                    },
                  ]}>
                  {data.penetapan.status_verifikasi
                    ? data.penetapan.status_verifikasi.keterangan_verifikasi
                    : 'Sukses'}
                </Text>
              ) : (
                <Text
                  style={[
                    styles.textXs,
                    {
                      backgroundColor: '#718096',
                      alignSelf: 'flex-start',
                      color: '#ffffff',
                      borderRadius: 16,
                      paddingHorizontal: 10,
                      paddingVertical: 2,
                    },
                  ]}>
                  {data.penetapan.status_verifikasi
                    ? data.penetapan.status_verifikasi.keterangan_verifikasi
                    : 'Belum Valid'}
                </Text>
              )
            ) : (
              <Text
                style={[
                  styles.textXs,
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
        <View style={[styles.row, styles.mt]}>
          <View style={[styles.col, styles.px]}>
            <Text style={styles.textSm}>Tanggal</Text>
          </View>
          <View style={[styles.colMd, styles.px]}>
            <Text style={styles.textXs}>
              {data.penet_create
                ? new Date(data.penet_create)
                    .toLocaleString()
                    .split(',')[0]
                    .toString()
                : '-'}
            </Text>
          </View>
        </View>
        <View style={[styles.row, styles.mt]}>
          <View style={[styles.col, styles.px]}>
            <Button
              style={{
                alignSelf: 'flex-start',
                backgroundColor: '#ED64A6',
                borderRadius: 10,
                elevation: 4,
                marginTop: 16,
              }}
              color="#ffffff"
              uppercase={false}
              onPress={() => {
                onSetModalVisible();
              }}>
              Update Status
            </Button>
          </View>
          <View style={[styles.col, styles.px]}>
            <Button
              style={{
                alignSelf: 'flex-start',
                backgroundColor: '#ED64A6',
                borderRadius: 10,
                elevation: 4,
                marginTop: 16,
              }}
              color="#ffffff"
              uppercase={false}
              onPress={() => {
                if (data.penetapan) {
                  if (data.penetapan.valid_penetapan === 1) {
                    if (data.pembayaran) {
                      if (data.pembayaran.status_lunas === 1) {
                        navigation.navigate('MainStackScreen', {
                          screen: 'DetailStackScreen',
                          params: {
                            screen: 'SspdScreen',
                            params: {
                              id: data.penetapan.id,
                              nama_penerima: data.nama_penerima,
                            },
                          },
                        });
                      } else {
                        Alert.alert('Info', 'Belum lunas');
                      }
                    } else {
                      Alert.alert('Info', 'Belum create va.');
                    }
                  } else {
                    Alert.alert('Info', 'Penetapan belum valid.');
                  }
                } else {
                  Alert.alert('Info', 'Belum ada penetapan!');
                }
              }}>
              Cetak SSPD
            </Button>
          </View>
        </View>
      </View>

      <View style={[styles.rowContainer, styles.sectionContainer]}>
        <View style={styles.row}>
          <View style={[styles.col, styles.bgGray, styles.roundedLg, styles.p]}>
            <Text style={styles.sectionTitle}>DATA PENERIMA</Text>
          </View>
        </View>
        <View style={[styles.row, styles.mt]}>
          <View style={[styles.col, styles.px]}>
            <Text style={styles.textSm}>NIK</Text>
          </View>
          <View style={[styles.colMd, styles.px]}>
            <Text style={styles.textXs}>{data.nik_penerima}</Text>
          </View>
        </View>
        <View style={[styles.row, styles.mt]}>
          <View style={[styles.col, styles.px]}>
            <Text style={styles.textSm}>Nama</Text>
          </View>
          <View style={[styles.colMd, styles.px]}>
            <Text style={styles.textXs}>{data.nama_penerima}</Text>
          </View>
        </View>
        <View style={[styles.row, styles.mt]}>
          <View style={[styles.col, styles.px]}>
            <Text style={styles.textSm}>Alamat</Text>
          </View>
          <View style={[styles.colMd, styles.px]}>
            <Text style={styles.textXs}>{data.alamat_penerima}</Text>
          </View>
        </View>
        <View style={[styles.row, styles.mt]}>
          <View style={[styles.col, styles.px]}>
            <Text style={styles.textSm}>Nomor Telfon</Text>
          </View>
          <View style={[styles.colMd, styles.px]}>
            <Text style={styles.textXs}>{data.notelp_penerima}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.rowContainer, styles.sectionContainer]}>
        <View style={styles.row}>
          <View style={[styles.col, styles.bgGray, styles.roundedLg, styles.p]}>
            <Text style={styles.sectionTitle}>DATA OBJEK PAJAK</Text>
          </View>
        </View>
        <View style={[styles.row, styles.mt]}>
          <View style={[styles.col, styles.px]}>
            <Text style={styles.textSm}>Nomor Objek Pajak</Text>
          </View>
          <View style={[styles.col, styles.px]}>
            <Text style={styles.textXs}>{data.nop}</Text>
          </View>
        </View>
        <View style={[styles.row, styles.mt]}>
          <View style={[styles.col, styles.px]}>
            <Text style={styles.textSm}>Nama Objek Pajak</Text>
          </View>
          <View style={[styles.col, styles.px]}>
            <Text style={styles.textXs}>{data.nama_op}</Text>
          </View>
        </View>
        <View style={[styles.row, styles.mt]}>
          <View style={[styles.col, styles.px]}>
            <Text style={styles.textSm}>Letak Tanah dan Bangunan</Text>
          </View>
          <View style={[styles.col, styles.px]}>
            <Text style={styles.textXs}>{data.lokasi_op}</Text>
          </View>
        </View>

        <View style={[styles.row, styles.mt]}>
          <View style={[styles.col, styles.px]}>
            <View style={styles.row}>
              <View
                style={[styles.col, styles.bgGray, styles.roundedLg, styles.p]}>
                <Text style={styles.sectionTitleSubtitle}>
                  PERHITUNGAN NJOP (BPHTB)
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.row,
                styles.mt,
                { borderBottomWidth: 0.7, borderBottomColor: '#CBD5E0' },
              ]}>
              <View style={[styles.col, styles.pxXs]}>
                <Text style={styles.textXs}>Uraian</Text>
              </View>
              <View style={[styles.col, styles.pxXs]}>
                <Text style={[styles.textXs, styles.textRight]}>Luas (m2)</Text>
              </View>
              <View style={[styles.col, styles.pxXs]}>
                <Text style={[styles.textXs, styles.textRight]}>
                  NJOP PBB (m2)
                </Text>
              </View>
              <View style={[styles.col, styles.pxXs]}>
                <Text style={[styles.textXs, styles.textRight]}>
                  Luas X NJOP PBB (m2)
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.row,
                styles.mt,
                { borderBottomWidth: 0.7, borderBottomColor: '#CBD5E0' },
              ]}>
              <View style={[styles.col, styles.pxXs]}>
                <Text style={styles.textXs}>Tanah</Text>
              </View>
              <View style={[styles.col, styles.pxXs]}>
                <Text style={[styles.textXs, styles.textRight]}>
                  {data.tanah_dialihkan}
                </Text>
              </View>
              <View style={[styles.col, styles.pxXs]}>
                <Text style={[styles.textXs, styles.textRight]}>
                  {`${formatAmount(data.njop_tanah_op)}`}
                </Text>
              </View>
              <View style={[styles.col, styles.pxXs]}>
                <Text style={[styles.textXs, styles.textRight]}>
                  {`${formatAmount(data.hitung_njop_tanah)}`}
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.row,
                styles.mt,
                { borderBottomWidth: 0.7, borderBottomColor: '#CBD5E0' },
              ]}>
              <View style={[styles.col, styles.pxXs]}>
                <Text style={styles.textXs}>Bangunan</Text>
              </View>
              <View style={[styles.col, styles.pxXs]}>
                <Text style={[styles.textXs, styles.textRight]}>
                  {data.bng_dialihkan}
                </Text>
              </View>
              <View style={[styles.col, styles.pxXs]}>
                <Text style={[styles.textXs, styles.textRight]}>
                  {`${formatAmount(data.njop_bangunan_op)}`}
                </Text>
              </View>
              <View style={[styles.col, styles.pxXs]}>
                <Text style={[styles.textXs, styles.textRight]}>
                  {`${formatAmount(data.hitung_njop_bng)}`}
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.row,
                styles.mt,
                { borderBottomWidth: 0.7, borderBottomColor: '#CBD5E0' },
              ]}>
              <View style={[styles.col, styles.pxXs]}>
                <Text style={[styles.textXs, styles.textLeft]}>
                  {`Analisis NJOP`}
                </Text>
              </View>
              <View style={[{ ...styles.col, flex: 2 }, styles.pxXs]}>
                <Text style={[styles.textXs, styles.textRight]}>
                  {`${formatAmount(data.analisis_njop_pbb)}`}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.row, styles.mt]}>
          <View style={[styles.colMd, styles.px]}>
            <Text style={styles.textSm}>Harga Transaksi</Text>
          </View>
          <View style={[styles.col, styles.px]}>
            <Text style={styles.textXs}>{`Rp. ${formatAmount(
              data.harga_transaksi,
            )}`}</Text>
          </View>
        </View>
        <View style={[styles.row, styles.mt]}>
          <View style={[styles.colMd, styles.px]}>
            <Text style={styles.textSm}>
              Jenis Perolehan Hak Atas Tanah dan atau Bangunan
            </Text>
          </View>
          <View style={[styles.col, styles.px]}>
            <Text
              style={
                styles.textXs
              }>{`${data.kode_jn_simda} ${data.jenis_perolehan}`}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.rowContainer, styles.sectionContainer]}>
        <View style={styles.row}>
          <View style={[styles.col, styles.bgGray, styles.roundedLg, styles.p]}>
            <Text style={styles.sectionTitle}>PERHITUNGAN BPHTB</Text>
          </View>
        </View>
        <View style={[styles.row, styles.mt]}>
          <View style={[{ flex: 2, alignSelf: 'stretch' }, styles.px]}>
            <Text style={styles.textSm}>
              1. Nilai Perolehan Objek Pajak (NPOP)
            </Text>
          </View>
          <View style={[styles.col, styles.px]}>
            <Text style={[styles.textXs, styles.textRight]}>
              {`Rp. ${formatAmount(data.penetapan.penetapan_npop)}`}
            </Text>
          </View>
        </View>
        <View style={[styles.row, styles.mt]}>
          <View style={[{ flex: 2, alignSelf: 'stretch' }, styles.px]}>
            <Text style={styles.textSm}>
              2. Nilai Perolehan Objek Pajak Tidak Kena Pajak (NPOPTKP)
            </Text>
          </View>
          <View style={[styles.col, styles.px]}>
            <Text style={[styles.textXs, styles.textRight]}>
              {`Rp. ${formatAmount(data.penetapan.penetapan_npoptkp)}`}
            </Text>
          </View>
        </View>
        <View style={[styles.row, styles.mt]}>
          <View style={[{ flex: 2, alignSelf: 'stretch' }, styles.px]}>
            <Text style={styles.textSm}>
              <Text style={{ fontSize: 12 }}>3.</Text> Nilai Perolehan Objek
              Pajak Kena Pajak (NPOPKP) (Angka 1 - Angka 2)
            </Text>
          </View>
          <View style={[styles.col, styles.px]}>
            <Text style={[styles.textXs, styles.textRight]}>
              {`Rp. ${formatAmount(data.penetapan.penetapan_npopkp)}`}
            </Text>
          </View>
        </View>
        <View style={[styles.row, styles.mt]}>
          <View style={[{ flex: 2, alignSelf: 'stretch' }, styles.px]}>
            <Text style={styles.textSm}>
              4. Bea Perolehan hak atas tanah dan Bangunan yang terhutang (5% x
              Angka 3)
            </Text>
          </View>
          <View style={[styles.col, styles.px]}>
            <Text style={[styles.textXs, styles.textRight]}>
              {`Rp. ${formatAmount(data.penetapan.penetapan_bphtb)}`}
            </Text>
          </View>
        </View>
        <View style={[styles.row, styles.mt]}>
          <View style={[{ flex: 2, alignSelf: 'stretch' }, styles.px]}>
            <Text style={styles.textSm}>
              5. Pengenaan 50 % Kena Waris/hibah wasiat/pemberian hak
              pengelolaan
            </Text>
          </View>
          <View style={[styles.col, styles.px]}>
            <Text style={[styles.textXs, styles.textRight]}>{`Rp. 0`}</Text>
          </View>
        </View>
        <View style={[styles.row, styles.mt]}>
          <View style={[{ flex: 2, alignSelf: 'stretch' }, styles.px]}>
            <Text style={styles.textSm}>
              6. Bea Perolehan Hak atas Tanah dan atau Bangunan yang harus
              dibayar
            </Text>
          </View>
          <View style={[styles.col, styles.px]}>
            <Text style={[styles.textXs, styles.textRight]}>
              {`Rp. ${formatAmount(data.penetapan.bphtb_yghrsdibayar)}`}
            </Text>
          </View>
        </View>
        <View style={[styles.row, styles.mt]}>
          <View style={[styles.col, styles.px]}>
            <Button
              style={{
                alignSelf: 'flex-start',
                backgroundColor: '#ED64A6',
                borderRadius: 10,
                elevation: 4,
                marginTop: 16,
              }}
              color="#ffffff"
              uppercase={false}
              onPress={() => {
                if (data.penetapan) {
                  if (data.penetapan.valid_penetapan === 1) {
                    if (data.pembayaran) {
                      if (data.pembayaran.status_lunas === 1) {
                        Alert.alert('Info', 'Tidak dapat menghapus data.');
                      } else {
                        Alert.alert('Info', 'Tidak dapat menghapus data.');
                      }
                    } else {
                      Alert.alert('Info', 'Tidak dapat menghapus data.');
                    }
                  } else {
                    Alert.alert(
                      'Info',
                      'Hapus Penetapan?',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => null,
                          style: 'cancel',
                        },
                        {
                          text: 'OK',
                          onPress: () => {
                            hapusPenetapan({ id: data.id }, (value) => {
                              if (value.data) {
                                Alert.alert(
                                  'Info',
                                  'Berhasil menghapus data!',
                                  [
                                    {
                                      text: 'OK',
                                      onPress: () =>
                                        detail(data.id, () => null),
                                    },
                                  ],
                                  { cancelable: false },
                                );
                              }

                              if (value.errors) {
                                Alert.alert('Info', 'Gagal menghapus data!');
                              }
                            });
                          },
                        },
                      ],
                      { cancelable: false },
                    );
                    
                  }
                } else {
                  Alert.alert('Info', 'Belum ada penetapan!');
                }
              }}>
              Hapus Penetapan
            </Button>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.rowContainer,
          styles.sectionContainer,
          { paddingBottom: 75 },
        ]}>
        <View style={styles.row}>
          <View style={[styles.col, styles.bgGray, styles.roundedLg, styles.p]}>
            <Text style={styles.sectionTitle}>FOTO OBJEK PAJAK</Text>
          </View>
        </View>
        <View style={[styles.row, styles.mt]}>
          <View style={[{ flex: 1, alignSelf: 'stretch' }, styles.px]}>
            {data.foto_op ? (
              <Image
                source={{ uri: data.foto_op }}
                style={{ width: 200, height: 400 }}
              />
            ) : (
              <Text style={[styles.textXs, styles.textRight]}>
                Belum upload foto!
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const DetailPenetapan = React.memo((props) => {
  const [isData, setIsData] = useState({
    ...INITIAL_STATE_LOCAL,
    refreshing: false,
  });
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [statusLunas, setStatusLunas] = useState('0');
  const [keterangan, setKeterangan] = useState('-');
  const [prosesPenetapanData, setProsesPenetapanData] = useState(
    INITIAL_STATE_LOCAL,
  );
  const data = useSelector((state) => state.permohonan.detail);

  const detail = useCallback(
    (value, changeData) => dispatch(actDetailPermohonan(value, changeData)),
    [dispatch],
  );

  const hapusPenetapan = useCallback(
    (value, changeData) => dispatch(actHapusPenetapan(value, changeData)),
    [dispatch],
  );

  const prosesPenetapan = useCallback(
    (value, changeProsesPenetapan) =>
      dispatch(actProsesPenetapan(value, changeProsesPenetapan)),
    [dispatch],
  );

  useEffect(() => {
    if (prosesPenetapanData.data) {
      ToastAndroid.show('Berhasil proses penetapan!', ToastAndroid.SHORT);
    }

    if (prosesPenetapanData.errors) {
      ToastAndroid.show('Gagal proses penetapan!', ToastAndroid.SHORT);
    }
  }, [prosesPenetapanData]);

  const onChangeData = (value) => {
    setIsData(value);
  };

  const onChangeProsesPenetapan = (value) => {
    setProsesPenetapanData(value);
  };

  const onHandleProsesPenetapan = (data) => {
    prosesPenetapan(
      {
        ...data,
        id_penetapan_id: data.penetapan.id || 0,
        status: statusLunas,
        keterangan: keterangan,
      },
      onChangeProsesPenetapan,
    );
  };

  const onSetModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  const handleRefresh = (id) => () => {
    setIsData((prevState) => ({
      ...prevState,
      refreshing: true,
    }));
    detail(id, onChangeData);
  };

  const onSetKeterangan = (value) => {
    setKeterangan(value);
  };

  const onSetStatusLunas = (value) => {
    setStatusLunas(value);
  };

  const onSetModalVisibleIni = (value) => {
    setModalVisible(value);
  };

  if (!data) {
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
    <>
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isData.refreshing ? isData.refreshing : false}
              onRefresh={handleRefresh(data.id)}
            />
          }
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View
            style={{
              backgroundColor: '#ffffff',
              flex: 1,
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
                Detail Penetapan
              </Text>
            </View>
          </View>

          {data.penetapan ? (
            <Detail
              data={data}
              onSetModalVisible={onSetModalVisible}
              hapusPenetapan={hapusPenetapan}
              detail={detail}
            />
          ) : (
            <View
              style={{
                flex: 1,
                backgroundColor: '#ffffff',
              }}>
              <View
                style={{
                  flex: 1,
                  marginVertical: 16,
                  marginHorizontal: 24,
                  backgroundColor: '#4A5568',
                  elevation: 4,
                  borderRadius: 16,
                }}>
                <Text
                  style={{
                    fontSize: 24,
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    color: '#F7FAFC',
                  }}>
                  Data ini belum ada Penetapan!
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal belum ta klos.');
        }}>
        <KeyboardAvoidingView
          behavior={'height'}
          keyboardVerticalOffset={25}
          style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.centeredView}>
              <View style={{ ...styles.modalView, width: '95%' }}>
                <Text style={{ fontSize: 24 }}>Status Penetapan</Text>
                <View
                  style={{
                    marginVertical: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#EDF2F7',
                      borderBottomWidth: 1,
                      borderBottomColor: '#A0AEC0',
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                    }}>
                    <View
                      style={{
                        paddingHorizontal: 10,
                        paddingTop: 10,
                      }}>
                      <Text style={{ fontSize: 11, color: '#718096' }}>
                        Status
                      </Text>
                    </View>
                    <Picker
                      style={{
                        height: 25,
                        fontSize: 11,
                        marginBottom: 5,
                      }}
                      itemStyle={{
                        fontSize: 12,
                      }}
                      mode="dropdown"
                      selectedValue={statusLunas}
                      prompt="Pick one, just one"
                      onValueChange={(itemValue, itemIndex) =>
                        onSetStatusLunas(itemValue)
                      }>
                      <Picker.Item label="-" value="0" />
                      <Picker.Item label="Sukses" value="1" />
                      <Picker.Item label="Tertunda" value="2" />
                      <Picker.Item label="Belum Valid" value="3" />
                      <Picker.Item label="Menuggu" value="4" />
                      <Picker.Item label="Penijauan" value="6" />
                      <Picker.Item label="Lainnya" value="5" />
                    </Picker>
                  </View>

                  <TextAreaInput
                    label="Keterangan"
                    onChangeText={(text) => onSetKeterangan(text)}
                  />
                </View>

                <View>
                  <Button
                    disabled={prosesPenetapanData.loading}
                    loading={prosesPenetapanData.loading}
                    style={{
                      alignSelf: 'flex-start',
                      backgroundColor: '#ED64A6',
                      borderRadius: 10,
                      elevation: 4,
                      marginTop: 16,
                    }}
                    color="#ffffff"
                    uppercase={false}
                    onPress={() => {
                      Keyboard.dismiss();
                      onHandleProsesPenetapan(data);
                    }}>
                    Simpan
                  </Button>

                  <Button
                    disabled={prosesPenetapanData.loading}
                    style={{
                      alignSelf: 'flex-start',
                      backgroundColor: '#A0AEC0',
                      borderRadius: 10,
                      elevation: 4,
                      marginTop: 16,
                    }}
                    color="#ffffff"
                    uppercase={false}
                    onPress={() => {
                      onSetModalVisibleIni(!modalVisible);
                      if (prosesPenetapanData.data) {
                        onSetKeterangan('-');
                        onSetStatusLunas('0');
                        onChangeProsesPenetapan(INITIAL_STATE_LOCAL);
                        detail(data.id, onChangeData);
                      }
                    }}>
                    Batal
                  </Button>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
    width: '100%',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalView: {
    margin: 24,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 24,
    shadowColor: '#1A202C',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A0AEC0AA',
  },
  btnContainer: {
    backgroundColor: '#ED64A6',
    marginVertical: 10,
    borderRadius: 10,
  },
  sectionContainer: {
    marginVertical: 24,
    paddingHorizontal: 24,
  },
  rowContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  rowBase: {
    flex: 1,
    width: '100%',
  },
  col: {
    flex: 1,
    alignSelf: 'stretch',
  },
  colMd: {
    flex: 2,
    alignSelf: 'stretch',
  },
  flexStart: {
    alignSelf: 'flex-start',
  },
  flexEnd: {
    alignSelf: 'flex-end',
  },
  bgGray: {
    backgroundColor: '#edf2f7',
  },
  textWhite: {
    color: '#ffffff',
  },
  roundedLg: {
    borderRadius: 5,
  },
  p: {
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  px: {
    paddingHorizontal: 10,
  },
  pxXs: {
    paddingHorizontal: 2,
  },
  py: {
    paddingHorizontal: 1,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1a202c',
  },
  sectionTitleSubtitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1a202c',
  },
  textSm: {
    fontSize: 12,
  },
  textXs: {
    fontSize: 10,
  },
  textBase: {
    fontSize: 16,
  },
  mt: {
    marginTop: 5,
  },
  borderBottom: {
    borderWidth: 1,
    borderColor: '#A0AEC0',
  },
  textRight: {
    textAlign: 'right',
  },
  textCenter: {
    textAlign: 'center',
  },
  flexMd: {
    flex: 2,
  },
});

export default DetailPenetapan;
