import originJsonp from 'jsonp'
import axios from 'axios'
import { message } from 'antd'

export default class Axios{
    static jsonp(options) {
        return new Promise((resolve,reject) => {
            originJsonp(options.url,{
                param: 'callback'
            }, (err, response) => {
                if(response.status == "success") {
                    resolve(response);
                }else{
                    reject(err)
                }
            })
        })
    }
    
    static ajax(options) {
        let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
        return new Promise((resolve, reject)=>{
            axios({
                method: options.type,
                url: options.url,
                baseURL: baseApi,
                params: (options.data && options.data.params) || '',
                timeout: 5000
            }).then((response) => {
                if(response.status === 200) {
                    if(response.data.code === 0) {
                        let res = response.data;
                        resolve(res);
                    }else{
                        message.info(response.data.message);
                    }
                }else{
                    reject(response.data)
                }
            })
        })
    }
}