import React, { Component } from 'react';

import {Card, Button,Layout,Row,Col} from 'antd'

const {Meta} = Card
let lotteryInstance = null
const {Content } = Layout



export default class Support extends Component {

    
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
                <div  className="part51">
                        <Row>
                            <Col span={12}>
                                <div className="part511">
                                    <img className="pic4" src="./resources/eth.png"/>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="part512">
                                    <div className="part512h">
                                        Support us
                                    </div>
                                    <div className="part512c">
                                        The best way to donate is to create an entry in the encyclopedia. This will not only provide convenience for those seeking analysis, but also bring benefits to you and us. Of course, you can donate directly to our account.
                                    </div>
                                    <div className="part512b">
                                        <Button size="large" type="primary" ghost onClick={() => this.props.history.push('./jump/Create')}>Create now</Button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <Button size="large" type="primary" ghost onClick={() => this.props.history.push('./NoWallet')}>Donate 0.1 Ethereum</Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                </div>
            </div>
        );
    }
}
