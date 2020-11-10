import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Animated,
  TouchableHighlight,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';

import { actGetNotif } from '../store/actions/notifikasiAction';

import database from '@react-native-firebase/database';

const HEADER_HEIGHT = 100;

const RowItem = React.memo((props) => {
  return (
    <TouchableHighlight
      onPress={() => props.onPress()}
      activeOpacity={0.6}
      underlayColor="#edf2f7"
      style={{
        ...styles.contentItem,
        backgroundColor: props.set_aktip ? '#FED7E2AA' : '#EDF2F7AA',
      }}>
      <View style={styles.itemFlex}>
        <View style={styles.content}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text
                style={{
                  ...styles.title,
                  fontWeight: '700',
                }}>
                {props.judul}
              </Text>
            </View>
            <View style={styles.col}>
              <Text
                style={{
                  ...styles.title,
                  fontSize: 12,
                  fontWeight: '600',
                  textAlign: 'right',
                }}>
                {props.created_at
                  ? new Date(props.created_at)
                      .toLocaleString()
                      .split(',')[0]
                      .toString()
                  : '-'}
              </Text>
            </View>
          </View>
          <View style={styles.rowIt}>
            <Text
              style={{
                ...styles.title,
                fontSize: 12,
                textAlign: 'left',
              }}>{`${props.nama_ppat} | ${props.kontent}`}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
});

const NotificationsScreen = React.memo(() => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const notifGet = useSelector((state) => state.notifikasi.data);

  const scrollAnim = useState(new Animated.Value(0));
  const offsetAnim = useState(new Animated.Value(0));
  const [clampedScroll, setClampedScroll] = useState(
    Animated.diffClamp(
      Animated.add(
        scrollAnim[0].interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolateLeft: 'clamp',
        }),
        offsetAnim[0],
      ),
      0,
      1,
    ),
  );

  const navbarTranslate = clampedScroll.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -150],
    extrapolate: 'clamp',
  });

  const barNotifikasi = useCallback((data) => dispatch(actGetNotif(data)), [
    dispatch,
  ]);

  const onLoading = (value) => {
    setLoading(value);
  };

  useEffect(() => {
    onLoading(true);
    const onValueChange = database()
      .ref(`/notifikasi`)
      .orderByChild('set_aktip')
      .endAt(1)
      .limitToLast(100)
      .on('value', (snapshot) => {
        onLoading(false);
        if (snapshot.exists()) {
          const br = snapshot.toJSON();
          barNotifikasi(br);
        }
      });
    
    return () => database().ref(`/notifikasi`).off('value', onValueChange);
  }, []);

  return (
    <SafeAreaView>
      <Animated.View
        style={[
          styles.header,
          {
            transform: [{ translateY: navbarTranslate }],
          },
        ]}
        onLayout={(event) => {
          let { height } = event.nativeEvent.layout;
          setClampedScroll(
            Animated.diffClamp(
              Animated.add(
                scrollAnim[0].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                  extrapolateLeft: 'clamp',
                }),
                offsetAnim[0],
              ),
              0,
              height,
            ),
          );
        }}>
        <Header />
      </Animated.View>

      <Animated.FlatList
        contentInset={{ top: HEADER_HEIGHT }}
        contentOffset={{ y: -HEADER_HEIGHT }}
        bounces={false}
        scrollEventThrottle={16}
        style={{ flexGrow: 1, width: '100%' }}
        data={notifGet}
        keyExtractor={(item) => `${item.uuid}`}
        contentContainerStyle={{ paddingVertical: 75 }}
        initialNumToRender={10}
        windowSize={5}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={30}
        removeClippedSubviews={false}
        renderItem={({ item }) => {
          return (
            <RowItem
              onPress={() => {
                if (item.set_aktip === 1) {
                  database()
                    .ref(`/notifikasi/${item.uuid}`)
                    .update({
                      set_aktip: 0,
                    })
                    .then(() => null);
                }
                navigation.navigate('MainStackScreen', {
                  screen: 'DetailStackScreen',
                  params: {
                    screen: 'DetailTabScreen',
                    params: {
                      permohonan_id: item.tipe_id,
                      nama_penerima: `${item.nama_bphtb}`,
                      initialLayout: 'Detail',
                    },
                  },
                });
              }}
              {...item}
            />
          );
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: scrollAnim[0] },
              },
            },
          ],
          { useNativeDriver: true },
        )}
        ListHeaderComponent={() => (
          <Text
            style={{
              ...styles.headerTopList,
              fontSize: 24,
            }}>
            Updates
          </Text>
        )}
        ListFooterComponent={() => {
          if (loading)
            return <ActivityIndicator size="large" color="#ED64A6" />;
          return null;
        }}
      />
    </SafeAreaView>
  );
});

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
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
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 10000,
    marginTop: 7,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    marginTop: 7,
  },
  inisialName: {
    width: 45,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: '#a0aec0',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 18,
    color: '#f7fafc',
  },
  content: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A202C',
    flexShrink: 1,
  },
  titleView: {
    color: '#1A202C',
    flexShrink: 1,
  },
  subtitle: {
    color: '#2D3748',
    fontSize: 14,
    alignSelf: 'flex-start',
    flexWrap: 'wrap',
  },
  right: {
    alignItems: 'flex-end',
    flex: 1,
  },
  headerTopList: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  textXs: {
    fontSize: 11,
  },
  rowIt: {
    flex: 1,
    flexDirection: 'row',
  },
  itemFlex: { flex: 1, flexDirection: 'row' },
  contentItem: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
    paddingVertical: 16,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    marginVertical: 10,
  },
  status: {
    fontSize: 12,
    color: '#1A202C',
    backgroundColor: '#718096',
    alignSelf: 'flex-start',
    color: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 1,
  },
});
