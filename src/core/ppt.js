import numeral from 'numeral'

export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties
})

export const cleanObj = obj => {
  obj = typeof obj === "object" ? obj : {}
  for (let propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "" )
      delete obj[propName]
  }
  return obj
}

export const numberFormat = amount => {
  if (amount) return formatAmount(amount)
}

export const numberFormated = amount => {
  const number = amount.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR"
  })
  return number
}

export const isNumbering = value => {
  let isValid = true
  const pattern = /^\d+$/
  return pattern.test(value) && isValid
}

export const bulanIndo = bulan => {
  const masaPajak = {
    1: 'Januari',
    2: 'Februari',
    3: 'Maret',
    4: 'April',
    5: 'Mei',
    6: 'Juni',
    7: 'Juli',
    8: 'Agustus',
    9: 'September',
    10: 'Oktober',
    11: 'November',
    12: 'Desember'
  }

  return masaPajak[bulan]
}


export const formatAmount = input => {
  let number = numeral(input)
  let string = number.format('0,0')
  return string
}

export const unFormatAmount = input => {
  return numeral(input).value()
}

export const unFormatAmountXX = input => {
  if (!input) return

  return input
    .replace(/,/g, '')
    .replace(/\B(?==(\d{3})+(?!\d))/g, '')
}

export const numberFormatter = value => (
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(value)
)

export const isUndefined = val => {
  return typeof val === 'undefined'
}

export const isFormData = val => {
  return (typeof FormData !== 'undefined') && (val instanceof FormData)
}

export const isString = val => {
  return typeof val === 'string'
}

export const isNumber = val => {
  return typeof val === 'number'
}

export const isObject = val => {
  return val !== null && typeof val === 'object'
}

export const formatDate = date => {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

export const formatDateIndo = date => {
  const d = new Date(date)
  return [d.getFullYear(), stringBulanIndo(d.getMonth()), d.getDate()].join('-')
}

export const formatTanggalIndo = date => {
  const d = new Date(date)
  return [d.getDate(), stringBulanIndo(d.getMonth()), d.getFullYear()].join(' ')
}

export const formatTanggalIndomaret = date => {
  const d = new Date(date)
  return [d.getDate(), stringBulanIndo(d.getMonth()), d.getFullYear()].join('-')
}

export const formatTanggalMasaPajak = date => {
  const d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  let year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day
  return [day, month, year].join('/')
}

export const stringBulanIndo = key => {
  const MONTHS = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ]

  return MONTHS[key]
}

export const formatRupiah = angka => {
  let number_string = String(angka),
    split = number_string.split(','),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi),
    separator
  if (ribuan) {
    separator = sisa ? '.' : ''
    rupiah += separator + ribuan.join('.')
  }

  rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah
  return rupiah ? rupiah : ''
}

export const formatDatem = (date) => {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2)
    month = '0' + month
  if (day.length < 2)
    day = '0' + day

  return [year, month, day].join('-')
}
