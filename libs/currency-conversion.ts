const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const APIKEY = 'de5b4e6d7bb9b03e073fdfd7fbf70102';

async function getCurrencies(): Promise<string[]> {
    console.log(process.env.APIKEY)
    const res = await axios.get(`http://api.exchangeratesapi.io/v1/symbols?access_key=${APIKEY}`)
    return Object.keys(res.data.symbols)
}

async function getChange(origin: string, end: string) { 
    const res = await axios.get(`https://api.exchangeratesapi.io/v1/latest?access_key=${APIKEY}&callback=GET`)
    return null
}

async function main(): Promise<void> {
    const currencies = await getCurrencies()
    for (let i = 0; i < currencies.length; i++) {
        console.log(currencies[i])
    }
}

main()