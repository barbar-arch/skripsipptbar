import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  SafeAreaView,
  View,
  Text,
  Alert,
} from 'react-native';

import Pdf from 'react-native-pdf';
import Orientation from 'react-native-orientation-locker';

const WIN_WIDTH = Dimensions.get('window').width;
const WIN_HEIGHT = Dimensions.get('window').height;

const BerkasScreen = React.memo((props) => {
  const data = props.route.params;
  const [source, setSource] = useState({
    uri: null,
    cache: true,
  });

  const [pdf, setPdf] = useState({
    page: 1,
    scale: 1,
    numberOfPages: 0,
    horizontal: false,
    width: WIN_WIDTH,
  });

  const refPdf = useRef();

  const onSoure = (value) => {
    if (value.file) {
      setSource((prevState) => ({
        ...prevState,
        uri: value.file,
      }));
    }
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
    if (data) onSoure(data);
  }, [data]);

  useEffect(() => {
    Orientation.addOrientationListener(_onOrientationDidChange);
    return () => Orientation.removeOrientationListener(_onOrientationDidChange);
  }, []);

  const prePage = () => {
    let prePage = pdf.page > 1 ? pdf.page - 1 : 1;
    refPdf.current.setPage(prePage);
  };

  const nextPage = () => {
    let nextPage =
      pdf.page + 1 > pdf.numberOfPages ? pdf.numberOfPages : pdf.page + 1;
    refPdf.current.setPage(nextPage);
  };

  const zoomOut = () => {
    let scale = pdf.scale > 1 ? pdf.scale / 1.2 : 1;
    setPdf((prevState) => ({ ...prevState, scale: scale }));
  };

  const zoomIn = () => {
    let scale = pdf.scale * 1.2;
    scale = scale > 3 ? 3 : scale;
    setPdf((prevState) => ({ ...prevState, scale: scale }));
  };

  const switchHorizontal = () => {
    setPdf((prevState) => ({
      ...prevState,
      horizontal: !pdf.horizontal,
      page: pdf.page,
    }));
  };

  if (!data) return null;

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: '#EDF2F7' }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          backgroundColor: '#ffffff',
          paddingHorizontal: 24,
        }}>
        <View
          style={{
            backgroundColor: '#ffffff',
            paddingBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 18,
            }}>{`${data.judul}`}</Text>
          <Text style={{ fontSize: 11, marginBottom: 5 }}>
            {data.tgl_create
              ? ` Tanggal upload: ${new Date(data.tgl_create)
                  .toLocaleString()
                  .split(',')[0]
                  .toString()}`
              : '-'}
          </Text>
          {data.status_verifikasi ? (
            data.status_verifikasi === 1 ? (
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
          {data.keterangan ? (
            data.keterangan === 1 ? (
              <Text>{`${data.keterangan}`}</Text>
            ) : (
              <Text>{`${data.keterangan}`}</Text>
            )
          ) : (
            <Text>{`-`}</Text>
          )}
          <TouchableHighlight
            style={{
              alignContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              elevation: 2,
              paddingVertical: 5,
              paddingHorizontal: 10,
              alignSelf: 'flex-start',
              backgroundColor: '#ED64A6',
            }}
            onPress={() => {
              Alert.alert('Info', 'info sementara');
            }}>
            <Text style={{ alignSelf: 'flex-start', color: '#ffffff' }}>
              Verifikasi
            </Text>
          </TouchableHighlight>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          zIndex: 1000,
          flexDirection: 'row',
          backgroundColor: '#ffffff',
          width: '100%',
          paddingHorizontal: 24,
          alignSelf: 'center',
          alignContent: 'center',
          alignItems: 'center',
          paddingVertical: 2,
        }}>
        <TouchableHighlight
          disabled={pdf.page === 1}
          style={pdf.page === 1 ? styles.btnDisable : styles.btn}
          onPress={() => prePage()}>
          <Text style={{ ...styles.btnText, color: '#ffffff' }}>{'-'}</Text>
        </TouchableHighlight>
        <View style={styles.btnText}>
          <Text style={styles.btnText}>Page</Text>
        </View>
        <TouchableHighlight
          disabled={pdf.page === pdf.numberOfPages}
          style={
            pdf.page === pdf.numberOfPages ? styles.btnDisable : styles.btn
          }
          onPress={() => nextPage()}>
          <Text style={{ ...styles.btnText, color: '#ffffff' }}>{'+'}</Text>
        </TouchableHighlight>
        <TouchableHighlight
          disabled={pdf.scale === 1}
          style={pdf.scale === 1 ? styles.btnDisable : styles.btn}
          onPress={() => zoomOut()}>
          <Text style={{ ...styles.btnText, color: '#ffffff' }}>{'-'}</Text>
        </TouchableHighlight>
        <View style={styles.btnText}>
          <Text style={styles.btnText}>Scale</Text>
        </View>
        <TouchableHighlight
          disabled={pdf.scale >= 3}
          style={pdf.scale >= 3 ? styles.btnDisable : styles.btn}
          onPress={() => zoomIn()}>
          <Text style={{ ...styles.btnText, color: '#ffffff' }}>{'+'}</Text>
        </TouchableHighlight>
        <View style={styles.btnText}>
          <Text style={styles.btnText}>{'Horizontal:'}</Text>
        </View>
        <TouchableHighlight
          style={styles.btn}
          onPress={() => switchHorizontal()}>
          {!pdf.horizontal ? (
            <Text style={{ ...styles.btnText, color: '#ffffff' }}>
              {'false'}
            </Text>
          ) : (
            <Text style={{ ...styles.btnText, color: '#ffffff' }}>
              {'true'}
            </Text>
          )}
        </TouchableHighlight>
      </View>
      <View style={{ flex: 1, width: pdf.width }}>
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
      </View>
    </SafeAreaView>
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
});
