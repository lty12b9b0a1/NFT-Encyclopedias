import React, { Component } from 'react';

import {Card, Button,Layout} from 'antd'
import { VerticalAlignBottomOutlined } from '@ant-design/icons'
const {Meta} = Card
let lotteryInstance = null
const {Content } = Layout



export default class NoWallet extends Component {

    
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
        
    }

    render() {
        // this.helpFunction()
        return (
            
            <div>
                <div className="nowalletpart1">
                    <img className="pic5" src="./resources/metamask.png"/>
                </div>
                
                <div className="nowalletpart2">
                    You need an Ethereum wallet to use NFT Encyclopedias.
                </div>
                <div className="nowalletpart3">
                    <Button size="large" type="primary" ghost href="http://metaosek.com/"><VerticalAlignBottomOutlined />Download Metamask</Button>
                </div>
            </div>
        );
    }
}
