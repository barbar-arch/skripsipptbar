import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Animated,
  FlatList,
  RefreshControl,
  TouchableHighlight,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Header from './Header';

import { actPenetapan } from '../store/actions/penetapanAction';
import { INITIAL_STATE_LOCAL } from '../store/constants';
import { formatAmount } from '../core/ppt';
import GmailStyleSwipeableRow from './GmailStyleSwipeableRow';

const HEADER_HEIGHT = 70;
const ITEM_HEIGHT = 0;

const RowItem = memo((props) => {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      activeOpacity={0.6}
      underlayColor="#edf2f7"
      style={styles.contentItem}>
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
            <Text style={styles.title}>{props.penet_create}</Text>
          </View>
          <View style={styles.rowIt}>
            <Text style={styles.textXs}>Status: </Text>
            <View style={styles.titleView}>
              {props.status_penet === '1' ? (
                <Text style={{ ...styles.status, backgroundColor: '#48BB78' }}>
                  {props.status_penet_str}
                </Text>
              ) : (
                <Text style={{ ...styles.status, backgroundColor: '#718096' }}>
                  {props.status_penet_str}
                </Text>
              )}
              <Text style={{ ...styles.subtitle, fontSize: 12 }}>
                {props.ket_penet}
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
}, areEqual);

const SwipeableRow = memo((props) => {
  return (
    <GmailStyleSwipeableRow>
      <RowItem {...props} />
    </GmailStyleSwipeableRow>
  );
}, areEqual);

function areEqual(prevProps, nextProps) {
  if (prevProps.id === nextProps.id) return true;
}

const Penetapan = memo(() => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [paging, setPaging] = useState({
    page: 1,
  });

  const [isData, setIsData] = useState({
    ...INITIAL_STATE_LOCAL,
    data: [],
    refreshing: false,
  });

  const scrollY = new Animated.Value(0);

  const diffClamp = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);

  const translateY = diffClamp.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
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
    <SafeAreaView>
      <View style={styles.topBar}>
        <Animated.View
          style={{
            transform: [{ translateY: translateY }],
            zIndex: 100,
          }}>
          <Header />
        </Animated.View>
      </View>

      <FlatList
        data={isData.data}
        renderItem={({ item, index }) => {
          return (
            <SwipeableRow
              index={index}
              key={item.id}
              onPress={() =>
                navigation.push('DetailTabScreen', { permohonan: item })
              }
              {...item}
            />
          );
        }}
        onScroll={(event) => {
          if (event.nativeEvent.contentOffset.y > 0) {
            scrollY.setValue(event.nativeEvent.contentOffset.y);
          } else {
            scrollY.setValue(0);
          }
        }}
        ListHeaderComponent={() => (
          <Text style={styles.headerTopList}>Permohonan</Text>
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
        refreshing={isData.refreshing ? isData.refreshing : false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingVertical: 75 }}
        onEndReached={handleLoadMore}
        initialNumToRender={10}
        windowSize={5}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={30}
        removeClippedSubviews={false}
        onEndReachedThreshold={0}
      />
    </SafeAreaView>
  );
});

export default Penetapan;

const styles = StyleSheet.create({
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
