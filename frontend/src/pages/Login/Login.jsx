import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import {Menu, Dropdown} from 'antd'
import { DownOutlined} from '@ant-design/icons'
// import ManagerCenter from '../ManagerCenter/ManagerCenter'
// import StudentCenter from '../StudentCenter/StudentCenter'
import LoginInterface from './LoginInterface'
import ForgetPSW from './ForgetPSW'
import List from './List'
import Help from './Help'
import Create from './Create'
import Own from './Own'
import Bidding from './Bidding'
import './Login.css';
const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item icon={<DownOutlined />} disabled>
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item (disabled)
        </a>
      </Menu.Item>
      <Menu.Item disabled>
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item (disabled)
        </a>
      </Menu.Item>
      <Menu.Item danger>a danger item</Menu.Item>
    </Menu>
  );
export default class Login extends Component {
    render() {
        return (
            <div>
                asdasd
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Hover me <DownOutlined />
                </a>
            </Dropdown>,
                <Switch className="switch">
                    {/* <Route path="/ManagerCenter" component={ManagerCenter}></Route>
                    <Route path="/StudentCenter" component={StudentCenter}></Route> */}
                    <Route path="/LoginInterface" component={LoginInterface}></Route>
                    <Route path="/List" component={List}></Route>
                    <Route path="/Help" component={Help}></Route>
                    <Route path="/Own" component={Own}></Route>
                    <Route path="/Bidding" component={Bidding}></Route>
                    <Route path="/Create" component={Create}></Route>
                    <Route path="/ForgetPSW" component={ForgetPSW}></Route>
                    <Redirect to="/LoginInterface"></Redirect>
                </Switch>
            </div>
        )
    }
}


