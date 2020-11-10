import React, { useCallback, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useDispatch } from 'react-redux';

import DetailPermohonan from '../components/DetailPermohonan';
import Berkas from '../components/Berkas';
import DetailPenetapan from '../components/DetailPenetapan';
import ValidasiPermohonan from '../components/ValidasiPermohonan';
import Pembayaran from '../components/Pembayaran';

import { actDetailPermohonan } from '../store/actions/permohonanAction';

const HomeTabScreen = React.memo((props) => <DetailPermohonan {...props} />);

const BerkasTabScreen = React.memo((props) => <Berkas {...props} />);

const ValidasiTabScreen = React.memo((props) => (
  <ValidasiPermohonan {...props} />
));

const PenetapanTabScreen = React.memo((props) => (
  <DetailPenetapan {...props} />
));

const PembayaranTabScreen = React.memo((props) => <Pembayaran {...props} />);

const Tab = createMaterialTopTabNavigator();

const DetailTabScreen = React.memo(({ route }) => {
  const dispatch = useDispatch();
  const { permohonan_id, initialLayout } = route.params;

  const getDetailPermohonan = useCallback(
    (value, onChangeDetail) =>
      dispatch(actDetailPermohonan(value, onChangeDetail)),
    [dispatch],
  );

  useEffect(() => {
    if (permohonan_id) getDetailPermohonan(permohonan_id, () => null);
  }, []);

  if (!initialLayout) return null; 

  return (
    <Tab.Navigator
      initialRouteName={initialLayout}
      tabBarOptions={{
        scrollEnabled: true,
        style: {
          elevation: 1,
          backgroundColor: '#ffffff',
          marginBottom: 1,
          height: 40,
        },
        indicatorStyle: {
          backgroundColor: '#ed64a6',
          width: 35,
          left: 40,
          borderWidth: 1.2,
          borderColor: '#ed64a6',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        },
        tabStyle: {
          width: 115,
          borderWidth: 0,
        },
        activeTintColor: '#d53f8c',
      }}>
      <Tab.Screen name="Detail" component={HomeTabScreen} />
      <Tab.Screen name="Berkas" component={BerkasTabScreen} />
      <Tab.Screen name="Validasi" component={ValidasiTabScreen} />
      <Tab.Screen name="Penetapan" component={PenetapanTabScreen} />
      <Tab.Screen name="Bayar" component={PembayaranTabScreen} />
    </Tab.Navigator>
  );
});

export default DetailTabScreen;
