import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Animated,
  RefreshControl,
  TouchableHighlight,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';

import { actPenetapan } from '../store/actions/penetapanAction';
import { INITIAL_STATE_LOCAL } from '../store/constants';
import { formatAmount } from '../core/ppt';

const HEADER_HEIGHT = 100;

const RowItem = React.memo((props) => {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      activeOpacity={0.6}
      underlayColor="#edf2f7"
      style={{
        ...styles.contentItem,
        zIndex: 10,
      }}>
      <View style={styles.itemFlex}>
        <View>
          <Text style={styles.inisialName}>
            {props.nama_penerima.substr(0, 1)}
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.rowIt}>
            <Text style={styles.textXs}>NOP: </Text>
            <Text style={styles.title}>{props.nop}</Text>
          </View>
          <View style={styles.rowIt}>
            <Text style={styles.textXs}>Penerima: </Text>
            <Text style={styles.title}>{props.nama_penerima}</Text>
          </View>
          <View style={styles.rowIt}>
            <Text style={styles.textXs}>Pemberi: </Text>
            <Text style={styles.title}>{props.nama_pemberi}</Text>
          </View>
          <View style={styles.rowIt}>
            <Text style={styles.textXs}>PPAT: </Text>
            <Text style={styles.title}>{props.ppat}</Text>
          </View>
          <View style={styles.rowIt}>
            <Text style={styles.textXs}>Tanggal: </Text>
            <Text style={styles.title}>
              {props.penetapan
                ? props.penetapan.created_at
                  ? new Date(props.penetapan.created_at)
                      .toLocaleString()
                      .split(',')[0]
                      .toString()
                  : '-'
                : '-'}
            </Text>
          </View>
          <View style={styles.rowIt}>
            <Text style={styles.textXs}>Status: </Text>
            <View style={styles.titleView}>
              {props.penetapan ? (
                props.penetapan.valid_penetapan === 1 ? (
                  props.status_verifikasi_penetapan ? (
                    props.status_verifikasi_penetapan.keterangan_verifikasi ? (
                      <Text
                        style={{
                          ...styles.status,
                          backgroundColor: '#48BB78',
                        }}>
                        {
                          props.status_verifikasi_penetapan
                            .keterangan_verifikasi
                        }
                      </Text>
                    ) : (
                      <Text
                        style={{
                          ...styles.status,
                          backgroundColor: '#718096',
                        }}>
                        -
                      </Text>
                    )
                  ) : (
                    <Text
                      style={{ ...styles.status, backgroundColor: '#718096' }}>
                      -
                    </Text>
                  )
                ) : props.status_verifikasi_penetapan ? (
                  props.status_verifikasi_penetapan.keterangan_verifikasi ? (
                    <Text
                      style={{ ...styles.status, backgroundColor: '#718096' }}>
                      {props.status_verifikasi_penetapan.keterangan_verifikasi}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        ...styles.status,
                        backgroundColor: '#718096',
                      }}>
                      -
                    </Text>
                  )
                ) : (
                  <Text
                    style={{ ...styles.status, backgroundColor: '#718096' }}>
                    -
                  </Text>
                )
              ) : (
                <Text style={{ ...styles.status, backgroundColor: '#718096' }}>
                  -
                </Text>
              )}
              <Text style={{ ...styles.subtitle, fontSize: 12 }}>
                {props.penetapan
                  ? props.penetapan.keterangan_penetapan
                    ? props.penetapan.keterangan_penetapan
                    : '-'
                  : 'Permohonan belum valid'}
              </Text>
            </View>
          </View>
          <View style={styles.rowIt}>
            <Text style={styles.textXs}>Jenis Perolehan: </Text>
            <Text style={styles.title}>{props.jenis_perolehan}</Text>
          </View>
          <View style={styles.rowIt}>
            <Text style={styles.textXs}>Harga Trx: </Text>
            <Text style={styles.title}>
              Rp.{' '}
              {props.harga_transaksi ? formatAmount(props.harga_transaksi) : 0}
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
});

const PenetapanScreen = React.memo(() => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [paging, setPaging] = useState({
    page: 1,
  });

  const [isData, setIsData] = useState({
    ...INITIAL_STATE_LOCAL,
    data: [],
    current_page: 0,
    per_page: 0,
    page_count: 0,
    total: 0,
    last_page: 0,
    refreshing: false,
  });

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

  const onLoadPenetapan = useCallback(
    (value, onIsDataChange) => dispatch(actPenetapan(value, onIsDataChange)),
    [dispatch],
  );

  useEffect(() => {
    onLoadPenetapan(
      {
        page: 1,
      },
      onIsDataChange,
    );
  }, [onLoadPenetapan]);

  const onIsDataChange = (value) => {
    setIsData((prevState) => ({
      ...prevState,
      ...value,
      data: [...prevState.data, ...value.data],
    }));
  };

  const handleRefresh = () => {
    setIsData((prevState) => ({
      ...prevState,
      data: [],
      refreshing: true,
    }));
    onLoadPenetapan(
      {
        page: paging.page + 1,
      },
      onIsDataChange,
    );
  };

  const handleLoadMore = () => {
    setPaging((prevState) => ({
      ...prevState,
      page: prevState.page + 1,
    }));

    onLoadPenetapan(
      {
        page: paging.page + 1,
      },
      onIsDataChange,
    );
  };

  return (
    <SafeAreaView
      style={{
        zIndex: 10000,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
      }}>
      <Animated.View
        style={[
          styles.header,
          {
            transform: [{ translateY: navbarTranslate }],
            flex: 0.3,
            alignItems: 'stretch',
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
        style={{ flexGrow: 1, flex: 0.3, width: '100%' }}
        data={isData.data}
        refreshing={isData.refreshing ? isData.refreshing : false}
        keyExtractor={(item) => `${item.uuid}xx`}
        contentContainerStyle={{ paddingVertical: 75 }}
        onEndReached={handleLoadMore}
        initialNumToRender={10}
        windowSize={5}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={30}
        removeClippedSubviews={false}
        onEndReachedThreshold={0}
        renderItem={({ item, index }) => {
          return (
            <RowItem
              onPress={() =>
                navigation.navigate('MainStackScreen', {
                  screen: 'DetailStackScreen',
                  params: {
                    screen: 'DetailTabScreen',
                    params: {
                      permohonan_id: item.id,
                      nama_penerima: item.nama_penerima,
                      initialLayout: 'Penetapan',
                    },
                  },
                })
              }
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
            Penetapan{' '}
            <View
              style={{
                backgroundColor: '#48BB78',
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: 24,
                marginLeft: 16,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: '#ffffff',
                }}>
                {isData.total}
              </Text>
            </View>
          </Text>
        )}
        refreshControl={
          <RefreshControl
            refreshing={isData.refreshing ? isData.refreshing : false}
            onRefresh={handleRefresh}
            progressViewOffset={50}
          />
        }
        ListFooterComponent={() => {
          if (isData.loading)
            return <ActivityIndicator size="large" color="#ED64A6" />;
          return null;
        }}
      />
    </SafeAreaView>
  );
});

export default PenetapanScreen;

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 100000,
    marginTop: 7,
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
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
    paddingRight: 16,
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
    marginLeft: 16,
    backgroundColor: '#ffffff',
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
