import React from 'react'
import Header from './components/header'
import { Row } from 'antd'

export default class Common extends React.Component {
    render() {
        return (
            <div className="common-page">
                <Row>
                    <div className="simple-page">
                        <Header menuType="second" />
                    </div>
                </Row>
                <Row>
                    { this.props.children }
                </Row>
            </div>
        )
    }
}