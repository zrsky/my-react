import originJsonp from 'jsonp'
import { resolve } from 'path';
import { options } from 'sw-toolbox';
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
}