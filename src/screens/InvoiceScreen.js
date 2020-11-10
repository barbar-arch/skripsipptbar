import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { formatAmount } from '../core/ppt';

const InvoiceScreen = React.memo((props) => {
  const data = props.route.params;

  return (
    <SafeAreaView>
      <View
        style={{
          display: 'flex',
          backgroundColor: '#ffffff',
          shadowColor: 'red',
          shadowOffset: {
            width: -1,
            height: -3,
          },
          shadowRadius: 2,
          shadowOpacity: 0.9,
          paddingTop: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 40,
              height: 8,
              borderRadius: 4,
              backgroundColor: '#A0AEC0',
            }}
          />
        </View>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.bodyContainer}>
          <View style={styles.body}>
            <Text
              style={{
                ...styles.headTitle,
                fontWeight: '700',
              }}>
              Kode Bayar
            </Text>
          </View>

          <View style={styles.body}>
            <View style={styles.card}>
              <View style={[styles.borderBottom, styles.row]}>
                <View style={styles.col}>
                  <Text style={styles.titleInfo}>BILLING ID</Text>
                </View>
                <View style={styles.colMd}>
                  <Text style={styles.subTitleInfo}>
                    {data.pembayaran.trx_id ? data.pembayaran.trx_id : '-'}
                  </Text>
                </View>
              </View>

              <View style={[styles.borderBottom, styles.row]}>
                <View style={styles.col}>
                  <Text style={styles.titleInfo}>JENIS PAJAK</Text>
                </View>
                <View style={styles.colMd}>
                  <Text style={styles.subTitleInfo}>BPHTB</Text>
                </View>
              </View>

              <View style={[styles.borderBottom, styles.row]}>
                <View style={styles.col}>
                  <Text style={styles.titleInfo}>NAMA</Text>
                </View>
                <View style={styles.colMd}>
                  <Text style={styles.subTitleInfo}>{data.nama_penerima}</Text>
                  <Text style={styles.subTitleInfo}>{data.nop}</Text>
                </View>
              </View>

              <View style={[styles.borderBottom, styles.row]}>
                <View style={styles.col}>
                  <Text style={styles.titleInfo}>MASA PAJAK</Text>
                </View>
                <View style={styles.colMd}>
                  <Text style={styles.subTitleInfo}>
                    {data.masa_pajak_bphtb ? data.masa_pajak_bphtb : '-'}
                  </Text>
                </View>
              </View>

              <View style={[styles.borderBottom, styles.row]}>
                <View style={styles.col}>
                  <Text style={styles.titleInfo}>MASA AKTIP</Text>
                </View>
                <View style={styles.colMd}>
                  <Text style={styles.subTitleInfo}>
                    {data.masa_aktip_bphtb ? data.masa_aktip_bphtb : '-'}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.infoBayar}>
              <Text style={styles.pajak}>PAJAK</Text>
              <Text style={styles.subPajak}>
                {data.pembayaran.jumlah_bayar
                  ? `Rp. ${formatAmount(data.pembayaran.jumlah_bayar)}`
                  : 0}
              </Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text
                  style={{
                    fontSize: 11,
                    marginBottom: 10,
                  }}>
                  GUNAKAN NOMOR AKUN DI BAWAH INI UNTUK MELAKUKAN PEMBAYARAN.
                </Text>
              </View>
            </View>

            <View style={{ ...styles.row, marginBottom: 5 }}>
              <View style={styles.colMd}>
                <Text style={{ fontSize: 12 }}>NAMA BANK</Text>
              </View>
              <View style={styles.colMd}>
                <Text style={{ fontSize: 12 }}>NO AKUN</Text>
              </View>
              <View style={styles.col}>
                <Text style={{ fontSize: 12 }}>BIAYA</Text>
              </View>
            </View>

            <View style={[styles.row, styles.borderBottom]}>
              <View style={styles.colMd}>
                <Text style={{ fontSize: 12 }}>BANK SULUTGO</Text>
              </View>
              <View style={styles.colMd}>
                <Text style={{ fontSize: 14 }}>
                  {data.pembayaran.va_all_trx ? data.pembayaran.va_bni : '-'}
                </Text>
              </View>
              <View style={styles.col}>
                <Text style={{ fontSize: 11, textAlign: 'right' }}>Rp. 0</Text>
              </View>
            </View>

            <View style={[styles.row, styles.borderBottom]}>
              <View style={styles.colMd}>
                <Text style={{ fontSize: 12 }}>BNI</Text>
              </View>
              <View style={styles.colMd}>
                <Text style={{ fontSize: 14 }}>
                  {data.pembayaran.va_all_trx
                    ? data.pembayaran.va_all_trx
                    : '-'}
                </Text>
              </View>
              <View style={styles.col}>
                <Text style={{ fontSize: 11, textAlign: 'right' }}>
                  Rp. 3,000
                </Text>
              </View>
            </View>

            <View style={[styles.row, styles.borderBottom]}>
              <View style={styles.colMd}>
                <Text style={{ fontSize: 12 }}>POS Indonesia</Text>
              </View>
              <View style={styles.colMd}>
                <Text style={{ fontSize: 14 }}>
                  {data.pembayaran.va_all_trx
                    ? data.pembayaran.va_all_trx
                    : '-'}
                </Text>
              </View>
              <View style={styles.col}>
                <Text style={{ fontSize: 12, textAlign: 'right' }}>
                  Rp. 3,500
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text>Catatan dan Petunjuk Pembayaran</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text>Catatan</Text>
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.row}>
              <View style={styles.col}>
                <View style={styles.row}>
                  <View style={styles.bullet}>
                    <Text style={styles.boldText}>{'1. '}</Text>
                  </View>
                  <View style={styles.bulletText}>
                    <Text style={styles.normalText}>
                      Untuk kemudahan bawalah bukti/cetakan ini untuk melakukan
                      pembayaran pada Bank atau ATM terpilih.
                    </Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={styles.bullet}>
                    <Text style={styles.boldText}>{'2. '}</Text>
                  </View>
                  <View style={styles.bulletText}>
                    <Text style={styles.normalText}>
                      Apabila telah melewati batas waktu pembayaran, kode/data
                      akan terhapus dari sistem, silahkan melakukan
                      proses/mencetak kembali Kode bayar baru pada website ini
                      (https://yanjak.gorontalokota.go.id).
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text>Petunjuk Pembayaran</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text>BNI</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <View style={styles.row}>
                  <View style={styles.bullet}>
                    <Text style={styles.boldText}>{'1. '}</Text>
                  </View>
                  <View style={styles.bulletText}>
                    <Text style={styles.normalText}>
                      Untuk kemudahan bawalah bukti/cetakan ini untuk melakukan
                      pembayaran pada Bank atau ATM terpilih.
                    </Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={styles.bullet}>
                    <Text style={styles.boldText}>{'2. '}</Text>
                  </View>
                  <View style={styles.bulletText}>
                    <Text style={styles.normalText}>
                      Apabila telah melewati batas waktu pembayaran, kode/data
                      akan terhapus dari sistem, silahkan melakukan
                      proses/mencetak kembali Kode bayar baru pada website ini
                      (https://yanjak.gorontalokota.go.id).
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ ...styles.row, marginTop: 10 }}>
              <View style={styles.col}>
                <Text>Bank SULUTGO</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <View style={styles.row}>
                  <View style={styles.bullet}>
                    <Text style={styles.boldText}>{'1. '}</Text>
                  </View>
                  <View style={styles.bulletText}>
                    <Text style={styles.normalText}>
                      BANK SULUTGO: Silahkan membawa cetakan ini dan
                      memperlihatkan ke Teler.
                    </Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={styles.bullet}>
                    <Text style={styles.boldText}>{'2. '}</Text>
                  </View>
                  <View style={styles.bulletText}>
                    <Text style={styles.normalText}>
                      {`ATM: Pilih Menu Pembayaran -> PBB -> Kota Gorontalo -> Masukkan Kode Bayar.`}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ ...styles.row, marginTop: 10 }}>
              <View style={styles.col}>
                <Text>POS Indonesia</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <View style={styles.row}>
                  <View style={styles.bullet}>
                    <Text style={styles.boldText}>{'1. '}</Text>
                  </View>
                  <View style={styles.bulletText}>
                    <Text style={styles.normalText}>
                      KANTOR POS: Silahkan membawa cetakan ini dan
                      memperlihatkan ke Teler.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    width: '100%',
    color: '#1A202C',
  },
  body: {
    paddingHorizontal: 24,
    marginBottom: 16,
    width: '100%',
  },
  card: {
    width: '100%',
    shadowColor: '#1A202C',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  titleInfo: {
    fontSize: 12,
  },
  subTitleInfo: {
    fontSize: 10,
  },
  borderBottom: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#718096',
    marginBottom: 10,
  },
  pajak: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A202C',
  },
  subPajak: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A202C',
  },
  row: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  col: {
    flex: 1,
    alignSelf: 'stretch',
  },
  colMd: {
    flex: 2,
    alignSelf: 'stretch',
  },
  infoBayar: {
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: 200,
  },
  rowFl: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flex: 1,
    width: '100%',
  },
  bullet: {
    width: 20,
  },
  bulletText: {
    flex: 1,
    width: '100%',
  },
  boldText: {
    fontWeight: '600',
  },
  normalText: {
    fontSize: 12,
    textAlign: 'justify',
  },
  bodyContainer: {
    flex: 1,
    paddingBottom: 75,
  },
});

export default InvoiceScreen;
