import React, { Component } from 'react';
import CardExampleCard from './ui'
import {Card, Button,Layout,Col,Row , List,Modal,Image,Descriptions,Form,InputNumber,Tag} from 'antd'
import {FormOutlined, DollarCircleOutlined, SketchOutlined,QuestionCircleOutlined,FieldTimeOutlined } from '@ant-design/icons'
import {Link} from 'react-router-dom'
import { Color } from '@antv/attr';
import { toInteger } from '@antv/util';
const {Meta} = Card
let web3 = require('./web3');
let lotteryInstance = require('./eth')


function States  (e) {
  if(e.e.onsale){
      return <Tag color="magenta">onsale</Tag>
  }
  else{
      if(e.e.setaside==false){
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
        ownerhistory:[],
        choosedmodelid:0,
        auctiondurationday:0,
        auctiondurationhour:0,
        auctiondurationminute:0,
        startprice:0,
        bidprice:null,
        maxprice:0,
        maximumbid:'N/A',
        day:'N/A',
        hour:'N/A',
        minute:'N/A'
    }
  }
  async componentWillMount() {
        
    // //获取当前的所有地址
    let accounts = await web3.eth.getAccounts()
    if(accounts.length!=0){
        console.log(accounts.length)
    }

    
    
    let result = await lotteryInstance.methods.getAuction().call();
    let result2=await lotteryInstance.methods.refreshAllAuction().call();
    console.log(result2);

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
            endtime:result[i][14],
        })
    }
    
    this.setState({
        
    })
    
  }
  showModal = async  (e) => {
        
    delete this.state.ownerhistory
    this.state.ownerhistory=[];

    for(let i=0;i<=e.ownerhistory.length-1;i++){
        this.state.ownerhistory.push({
            hi:e.ownerhistory[i]
        })
    }
    let accounts = await web3.eth.getAccounts()
    let t=0;
    for(let i=0;i<=e.bidderhistory.length-1;i++){
      if(accounts[0]==e.bidderhistory[i]){
        this.setState({
          maximumbid:e.bidpricehistory[i]*1.0/100,
        })
        t=1;
      }
    }
    if(t==0){
        this.setState({
            maximumbid:'N/A',
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
    let time=(new Date().getTime()/1000);
    let time2=toInteger(time);
    console.log(time2);
    let diff=this.state.data[this.state.choosedmodelid].endtime-time2;
    if(diff<=0){
        this.setState({
            day:'N/A',
            hour:'N/A',
            minute:'N/A'
        })
    }
    else{
        let day=toInteger(diff/3600/24);
        let hour=toInteger((diff-day*3600*24)/3600);
        let minute=toInteger((diff-day*3600*24-hour*3600)/60);
        this.setState({
            day:day,
            hour:hour,
            minute:minute,
        })
        console.log(day,hour,minute);
    }
    
    

  };
  bid=async()=>{
    let accounts = await web3.eth.getAccounts()
    if(this.state.data[this.state.choosedmodelid].ownerhistory[this.state.data[this.state.choosedmodelid].ownerhistory.length-1]==accounts[0]){
        alert("You are the owner of this character!");
    }
    else
    this.setState({
      visible2:true,
    })
    console.log(this);
  }
  changebideprice=(value)=>{
    this.setState({
      bidprice:value
    })
  }
  participateauction = async()=>{
    let accounts = await web3.eth.getAccounts()
    if(accounts.length!=0){
        console.log(accounts.length)
    }
    console.log(this.state.data[this.state.choosedmodelid].ntfid);
        try{
            await lotteryInstance.methods.bid(this.state.data[this.state.choosedmodelid].ntfid,accounts[0]).send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.bidprice.toString(), 'ether'),
                gas: '200000',
            })
            alert("Bid success!");
        }
        catch(e){
          console.log(e);
            alert("Bid fail!");
        }
  }
  
  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleCancel2 = () => {
      this.setState({ visible2: false });
  };

    render() {
        // this.helpFunction()
        return (
            
            <div className="login2">
                
                <div className="login-content-wrap2">
                    <br/><br/><h1 style={{textAlign:"center"}} >NFT Characters on Sale</h1>
                    
                </div>
                <div className="login-content-wrap3" style={{textAlign:'center'}}>
                    <Button style={{marginLeft: 20,marginTop:10}} shape="round" ghost type="primary">
                        <Link to={{pathname:"/Create"}}>
                            <FormOutlined />Create your own Characters
                        </Link> 
                    </Button>
                    <Button style={{marginLeft: 20}} shape="round" ghost type="primary">
                        <Link to={{pathname:"/Own"}}>
                        <DollarCircleOutlined />Characters already hold
                        </Link>  
                        
                    </Button>
                    <Button style={{marginLeft: 20}} shape="round" ghost type="primary">
                        <Link to={{pathname:"/Bidding"}}>
                        <SketchOutlined />Bidding Characters
                        </Link>
                    </Button>
                    <Button style={{marginLeft: 20}} shape="round" type="primary">
                        <Link to={{pathname:"/Help"}}>
                            <QuestionCircleOutlined />What is NFT Characters?
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
                                    <Button key="submit" type="primary" onClick={()=>this.bid(item)}>
                                    Bid
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
                                        <Descriptions.Item label="Rest of time" span={3}><Tag color="green"><FieldTimeOutlined /> {this.state.day}d : {this.state.hour}h : {this.state.minute}m</Tag></Descriptions.Item>
                                        <Descriptions.Item label="Current bid price" span={1.5}>
                                          <svg t="1634640039778" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2518" width="16" height="16"><path d="M509.610667 766.72L195.413333 581.12 509.568 1024l314.453333-442.88-314.538666 185.6h0.128zM514.389333 0L200.106667 521.514667l314.24 185.770666 314.24-185.6L514.389333 0z" p-id="2519"></path></svg>
                                          {this.state.maxprice}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Your maximum bid" span={1.5}>
                                          <svg t="1634640039778" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2518" width="16" height="16"><path d="M509.610667 766.72L195.413333 581.12 509.568 1024l314.453333-442.88-314.538666 185.6h0.128zM514.389333 0L200.106667 521.514667l314.24 185.770666 314.24-185.6L514.389333 0z" p-id="2519"></path></svg>
                                          {this.state.maximumbid}
                                        </Descriptions.Item>
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
                                title={"Participate in Bidding"}
                                onCancel={this.handleCancel2}
                                footer={[
                                ]}
                                width={window.innerWidth*0.6}
                                >
                            <div id="body" className="login-formown">
                            
                            <Form onFinish={this.participateauction} style={{textAlign:'center'}}>
                                
                                <Form.Item label="Starting Price:"  name="startingsrice" >
                                <svg t="1634640039778" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2518" width="16" height="16"><path d="M509.610667 766.72L195.413333 581.12 509.568 1024l314.453333-442.88-314.538666 185.6h0.128zM514.389333 0L200.106667 521.514667l314.24 185.770666 314.24-185.6L514.389333 0z" p-id="2519"></path></svg>
                                    {this.state.maxprice}
                                    
                                </Form.Item>
                                <Form.Item label="Current Price:"  name="startingsrice" >
                                  <svg t="1634640039778" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2518" width="16" height="16"><path d="M509.610667 766.72L195.413333 581.12 509.568 1024l314.453333-442.88-314.538666 185.6h0.128zM514.389333 0L200.106667 521.514667l314.24 185.770666 314.24-185.6L514.389333 0z" p-id="2519"></path></svg>
                                    {this.state.maxprice}
                                    
                                </Form.Item>
                                <Form.Item label={<div>Your Bid Price<svg t="1634640039778" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2518" width="16" height="16"><path d="M509.610667 766.72L195.413333 581.12 509.568 1024l314.453333-442.88-314.538666 185.6h0.128zM514.389333 0L200.106667 521.514667l314.24 185.770666 314.24-185.6L514.389333 0z" p-id="2519"></path></svg></div>}  name="bidprice" rules={
                                    [
                                        { required: true, message: 'Please input the Bid Price' }
                                    ]
                                }>
                                    
                                    <InputNumber min={this.state.maxprice-(-0.01)} value={this.state.bidprice} onChange={this.changebideprice} />
                                    
                                </Form.Item>
                                
                                <Form.Item>
                                    <Button ghost  htmlType="submit" type="primary" shape="round" size='large'>
                                        Bid!
                                    </Button>
                                </Form.Item>
                            </Form>
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