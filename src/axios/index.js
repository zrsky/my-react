import originJsonp from 'jsonp'
import axios from 'axios'
import { message } from 'antd'
import { Pagination } from '../utils/utils'

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
                if(response.status == 200) {
                    if(response.data.code == '0') {
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

    static request(_this, url, params) {
        let data = {
            params: params
        };
        this.ajax({
            type: 'get',
            url: url,
            data: data
        }).then((data) => {
            const pager1 = {..._this.state.pagination};
            const pager2 = Pagination(data);
            const pagination = Object.assign(pager1, pager2);
            const list = data.result['item_list'] ? data.result['item_list'] : data.result['list'];
            list.map((item,index)=>{
                item.key = index;
            })
            _this.setState({
                dataSource: list,
                pagination: pagination
            })
        })
    }
}