import React, { Component } from 'react';

import {Card, Button,Layout,Image ,Row,Col} from 'antd'

const {Meta} = Card
let lotteryInstance = null
const {Content } = Layout



export default class Whole extends Component {

    
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
    gotoexplore = ()=>{
        
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
                <div className="part1">
                    <img className="pic1" src="./resources/homepage.jpg"/>
                </div>
                <div className="part2">
                    <div className="part21">
                        Welcome to NFT Encyclopedias
                    </div>
                    <div className="part22">
                        NFT Encyclopedia is a decentralized encyclopedia website. You can not only browse the entries for information, but also win ETH through transactions
                    </div>
                    <div className="part23">
                        <Button size="large" type="primary" ghost onClick={() => this.props.history.push('./EntryList')}>Explore Entries</Button>
                    </div>
                </div>
                <div className="part3">
                    <Row>
                        <Col span={12}>
                            <div className="part31">
                                <div className="part311">
                                    Start with creating an entry
                                </div>
                                <div className="part312">
                                    Select an idle entry, write an appropriate explanation for it, and pay to complete the creation
                                </div>
                                <div className="part313">
                                    <Button size="large" type="primary" ghost onClick={() => this.props.history.push('./Create')}>Create Entries</Button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button size="large" type="primary" href="https://www.luohanacademy.com">Some tips about create</Button>
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="part32">
                                <img className="pic2" src="./resources/make.png"/>
                            </div>
                        </Col>
                    </Row>
                    
                </div>
                <div className="part4">
                    <Row>
                        <Col span={12}>
                        <div className="part41">
                            <Card
                                hoverable
                                className="card1"
                                cover={<img className="pic3" src="./resources/buy.png"/>}
                                onClick={() => this.props.history.push('./Create')}
                            >
                                <Meta title="Buy an entry from entry market"/>
                            </Card> 
                        </div>
                            
                        </Col>
                        <Col span={12}>
                            <div className="part42">
                                <Card
                                    hoverable
                                    className="card2"
                                    cover={<img className="pic3" src="./resources/sell.png"/>}
                                    onClick={() => this.props.history.push('./Create')}
                                    
                                >
                                    <Meta title="Sell an entry to earn ETH"/>
                                </Card> 
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                        <div className="part43">
                            <Card
                                hoverable
                                className="card3"
                                cover={<img className="pic3" src="./resources/transaction.png"/>}
                                onClick={() => this.props.history.push('./Create')}
                            >
                                <Meta title="Participate in transactions"/>
                            </Card> 
                        </div>
                            
                        </Col>
                        <Col span={12}>
                            <div className="part44">
                                <Card
                                    hoverable
                                    className="card4"
                                    cover={<img className="pic3" src="./resources/own.png"/>}
                                    onClick={() => this.props.history.push('./Create')}
                                >
                                    <Meta className="metarow" title="Held entries"/>
                                </Card> 
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="part5">
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
                                        What is Ethereum?
                                    </div>
                                    <div className="part512c">
                                        Ethereum is a technology that's home to digital money, global payments, and applications. The community has built a booming digital economy, bold new ways for creators to earn online, and so much more. It's open to everyone, wherever you are in the world – all you need is the internet.
                                    </div>
                                    <div className="part512b">
                                        <Button size="large" type="primary" href="https://www.luohanacademy.com">Learn more</Button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <Button size="large" type="primary" ghost onClick={() => this.props.history.push('./Sell')}>Sell to get ETH</Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div  className="part52">
                        <Row>
                            <Col span={12}>
                            <div className="part512">
                                    <div className="part512h">
                                        What is NFT?
                                    </div>
                                    <div className="part512c">
                                    The full name of NFT is non fungible tokens, which is often translated into "non homogenous tokens / non replaceable tokens" in Chinese. In short, NFT is an entry of the blockchain, which is a decentralized digital ledger technology similar to cryptocurrencies such as bitcoin. Because NFT is irreplaceable, it means that it can be used to represent unique things, such as the original Mona Lisa in a museum or the ownership of a piece of land.
                                    </div>
                                    <div className="part512b">
                                        <Button size="large" type="primary" href="https://www.luohanacademy.com">Learn more</Button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <Button size="large" type="primary" ghost onClick={() => this.props.history.push('./Create')}>Create your first NFT now</Button>
                                    </div>
                                </div>
                                
                            </Col>
                            <Col span={12}>
                                <div className="part511">
                                    <img className="pic4" src="./resources/nft.png"/>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div  className="part53">
                        <Row>
                            <Col span={12}>
                                <div className="part511">
                                    <img className="pic4" src="./resources/mining.png"/>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="part512">
                                    <div className="part532h">
                                        Why should I spend money on entries?
                                    </div>
                                    <div className="part512c">
                                    After you occupy the entry at a low price in the early stage, you can write some appropriate explanations, so that your entry will be more likely to sell at a high price in the future. As a collection, your name will always be recorded in the entry information.
                                    </div>
                                    <div className="part512b">
                                        <Button size="large" type="primary" ghost onClick={() => this.props.history.push('./Create')}>Yes, create now</Button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <Button size="large" type="primary" ghost onClick={() => this.props.history.push('./EntryList')}>Not really, just have a look</Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}
