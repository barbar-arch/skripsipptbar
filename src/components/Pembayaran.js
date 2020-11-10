import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Modal,
  Platform,
  ActivityIndicator,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';

import DateTimePicker from '@react-native-community/datetimepicker';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { actDetailPermohonan } from '../store/actions/permohonanAction';

import { INITIAL_STATE_LOCAL } from '../store/constants';
import {
  formatAmount,
  formatTanggalIndo,
  formatTanggalIndomaret,
} from '../core/ppt';
import TextAreaInput from './paper-ppt/TextAreaInput';
import { actCreateVa, actHapusInv, actProssBayar } from '../store/actions/bayarAction';

const Bayar = ({
  data,
  onShowModal,
  bayarBayarData,
  detail,
  bayarBayar,
  onSetChangeBayarBayarData,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const hpsDataInv = useCallback(
    (value, onChangeData) => dispatch(actHapusInv(value, onChangeData)),
    [dispatch],
  );

  return (
    <>
      <View style={styles.body}>
        <View style={[styles.rowContainer, styles.sectionContainer]}>
          <View style={styles.row}>
            <View
              style={[styles.col, styles.bgGray, styles.roundedLg, styles.p]}>
              <Text style={styles.sectionTitle}>STATUS PEMBAYARAN</Text>
            </View>
          </View>
          <View style={[styles.row, styles.mt]}>
            <View style={[styles.col, styles.px]}>
              <Text style={styles.textSm}>Keterangan</Text>
            </View>
            <View style={[styles.colMd, styles.px]}>
              <Text style={styles.textXs}>
                {data.pembayaran
                  ? data.pembayaran.keterangan_pembayaran
                    ? data.pembayaran.keterangan_pembayaran
                    : 'Silahkan cetak kode bayar'
                  : 'Belum cetak kode bayar'}
              </Text>
            </View>
          </View>
          <View style={[styles.row, styles.mt]}>
            <View style={[styles.col, styles.px]}>
              <Text style={styles.textSm}>Status</Text>
            </View>
            <View style={[styles.colMd, styles.px]}>
              {data.pembayaran ? (
                data.pembayaran.status_lunas === 1 ? (
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
                    Lunas
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
                    Belum Lunas
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
                  Belum create va
                </Text>
              )}
            </View>
          </View>
          <View style={[styles.row, styles.mt]}>
            <View style={[styles.col, styles.px]}>
              <Text style={styles.textSm}>Tanggal Create</Text>
            </View>
            <View style={[styles.colMd, styles.px]}>
              <Text style={styles.textXs}>
                {data.pembayaran
                  ? data.pembayaran.created_at
                    ? new Date(data.pembayaran.created_at)
                        .toLocaleString()
                        .split(',')[0]
                        .toString()
                    : '-'
                  : '-'}
              </Text>
            </View>
          </View>
          <View style={[styles.row, styles.mt]}>
            <View style={[styles.col, styles.px]}>
              <Text style={styles.textSm}>Tanggal Bayar</Text>
            </View>
            <View style={[styles.colMd, styles.px]}>
              <Text style={styles.textXs}>
                {data.pembayaran
                  ? data.pembayaran.tanggal_bayar
                    ? formatTanggalIndomaret(data.pembayaran.tanggal_bayar)
                    : '-'
                  : '-'}
              </Text>
            </View>
          </View>
          {data.pembayaran ? (
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
                    onShowModal();
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
                    navigation.navigate('MyModal', {
                      ...data,
                    });
                  }}>
                  Cetak
                </Button>
              </View>
            </View>
          ) : (
            <View style={[styles.row, styles.mt]}>
              <View style={[styles.col, styles.px]}>
                <Button
                  disabled={bayarBayarData.loading}
                  loading={bayarBayarData.loading}
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
                    Alert.alert(
                      'Info',
                      'Create Va',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => null,
                          style: 'cancel',
                        },
                        {
                          text: 'OK',
                          onPress: () =>
                            bayarBayar(
                              {
                                id_penetapan_bar: data.penetapan.id,
                              },
                              (value) => {
                                onSetChangeBayarBayarData(value);
                                if (value.data) {
                                  Alert.alert(
                                    'Info',
                                    'Berhasil create va!',
                                    [
                                      {
                                        text: 'OK',
                                        onPress: () => {
                                          detail(data.id, () => null);
                                        },
                                      },
                                    ],
                                    { cancelable: false },
                                  );
                                }

                                if (value.errors) {
                                  Alert.alert('Info', 'Gagal create va!');
                                }
                              },
                            ),
                        },
                      ],
                      { cancelable: false },
                    );
                  }}>
                  Create va
                </Button>
              </View>
            </View>
          )}
        </View>

        {data.pembayaran ? (
          <>
            <View
              style={{
                backgroundColor: '#ffffff',
                flex: 1,
              }}>
              <View
                style={{
                  paddingHorizontal: 24,
                }}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: '600',
                    color: '#1A202C',
                    textAlign: 'center',
                  }}>
                  Jumlah Bayar:
                </Text>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: '600',
                    color: '#1A202C',
                    textAlign: 'center',
                  }}>
                  {`Rp. ${formatAmount(data.pembayaran.jumlah_bayar)}`}
                </Text>
              </View>
            </View>

            <View
              style={{
                marginTop: 16,
                paddingHorizontal: 24,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: '#1A202C',
                  textAlign: 'left',
                }}>
                Lakukan pembayaran di salah satu gerai retail di bawah ini
                dengan biaya layanan berikut:
              </Text>
            </View>

            <View
              style={[
                styles.rowContainer,
                styles.sectionContainer,
                { marginVertical: 10 },
              ]}>
              <View
                style={[
                  styles.row,
                  styles.mt,
                  styles.roundedLg,
                  styles.p,
                  { backgroundColor: '#F7FAFC' },
                ]}>
                <View style={[{ flex: 2, alignSelf: 'stretch' }, styles.px]}>
                  <Text style={{ fontSize: 14 }}>BNI</Text>
                </View>
                <View style={[styles.col, styles.px]}>
                  <Text style={[styles.textXs, styles.textRight]}>
                    {`Rp. ${formatAmount(3000)}`}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.row,
                  styles.mt,
                  styles.roundedLg,
                  styles.p,
                  { backgroundColor: '#F7FAFC' },
                ]}>
                <View style={[{ flex: 2, alignSelf: 'stretch' }, styles.px]}>
                  <Text style={{ fontSize: 14 }}>BANK SULUTGO</Text>
                </View>
                <View style={[styles.col, styles.px]}>
                  <Text style={[styles.textXs, styles.textRight]}>
                    {`Rp. ${formatAmount(0)}`}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.row,
                  styles.mt,
                  styles.roundedLg,
                  styles.p,
                  { backgroundColor: '#F7FAFC' },
                ]}>
                <View style={[{ flex: 2, alignSelf: 'stretch' }, styles.px]}>
                  <Text style={{ fontSize: 14 }}>POS INDONESIA</Text>
                </View>
                <View style={[styles.col, styles.px]}>
                  <Text style={[styles.textXs, styles.textRight]}>
                    {`Rp. ${formatAmount(3500)}`}
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
                              Alert.alert(
                                'Info',
                                'Tidak dapat menghapus data.',
                              );
                            } else {
                              Alert.alert(
                                'Ett...',
                                'Anda akan menghapus data ini?',
                                [
                                  {
                                    text: 'Cancel',
                                    onPress: () => null,
                                    style: 'cancel',
                                  },
                                  {
                                    text: 'OK',
                                    onPress: () => {
                                      hpsDataInv({ id: data.id }, (value) => {
                                        if (value.data) {
                                          Alert.alert(
                                            'Info',
                                            'Berhasil hapus data!',
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
                                      });
                                    },
                                  },
                                ],
                                { cancelable: false },
                              );
                            }
                          } else {
                            Alert.alert('Info', 'Tidak dapat menghapus data.');
                          }
                        } else {
                          Alert.alert('Info', 'Tidak dapat menghapus data.');
                        }
                      } else {
                        Alert.alert('Info', 'Tidak dapat menghapus data.');
                      }
                    }}>
                    Hapus Data
                  </Button>
                </View>
              </View>
            </View>
          </>
        ) : null}
      </View>
    </>
  );
};

const Pembayaran = React.memo((props) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [statusLunas, setStatusLunas] = useState('999');
  const [keter, setKeter] = useState('-');
  const [bayarBayarData, setBayarBayarData] = useState({
    ...INITIAL_STATE_LOCAL,
    data: null,
  });

  const [isData, setIsData] = useState({
    ...INITIAL_STATE_LOCAL,
    data: null,
  });

  const [barProsesbayarData, setBarProsesBayarData] = useState(
    INITIAL_STATE_LOCAL,
  );

  const data = useSelector((state) => state.permohonan.detail);

  const bayarBayar = useCallback(
    (value, changeBayarBayar) => dispatch(actCreateVa(value, changeBayarBayar)),
    [dispatch],
  );

  const detail = useCallback(
    (value, onChangeData) => dispatch(actDetailPermohonan(value, onChangeData)),
    [dispatch],
  );

  const akuProsesBayar = useCallback(
    (value, changeData) => dispatch(actProssBayar(value, changeData)),
    [dispatch],
  );

  useEffect(() => {
    if (bayarBayarData.data) {
      ToastAndroid.show('Berhasil create va!', ToastAndroid.SHORT);
    }

    if (bayarBayarData.errors) {
      ToastAndroid.show('Gagal create va!', ToastAndroid.SHORT);
    }
  }, [bayarBayarData]);

  useEffect(() => {
    if (barProsesbayarData.data) {
      ToastAndroid.show('Berhasil update data!', ToastAndroid.SHORT);
    }

    if (barProsesbayarData.errors) {
      ToastAndroid.show('Gagal update data!', ToastAndroid.SHORT);
    }
  }, [barProsesbayarData]);

  const onSetChangeBayarBayarData = (value) => {
    setBayarBayarData(value);
  };

  const onChangeData = (value) => {
    setIsData(value);
  };

  const [date, setDate] = useState(null);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const onSetDataPros = (value) => {
    setBarProsesBayarData(value);
  };

  const onShowModal = () => {
    setModalVisible(!modalVisible);
  };

  const onSetKeter = (value) => {
    setKeter(value);
  };

  const oSetStatusLunas = (value) => {
    setStatusLunas(value);
  };

  const onProsesLunasBar = (data) => {
    const value = {
      id_bayar_bar: data.pembayaran.id,
      status: statusLunas,
      keterangan: keter,
      tanggal_bayar: date,
    };
    akuProsesBayar(value, onSetDataPros);
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
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <View
          style={{
            backgroundColor: '#1A202C',
          }}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={isData.refreshing ? isData.refreshing : false}
                onRefresh={() => {
                  detail(data.id, (value) => {
                    onChangeData(value);
                  });
                }}
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
                  Detail Pembayaran
                </Text>
              </View>
            </View>

            {data.penetapan ? (
              data.penetapan.valid_penetapan === 1 ? (
                <Bayar
                  data={data}
                  onShowModal={onShowModal}
                  bayarBayarData={bayarBayarData}
                  detail={detail}
                  bayarBayar={bayarBayar}
                  onSetChangeBayarBayarData={onSetChangeBayarBayarData}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#ffffff',
                  }}>
                  <View
                    style={{
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
                      Penetapan belum valid!
                    </Text>
                  </View>
                </View>
              )
            ) : (
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#ffffff',
                }}>
                <View
                  style={{
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
        </View>
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
                <Text style={{ fontSize: 24 }}>Proses Bayar</Text>

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
                      onValueChange={(itemValue) => oSetStatusLunas(itemValue)}>
                      <Picker.Item label="-" value="999" />
                      <Picker.Item label="Lunas" value="1" />
                      <Picker.Item label="Belum Lunas" value="0" />
                    </Picker>
                  </View>

                  <View>
                    <TextAreaInput
                      label="Keterangan"
                      onChangeText={(text) => onSetKeter(text)}
                    />
                  </View>

                  <View
                    style={{
                      marginBottom: 16,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '700',
                      }}>
                      Tanggal Bayar :{' '}
                      {date
                        ? formatTanggalIndo(date)
                        : data.pembayaran
                        ? data.pembayaran.tanggal_bayar
                          ? data.pembayaran.tanggal_bayar
                          : '-'
                        : '-'}
                    </Text>
                  </View>
                </View>

                <View>
                  <View>
                    {show && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date ? date : new Date()}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                      />
                    )}
                  </View>

                  <View>
                    <Button
                      style={{
                        alignSelf: 'flex-start',
                        backgroundColor: '#ECC94B',
                        borderRadius: 10,
                        elevation: 4,
                      }}
                      color="#ffffff"
                      uppercase={false}
                      onPress={showDatepicker}>
                      Pilih tanggal bayar
                    </Button>

                    <Button
                      disabled={barProsesbayarData.loading}
                      loading={barProsesbayarData.loading}
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
                        onProsesLunasBar(data);
                      }}>
                      Simpan
                    </Button>

                    <Button
                      disabled={barProsesbayarData.loading}
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
                        setModalVisible(!modalVisible);
                        if (barProsesbayarData.data) {
                          onSetDataPros(INITIAL_STATE_LOCAL);
                          detail(data.id, () => null);
                        }
                      }}>
                      Batal
                    </Button>
                  </View>
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  inner: {
    padding: 24,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: '#ED64A6',
    marginVertical: 10,
    borderRadius: 10,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 24,
    backgroundColor: '#ffffff',
  },
  headerBottomSheet: {
    backgroundColor: '#ffffff',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});

export default Pembayaran;
