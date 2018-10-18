import React from 'react'
import menuConfig from '../../resource/menuConfig'
import { Menu } from 'antd'
import './index.less'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import { switchMenu } from '../../redux/action'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class NavLeft extends React.Component {
    componentWillMount(){
        const menuTreeNode = this.renderMenu(menuConfig);
        console.log(menuTreeNode)

        this.setState({
            menuTreeNode
        })
    }

    handleClick = ({item})=>{
        let { dispatch } = this.props;
         // 事件派发，自动调用reducer，通过reducer保存到store对象中
        dispatch(switchMenu(item.props.title));

    }
    
    renderMenu = (data) => {
        return data.map((item)=>{
            if(item.children) {
                return (
                    <SubMenu title={item.title} key={item.key}>
                        { this.renderMenu(item.children) }
                    </SubMenu>
                )
            }
            return <Menu.Item key={item.key} title={item.title}>
                <NavLink to={item.key}>
                    {item.title}
                </NavLink>
            </Menu.Item>
        })
    }
    render() {
        return(
            <div className="navLeft">
                <div className="logo">
                    <img src="assets/logo-ant.svg" alt=""/>
                    <h1>Sky Ms</h1>
                </div>
                <Menu theme="dark" mode="vertical" onClick={ this.handleClick }>
                    { this.state.menuTreeNode }
                </Menu>

            </div>
        )
    }
}

export default connect()(NavLeft)