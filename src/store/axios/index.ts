import axios from 'axios'

const baseUrl = 'http://192.168.0.107:11088/api'
const base= 'http://192.168.0.107:11088'

// interface axiosRequestArg {
//     method
//     path: string
//     axiosData: object
// }

export const axiosRequest = async (
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    path: string,
    axiosData: object
) =>
    await axios({
        method: method,
        url: path ==='login/' || path === 'GetCookieWebConfig/' ? `${base}/${path}` : `${baseUrl}/${path}`,
        data: axiosData,
    })
