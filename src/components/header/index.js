import React from 'react'
import { Col, Row} from 'antd'
import './index.less'
import { FormateDate } from '../../utils/utils'
import axios from '../../axios'

export default class Header extends React.Component {
    state = {};
    componentWillMount() {
        this.setState({
            userName:'河畔一角'
        })
        setInterval(()=>{
            let sys = FormateDate(new Date().getTime());
            this.setState({
                sys
            })
        },1000)
        this.getWeatherApiData()
    }

    getWeatherApiData() {
        let city = '北京';
        axios.jsonp({
            url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(city) + '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2',
        }).then((data) => {
            console.log(data)
            let day = data.results[0].weather_data[0]
            let dayPictureUrl = day.dayPictureUrl
            let weather = day.weather
            this.setState({
                dayPictureUrl,
                weather
            })
        })
    }

    render() {
        return(
            <div className="header">  
                <Row className="header-top">
                    <Col span="24">
                        <span>欢迎，{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span="4" className="breadcrumb-title">
                        首页
                    </Col>
                    <Col span="20" className="weather">
                        <span className="weather-date">{ this.state.sys }</span>
                        <img className="weather-img" src={ this.state.dayPictureUrl } alt=""/>
                        <span className="weather-des">{ this.state.weather }</span>
                    </Col>
                </Row>
            </div>
        )
    }
}