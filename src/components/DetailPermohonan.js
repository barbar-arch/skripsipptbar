import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-paper';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import { actDetailPermohonan, actHapusPermohonan } from '../store/actions/permohonanAction';
import { INITIAL_STATE_LOCAL } from '../store/constants';
import { formatAmount } from '../core/ppt';
import { useNavigation } from '@react-navigation/native';

const DetailPermohonan = React.memo(() => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const data = useSelector((state) => state.permohonan.detail);

  const [isData, setIsData] = useState({
    ...INITIAL_STATE_LOCAL,
    refreshing: false,
  });

  const detail = useCallback(
    (value, changeData) => dispatch(actDetailPermohonan(value, changeData)),
    [dispatch],
  );

  const hapsPermohonan = useCallback(
    (value, changeData) => dispatch(actHapusPermohonan(value, changeData)),
    [dispatch],
  );

  const onChangeData = (value) => {
    setIsData(value);
  };

  const handleRefresh = (id) => () => {
    setIsData((prevState) => ({
      ...prevState,
      refreshing: true,
    }));
    detail(id, onChangeData);
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
              Detail Permohonan
            </Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={[styles.rowContainer, styles.sectionContainer]}>
            <View style={styles.row}>
              <View
                style={[styles.col, styles.bgGray, styles.roundedLg, styles.p]}>
                <Text style={styles.sectionTitle}>STATUS PERMOHONAN</Text>
              </View>
            </View>
            <View style={[styles.row, styles.mt]}>
              <View style={[styles.col, styles.px]}>
                <Text style={styles.textSm}>Keterangan</Text>
              </View>
              <View style={[styles.colMd, styles.px]}>
                <Text style={styles.textXs}>{data.ket_permoh}</Text>
              </View>
            </View>
            <View style={[styles.row, styles.mt]}>
              <View style={[styles.col, styles.px]}>
                <Text style={styles.textSm}>Status</Text>
              </View>
              <View style={[styles.colMd, styles.px]}>
                {data.sts_verifikasi_permoh ? (
                  data.sts_verifikasi_permoh.kode_verifikasi === 1 ? (
                    <Text
                      style={[
                        styles.textXs,
                        {
                          alignSelf: 'flex-start',
                          backgroundColor: '#48BB78',
                          color: '#ffffff',
                          borderRadius: 16,
                          paddingHorizontal: 10,
                          paddingVertical: 2,
                        },
                      ]}>
                      {data.sts_verifikasi_permoh.keterangan_verifikasi
                        ? data.sts_verifikasi_permoh.keterangan_verifikasi
                        : '-'}
                    </Text>
                  ) : (
                    <Text
                      style={[
                        styles.textXs,
                        {
                          alignSelf: 'flex-start',
                          backgroundColor: '#718096',
                          color: '#ffffff',
                          borderRadius: 16,
                          paddingHorizontal: 10,
                          paddingVertical: 2,
                        },
                      ]}>
                      {data.sts_verifikasi_permoh.keterangan_verifikasi
                        ? data.sts_verifikasi_permoh.keterangan_verifikasi
                        : '-'}
                    </Text>
                  )
                ) : (
                  <Text
                    style={[
                      styles.textXs,
                      {
                        alignSelf: 'flex-start',
                        backgroundColor: '#718096',
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
                  {data.permoh_create
                    ? new Date(data.permoh_create)
                        .toLocaleString()
                        .split(',')[0]
                        .toString()
                    : '-'}
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.rowContainer, styles.sectionContainer]}>
            <View style={styles.row}>
              <View
                style={[styles.col, styles.bgGray, styles.roundedLg, styles.p]}>
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
                      {data.penetapan.status_verifikasi.keterangan_verifikasi
                        ? data.penetapan.status_verifikasi.keterangan_verifikasi
                        : '-'}
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
                      {data.penetapan.status_verifikasi.keterangan_verifikasi
                        ? data.penetapan.status_verifikasi.keterangan_verifikasi
                        : '-'}
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
                    Belum ada penetapan
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
          </View>

          <View style={[styles.rowContainer, styles.sectionContainer]}>
            <View style={styles.row}>
              <View
                style={[styles.col, styles.bgGray, styles.roundedLg, styles.p]}>
                <Text style={styles.sectionTitle}>PPAT</Text>
              </View>
            </View>
            <View style={[styles.row, styles.mt]}>
              <View style={[styles.col, styles.px]}>
                <Text style={styles.textSm}>Nama PPAT</Text>
              </View>
              <View style={[styles.colMd, styles.px]}>
                <Text style={styles.textXs}>{data.nama_ppat}</Text>
              </View>
            </View>
          </View>

          <View style={[styles.rowContainer, styles.sectionContainer]}>
            <View style={styles.row}>
              <View
                style={[styles.col, styles.bgGray, styles.roundedLg, styles.p]}>
                <Text style={styles.sectionTitle}>DATA PEMBERI</Text>
              </View>
            </View>
            <View style={[styles.row, styles.mt]}>
              <View style={[styles.col, styles.px]}>
                <Text style={styles.textSm}>NIK</Text>
              </View>
              <View style={[styles.colMd, styles.px]}>
                <Text style={styles.textXs}>{data.nik_pemberi}</Text>
              </View>
            </View>
            <View style={[styles.row, styles.mt]}>
              <View style={[styles.col, styles.px]}>
                <Text style={styles.textSm}>Nama</Text>
              </View>
              <View style={[styles.colMd, styles.px]}>
                <Text style={styles.textXs}>{data.nama_pemberi}</Text>
              </View>
            </View>
            <View style={[styles.row, styles.mt]}>
              <View style={[styles.col, styles.px]}>
                <Text style={styles.textSm}>Alamat</Text>
              </View>
              <View style={[styles.colMd, styles.px]}>
                <Text style={styles.textXs}>{data.alamat_pemberi}</Text>
              </View>
            </View>
            <View style={[styles.row, styles.mt]}>
              <View style={[styles.col, styles.px]}>
                <Text style={styles.textSm}>Nomor Telfon</Text>
              </View>
              <View style={[styles.colMd, styles.px]}>
                <Text style={styles.textXs}>{data.notelp_pemberi}</Text>
              </View>
            </View>
          </View>

          <View style={[styles.rowContainer, styles.sectionContainer]}>
            <View style={styles.row}>
              <View
                style={[styles.col, styles.bgGray, styles.roundedLg, styles.p]}>
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
              <View
                style={[styles.col, styles.bgGray, styles.roundedLg, styles.p]}>
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
                    style={[
                      styles.col,
                      styles.bgGray,
                      styles.roundedLg,
                      styles.p,
                    ]}>
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
                    <Text style={[styles.textXs, styles.textRight]}>
                      Luas (m2)
                    </Text>
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
              <View
                style={[styles.col, styles.bgGray, styles.roundedLg, styles.p]}>
                <Text style={styles.sectionTitle}>
                  PERHITUNGAN BPHTB SEMENTARA
                </Text>
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
                  {`Rp. ${formatAmount(data.npop)}`}
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
                  {`Rp. ${formatAmount(data.npoptkp)}`}
                </Text>
              </View>
            </View>
            <View style={[styles.row, styles.mt]}>
              <View style={[{ flex: 2, alignSelf: 'stretch' }, styles.px]}>
                <Text style={styles.textSm}>
                  3. Nilai Perolehan Objek Pajak Kena Pajak (NPOPKP) (Angka 1 -
                  Angka 2)
                </Text>
              </View>
              <View style={[styles.col, styles.px]}>
                <Text style={[styles.textXs, styles.textRight]}>
                  {`Rp. ${formatAmount(data.npopkp)}`}
                </Text>
              </View>
            </View>
            <View style={[styles.row, styles.mt]}>
              <View style={[{ flex: 2, alignSelf: 'stretch' }, styles.px]}>
                <Text style={styles.textSm}>
                  4. Bea Perolehan hak atas tanah dan Bangunan yang terhutang
                  (5% x Angka 3)
                </Text>
              </View>
              <View style={[styles.col, styles.px]}>
                <Text style={[styles.textXs, styles.textRight]}>
                  {`Rp. ${formatAmount(data.bphtb)}`}
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
                        Alert.alert('Info', 'Tidak dapat menghapus data.');
                      }
                    } else {
                      if (data.sts_verifikasi_permoh) {
                        if (data.sts_verifikasi_permoh.kode_verifikasi === 1) {
                          Alert.alert('Info', 'Tidak dapat menghapus data.');
                        } else {
                          Alert.alert(
                            'Info',
                            'Hapus permohonan bphtb?',
                            [
                              {
                                text: 'Cancel',
                                onPress: () => null,
                                style: 'cancel',
                              },
                              {
                                text: 'OK',
                                onPress: () => {
                                  hapsPermohonan({ id: data.id }, (value) => {
                                    if (value.data) {
                                      Alert.alert(
                                        'Info',
                                        'Berhasil menghapus data!',
                                        [
                                          {
                                            text: 'OK',
                                            onPress: () =>
                                              navigation.navigate(
                                                'MainStackScreen',
                                                {
                                                  screen: 'DrawerStackScreen',
                                                  params: {
                                                    screen: 'HomeTabScreen',
                                                  },
                                                },
                                              ),
                                          },
                                        ],
                                        { cancelable: false },
                                      );
                                    }

                                    if (value.errors) {
                                      Alert.alert('Info', 'Gagal hapus data!');
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
                    }
                  }}>
                  Hapus Permohonan
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
              <View
                style={[styles.col, styles.bgGray, styles.roundedLg, styles.p]}>
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
      </ScrollView>
    </SafeAreaView>
  );
});

export default DetailPermohonan;

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
