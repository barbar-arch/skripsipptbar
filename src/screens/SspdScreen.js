import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableHighlight,
  Alert,
  PermissionsAndroid,
} from 'react-native';

import Pdf from 'react-native-pdf';

import RNFetchBlob from 'rn-fetch-blob';

const SspdScreen = React.memo((props) => {
  const data = props.route.params;
  const [source, setSource] = useState({
    uri: null,
    cache: true,
  });

  const onSoure = (value) => {
    if (value.id) {
      const ur = `http://36.89.215.26/skripsi/public/operator/penetapan-bphtb-a/sspd/${value.id}`;

      setSource((prevState) => ({
        ...prevState,
        uri: ur,
      }));
    }
  };

  useEffect(() => {
    if (data) onSoure(data);
  }, [data]);

  const actualDownload = (ur, nm) => {
    const { dirs } = RNFetchBlob.fs;
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `${nm}-file-bar.pdf`,
        path: `${dirs.DownloadDir}/${nm}-file-bar.pdf`,
      },
    })
      .fetch('GET', ur, {})
      .then(() => null)
      .catch(() => null);
  };

  const downloadFile = async (ff, nm) => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        actualDownload(ff, nm);
      } else {
        Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
      }
    } catch (err) {
        Alert.alert('Er!', 'You Error');
    } 
}

  if (!data) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          width: '100%',
          backgroundColor: '#ffffff',
          paddingHorizontal: 24,
        }}>
        <View
          style={{
            backgroundColor: '#ffffff',
            paddingBottom: 16,
          }}>
          <TouchableHighlight
            style={{
              alignContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              padding: 10,
              elevation: 2,
              alignSelf: 'center',
              backgroundColor: '#ED64A6',
            }}
            onPress={() => {
              if (source.uri) {
                const nm = `${data.nama_penerima}-${data.id}`;
                downloadFile(source.uri, nm);
              }
            }}>
            <Text style={{ alignSelf: 'flex-start', color: '#ffffff' }}>
              Download File
            </Text>
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.container}>
        {source.uri ? (
          <Pdf
            source={source}
            onLoadComplete={() => null}
            onPageChanged={() => null}
            onError={() => null}
            onPressLink={() => null}
            style={styles.pdf}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
});

export default SspdScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#EDF2F7',
    paddingVertical: 16,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width - 32,
    height: Dimensions.get('window').height,
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
