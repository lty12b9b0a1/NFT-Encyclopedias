import React, { Component } from 'react';
import CardExampleCard from './ui'
import {Card, Button,Layout} from 'antd'
import {Link} from 'react-router-dom'
import { Color } from '@antv/attr';
import { toInteger } from '@antv/util';
const {Meta} = Card
let web3 = require('./web3');
let lotteryInstance = null
const {Content } = Layout



class App extends Component {

    play = async () => {
        
        console.log('play Button click')
        //1.调用合约方法
        //2.转钱1ETH
        this.setState({ isClicked: true })
        let accounts = await web3.eth.getAccounts()
        try {
            await lotteryInstance.methods.play().send({
                from: accounts[0],
                value: web3.utils.toWei('0.1', 'ether'),
                gas: '3000000',
            })
            window.location.reload()
            this.setState({ isClicked: false })
            alert('投注成功')
        } catch (e) {
            console.log(e)
            this.setState({ isClicked: false })
            alert('投注失败')
        }
    }
    draw = async () => {
        console.log('kaijiang Button click')
        //1.调用合约方法
        //2.转钱1ETH
        this.setState({ isClicked: true })
        let accounts = await web3.eth.getAccounts()
        try {
            await lotteryInstance.methods.draw().send({
                from: accounts[0],
                // value: web3.utils.toWei('1', 'ether'),
                gas: '3000000',
            })
            //显示中奖人
            let winner = await lotteryInstance.methods.winner().call()
            window.location.reload()
            this.setState({ isClicked: false })
            alert(`开奖成功!\n中奖人: ${winner}`)
        } catch (e) {
            console.log(e)
            this.setState({ isClicked: false })
            alert('开奖失败')
        }
    }
    refund = async () => {
        console.log('tuijiang Button click')
        //1.调用合约方法
        //2.转钱1ETH
        this.setState({ isClicked: true })
        let accounts = await web3.eth.getAccounts()
        try {
            await lotteryInstance.methods.refund().send({
                from: accounts[0],
                // value: web3.utils.toWei('1', 'ether'),
                gas: '3000000',
            })
            window.location.reload()
            this.setState({ isClicked: false })
            alert('退奖成功')
        } catch (e) {
            console.log(e)
            this.setState({ isClicked: false })
            alert('退奖失败')
        }
    }
    oc = () =>{
        console.log("click")
    }
    constructor() {
        super()
        this.state = {
            disabled:true,
            manager: '',
            round: '',
            winner: '',
            playerCounts: 0,
            balance: 0,
            players: [],
            currentAccount: '',
            isClicked: false,
            isShowButton: '',
        }
    }

    componentDidMount() {

    }

    async componentWillMount() {
        
        // //获取当前的所有地址
        let accounts=[]
        console.log(123)
        console.log(web3)
        if (web3==null){
            console.log(321)
        }
        else{
            accounts = await web3.eth.getAccounts()
            lotteryInstance = require('./eth')
            this.state.disabled=false;
        }


        // let manager = await lotteryInstance.methods.manager().call()
        // console.log(12)
        // let winner = await lotteryInstance.methods.winner().call()
        // let round = await lotteryInstance.methods.round().call()
        // let playerCounts = await lotteryInstance.methods.getPlayersCount().call()
        // //单位是wei，需要转换为eth单位
        // let balanceWei = await lotteryInstance.methods.getBalance().call()
        // //从wei单位转换为eth
        // let balance = web3.utils.fromWei(balanceWei, 'ether')
        // let players = await lotteryInstance.methods.getPlayers().call()
        // //是否显示管理员按钮
        // let isShowButton = accounts[0] === manager ? 'inline' : 'none'
        // console.log(playerCounts)
        // this.setState({
        //     // manager: manager,
        //     manager,
        //     round,
        //     winner,
        //     playerCounts,
        //     balance,
        //     players,
        //     currentAccount: accounts[0],
        //     isClicked: false,
        //     isShowButton
        // })
        this.setState({
            
        })
        // console.log(aasa);
    }

    helpFunction = () => {
        let manager = this.state.manager.toLowerCase()
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts[0]) {
                let isShowButton = accounts[0].toLowerCase() === manager ? 'inline' : 'none'
                this.setState({ currentAccount: accounts[0], isShowButton: isShowButton })
            }
        })
    }

    render() {
        // this.helpFunction()
        return (
            
            <div className="login2">
                <div className="login-content-wrap"><br/><br/><h1 style={{textAlign:"center"}} >Welcome to FastCharacter</h1></div>
                    <div style={{textAlign:"center"}}>
                    <Button disabled={this.state.disabled} className="login-form-button" type="primary" onClick={this.oc} size="large" ghost shape="round"  style={{marginTop:window.innerHeight*0.3}}>
                    <Link to={{pathname:"/List"}}>Get start Now!</Link>
                    </Button>
                    </div>
                
            </div>
        );
    }
}

export default App;