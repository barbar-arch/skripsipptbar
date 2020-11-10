import superagent from 'superagent';

export const rootUrl = 'http://36.89.215.26';
export const yapayUrl = `${rootUrl}/yapay/public`;
export const rootApi = `${yapayUrl}/api`;

const Requ = {
  post: (url) => superagent.post(url).accept('application/json'),
  get: (url) => superagent.get(url).accept('application/json'),
};

const Api = {
  login: () => Requ.post(`${rootApi}/login-bphtb`),
  permohonan: () => Requ.get(`${rootApi}/permohonan-bphtb`),
  detailPermohonan: (id) => Requ.get(`${rootApi}/permohonan-bphtb/${id}`),
  berkas: () => Requ.get(`${rootApi}/berkas-admin`),
  penetapan: () => Requ.get(`${rootApi}/penetapan-bphtb`),
  detailPenetapan: (id) => Requ.get(`${rootApi}/penetapan-admin/${id}`),
  notifikasi: () => Requ.get(`${rootApi}/notifikasi`),
  validasiPermohonan: () => Requ.post(`${rootApi}/validasi-permohonan`),
  bayar: () => Requ.get(`${rootApi}/bayar`),
  updatePerhitungan: () => Requ.post(`${rootApi}/update-perhitungan`),
  simpanPenetapan: () => Requ.post(`${rootApi}/simpan-penetapan`),
  prosesPenetapan: () => Requ.post(`${rootApi}/proses-penetapan`),
  createVa: () => Requ.post(`${rootApi}/create-va`),
  prosesBayar: () => Requ.post(`${rootApi}/proses-bayar`),
  checkBerkas: (id) => Requ.get(`${rootApi}/check-berkas/${id}`),
  verifBerkas: () => Requ.post(`${rootApi}/verif-berkas`),
  ppat: () => Requ.get(`${rootApi}/ppat`),
  hapusInv: () => Requ.post(`${rootApi}/hapus-inv`),
  hapusPenetapan: () => Requ.post(`${rootApi}/hapus-penetapan`),
  hapusPermohonan: () => Requ.post(`${rootApi}/hapus-permohonan`),
};

export default { Api };
