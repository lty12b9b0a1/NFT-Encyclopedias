import React, { Component } from 'react';

import {Card, Button,Layout} from 'antd'

const {Meta} = Card
let lotteryInstance = null
const {Content } = Layout



export default class EntryInfo extends Component {

    
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
            
            <div>
                info
                
            </div>
        );
    }
}
