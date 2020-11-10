import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  View,
  Text,
  Alert,
  Modal,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';

import Pdf from 'react-native-pdf';
import Orientation from 'react-native-orientation-locker';

import { Button } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';

import TextAreaInput from '../components/paper-ppt/TextAreaInput';
import { INITIAL_STATE_LOCAL } from '../store/constants';
import { useDispatch } from 'react-redux';
import { actCheckBerkas, actVerifBerkas } from '../store/actions/berkasAction';

const WIN_WIDTH = Dimensions.get('window').width;
const WIN_HEIGHT = Dimensions.get('window').height;

const BerkasScreen = React.memo((props) => {
  const dispatch = useDispatch();
  const [berkasData, setBerkasData] = useState(INITIAL_STATE_LOCAL);
  const [verifBerkasData, setVerifBerkasData] = useState(INITIAL_STATE_LOCAL);
  const data = props.route.params;
  const [source, setSource] = useState({
    uri: null,
    cache: true,
  });

  const keBerkas = useCallback(
    (value, changeData) => dispatch(actCheckBerkas(value, changeData)),
    [dispatch],
  );

  const okeVerifBerkas = useCallback(
    (value, changeData) => dispatch(actVerifBerkas(value, changeData)),
    [dispatch],
  );

  const [pdf, setPdf] = useState({
    page: 1,
    scale: 1,
    numberOfPages: 0,
    horizontal: false,
    width: WIN_WIDTH,
  });

  const refPdf = useRef();

  const [modalVisible, setModalVisible] = useState(false);
  const [statusLunas, setStatusLunas] = useState('0');
  const [keterangan, setKeterangan] = useState('-');

  const onChangeBerkasData = (value) => {
    setBerkasData(value);
  };

  const onSoure = (value) => {
    setSource((prevState) => ({
      ...prevState,
      uri: value,
    }));
  };

  const _onOrientationDidChange = (orientation) => {
    if (orientation == 'LANDSCAPE-LEFT' || orientation == 'LANDSCAPE-RIGHT') {
      setPdf((prevState) => ({
        ...prevState,
        width: WIN_HEIGHT > WIN_WIDTH ? WIN_HEIGHT : WIN_WIDTH,
        horizontal: true,
      }));
    } else {
      setPdf((prevState) => ({
        ...prevState,
        width: WIN_HEIGHT > WIN_WIDTH ? WIN_HEIGHT : WIN_WIDTH,
        horizontal: false,
      }));
    }
  };

  useEffect(() => {
    if (berkasData.data) {
      onSoure(berkasData.data.file);
    }
  }, [berkasData]);

  useEffect(() => {
    if (verifBerkasData.data) {
      ToastAndroid.show('Berhasil update data!', ToastAndroid.SHORT);
    }
  }, [verifBerkasData]);

  useEffect(() => {
    Orientation.addOrientationListener(_onOrientationDidChange);
    return () => Orientation.removeOrientationListener(_onOrientationDidChange);
  }, []);

  useEffect(() => {
    if (data) keBerkas(data.id, onChangeBerkasData);
  }, [data]);

  const onVerifikasiBerkas = (data) => {
    const value = {
      id: data.id,
      status: statusLunas,
      keterangan: keterangan,
    };
    okeVerifBerkas(value, onChangeVerifikasiBerkas);
  };

  const onChangeVerifikasiBerkas = (value) => {
    setVerifBerkasData(value);
  };

  if (!berkasData.data) {
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
      <SafeAreaView style={{ ...styles.container, backgroundColor: '#E2E8F0' }}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#ffffff',
            paddingHorizontal: 24,
            elevation: 4,
          }}>
          <View
            style={{
              backgroundColor: '#ffffff',
              paddingBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 18,
              }}>{`${berkasData.data.judul}`}</Text>
            <Text style={{ fontSize: 11, marginBottom: 5 }}>
              {berkasData.data.tgl_create
                ? ` Tanggal upload: ${new Date(berkasData.data.tgl_create)
                    .toLocaleString()
                    .split(',')[0]
                    .toString()}`
                : '-'}
            </Text>
            {berkasData.data.status_verifikasi ? (
              berkasData.data.status_verifikasi === 1 ? (
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
              )
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
            {berkasData.data.keterangan !== null ? (
              <Text>{`${berkasData.data.keterangan}`}</Text>
            ) : (
              <Text>{`-`}</Text>
            )}
            <View>
              <Button
                style={{
                  alignSelf: 'center',
                  backgroundColor: '#ED64A6',
                  borderRadius: 10,
                  elevation: 4,
                  alignContent: 'center',
                  alignItems: 'center',
                }}
                color="#ffffff"
                uppercase={false}
                onPress={() => {
                  setModalVisible(true);
                }}>
                Verifikasi
              </Button>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, width: pdf.width }}>
          {source.uri ? (
            <Pdf
              ref={refPdf}
              source={source}
              scale={pdf.scale}
              horizontal={pdf.horizontal}
              onLoadComplete={(
                numberOfPages,
              ) => {
                setPdf((prevState) => ({
                  ...prevState,
                  numberOfPages: numberOfPages,
                }));
              }}
              onPageChanged={(page) => {
                setPdf((prevState) => ({
                  ...prevState,
                  page: page,
                }));
              }}
              onError={() => null}
              style={{ flex: 1 }}
            />
          ) : null}
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
          style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.centeredView}>
              <View style={{ ...styles.modalView, width: '95%' }}>
                <Text style={{ fontSize: 24 }}>Verifikasi Berkas</Text>
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
                        setStatusLunas(itemValue)
                      }>
                      <Picker.Item label="Belum Valid" value="0" />
                      <Picker.Item label="Sukses" value="1" />
                    </Picker>
                  </View>

                  <TextAreaInput
                    label="Keterangan"
                    onChangeText={(text) => setKeterangan(text)}
                  />
                </View>

                <View>
                  <Button
                    loading={verifBerkasData.loading}
                    disabled={verifBerkasData.loading}
                    style={{
                      alignSelf: 'flex-start',
                      backgroundColor: '#ED64A6',
                      borderRadius: 10,
                      elevation: 4,
                      marginBottom: 16,
                    }}
                    color="#ffffff"
                    uppercase={false}
                    onPress={() => {
                      Keyboard.dismiss();
                      onVerifikasiBerkas(berkasData.data);
                    }}>
                    Simpan
                  </Button>
                  <Button
                    disabled={verifBerkasData.loading}
                    style={{
                      alignSelf: 'flex-start',
                      backgroundColor: '#A0AEC0',
                      borderRadius: 10,
                      elevation: 4,
                      marginBottom: 16,
                    }}
                    color="#ffffff"
                    uppercase={false}
                    onPress={() => {
                      setModalVisible(false);
                      if (verifBerkasData.data) {
                        onChangeVerifikasiBerkas(INITIAL_STATE_LOCAL);
                        keBerkas(berkasData.data.id, onChangeBerkasData);
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

export default BerkasScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  btn: {
    marginHorizontal: 3,
    marginVertical: 2,
    paddingHorizontal: 2,
    paddingVertical: 0.1,
    backgroundColor: '#ED64A6',
    borderRadius: 7,
  },
  btnDisable: {
    borderRadius: 7,
    paddingHorizontal: 2,
    paddingVertical: 0.1,
    backgroundColor: '#A0AEC0',
    marginHorizontal: 3,
    marginVertical: 2,
  },
  btnText: {
    marginHorizontal: 2,
    marginVertical: 1,
    paddingHorizontal: 3,
    paddingVertical: 0.1,
    color: '#1A202C',
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
});
