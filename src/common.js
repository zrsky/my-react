import React from 'react'
import Header from './components/header'
import { Row } from 'antd'

export default class Common extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Header />
                </Row>
                <Row>
                    { this.props.children }
                </Row>
            </div>
        )
    }
}