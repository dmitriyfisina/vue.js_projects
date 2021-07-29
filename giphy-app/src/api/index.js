import axios from 'axios'

export const giphy = axios.create({
    baseURL: 'http://api.giphy.com/v1/gifs/',
    params: {
        api_key: 'wMqvSK3gHL65KRyFxTxyrNCUCJbskKtb'
    }
})