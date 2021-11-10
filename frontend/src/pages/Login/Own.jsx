import React, { Component } from 'react';
import CardExampleCard from './ui'
import {Card, Button,Layout,Col,Row ,Modal, List,Image,Descriptions,Badge,Tag,Form,Input,InputNumber} from 'antd'
import {LeftOutlined,FormOutlined, DollarCircleOutlined, SketchOutlined,QuestionCircleOutlined } from '@ant-design/icons'
import {Link} from 'react-router-dom'
import { Color } from '@antv/attr';
import { ListItem } from 'semantic-ui-react';
import { toInteger } from '@antv/util';
const {Meta} = Card
let web3 = require('./web3');
let lotteryInstance = require('./eth')
const {Content } = Layout


function States  (e) {
    if(e.e.onsale){
        return <Tag color="magenta">onsale</Tag>
    }
    else{
        if(e.e.setaside==true){
            return <Tag color="orange">to be claimed</Tag>
        }
        else{
            return <Tag color="blue">stable</Tag>
        }
    }
}

class App extends Component {
    
    constructor() {
        super()

        this.state = {
            data:[],
            loading:false,
            visible:false,
            visible2:false,
            visible3:false,
            visible4:false,
            ownerhistory:[],
            bidderhistory:[],
            choosedmodelid:0,
            auctiondurationday:0,
            auctiondurationhour:0,
            auctiondurationminute:0,
            maxprice:0,
            startprice:0,
        }
    }

    async componentWillMount() {

        // //获取当前的所有地址
        let accounts = await web3.eth.getAccounts()
        if(accounts.length!=0){
            console.log(accounts.length)
            this.state.disabled=false;
        }
        
            let result = await lotteryInstance.methods.getCharacter(accounts[0]).call();
            console.log(result);
            for(let i=0;i<=result.length-1;i++){
            this.state.data.push({
                id:i,
                ntfid:result[i][0],
                name:result[i][1],
                imgurl:result[i][2],
                magic:result[i][3],
                strth:result[i][4],
                integ:result[i][5],
                lucky:result[i][6],
                level:result[i][7],
                ownerhistory:result[i][8],
                onsale:result[i][9],
                startprice:result[i][10]*1.0/100,
                bidderhistory:result[i][11],
                bidpricehistory:result[i][12],
                setaside:result[i][13],

                
            })
            }
        
        
        
        this.setState({
            
        })
        
    }
    
    
    showModal = (e) => {
        
        delete this.state.ownerhistory
        this.state.ownerhistory=[];

        for(let i=0;i<=e.ownerhistory.length-1;i++){
            this.state.ownerhistory.push({
                hi:e.ownerhistory[i]
            })
        }
        this.setState({
          visible: true,
          choosedmodelid:e.id,
        });
        if(e.bidderhistory.length==0){
            this.setState({
                maxprice:e.startprice
            })
        }
        else{
            this.setState({
                maxprice:e.bidpricehistory[e.bidderhistory.length-1]*1.0/100
            })
        }
      };
    
    sell =(e)=>{
        if(e.onsale==true||e.setaside==true){
            alert('This character is already on sale!');
        }
        else{
            this.setState({ visible2: true });
        }
    }
    auctionstatus =(e)=>{
        if(this.state.data[this.state.choosedmodelid].onsale==true||this.state.data[this.state.choosedmodelid].setaside==true){
            delete this.state.bidderhistory;
            this.state.bidderhistory=[];
            for(let i=0;i<=e.bidderhistory.length-1;i++){
                this.state.bidderhistory.push({
                    buyer:e.bidderhistory[i],
                    price:e.bidpricehistory[i]*1.0/100
                })

            }
            console.log(e.bidderhistory);
            console.log(this.state.bidderhistory);
            this.setState({
                visible3:true,
            })
        }
        else{
            alert("The character is not on sale!");
        }
    }
    confirm=async()=>{
        let accounts = await web3.eth.getAccounts()
        console.log(accounts);
        if(this.state.data[this.state.choosedmodelid].onsale==false&&this.state.data[this.state.choosedmodelid].setaside==true){
            if(this.state.data[this.state.choosedmodelid].bidderhistory.length==0){
                try{
                    await lotteryInstance.methods.ownerconfirm(this.state.data[this.state.choosedmodelid].ntfid).send({
                        from:accounts[0],
                        value: 0,
                        gas: '200000',
                    })
                    // alert("Sell success!");
                    alert("No one bid your character, auction ended.");
                }
                catch(e){
                    alert("Fail!");
                    console.log(e);
                }
                
            }
            else{
                this.setState({
                    visible4:true,
                })
            }
        }
        else{
            alert("The auction is not over yet!");
        }
    }
    confirm2=async()=>{
        let accounts = await web3.eth.getAccounts()
        try{
            await lotteryInstance.methods.ownerconfirm(this.state.data[this.state.choosedmodelid].ntfid).send({
                from:accounts[0],
                value: 0,
                gas: '200000',
            });
            alert("Sell success!");
        }
        catch(e){
            alert("Fail!");
            console.log(e);
        }
    }
    changeauctiondurationday=(value)=>{
        this.setState({
            auctiondurationday:value
        })
    }
    changeauctiondurationhour=(value)=>{
        this.setState({
            auctiondurationhour:value
        })
    }
    changeauctiondurationminute=(value)=>{
        this.setState({
            auctiondurationminute:value
        })
    }
    changestartprice=(value)=>{
        this.setState({
            startprice:value
        })
        console.log(this.state.startprice*100)
    }
    createauction =async()=>{
        let accounts = await web3.eth.getAccounts()
        console.log(this.state.startprice,this.state.auctionduration);
        let seconds=this.state.auctiondurationday*24*3600+this.state.auctiondurationhour*3600+this.state.auctiondurationminute*60;
        try{
            await lotteryInstance.methods.createNewAuction(this.state.data[this.state.choosedmodelid].ntfid,seconds,this.state.startprice*100).send({
                from: accounts[0],
                value: web3.utils.toWei('0.1', 'ether'),
                gas: '3000000',
            })
            alert("Create success!");
        }
        catch(e){
            alert("Create fail!");
            console.log(e);
        }
    }
    handleCancel = () => {
        this.setState({ visible: false });
    };
    handleCancel2 = () => {
        this.setState({ visible2: false });
    };
    handleCancel3 = () => {
        this.setState({ visible3: false });
    };
    handleCancel4 = () => {
        this.setState({ visible4: false });
    };

    render() {
        // this.helpFunction()
        return (
            
            <div className="login2">
                
                <div className="login-content-wrap2">
                    <br/><br/><h1 style={{textAlign:"center"}} >Your Own NFT Characters</h1>
                    
                </div>
                <div className="login-content-wrap3" >
                    <Button style={{marginLeft: 20, marginTop:10}} shape="round" ghost type="primary">
                        <Link to={{pathname:"/List"}}>
                            <LeftOutlined />Back
                        </Link>    
                    </Button>
                </div>

                <div className="login-content-wrap4">
                    <br/>
                    <List
                        grid={{
                        gutter: 0,
                        xs: 1,
                        sm: 2,
                        md: 6,
                        lg: 6,
                        xl: 6,
                        xxl: 6,
                        }}
                        pagination={{
                            onChange: page => {
                              console.log(page);
                            },
                            pageSize: 6,
                          }}
                        dataSource={this.state.data}
                        renderItem={item => (
                        <List.Item>
                            <Card
                                hoverable
                                style={{ width: 150}}
                                cover={<img width={150} height={200} alt="example" src={item.imgurl} />}
                                onClick={()=>this.showModal(item)}
                            >
                                {item.name}
                            </Card>
                            
                            <Modal
                                visible={this.state.visible}
                                title="Character's Information"
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                footer={[
                                    <Button key="back" onClick={this.handleCancel}>
                                    Back
                                    </Button>,
                                    <Button key="submit" type="primary" onClick={()=>this.auctionstatus(item)}>
                                    Auction Status
                                    </Button>,
                                    <Button key="submit" type="primary" onClick={()=>this.sell(item)}>
                                    Sell
                                    </Button>,
                                ]}
                                width={window.innerWidth*0.7}
                                >
                                 <Row>
                                    <Col span={8}>
                                        <Image
                                            width={200}
                                            height={300}
                                            src={this.state.data[this.state.choosedmodelid].imgurl}
                                            
                                        />
                                    </Col>
                                    <Col span={16}>
                                    <Descriptions layout="vertical" bordered size={"small"}>
                                        <Descriptions.Item label="Name" span={3}>{this.state.data[this.state.choosedmodelid].name}</Descriptions.Item>
                                        <Descriptions.Item label="Level" span={1.5}>{this.state.data[this.state.choosedmodelid].level}</Descriptions.Item>
                                        <Descriptions.Item label="State" span={1.5}><States e={this.state.data[this.state.choosedmodelid]}/></Descriptions.Item>
                                        
                                        {/* <Descriptions.Item label="Status" span={1}>
                                        
                                        <Badge status="processing" text="on sale" />
                                        </Descriptions.Item> */}
                                        <Descriptions.Item label="Magic" span={1.5}>{this.state.data[this.state.choosedmodelid].magic}</Descriptions.Item>
                                        <Descriptions.Item label="Strength" span={1.5}>{this.state.data[this.state.choosedmodelid].strth}</Descriptions.Item>
                                        <Descriptions.Item label="Intelligence" span={1.5}>{this.state.data[this.state.choosedmodelid].integ}</Descriptions.Item>
                                        <Descriptions.Item label="Luck" span={1.5}>{this.state.data[this.state.choosedmodelid].lucky}</Descriptions.Item>
                                        <Descriptions.Item label="Owner History">
                                            <List dataSource={this.state.ownerhistory}
                                                renderItem={item2 => (
                                                    <div>{item2.hi}</div>
                                                )}
                                            />
                                                
                                        </Descriptions.Item>
                                    </Descriptions>
                                    </Col>
                                </Row>
                                
                                    
                            </Modal>
                            <Modal
                                visible={this.state.visible2}
                                title={"Create Auction"}
                                onCancel={this.handleCancel2}
                                footer={[
                                ]}
                                width={window.innerWidth*0.6}
                                >
                            <div id="body" className="login-formown">
                            
                            <Form onFinish={this.createauction} style={{textAlign:'center'}}>
                                
                                <Form.Item label={<div>Starting Price<svg t="1634640039778" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2518" width="20" height="20"><path d="M509.610667 766.72L195.413333 581.12 509.568 1024l314.453333-442.88-314.538666 185.6h0.128zM514.389333 0L200.106667 521.514667l314.24 185.770666 314.24-185.6L514.389333 0z" p-id="2519"></path></svg></div>}  name="startingsrice" rules={
                                    [
                                        { required: true, message: 'Please input the Starting Price' }
                                    ]
                                }>
                                    
                                    
                                    <InputNumber min={0.01} max={59}value={this.state.startprice} onChange={this.changestartprice} />
                                    
                                </Form.Item>
                                <Form.Item label="Auction Duration(days):" name="auctiondurtionday" rules={
                                    [
                                        { required: true, message: 'Please input the auction duration days' },

                                    ]
                                }>
                                    <InputNumber min={0} max={23} value={this.state.auctiondurationday} onChange={this.changeauctiondurationday} />
                                    
                                </Form.Item >
                                <Form.Item label="Auction Duration(hours):" name="auctiondurtionhour" rules={
                                    [
                                        { required: true, message: 'Please input the auction duration hours' },

                                    ]
                                }>
                                    
                                    <InputNumber min={0} max={29} value={this.state.auctiondurationhour} onChange={this.changeauctiondurationhour} />
                                    
                                </Form.Item >
                                <Form.Item label="Auction Duration(minutes):" name="auctiondurtionminute" rules={
                                    [
                                        { required: true, message: 'Please input the auction duration minutes' },

                                    ]
                                }>
                                    
                                    <InputNumber min={1-this.state.auctiondurationday-this.state.auctiondurationhour} value={this.state.auctiondurationminute} onChange={this.changeauctiondurationminute} />
                                </Form.Item >
                                <Form.Item>
                                    <Button ghost  htmlType="submit" type="primary" shape="round" size='large'>
                                        Create!
                                    </Button>
                                </Form.Item>
                                
                                
                                
                               

                                

                            </Form>
                            </div>
                            </Modal>
                            <Modal
                                visible={this.state.visible3}
                                title={"Auction status"}
                                onCancel={this.handleCancel3}
                                footer={[
                                    <Button key="back" onClick={this.handleCancel3}>
                                    Back
                                    </Button>,
                                    <Button key="submit" type="primary" onClick={()=>this.confirm(item)}>
                                    Confirm
                                    </Button>,
                                ]}
                                width={window.innerWidth*0.6}
                                >
                            <Descriptions layout="vertical" bordered size={"small"}>
                                        <Descriptions.Item label="Name" span={3}>{this.state.data[this.state.choosedmodelid].name}</Descriptions.Item>
                                        
                                        <Descriptions.Item label="Level" span={1.5}>{this.state.data[this.state.choosedmodelid].level}</Descriptions.Item>
                                        <Descriptions.Item label="State" span={1.5}><States e={this.state.data[this.state.choosedmodelid]}/></Descriptions.Item>
                                        <Descriptions.Item label="Start Price" span={1.5}>
                                          <svg t="1634640039778" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2518" width="16" height="16"><path d="M509.610667 766.72L195.413333 581.12 509.568 1024l314.453333-442.88-314.538666 185.6h0.128zM514.389333 0L200.106667 521.514667l314.24 185.770666 314.24-185.6L514.389333 0z" p-id="2519"></path></svg>
                                          {this.state.data[this.state.choosedmodelid].startprice}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Current Price" span={1.5}>
                                          <svg t="1634640039778" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2518" width="16" height="16"><path d="M509.610667 766.72L195.413333 581.12 509.568 1024l314.453333-442.88-314.538666 185.6h0.128zM514.389333 0L200.106667 521.514667l314.24 185.770666 314.24-185.6L514.389333 0z" p-id="2519"></path></svg>
                                          {this.state.maxprice}
                                        </Descriptions.Item>
                                        {/* <Descriptions.Item label="Status" span={1}>
                                        
                                        <Badge status="processing" text="on sale" />
                                        </Descriptions.Item> */}

                                        <Descriptions.Item label="Bidder History">
                                            <List dataSource={this.state.bidderhistory}
                                                renderItem={item2 => (
                                                    <div>
                                                        {item2.buyer}:
                                                        <svg t="1634640039778" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2518" width="16" height="16"><path d="M509.610667 766.72L195.413333 581.12 509.568 1024l314.453333-442.88-314.538666 185.6h0.128zM514.389333 0L200.106667 521.514667l314.24 185.770666 314.24-185.6L514.389333 0z" p-id="2519"></path></svg>
                                                        {item2.price}
                                                    </div>
                                                )}
                                            />
                                                
                                        </Descriptions.Item>
                            </Descriptions>
                            </Modal>
                            <Modal
                                visible={this.state.visible4}
                                title={<div>Sure to sell "{this.state.data[this.state.choosedmodelid].name}" on
                                <svg t="1634640039778" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2518" width="16" height="16"><path d="M509.610667 766.72L195.413333 581.12 509.568 1024l314.453333-442.88-314.538666 185.6h0.128zM514.389333 0L200.106667 521.514667l314.24 185.770666 314.24-185.6L514.389333 0z" p-id="2519"></path></svg>
                                 {this.state.maxprice}?</div>}
                                onCancel={this.handleCancel4}
                                footer={[
                                    <Button key="back" onClick={this.handleCancel4}>
                                    Think again
                                    </Button>,
                                    <Button key="submit" type="primary" onClick={()=>this.confirm2(item)}>
                                    Yes!
                                    </Button>,
                                ]}
                                width={window.innerWidth*0.6}
                                >
                            <div id="body">
                                <h3>You will lose your character forever and cannot recover!</h3>
                            </div>
                            </Modal>
                        </List.Item>
                        )}
                    />
                </div>
                
                
            </div>
        );
    }
}

export default App;