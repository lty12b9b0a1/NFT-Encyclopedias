import React, { Component } from 'react';
import { DownOutlined,SearchOutlined ,LoadingOutlined, MinusCircleOutlined, PlusOutlined,StockOutlined,SketchOutlined,EditOutlined,SortAscendingOutlined} from '@ant-design/icons'
import {Card, Button,Layout, Row, Col,Checkbox,Cascader,List,Select,Tag,Affix} from 'antd'
import axios from 'axios';
import mainurl from "../location"
const {Meta} = Card
let lotteryInstance = null
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

export default class Sell extends Component {

    
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

    componentWillMount() {
        
        axios
        .post(mainurl+"/get_entry")
        .then((res) => {
            console.log(res.data)
            if(res.data){
                for(let i=0;i<=res.data.length-1;i++){
                    this.state.data.push({
                        id:res.data[i].id,
                        entryname:res.data[i].entryname,
                        entryimgurl:res.data[i].entryimgurl,
                        entryoverview:res.data[i].entryoverview,
                        owner:res.data[i].owner,
                        creator:res.data[i].creator,
                        onsale:res.data[i].onsale,
                        price:res.data[i].price,
                    })
                }
                let newdata=[]
                for(let i=0;i<=this.state.data.length-1;i++){
                    if(this.state.data[i].onsale==1||this.state.data[i].onsale==2)
                    newdata.push({
                        entryname:this.state.data[i].entryname,
                        entryimgurl:this.state.data[i].entryimgurl,
                        entryoverview:this.state.data[i].entryoverview,
                        owner:this.state.data[i].owner,
                        creator:this.state.data[i].creator,
                        onsale:this.state.data[i].onsale,
                        price:this.state.data[i].price,
                    })
                }
                this.setState({
                    data:this.state.data,
                    tempdata:newdata
                })
            }
        }).catch((error) => {
            alert(error);
        })
        
    }

    showentry=(e)=>{
        console.log(e)
        this.props.history.push(  '/EntryInfo/'+e.entryname )
    }
    categorychange=(e)=>{
        console.log(e)
    }
    sortchange=(e)=>{
        console.log(e)
        let newdata=[]
        if(e==1){
            
            for (let i = 0; i <= this.state.data.length-1; i++) {
                for (let j = 0; j < this.state.data.length - i - 1; j++) {
                    if (this.state.data[j].price > this.state.data[j + 1].price) {
                        const temp = this.state.data[j];
                        this.state.data[j] = this.state.data[j + 1];
                        this.state.data[j + 1] = temp;
                    }
                }
            }
            for(let i=0;i<=this.state.data.length-1;i++){
                if((this.state.isheld==0||this.state.data[i].owner=="0")&&(this.state.iscreate==0||this.state.data[i].creator=="0")&&(this.state.issell==0||this.state.data[i].onsale==1||this.state.data[i].onsale==2))
                newdata.push({
                    entryname:this.state.data[i].entryname,
                    entryimgurl:this.state.data[i].entryimgurl,
                    entryoverview:this.state.data[i].entryoverview,
                    owner:this.state.data[i].owner,
                    creator:this.state.data[i].creator,
                    onsale:this.state.data[i].onsale,
                    price:this.state.data[i].price,
                })
            }

        }
        if(e==2){
            for (let i = 0; i <= this.state.data.length-1; i++) {
                for (let j = 0; j < this.state.data.length - i - 1; j++) {
                    if (this.state.data[j].id > this.state.data[j + 1].id) {
                        const temp = this.state.data[j];
                        this.state.data[j] = this.state.data[j + 1];
                        this.state.data[j + 1] = temp;
                    }
                }
            }
            for(let i=0;i<=this.state.data.length-1;i++){
                if((this.state.isheld==0||this.state.data[i].owner=="0")&&(this.state.iscreate==0||this.state.data[i].creator=="0")&&(this.state.issell==0||this.state.data[i].onsale==1||this.state.data[i].onsale==2))
                newdata.push({
                    entryname:this.state.data[i].entryname,
                    entryimgurl:this.state.data[i].entryimgurl,
                    entryoverview:this.state.data[i].entryoverview,
                    owner:this.state.data[i].owner,
                    creator:this.state.data[i].creator,
                    onsale:this.state.data[i].onsale,
                    price:this.state.data[i].price,
                })
            }
        }
        if(e==3){
            for (let i = 0; i <= this.state.data.length-1; i++) {
                for (let j = 0; j < this.state.data.length - i - 1; j++) {
                    if (this.state.data[j].id > this.state.data[j + 1].id) {
                        const temp = this.state.data[j];
                        this.state.data[j] = this.state.data[j + 1];
                        this.state.data[j + 1] = temp;
                    }
                }
            }
            for(let i=0;i<=this.state.data.length-1;i++){
                if((this.state.isheld==0||this.state.data[i].owner=="0")&&(this.state.iscreate==0||this.state.data[i].creator=="0")&&(this.state.issell==0||this.state.data[i].onsale==1||this.state.data[i].onsale==2))
                newdata.push({
                    entryname:this.state.data[i].entryname,
                    entryimgurl:this.state.data[i].entryimgurl,
                    entryoverview:this.state.data[i].entryoverview,
                    owner:this.state.data[i].owner,
                    creator:this.state.data[i].creator,
                    onsale:this.state.data[i].onsale,
                    price:this.state.data[i].price,
                })
            }
        }
        this.setState({
            data:this.state.data,
            tempdata:newdata
        })
    }
    conditionchange=(e)=>{
        console.log(e)
        let a=0,b=0,c=0;
        for(let i=0;i<=e.length-1;i++){
            if(e[i]=="A"){
                a=1;
            }
            if(e[i]=="B"){
                b=1;
            }
            if(e[i]=="C"){
                c=1
            }
        }
        let newdata=[]
        for(let i=0;i<=this.state.data.length-1;i++){
            if((a==0||this.state.data[i].owner=="0")&&(b==0||this.state.data[i].creator=="0")&&(c==0||this.state.data[i].onsale==1||this.state.data[i].onsale==2))
            newdata.push({
                entryname:this.state.data[i].entryname,
                entryimgurl:this.state.data[i].entryimgurl,
                entryoverview:this.state.data[i].entryoverview,
                owner:this.state.data[i].owner,
                creator:this.state.data[i].creator,
                onsale:this.state.data[i].onsale,
                price:this.state.data[i].price,
            })
        }
        this.state.tempdata=newdata
        console.log(this.state.data)
        this.setState({
            temp:newdata,
            issell:c,
            isheld:a,
            iscreate:b
        })

    }
    render() {
        // this.helpFunction()
        return (
            
            <div className="entrylist">
                <div className="entrylistinner">
                    <Row>
                        <Col span="24">
                            <div className="entrylistpart1">
                                <div className="entrylistpart1word">
                                    Entry list
                                </div>
                                <div className="entrylistpart1form">
                                    
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="4">
                        <Affix offsetTop={10}>
                            <div className="entrylistpart2">
                                
                                <div className="entrylistpart2word">
                                    Category:
                                </div>
                                <div className="entrylistpart2c">
                                    <Checkbox.Group style={{ width: '100%' }} onChange={this.categorychange}>
                                        <Row>
                                        <Col span={24}>
                                            <Checkbox value="A" style={{ padding:"5%" }} >A</Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value="B"style={{ padding:"5%" }}>B</Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value="C"style={{ padding:"5%" }}>C</Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value="D"style={{ padding:"5%" }}>D</Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value="E"style={{ padding:"5%" }}>E</Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value="A" style={{ padding:"5%" }} >A</Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value="A" style={{ padding:"5%" }} >A</Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value="A" style={{ padding:"5%" }} >A</Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value="A" style={{ padding:"5%" }} >A</Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value="A" style={{ padding:"5%" }} >A</Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value="A" style={{ padding:"5%" }} >A</Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value="A" style={{ padding:"5%" }} >A</Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value="A" style={{ padding:"5%" }} >A</Checkbox>
                                        </Col>
                                        
                                        </Row>
                                    </Checkbox.Group>
                                </div>
                                
                            </div>
                            </Affix>
                        </Col>
                        <Col span="20">
                            <Affix offsetTop={10}>
                            <div className="entrylistpart3">
                                <div >
                                    <Checkbox.Group  className="entrylistpart3word" style={{ width: '100%' }}defaultValue={['C']} onChange={this.conditionchange}>
                                        <Row>
                                        <Col span={4}>
                                            <Checkbox value="A" style={{ fontSize:"80%" }} >Held entries<SketchOutlined /></Checkbox>
                                        </Col>
                                        <Col span={6}>
                                            <Checkbox value="B"style={{ fontSize:"80%" }}>Entries you created<EditOutlined /></Checkbox>
                                        </Col>
                                        <Col span={7}>
                                            <Checkbox value="C"style={{ fontSize:"80%"}}>Entries on sell<StockOutlined /></Checkbox>
                                        </Col>
                                        <Col span={2}>
                                            <div style={{ fontSize:"60%",marginLeft:"5%",marginTop:"13%"}}><SortAscendingOutlined />Sorted by:</div>
                                        </Col>
                                        <Col span={5}>
                                            <Select size="large" defaultValue="Date" onChange={this.sortchange} style={{ fontSize:"80%",marginLeft:"15%",width:"80%"}} >
                                                {children}
                                            </Select>
                                        </Col>

                                        </Row>
                                    </Checkbox.Group>
                                </div>
                            </div>
                            </Affix>
                            <div className="entrylistpart4">
                                <div className="entrylistpart3word">
                                    <List
                                        grid={{
                                        gutter: 0,
                                        xs: 2,
                                        sm: 2,
                                        md: 2,
                                        lg: 2,
                                        xl: 2,
                                        xxl: 2,
                                        }}
                                        pagination={{
                                            onChange: page => {
                                            console.log(page);
                                            },
                                            pageSize: 8,
                                        }}
                                        dataSource={this.state.tempdata}
                                        renderItem={item => (
                                            <List.Item>
                                                <Card
                                                    hoverable
                                                    onClick={()=>this.showentry(item)}
                                                    style={{ width: "97%",minHeight:window.innerHeight*0.61}}
                                                    cover={<img  alt="example" height={window.innerHeight*0.3} src={item.entryimgurl}/>}
                                                    
                                                >
                                                    <div className="entrylistentryname">{item.entryname}</div>
                                                    <div className="test111">{item.entryoverview}</div>
                                                    <States e={item.onsale}/>
                                                    
                                                </Card>
                                            </List.Item>
                                        )}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    
                </div>
            </div>
        );
    }
}
