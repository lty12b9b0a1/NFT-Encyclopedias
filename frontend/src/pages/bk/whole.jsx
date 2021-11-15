import React, { Component } from 'react'
import { Route, Redirect, Switch,Link } from 'react-router-dom'
import {Menu, Dropdown,Row,Col,Input,Button} from 'antd'
import { DownOutlined,SearchOutlined } from '@ant-design/icons'
// import ManagerCenter from '../ManagerCenter/ManagerCenter'
// import StudentCenter from '../StudentCenter/StudentCenter'
import "./whole.css"
import mainurl from "../location"
import { Color } from '@antv/attr'
import HomePage from './HomePage'
import EntryInfo from './EntryInfo'
import EntryList from './EntryList'
import EntryCategory from './EntryCategory'
import Create from './Create'
import Held from './Held'
import Created from './Created'
import Edit from './Edit'
import Sell from './Sell'
import Buy from './Buy'
import Support from './Support'
import NotFound from './NotFoundEntry'
import NoWallet from './NoWallet'
import Involved from './Involved'
const menu1 = (
    <Menu>
      <Menu.Item className="menulistitem">
        <a target="_blank" >
        <Link to={{pathname:"/EntryList"}}><div className="menulistword">Entries List</div></Link>
        </a>
      </Menu.Item>
      
      <Menu.Item>
        <a target="_blank" >
        <Link to={{pathname:"/EntryCategory"}}><div className="menulistword">Browse by Category&nbsp;&nbsp;&nbsp;&nbsp;</div></Link>
        </a>
      </Menu.Item>
    </Menu>
  );
  const menu2 = (
    <Menu>
      <Menu.Item className="menulistitem">
        <a target="_blank" >
        <Link to={{pathname:"/jump/Create"}}><div className="menulistword">Create an NFT Entry&nbsp;&nbsp;&nbsp;&nbsp;</div></Link>
        </a>
      </Menu.Item>
      
      <Menu.Item>
        <a target="_blank" >
        <Link to={{pathname:"/Created"}}><div className="menulistword">Created Entries</div></Link>
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" >
        <Link to={{pathname:"/Held"}}><div className="menulistword">Held Entries</div></Link>
        </a>
      </Menu.Item>
      <Menu.Item>
      <Link to={{pathname:"/Edit"}}><div className="menulistword">Online Entry Editing</div></Link>
      </Menu.Item>
    </Menu>
  );
  const menu3 = (
    <Menu>
      <Menu.Item className="menulistitem">
        <a target="_blank">
        <Link to={{pathname:"/Sell"}}><div className="menulistword">Selling Entries</div></Link>
        </a>
      </Menu.Item>
      
      <Menu.Item>
        <a target="_blank" >
          <Link to={{pathname:"/Held"}}><div className="menulistword">Held Entries</div></Link>
        </a>
      </Menu.Item>
      <Menu.Item>
      <Link to={{pathname:"/Involved"}}><div className="menulistword">Involved Transactions&nbsp;&nbsp;&nbsp;&nbsp;</div></Link>
      </Menu.Item>
    </Menu>
  );
  const menu4 = (
    <Menu>
      <Menu.Item className="menulistitem">
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          <div className="menulistword">What is Ethereum?&nbsp;&nbsp;&nbsp;&nbsp;</div>
        </a>
      </Menu.Item>
      
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          <div className="menulistword">What is NFT(Non-Fungible Tokens)?&nbsp;&nbsp;&nbsp;&nbsp;</div>
        </a>
      </Menu.Item>
      <Menu.Item>
        <div className="menulistword">How to create an NFT entry?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
      </Menu.Item>
      <Menu.Item>
        <div className="menulistword">How to buy an NFT entry?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
      </Menu.Item>
      <Menu.Item>
        <div className="menulistword">What's good for me to spend money on NFT?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
      </Menu.Item>
      <Menu.Item>
        <div className="menulistword">No ,really, I need help!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
      </Menu.Item>
    </Menu>
  );
export default class Whole extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  componentDidMount() {
  }

  componentWillMount() {
  }
  search=(e)=>{
    window.location.href="http://127.0.0.1:3000/EntryInfo/"+e.target.value
  }
    render() {
        return (
            <div className="whole">
                <div className="menubar">
                  <Row className="menurow">
                    <Col span={1}>
                      <div className="menuitem1">
                        <Link to={{pathname:"/HomePage"}}>
                          <svg t="1636118361956"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1334" width="50" height="50"><path d="M512 64.223v369.743l-267.095 83.14L512 64.223zM512 64.223v369.743l267.095 83.14L512 64.223zM512 959.777V702.502L244.905 555.207 512 959.777zM512 959.777V702.502l267.095-147.295L512 959.777z" fill="#320b98" p-id="1335"></path><path d="M244.905 517.106L512 392.986v255.311L244.905 517.106zM779.095 517.106L512 392.986v255.311l267.095-131.191z" fill="#320b98" p-id="1336"></path></svg>
                        </Link>
                      </div>
                    </Col>
                    <Col span={11}>
                      <div className="menuitem234">
                        <Row>
                        <Col span={7}>
                          <div className="menuitem2">
                            <Dropdown overlay={menu1} trigger={['click']}>
                              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <div className="menuword">Search for Entries <DownOutlined className="menuico"/></div>
                              </a>
                            </Dropdown>
                          </div>
                        </Col>
                        <Col span={5}>
                          <div className="menuitem2">
                            <Dropdown overlay={menu2} trigger={['click']}>
                              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <div className="menuword">Developer <DownOutlined className="menuico"/></div>
                              </a>
                            </Dropdown>
                          </div>
                        </Col>
                        <Col span={6}>
                          <div className="menuitem3">
                            <Dropdown overlay={menu3} trigger={['click']}>
                              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <div className="menuword">Trading Center <DownOutlined className="menuico"/></div>
                              </a>
                            </Dropdown>
                          </div>
                        </Col>
                        <Col span={5}>
                          <div className="menuitem4">
                            <Dropdown overlay={menu4} trigger={['click']}>
                              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <div className="menuword">&nbsp;&nbsp;Learn <DownOutlined className="menuico"/></div>
                              </a>
                            </Dropdown>
                          </div>
                        </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col span={5}>
                    </Col>
                    <Col span={5}>
                      <div className="menuitem5">
                        <Input size="large" placeholder="search entries" prefix={<SearchOutlined className="searchico"/>} onPressEnter={this.search}/>
                      </div>
                    </Col>
                    <Col span={2}>
                      <div className="menuitem6">
                        <Link to={{pathname:"/Support"}}>
                          <Button type="primary" ghost size="large" >
                            <svg t="1636122213992" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10059" width="15" height="15"><path d="M502.538 793.068L810.045 485.58a176.476 176.476 0 1 0-249.569-249.57l-57.938 57.918-57.917-57.917A176.476 176.476 0 0 0 195.05 485.58l307.487 307.487z m28.98 86.896a40.96 40.96 0 0 1-57.938 0L137.114 543.498C36.209 442.593 36.209 279 137.114 178.074c100.925-100.905 264.52-100.905 365.424 0 100.926-100.905 264.52-100.905 365.425 0 100.925 100.925 100.925 264.52 0 365.424L531.517 879.985z" p-id="10060" fill="#117dfb"></path></svg>
                            Support
                          </Button>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                    
                </div>
                <div className="page">

                  
                    
                  <Switch className="switch">
                      {/* <Route path="/ManagerCenter" component={ManagerCenter}></Route>
                      <Route path="/StudentCenter" component={StudentCenter}></Route> */}
                      <Route path="/HomePage" component={HomePage}></Route>
                      <Route path="/NoWallet" component={NoWallet}></Route>
                      <Route path="/EntryInfo/:entryname" component={EntryInfo}></Route>
                      <Route path="/EntryList" component={EntryList}></Route>
                      <Route path="/EntryCategory" component={EntryCategory}></Route>
                      <Route path="/jump/Create" component={Create}></Route>
                      <Route path="/Held" component={Held}></Route>
                      <Route path="/Created" component={Created}></Route>
                      <Route path="/Edit/:entryname" component={Edit}></Route>
                      <Route path="/Sell" component={Sell}></Route>
                      <Route path="/Buy" component={Buy}></Route>
                      <Route path="/Involved" component={Involved}></Route>
                      <Route path="/Support" component={Support}></Route>
                      <Route path="/NotFound/:entryname" component={NotFound}></Route>
                      <Redirect to="/HomePage"></Redirect>
                  </Switch>
                </div>
            </div>
        )
    }
}


