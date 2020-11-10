import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text } from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import HeaderBar from '../components/HeaderBar';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = React.memo(() => {
  return (
    <>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <HeaderBar />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={{...styles.sectionTitle, marginBottom: 16}}>Info</Text>
              <View style={styles.row}>
                <Icon name="map-marker-radius" color="#4A5568" size={35} />
                <Text
                  style={{
                    ...styles.sectionDescription,
                    color: '#1A202C',
                    marginLeft: 16,
                  }}>
                  Jln. Jend. Sudirman No. 130 Kota Gorontalo
                </Text>
              </View>
              <View style={styles.row}>
                <Icon name="phone" color="#4A5568" size={35} />
                <Text
                  style={{
                    ...styles.sectionDescription,
                    color: '#1A202C',
                    marginLeft: 16,
                  }}>
                  +6282187617384
                </Text>
              </View>
              <View style={styles.row}>
                <Icon name="email" color="#4A5568" size={35} />
                <Text
                  style={{
                    ...styles.sectionDescription,
                    color: '#1A202C',
                    marginLeft: 16,
                  }}>
                  admin.bphtb@yanjak.go.id
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
});

export default ProfileScreen;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});
