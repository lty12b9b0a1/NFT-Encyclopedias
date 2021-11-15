import React, { Component } from 'react';

import {Card, Button,Layout,Row,Col,Table,Affix,Tag,Descriptions, Badge} from 'antd'
import axios from 'axios';
import mainurl from "../location"
import { DownOutlined,SearchOutlined ,HighlightOutlined  } from '@ant-design/icons'
const {Meta} = Card
let web3 = require('./web3');
let lotteryInstance = null
const {Content } = Layout
function States  (e) {
    if(e.e==1||e.e==2){
        return <Tag color="magenta">onsale</Tag>
    }
    else{
        
        return <Tag  color="blue">stable</Tag>
        
    }
}
const columns = [
    {
      title: '',
      dataIndex: 'itemname',
      key: 'itemname',
    },
    {
      title: '',
      dataIndex: 'itemcontent',
      key: 'itemcontent',
    },
  ];
  const data = [
    {
      key: '1',
    },
    {
        key: '1',
      },
      {
        key: '1',
      },
  ]; 

export default class EntryInfo extends Component {

    
    constructor() {
        super()
        this.state = {
            entryname:"",
            entryimgurl:"",
            entryoverview:"",
            entryonsale:0,
            entryprice:0,
            owner:"",
            creator:"",
            entrybody:"",
            list1:[],
            list2:[],
        }
    }

    componentDidMount() {
    }

    componentWillMount() {
        
        this.setState({
            entryname:this.props.match.params.entryname
        })
        let formData = new window.FormData();
        formData.append("entryname",this.props.match.params.entryname)
        axios
        .post(mainurl+"/get_entryinfo",formData)
        .then((res) => {
            if(res.data=="-2"){
                this.props.history.push('/NotFound/'+this.props.match.params.entryname)
            }
            else if(res.data=="-1"){
                alert("something wrong~")
            }
            else{
                this.setState({
                    eid:res.data[0].eid,
                    entryname:res.data[0].entryname,
                    entryimgurl:res.data[0].entryimgurl,
                    entryoverview:res.data[0].entryoverview,
                    entryonsale:res.data[0].onsale,
                    entryprice:res.data[0].price,
                    owner:res.data[0].owner,
                    creator:res.data[0].creator,
                })
                console.log(this.state.entryimgurl)
                let formData2 = new window.FormData();
                formData2.append("eid",res.data[0].eid)
                axios
                .post(mainurl+"/get_entrybody",formData2)
                .then((res2) => {
                    if(res2.data){
                        this.setState({
                            entrybody:res2.data
                        })
                        axios
                        .post(mainurl+"/get_itemlist1",formData2)
                        .then((res3) => {
                            if(res3.data){
                                this.setState({
                                    list1:res3.data
                                })
                                axios
                                .post(mainurl+"/get_itemlist2",formData2)
                                .then((res4) => {
                                    if(res4.data){
                                        this.setState({
                                            list2:res4.data
                                        })
                                        axios
                                        .post(mainurl+"/get_ownerhistory",formData2)
                                        .then((res5) => {
                                            if(res5.data){
                                                
                                                
                                            }
                                        }).catch((error) => {
                                            alert(error);
                                        })
                                    }
                                }).catch((error) => {
                                    alert(error);
                                })
                            }
                        }).catch((error) => {
                            alert(error);
                        })
                    }
                }).catch((error) => {
                    alert(error);
                })
                
                
                
            }
        }).catch((error) => {
            alert(error);
        })
        
    }
    edit=async()=>{
        if (web3==null){
            alert('You need to install MetaMask first')
            this.props.history.push('/NoWallet')
        }
        else{
            let accounts = await web3.eth.getAccounts()
            if (accounts.length==0){
                alert('Please choose an account')
            }
            else{
                if(accounts[0]==this.state.owner){
                    this.props.history.push('../Edit/'+this.state.entryname)
                }
                else{
                    alert("You are not the owner of this entry!")
                }
            }
        }
    }
    buy=async()=>{
        if (web3==null){
            alert('You need to install MetaMask first')
            this.props.history.push('/NoWallet')
        }
        else{
            let accounts = await web3.eth.getAccounts()
            if (accounts.length==0){
                alert('Please choose an account')
            }
        }
    }
    render() {
        // this.helpFunction()
        const { list1,list2 } = this.state;
        return (
            
            <div className="create">
                
                
                <div className="createinner">

                    
                    <Row>
                        <Col span={4}>
                            <Affix offsetTop={5}>
                            <div className="createpart1">
                                <div className="createcategoryword">
                                    Category:
                                </div>
                                <div className="createcategory">
                                    category
                                </div>
                            </div>
                            </Affix>
                        </Col>
                        <Col span={16}>
                            <div className="createpart21">
                                <div className="createentrynameword">{this.state.entryname}</div>
                                <Row>
                                <Col span={12}>
                                    <div className="entryinfooverview">
                                        {this.state.entryoverview}
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="entryinfoimg">
                                        <img width="100%" src={this.state.entryimgurl}/>
                                    </div>
                                </Col>
                                </Row>
                            </div>
                            <div className="createpart22">
                                <div className="dd">
                                </div>
                                    <Row>
                                        <Col span={12}>
                                            <div className="createinfoitem1">
                                                <Table columns={columns} dataSource={list1} pagination={false}/>
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <div className="createinfoitem2">
                                                <Table columns={columns} dataSource={list2} pagination={false}/>
                                            </div>
                                        </Col>
                                    </Row>
                                    
                                    
                            </div>
                            <div className="createpart23">
                                <div className="createentrycontentword">
                                </div>
                                <div className="createentrycontent">
                                    
                                    <div className="entryinfobody"><div dangerouslySetInnerHTML={{__html: this.state.entrybody}}  /></div>

                                </div>
                            </div>
                            
                        </Col>
                        <Col span={4}>
                        <Affix offsetTop={5}>
                            <div className="createpart1">
                                
                                <div className="createsubmitbutton">
                                    
                                    <div style={{width:"100%"}}>
                                        <Descriptions layout="vertical" bordered style={{fontWeight:500}}>
                                            <Descriptions.Item label="State" ><States  e={this.state.entryonsale}/></Descriptions.Item>
                                            <Descriptions.Item span={5}
                                                label={<>Price<svg t="1634640039778" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2518" width="13" height="13"><path d="M509.610667 766.72L195.413333 581.12 509.568 1024l314.453333-442.88-314.538666 185.6h0.128zM514.389333 0L200.106667 521.514667l314.24 185.770666 314.24-185.6L514.389333 0z" p-id="2519"></path></svg>
                                            </>}>
                                                {this.state.entryprice}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Creator" span={6}><div style={{fontSize:"50%",fontStyle:"italic"}}>{this.state.creator}</div></Descriptions.Item>
                                            <Descriptions.Item label="Owner" span={6}><div style={{fontSize:"50%",fontStyle:"italic"}}>{this.state.owner}</div></Descriptions.Item>
                                            
                                        </Descriptions>
                                    </div>
                                <div style={{padding:"5%"}}>
                                <Button type="primary" ghost style={{width:"100%"}} onClick={this.edit}>
                                    <HighlightOutlined />Edit
                                </Button>
                                <div>&nbsp;</div>
                                <Button type="primary" ghost style={{width:"100%"}} onClick={this.buy}>
                                
                                        Purchase
                                </Button>
                                </div>
                                </div>
                            </div>
                            </Affix>
                        </Col>
                    </Row>
                </div>
                
            </div>
        );
    }
}
