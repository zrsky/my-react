import React from 'react'
import menuConfig from '../../resource/menuConfig'
import { Menu, Icon } from 'antd'
import './index.less'
import { NavLink } from 'react-router-dom'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


export default class NavLeft extends React.Component {
    componentWillMount(){
        const menuTreeNode = this.renderMenu(menuConfig);
        console.log(menuTreeNode)

        this.setState({
            menuTreeNode
        })
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
            return <Menu.Item key={item.key}>
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
                <Menu theme="dark" mode="vertical">
                    { this.state.menuTreeNode }
                </Menu>

            </div>
        )
    }
}