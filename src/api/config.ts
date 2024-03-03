import md5 from 'md5';


const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')

export const config = {
  url: 'https://api.valantis.store:41000/',
  password: md5(`Valantis_${stamp}`),

}