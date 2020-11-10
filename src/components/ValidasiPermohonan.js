import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ToastAndroid,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import { Picker } from '@react-native-community/picker';
import { Button } from 'react-native-paper';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
  actDetailPermohonan,
  actUpdatePerhitunganPermohonan,
  actValidasiPermohonan,
} from '../store/actions/permohonanAction';

import { INITIAL_STATE_LOCAL } from '../store/constants';
import TextInput from './paper-ppt/TextInput';
import TextAreaInput from './paper-ppt/TextAreaInput';
import { formatAmount, unFormatAmount } from '../core/ppt';
import { actSimpanPenetapan } from '../store/actions/penetapanAction';

const NPOPTKP = [
  {
    id: '1',
    label: 'Jual beli',
    npoptkp: 60000000,
  },
  {
    id: '2',
    label: 'Tukar Menukar',
    npoptkp: 60000000,
  },
  {
    id: '3',
    label: 'Hibah',
    npoptkp: 60000000,
  },
  {
    id: '4',
    label: 'Hibah Wasiat',
    npoptkp: 300000000,
  },
  {
    id: '5',
    label: 'Waris',
    npoptkp: 300000000,
  },
  {
    id: '6',
    label: 'Pemasukan dalam perseroan/ badan hukum lainnya',
    npoptkp: 60000000,
  },
  {
    id: '7',
    label: 'Pemisahan hak yang mengakibatkan peralihan',
    npoptkp: 60000000,
  },
  {
    id: '8',
    label: 'Penunjukan pemberi dalam lelang',
    npoptkp: 60000000,
  },
  {
    id: '9',
    label: 'Pelaksanaan putusan hakim yang mempunyai kekuatan hukum tetap',
    npoptkp: 60000000,
  },
  {
    id: '10',
    label: 'Penggabungan Usaha',
    npoptkp: 60000000,
  },
  {
    id: '11',
    label: 'Peleburan Usaha',
    npoptkp: 60000000,
  },
  {
    id: '12',
    label: 'Pemekaran Usaha',
    npoptkp: 60000000,
  },
  {
    id: '13',
    label: 'Hadiah',
    npoptkp: 60000000,
  },
  {
    id: '14',
    label: 'Pemberian hak baru sebagai kelanjutan pelepasan hak',
    npoptkp: 60000000,
  },
  {
    id: '15',
    label: 'Pemberian hak baru diluar pelepasan hak',
    npoptkp: 60000000,
  },
  {
    id: '16',
    label: 'Pemberian hak baru',
    npoptkp: 60000000,
  },
];

const TitleHead = ({ children }) => (
  <View
    style={{
      backgroundColor: '#ffffff',
      flex: 1,
      paddingBottom: 16,
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
        {children}
      </Text>
    </View>
  </View>
);

const PerhitunganBphtb = ({ data, getDetail }) => {
  const dispatch = useDispatch();
  const { handleSubmit, control, setValue, getValues } = useForm();
  const [updatePerhitungan, setUpdatePerhitungan] = useState(
    INITIAL_STATE_LOCAL,
  );
  const [simpanPenetapan, setSimpanPenetapan] = useState(INITIAL_STATE_LOCAL);
  const [disablePenetapan, setDisablePenetapan] = useState(false);

  const sendUpdatePerhitungan = useCallback(
    (value, onSetUpdatePerhitungan) =>
      dispatch(actUpdatePerhitunganPermohonan(value, onSetUpdatePerhitungan)),
    [dispatch],
  );

  const sendSimpanPenetapan = useCallback(
    (value, onSetSimpanPenetapan) =>
      dispatch(actSimpanPenetapan(value, onSetSimpanPenetapan)),
    [dispatch],
  );

  useEffect(() => {
    if (data) {
      setValue('tgl_sertipikat', data.tanggal_sertipikat);
      setValue('nosertipikat', data.nomor_sertipikat);
      setValue('jenis_perolehan', data.kode_jn_simda);

      setValue('lt_dialihkan', data.tanah_dialihkan.toString());
      setValue('lb_dialihkan', data.bng_dialihkan.toString());

      setValue('njt_basisdata', data.njop_tanah_op);
      setValue('njb_basisdata', data.njop_bangunan_op);
      setValue('hit_njt_analisis', data.hitung_njop_tanah);
      setValue('hit_njb_analisis', data.hitung_njop_bng);

      setValue('nj_pbb', data.analisis_njop_pbb);
      setValue('harga_trx', data.harga_transaksi);

      iniPerhitungannyaNjop();
    }
    onSetDisablePenetapan(false);
  }, []);

  useEffect(() => {
    if (updatePerhitungan.data) {
      ToastAndroid.show('Berhasil update data!', ToastAndroid.SHORT);
    }

    if (updatePerhitungan.errors) {
      ToastAndroid.show('Gagal update data!', ToastAndroid.SHORT);
    }
  }, [updatePerhitungan]);

  useEffect(() => {
    if (simpanPenetapan.data) {
      ToastAndroid.show('Berhasil simpan penetapan!', ToastAndroid.SHORT);
    }

    if (simpanPenetapan.errors) {
      ToastAndroid.show('Gagal penetapan!', ToastAndroid.SHORT);
    }
  }, [simpanPenetapan, data]);

  const onSetUpdatePerhitungan = (value) => {
    setUpdatePerhitungan(value);
  };

  const iniPerhitungannyaNjop = () => {
    onSetDisablePenetapan(true);
    let val_hrga_trx = getValues('harga_trx');
    let val_tanah_dialihkan = getValues('lt_dialihkan');
    let val_bangunan_dialihkan = getValues('lb_dialihkan');

    let val_nj_tanah_asli = getValues('njt_basisdata');
    let val_nj_bangunan_asli = getValues('njb_basisdata');

    let val_id_jen_perolehan = getValues('jenis_perolehan');
    let pengurangan = getValues('pengurangan_a');

    const bar = NPOPTKP.filter((item) => item.id === val_id_jen_perolehan);

    val_id_jen_perolehan = bar[0].id;

    let val_npoptkp = bar[0].npoptkp;
    let val_npop = 0;
    let val_npopkp = 0;
    let val_bphtb = 0;
    let bphtb_x = 0;
    let jmlh = 0;
    let hit_jml = 0;

    let val_hitung_nj_tanah_dialihkan = val_tanah_dialihkan * val_nj_tanah_asli;

    let val_hitung_nj_bangunan_dialihkan =
      val_bangunan_dialihkan * val_nj_bangunan_asli;

    let val_nj_pbb =
      val_hitung_nj_tanah_dialihkan + val_hitung_nj_bangunan_dialihkan;

    if (isNaN(val_tanah_dialihkan) || val_tanah_dialihkan === 0) {
      val_tanah_dialihkan = 0;
    }

    if (isNaN(val_bangunan_dialihkan) || val_bangunan_dialihkan === 0) {
      val_bangunan_dialihkan = 0;
    }

    if (
      isNaN(val_nj_tanah_asli) ||
      val_nj_tanah_asli === 0 ||
      !val_nj_tanah_asli
    ) {
      val_nj_tanah_asli = 0;
    }

    if (
      isNaN(val_nj_bangunan_asli) ||
      val_nj_bangunan_asli === 0 ||
      !val_nj_bangunan_asli
    ) {
      val_nj_bangunan_asli = 0;
    }

    if (isNaN(val_hitung_nj_tanah_dialihkan)) {
      val_hitung_nj_tanah_dialihkan = 0;
    }

    setValue('hit_njt_analisis', val_hitung_nj_tanah_dialihkan);

    if (isNaN(val_hitung_nj_bangunan_dialihkan)) {
      val_hitung_nj_bangunan_dialihkan = 0;
    }

    setValue('hit_njb_analisis', val_hitung_nj_bangunan_dialihkan);

    if (isNaN(val_nj_pbb)) {
      val_nj_pbb = 0;
    }

    setValue('nj_pbb', val_nj_pbb);
    setValue('npoptkp_a', val_npoptkp);

    if (val_hrga_trx > val_nj_pbb) {
      val_npop = val_hrga_trx;
    } else {
      val_npop = val_nj_pbb;
    }

    if (val_id_jen_perolehan === '8') {
      val_npop = val_hrga_trx;
    }

    setValue('njop_a', val_nj_pbb);
    setValue('npop_a', val_npop);

    val_npopkp = val_npop - val_npoptkp;
    if (val_npopkp < 0) {
      val_npopkp = 0;
    }

    setValue('npopkp_a', val_npopkp);

    val_bphtb = (val_npopkp * 5) / 100;

    if (val_bphtb < 0) {
      val_bphtb = 0;
    }

    bphtb_x = parseInt(val_bphtb);

    setValue('bphtb_a', bphtb_x);
    setValue('bphtb_hrs_bayar_a', bphtb_x);

    jmlh = (bphtb_x * pengurangan) / 100;
    hit_jml = bphtb_x - jmlh;
    if (hit_jml > 0) {
      setValue('bphtb_hrs_bayar_a', hit_jml);
    } else {
      setValue('bphtb_hrs_bayar_a', 0);
    }
  };

  const onSetSimpanPenetapan = (value) => {
    setSimpanPenetapan(value);
  };

  const onSetDisablePenetapan = (value) => {
    setDisablePenetapan(value);
  };

  const onUpdatePerhitungan = (data) => (value) => {
    onSetDisablePenetapan(false);
    if (data.penetapan) {
      Alert.alert(
        'Info',
        `Data ini sudah ada penetapan!`,
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => null,
          },
        ],
        { cancelable: false },
      );
    } else {
      Alert.alert(
        'Info',
        `Simpan perubahan?`,
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              sendUpdatePerhitungan(
                {
                  ...value,
                  jenis_perolehan_bar: value.jenis_perolehan,
                  id: data.id,
                },
                (value) => {
                  onSetUpdatePerhitungan(value);
                  if (value.data) {
                    Alert.alert(
                      'Info',
                      'Berhasil update data!',
                      [
                        {
                          text: 'OK',
                          onPress: () => {
                            getDetail(data.id, () => null);
                          },
                        },
                      ],
                      { cancelable: false },
                    );
                  }

                  console.log('[value]', value);

                  if (value.errors) {
                    Alert.alert(
                      'Error',
                      `Gagal update data!`,
                      [
                        {
                          text: 'OK',
                          onPress: () => null,
                        },
                      ],
                      { cancelable: false },
                    );
                  }
                },
              );
            },
          },
        ],
        { cancelable: false },
      );
    }
  };

  const onSimpanPenetapan = (data) => (value) => {
    if (data.penetapan) {
      Alert.alert(
        'Info',
        `Data ini sudah ada penetapan!`,
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => null,
          },
        ],
        { cancelable: false },
      );
    } else {
      Alert.alert(
        'Info',
        'Simpan Penetapan?',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              sendSimpanPenetapan(
                {
                  ...value,
                  jenis_perolehan_bar: value.jenis_perolehan,
                  id: data.id,
                },
                (value) => {
                  onSetSimpanPenetapan(value);
                  if (value.data) {
                    Alert.alert(
                      'Info',
                      'Berhasil simpan penetapan!',
                      [
                        {
                          text: 'OK',
                          onPress: () => {
                            getDetail(data.id, () => null);
                          },
                        },
                      ],
                      { cancelable: false },
                    );
                  }
                },
              );
            },
          },
        ],
        { cancelable: false },
      );
    }
  };

  return (
    <>
      <TitleHead>Perhitungan BPHTB</TitleHead>

      <View style={styles.body}>
        <View style={styles.sectionInputContainer}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    label="Nomor Sertipikat"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                )}
                name="nosertipikat"
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    label="Tanggal Sertipikat"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                )}
                name="tgl_sertipikat"
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <View
                    style={{
                      backgroundColor: '#EDF2F7',
                      borderBottomWidth: 1,
                      borderBottomColor: '#A0AEC0',
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      marginBottom: 10,
                    }}>
                    <View
                      style={{
                        paddingHorizontal: 10,
                        paddingTop: 10,
                      }}>
                      <Text style={{ fontSize: 11, color: '#718096' }}>
                        Jenis Perolehan
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
                      selectedValue={value}
                      prompt="Pick one, just one"
                      onValueChange={(itemValue, itemIndex) => {
                        onChange(itemValue);
                        iniPerhitungannyaNjop();
                      }}>
                      {NPOPTKP.map((item) => (
                        <Picker.Item
                          key={item.id}
                          label={`${item.id} ${item.label}`}
                          value={item.id}
                        />
                      ))}
                    </Picker>
                  </View>
                )}
                name="jenis_perolehan"
                defaultValue=""
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.sectionInputContainer}>
          <View style={styles.row}>
            <View style={[styles.col, styles.prXs]}>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    keyboardType="numeric"
                    label="Luas Tanah Dialihkan"
                    onBlur={onBlur}
                    onChangeText={(value) => {
                      onChange(value);
                      iniPerhitungannyaNjop();
                    }}
                    value={value}
                  />
                )}
                name="lt_dialihkan"
                defaultValue=""
              />
            </View>
            <View style={[styles.col, styles.prXs]}>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    editable={false}
                    keyboardType="numeric"
                    label="NJOP Tanah (m2)"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={formatAmount(value)}
                  />
                )}
                name="njt_basisdata"
                defaultValue=""
              />
            </View>
            <View style={[styles.col, styles.plXs]}>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    editable={false}
                    keyboardType="numeric"
                    label="Luas x NJOP Tanah (m2)"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={formatAmount(value)}
                  />
                )}
                name="hit_njt_analisis"
                defaultValue=""
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.col, styles.prXs]}>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    keyboardType="numeric"
                    label="Luas Bangunan  Dialihkan"
                    onBlur={onBlur}
                    onChangeText={(value) => {
                      onChange(value);
                      iniPerhitungannyaNjop();
                    }}
                    value={value}
                  />
                )}
                name="lb_dialihkan"
                defaultValue=""
              />
            </View>
            <View style={[styles.col, styles.prXs]}>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    keyboardType="numeric"
                    label="NJOP Bangunan  (m2)"
                    onBlur={onBlur}
                    onChangeText={(value) => {
                      onChange(unFormatAmount(value));
                      iniPerhitungannyaNjop();
                    }}
                    value={formatAmount(value)}
                  />
                )}
                name="njb_basisdata"
                defaultValue=""
              />
            </View>
            <View style={[styles.col, styles.plXs]}>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    editable={false}
                    keyboardType="numeric"
                    label="Luas x NJOP Bangunan  (m2)"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={formatAmount(value)}
                  />
                )}
                name="hit_njb_analisis"
                defaultValue=""
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.sectionInputContainer}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    editable={false}
                    keyboardType="numeric"
                    label="NJOP PBB"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={formatAmount(value)}
                  />
                )}
                name="nj_pbb"
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    keyboardType="numeric"
                    label="Harga Transaksi"
                    onBlur={onBlur}
                    onChangeText={(value) => {
                      onChange(unFormatAmount(value));
                      iniPerhitungannyaNjop();
                    }}
                    value={formatAmount(value)}
                  />
                )}
                name="harga_trx"
                defaultValue=""
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.sectionInputContainer}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Button
                disabled={updatePerhitungan.loading}
                loading={updatePerhitungan.loading}
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: '#A0AEC0',
                  borderRadius: 10,
                  elevation: 4,
                  marginVertical: 16,
                }}
                color="#ffffff"
                uppercase={false}
                onPress={handleSubmit(onUpdatePerhitungan(data))}>
                Update Data
              </Button>
            </View>
          </View>
        </View>
      </View>

      <TitleHead>Penetapan BPHTB</TitleHead>
      <View style={[styles.body, { paddingBottom: 95 }]}>
        <View style={styles.sectionInputContainer}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    editable={false}
                    keyboardType="numeric"
                    label="NJOP"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={formatAmount(value)}
                  />
                )}
                name="njop_a"
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    editable={false}
                    keyboardType="numeric"
                    label="NPOP"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={formatAmount(value)}
                  />
                )}
                name="npop_a"
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    editable={false}
                    keyboardType="numeric"
                    label="NPOPTKP"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={formatAmount(value)}
                  />
                )}
                name="npoptkp_a"
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    editable={false}
                    keyboardType="numeric"
                    label="NPOPKP"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={formatAmount(value)}
                  />
                )}
                name="npopkp_a"
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    editable={false}
                    keyboardType="numeric"
                    label="BPHTB"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={formatAmount(value)}
                  />
                )}
                name="bphtb_a"
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    editable={false}
                    keyboardType="numeric"
                    label="Pengurangan"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={formatAmount(value)}
                  />
                )}
                name="pengurangan_a"
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    editable={false}
                    keyboardType="numeric"
                    label="BPHTB harus dibayar"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={formatAmount(value)}
                  />
                )}
                name="bphtb_hrs_bayar_a"
                defaultValue=""
              />
            </View>
          </View>
        </View>

        <View style={styles.sectionInputContainer}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Button
                disabled={simpanPenetapan.loading || disablePenetapan}
                loading={simpanPenetapan.loading}
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: '#A0AEC0',
                  borderRadius: 10,
                  elevation: 4,
                  marginVertical: 16,
                }}
                color="#ffffff"
                uppercase={false}
                onPress={handleSubmit(onSimpanPenetapan(data))}>
                Simpan Penetapan
              </Button>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const ValidasiPermohonan = React.memo((props) => {
  const dispatch = useDispatch();
  const [isData, setIsData] = useState({
    ...INITIAL_STATE_LOCAL,
    refreshing: false,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [statusLunas, setStatusLunas] = useState(null);
  const [validasiData, setValidasiData] = useState(INITIAL_STATE_LOCAL);
  const { control, handleSubmit } = useForm();
  const data = useSelector((state) => state.permohonan.detail);

  const detail = useCallback(
    (value, changeData) => dispatch(actDetailPermohonan(value, changeData)),
    [dispatch],
  );

  const validasiPermohonan = useCallback(
    (value, onValidasiData) =>
      dispatch(actValidasiPermohonan(value, onValidasiData)),
    [dispatch],
  );

  const onChangeData = (value) => {
    setIsData(value);
    setValidasiData((prevState) => ({
      ...prevState,
      ...INITIAL_STATE_LOCAL,
    }));
  };

  const onValidasiData = (value) => {
    setValidasiData(value);
  };

  const changeValidasiData = (value) => {
    onValidasiData(value);
    if (value.data) {
      ToastAndroid.show('Berhasil update data!', ToastAndroid.SHORT);
    }
  };

  const sendValidasiData = (id) => (value) => {
    Keyboard.dismiss();
    validasiPermohonan(
      {
        ...value,
        status: statusLunas,
        id: id,
      },
      changeValidasiData,
    );
  };

  const onModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  const onStatusLunas = (itemValue) => {
    setStatusLunas(itemValue);
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
    <>
      <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={25}>
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
            <TitleHead>Validasi Permohonan</TitleHead>

            <View style={styles.body}>
              <View
                style={[
                  styles.rowContainer,
                  styles.sectionContainer,
                  { paddingHorizontal: 24 },
                ]}>
                <View style={styles.row}>
                  <View
                    style={[
                      styles.col,
                      styles.bgGray,
                      styles.roundedLg,
                      styles.p,
                    ]}>
                    <Text style={styles.sectionTitle}>STATUS PERMOHONAN</Text>
                  </View>
                </View>
                <View style={[styles.row, styles.mt]}>
                  <View style={[styles.col, styles.px]}>
                    <Text style={styles.textSm}>Keterangan</Text>
                  </View>
                  <View style={[styles.colMd, styles.px]}>
                    <Text style={styles.textXs}>
                      {data.ket_permoh ? data.ket_permoh : '-'}
                    </Text>
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
                        setModalVisible(true);
                      }}>
                      Update Status
                    </Button>
                  </View>
                </View>
              </View>
            </View>

            <PerhitunganBphtb data={data} getDetail={detail} />
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
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
                <Text style={{ fontSize: 24 }}>Validasi Permohonan</Text>
                <View
                  style={{
                    marginTop: 24,
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
                      onValueChange={(itemValue, itemIndex) => {
                        onStatusLunas(itemValue);
                      }}>
                      <Picker.Item label="-" value="0" />
                      <Picker.Item label="Sukses" value="1" />
                      <Picker.Item label="Tertunda" value="2" />
                      <Picker.Item label="Belum Valid" value="3" />
                      <Picker.Item label="Menuggu" value="4" />
                      <Picker.Item label="Penijauan" value="6" />
                      <Picker.Item label="Lainnya" value="5" />
                    </Picker>
                  </View>

                  <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                      <TextAreaInput
                        label="Keterangan"
                        placeholder="Keterangan"
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                      />
                    )}
                    name="keterangan"
                    defaultValue=""
                  />
                </View>

                <View>
                  <Button
                    loading={validasiData.loading}
                    disabled={validasiData.loading}
                    style={{
                      alignSelf: 'flex-start',
                      backgroundColor: '#ED64A6',
                      borderRadius: 10,
                      elevation: 4,
                      marginTop: 16,
                    }}
                    color="#ffffff"
                    uppercase={false}
                    onPress={handleSubmit(sendValidasiData(data.id))}>
                    Simpan
                  </Button>
                  <Button
                    disabled={validasiData.loading}
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
                      if (!validasiData.loading) {
                        onModalVisible();
                      }
                      if (validasiData.data) {
                        setValidasiData(INITIAL_STATE_LOCAL);
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

export default ValidasiPermohonan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  sectionInputContainer: {
    paddingHorizontal: 24,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  plXs: {
    marginHorizontal: 2,
  },
  prXs: {
    marginHorizontal: 2,
  },
  body: {
    backgroundColor: Colors.white,
    width: '100%',
  },
  sectionContainer: {
    marginVertical: 16,
    paddingHorizontal: 16,
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
    backgroundColor: '#ffffff',
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
  label: {
    color: 'red',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#ED64A6',
    borderRadius: 10,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: '700',
    color: 'red',
  },
});
