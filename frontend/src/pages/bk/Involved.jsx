import React, { Component } from 'react';
import { DownOutlined,SearchOutlined ,LoadingOutlined, MinusCircleOutlined, PlusOutlined,StockOutlined,SketchOutlined,EditOutlined,SortAscendingOutlined} from '@ant-design/icons'
import {Card, Button,Layout, Row, Col,Checkbox,Cascader,List,Select,Tag,Affix} from 'antd'
import axios from 'axios';
import mainurl from "../location"
let web3 = require('./web3');
let lotteryInstance = require('./eth');
const {Meta} = Card
const {Content } = Layout
const { Option } = Select;
function States  (e) {
    if(e.e==1||e.e==2){
        return <Tag color="magenta">onsale</Tag>
    }
    else{
        
        return <Tag color="blue">stable</Tag>
        
    }
}

const children = [
    <Option key={1}>Price</Option>,
    <Option key={2}>Date</Option>,
    <Option key={3}>Popularity</Option>,
  ];

export default class Involved extends Component {

    
    constructor() {
        super()
        this.state = {
            data:[],
            tempdata:[],
            isheld:0,
            issell:0,
            iscreate:0,
        }
    }

    componentDidMount() {

    }

    async componentWillMount() {
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
    async test() {
        let accounts = await web3.eth.getAccounts()
        try{
            await lotteryInstance.methods.createEntry("123").send({
                from: accounts[0],
                value: web3.utils.toWei('0.1', 'ether'),
                gas: '3000000',
            })
            alert("Create success!");
        }
        catch(e){
            alert("Create fail!");
        }
    }
    async sell() {
        let accounts = await web3.eth.getAccounts()
        try{
            await lotteryInstance.methods.createSell(0,100).send({
                from: accounts[0],
                value: web3.utils.toWei('0.1', 'ether'),
                gas: '3000000',
            })
            alert("Create success!");
        }
        catch(e){
            console.log(e);
        }
    }
    async getentry() {
        let accounts = await web3.eth.getAccounts()
        try{
            let result = await lotteryInstance.methods.getEntry().call()

            console.log(result)
        }
        catch(e){
            console.log(e);
        }
    }
    async getsell() {
        let accounts = await web3.eth.getAccounts()
        try{
            let result = await lotteryInstance.methods.getSell().call()

            console.log(result)
        }
        catch(e){
            console.log(e);
        }
    }
    async buy() {
        let accounts = await web3.eth.getAccounts()
        try{
            await lotteryInstance.methods.buy(0).send({
                from: accounts[0],
                value: web3.utils.toWei('1', 'ether'),
                gas: '3000000',
            })
            alert("Create success!");
        }
        catch(e){
            console.log(e);
        }
    }
    async geteth(){
        let accounts = await web3.eth.getAccounts()
        try{
            await lotteryInstance.methods.geteth().send({
                from: accounts[0],
                value: web3.utils.toWei('0', 'ether'),
                gas: '3000000',
            })
        }
        catch(e){
            console.log(e);
        }
    }
    render() {
        // this.helpFunction()
        return (
            
            <div >
                <button onClick={this.test}>create</button>
                <button onClick={this.sell}>sell</button>
                <button onClick={this.buy}>buy</button>
                <button onClick={this.getentry}>ge</button>
                <button onClick={this.getsell}>gs</button>
                <button onClick={this.geteth}>geteth</button>
            </div>
        );
    }
}
