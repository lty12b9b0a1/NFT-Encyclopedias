import React, { Component } from 'react';
import CardExampleCard from './ui'
import {Card, Button,Layout,Col,Row ,Form,Input,Checkbox, List,Image,Slider,InputNumber} from 'antd'
import {FormOutlined, DollarCircleOutlined, SketchOutlined,QuestionCircleOutlined ,LeftOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import { Color } from '@antv/attr';
const {Meta} = Card
let web3 = require('./web3');
let lotteryInstance = require('./eth')
const {Content } = Layout

const data = [
    {
      title: 'Title 1',
    },
    {
      title: 'Title 2',
    },
    {
      title: 'Title 3',
    },
    {
      title: 'Title 4',
    },
    {
      title: 'Title 5',
    },
    {
      title: 'Title 6',
    },
  ];
  for (let i = 0; i < 23; i++) {
    data.push({
        
        title: 'Title'+i,
        
      });
  }
class App extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            imgurl: "",
            type: "",
            magic: 0,
            strength:0,
            intelligence:0,
            luck: 0,

            

        };
    }
    async componentWillMount() {
        
        // //获取当前的所有地址
        let accounts = await web3.eth.getAccounts()
        if(accounts.length!=0){
            console.log(accounts.length)
            this.state.disabled=false;
        }
        
        this.setState({
            
        })
        
    }
    onFinish=async()=>{
        let accounts = await web3.eth.getAccounts()
        try{
            await lotteryInstance.methods.createNewCharacter(this.state.name,this.state.imgurl,this.state.magic,this.state.strength,this.state.intelligence,this.state.luck).send({
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
    onFinishFailed=()=>{
        
    }
    nameChange=(value)=>{
        this.setState({
            name:value.target.value
        })
    }
    reload=()=>{
        this.setState({

        })
    }
    imgurlChange=(value)=>{
        console.log(value.target.value)
        this.setState({
            imgurl:value.target.value,
        })
    }
    magicChange=value=>{
        this.setState({
            magic:value,
        })
    }
    strengthChange=value=>{
        this.setState({
        strength:value,
        })
    }
    intelligenceChange=value=>{
        this.setState({
            intelligence:value,
        })
    }
    luckChange=value=>{
        this.setState({
            luck:value,
        })
    }
    render() {
        // this.helpFunction()
        return (
            
            <div className="login2">
                
                <div className="login-content-wrap2">
                    <br/><br/><h1 style={{textAlign:"center"}} >Create Your Own Characters</h1>
                    
                </div>
                <div className="login-content-wrap53" style={{}}>
                    
                    <Button style={{marginLeft: 20, marginTop:10}} shape="round" ghost type="primary">
                        <Link to={{pathname:"/List"}}>
                            <LeftOutlined />Back
                        </Link>    
                    </Button>



                </div>
                <div className="login-content-wrap5">
                    <div className="login-content-wrapr">
                        <div id="body" className="login-form">
                            
                            <Form
                                initialValues={{ remember: true }}
                                onFinish={this.onFinish}>
                                
                                <Form.Item label="Name:" name="name" rules={
                                    [
                                        { required: true, message: 'Please input the name of your character' }
                                    ]
                                }>
                                    <Input value={this.state.name} onChange={this.nameChange} placeholder="name" />
                                </Form.Item>
                                <Form.Item label="Imgurl:" name="imgurl" rules={
                                    [
                                        { required: true, message: 'Please input the imgurl' },

                                    ]
                                }>
                                    <Input value={this.state.imgrul} onChange={this.imgurlChange} placeholder="imgurl" />
                                </Form.Item >
                                
                                <Form.Item label="Magic:   " >
                                <Row>
                                    <Col span={12}>
                                        
                                    <Slider
                                        min={0}
                                        max={20-this.state.intelligence-this.state.luck-this.state.strength}
                                        onChange={this.magicChange}
                                        value={typeof this.state.magic === 'number' ? this.state.magic : 0}
                                    />
                                    </Col>
                                    <Col span={4}>
                                    <InputNumber
                                        min={0}
                                        max={20-this.state.intelligence-this.state.luck-this.state.strength}
                                        style={{ margin: '0 16px' }}
                                        value={this.state.magic}
                                        onChange={this.magicChange}
                                    />
                                    </Col>
                                </Row>
                                </Form.Item>
                                <Form.Item label="Strth:  ">
                                <Row>
                                    <Col span={12}>
                                    <Slider
                                        min={0}
                                        max={20-this.state.intelligence-this.state.luck-this.state.magic}
                                        onChange={this.strengthChange}
                                        value={typeof this.state.strength === 'number' ? this.state.strength : 0}
                                    />
                                    </Col>
                                    <Col span={4}>
                                    <InputNumber
                                        min={0}
                                        max={20-this.state.intelligence-this.state.luck-this.state.magic}
                                        style={{ margin: '0 16px' }}
                                        value={this.state.strength}
                                        onChange={this.strengthChange}
                                    />
                                    </Col>
                                </Row>
                                </Form.Item>
                                <Form.Item label="Integ:">
                                <Row>
                                    <Col span={12}>
                                    <Slider
                                        min={0}
                                        max={20-this.state.strength-this.state.luck-this.state.magic}
                                        onChange={this.intelligenceChange}
                                        value={typeof this.state.intelligence === 'number' ? this.state.intelligence : 0}
                                    />
                                    </Col>
                                    <Col span={4}>
                                    <InputNumber
                                        min={0}
                                        max={20-this.state.strength-this.state.luck-this.state.magic}
                                        style={{ margin: '0 16px' }}
                                        value={this.state.intelligence}
                                        onChange={this.intelligenceChange}
                                    />
                                    </Col>
                                </Row>
                                </Form.Item>
                                <Form.Item label="Lucky:     ">
                                <Row>
                                    <Col span={12}>
                                    <Slider
                                        min={0}
                                        max={20-this.state.strength-this.state.intelligence-this.state.magic}
                                        onChange={this.luckChange}
                                        value={typeof this.state.luck === 'number' ? this.state.luck : 0}
                                    />
                                    </Col>
                                    <Col span={4}>
                                    <InputNumber
                                        min={0}
                                        max={20-this.state.strength-this.state.intelligence-this.state.magic}
                                        style={{ margin: '0 16px' }}
                                        value={this.state.luck}
                                        onChange={this.luckChange}
                                    />
                                    </Col>
                                </Row>
                                </Form.Item>
                                <Form.Item>
                                    <Button ghost className="login-form-button2" htmlType="submit" type="primary" shape="round" size='large'>
                                        Create!
                                    </Button>
                                </Form.Item>
                               

                                

                            </Form>
                            </div>
                    </div>
                    <div className="login-content-wrapl" style={{textAlign:'center'}}>
                    <Image
                        width={200}
                        height={300}
                        src={this.state.imgurl}
                        fallback="https://img1.baidu.com/it/u=2112916044,2952509083&fm=26&fmt=auto"
                    />
                    <br/>
                    <Button ghost type="primary" onClick={this.reload} >
                         reload
                    </Button>
                    </div>
                    <div className="login-content-wraptips">
                        <div className="login-form2">
                            <h1>Tips:</h1>
                        </div>
                    </div>
                </div>
                
                
            </div>
        );
    }
}

export default App;