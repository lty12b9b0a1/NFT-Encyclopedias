import React, { Component } from 'react';

import {Card, Button,Layout,Row,Col,Input,Upload, message,Form,  Space,Checkbox ,Modal,Affix} from 'antd'
import { Editor } from '@tinymce/tinymce-react'
import { DownOutlined,SearchOutlined ,LoadingOutlined, MinusCircleOutlined, PlusOutlined,UploadOutlined} from '@ant-design/icons'
import FormItem from 'antd/lib/form/FormItem';
import axios from 'axios';
import mainurl from "../location"
let web3 = require('./web3');
const {Meta} = Card
let lotteryInstance = null
const {Content } = Layout
const {TextArea} = Input
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
function getAttrFromString(str, node, attr) { 
    var regex = new RegExp('<' + node + ' .*?' + attr + '="(.*?)"', "gi"), result, res = []; 
    while ((result = regex.exec(str))) { 
     res.push(result[1]); 
    } 
    return res; 
} 

var arrayOfImageSrcs = getAttrFromString(
    '<img src="http://placekitten.com/350/300"><img src="http://placekitten.com/350/300">', 
    'img', 
    'src' 
); 
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

export default class Create extends Component {

    
    constructor() {
        super()
        this.state = {
            fileList:[],
            loading: false,
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
            templateStr:'<h2>1.What is ...?</h2> <hr /> <h3><em>&nbsp; &nbsp;It is...</em></h3> <h3><em>&nbsp; &nbsp;...</em></h3> <h2>2.Where it comes from</h2> <hr /> <h3><em>&nbsp; &nbsp; It comes from...</em></h3> <h3><em>&nbsp; &nbsp; ...</em></h3> <h2><em>3. ...</em></h2> <hr /> <h2>&nbsp;</h2>',
            templateStr2:'<h2>1.What is ...?</h2> <hr /> <h3><em>&nbsp; &nbsp;It is...</em></h3> <h3><em>&nbsp; &nbsp;...</em></h3> <h2>2.Where it comes from</h2> <hr /> <h3><em>&nbsp; &nbsp; It comes from...</em></h3> <h3><em>&nbsp; &nbsp; ...</em></h3> <h2><em>3. ...</em></h2> <hr /> <h2>&nbsp;</h2>',
            value:'hello',
            previewurl:"",
            modelvisible:false,
            timestamp:0,
        }
    }
    
    componentDidMount() {
        let tt = new Date()
        this.state.timestamp=tt.getTime()
        console.log(this.state.timestamp)
    }

    async componentWillMount() {
        
        // //获取当前的所有地址
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
    onFinish = async(values) => {
        let accounts = await web3.eth.getAccounts()
        if (accounts.length==0){
            alert('Please choose an account')
        }
        console.log('Received values of form:', values);
        const formData = new window.FormData();
        formData.append('file', values.entrypic.file)
        formData.append('entryname', values.entryname)
        formData.append('entryoverview', values.entryoverview)
        formData.append('entrybody', this.state.templateStr)
        let list1=[]
        let list2=[]
        if(values.users1){
            for(let i=0;i<=values.users1.length-1;i++){
                list1.push({
                    itemname:values.users1[i].first,
                    itemcontent:values.users1[i].last
                })
            }
            console.log(list1)
        }
        if(values.users2){
            for(let i=0;i<=values.users2.length-1;i++){
                list2.push({
                    itemname:values.users2[i].first,
                    itemcontent:values.users2[i].last
                })
            }
            console.log(list2)
        }
        
        var ids1 = JSON.stringify(list1);
        var ids2 = JSON.stringify(list2);
        formData.append('entrylist1', ids1)
        formData.append('entrylist2', ids2)
        formData.append('owner', accounts[0])
        formData.append('creator', accounts[0])

        axios
        .post(mainurl+"/create_entry",formData)
        .then((res) => {
            console.log(res.data)
            if(res.data=="-2"){
                alert("Entry already exists!")
            }
            else if(res.data=="-1"){
                alert("Create fail!")
            }
            else{
                
                // axios
                // .post(mainurl+"/create_entry",formData)
                // .then((res) => {
                //     console.log(res.data)
                //     if(res.data=="-2"){
                //         alert("Entry already exists!")
                //     }
                //     else if(res.data=="-1"){
                //         alert("Create fail!")
                //     }
                //     else{
                        
                //     }
                // }).catch((error) => {
                //     alert(error);
                // })
            }
        }).catch((error) => {
            alert(error);
        })

    };
    handleChangepic=(file,fileList)=>{
        this.setState({
            fileList:fileList
        })
        console.log(file.file)
    };
    handlePreview=(file)=> {
        

        console.log(file)
        this.setState({
            modelvisible:true,
            previewurl:file.thumbUrl
        })
    };
    beforeup =()=>{
        return false
    };
    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        console.log(info.file)
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
    };
    setvalue=(e)=>{
        this.setState({
            templateStr:e
        })
    }
    
    handleCancel = () => {
        this.setState({
            modelvisible:false
        })
    };
    render() {
        const { loading, imageUrl } = this.state;
        const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 20 }}>Add a cover image for an entry</div>
        </div>
        );
        // this.helpFunction()
        return (
            
            <div className="create">
                
                
                <div className="createinner">

                    <Modal  style Modal title="Preview" visible={this.state.modelvisible}onCancel={this.handleCancel}>
                        <img width="100%" src={this.state.previewurl} />
                    </Modal>
                    <Form name="dynamic_form_nest_item" onFinish={this.onFinish} autoComplete="off" initialValues={{"users1":[{
                                                    fieldKey: 0,
                                                    isListField: true,
                                                    key: 0,
                                                    name: 0,
                                                    first: "1",
                                                    last: "2",
                                                }, {
                                                    fieldKey: 1,
                                                    isListField: true,
                                                    key: 1,
                                                    first: "2",
                                                    last: "4",
                                                    name: 1
                                                }]}}>
                    <Row>
                        <Col span={4}>
                            <Affix offsetTop={5}>
                            <div className="createpart1">
                                <div className="createcategoryword">
                                    Category:
                                </div>
                                <div className="createcategory">
                                    <FormItem name="entrycategory" rules={[{ required: true, message: 'Require at least one category' }]}>
                                    <Checkbox.Group style={{ width: '100%' }}>
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
                                        </Row>
                                    </Checkbox.Group>
                                    </FormItem>
                                </div>
                            </div>

                            </Affix>
                        </Col>
                        <Col span={16}>
                            <div className="createpart21">
                                <div className="createentrynameword">Entry name:</div>
                                <div className="createentryname">
                                    <FormItem name="entryname" rules={[{ required: true, message: 'Missing entry name' }]}>
                                        <Input size="large" placeholder="Please input the entry name" bordered={true}/>
                                    </FormItem>
                                </div>
                                <Row>
                                <Col span={12}>
                                    <div className="createpart211">
                                        <FormItem name="entryoverview" rules={[{ required: true, message: 'Missing entry overview' }]}>
                                            <TextArea size="large" showCount maxLength={200} placeholder="Please enter an overview of the entry. For example, computer, an electronic device often used in daily life, has the characteristics of high-speed operation, and is made of microelectronic devices such as transistors and integrated circuits." autoSize={{ minRows: 6, maxRows: 6 }} bordered={false}/>
                                        </FormItem>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="createpart212">
                                        <div style={{fontSize:"50%"}}>Set up a cover page for the encyclopedia</div>
                                        <FormItem name="entrypic" rules={[{ required: true, message: 'Missing entry cover page' }]}>
                                        <Upload
                                            name="file"
                                            listType="picture"
                                            auto-upload={false}
                                            showUploadList={true}
                                            maxCount={1}
                                            fileList={this.state.fileList}
                                            onPreview={this.handlePreview}
                                            action="/123"
                                            beforeUpload={this.beforeup}
                                            onChange={this.handleChangepic}
                                        >
                                            <div style={{fontSize:"200%"}}><Button size="large" icon={<UploadOutlined />}>Click to Upload</Button></div>
                                        </Upload>
                                        </FormItem>
                                    </div>
                                </Col>
                                </Row>
                            </div>
                            <div className="createpart22">
                                <div className="createinfoitemword">
                                    Information items:
                                </div>
                                    <Row>
                                        <Col span={12}>
                                            <div className="createinfoitem1">
                                            <Form.List name="users1">
                                                {(fields, { add, remove }) => (
                                                <>
                                                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                        <Form.Item
                                                        {...restField}
                                                        name={[name, 'first']}
                                                        fieldKey={[fieldKey, 'first']}
                                                        rules={[{ required: true, message: 'Missing first name' }]}
                                                        >
                                                        <Input placeholder="Item name" />
                                                        </Form.Item>
                                                        <Form.Item
                                                        {...restField}
                                                        name={[name, 'last']}
                                                        fieldKey={[fieldKey, 'last']}
                                                        rules={[{ required: true, message: 'Missing last name' }]}
                                                        >
                                                        <Input placeholder="Item content" />
                                                        </Form.Item>
                                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                                    </Space>
                                                    ))}
                                                    <Form.Item>
                                                    <Button type="dashed" onClick={() => add()} style={{width:"45%"}} block icon={<PlusOutlined />}>
                                                        Add information item
                                                    </Button>
                                                    </Form.Item>
                                                </>
                                                )}
                                            </Form.List>
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <div className="createinfoitem2">
                                            <Form.List name="users2" >
                                                {(fields, { add, remove }) => (
                                                <>
                                                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                        <Form.Item
                                                        {...restField}
                                                        name={[name, 'first']}
                                                        fieldKey={[fieldKey, 'first']}
                                                        rules={[{ required: true, message: 'Missing item name' }]}
                                                        >
                                                        <Input placeholder="Item name" />
                                                        </Form.Item>
                                                        <Form.Item
                                                        {...restField}
                                                        name={[name, 'last']}
                                                        fieldKey={[fieldKey, 'last']}
                                                        rules={[{ required: true, message: 'Missing item content' }]}
                                                        >
                                                        <Input placeholder="Item content" />
                                                        </Form.Item>
                                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                                    </Space>
                                                    ))}
                                                    <Form.Item>
                                                    <Button type="dashed" onClick={() => add()} style={{width:"40%"}} block icon={<PlusOutlined />}>
                                                        Add information item
                                                    </Button>
                                                    </Form.Item>
                                                </>
                                                )}
                                            </Form.List>
                                            </div>
                                        </Col>
                                    </Row>
                                    
                                    
                            </div>
                            <div className="createpart23">
                                <div className="createentrycontentword">
                                    Main body:
                                </div>
                                <div className="createentrycontent">
                                    
                                        <div className="bodyeditor">
                                            <Form.Item name="text" rules={[{ required: true, message: 'Missing entry body' }]}>
                                            <Editor
                                                value={this.state.templateStr}
                                                id={"tincyEditor"}
                                                initialValue={this.state.templateStr2}
                                                tinymceScriptSrc={'/tinymce/js/tinymce/tinymce.min.js'}
                                                onEditorChange={(newvalue,editor)=>this.setvalue(newvalue)}
                                                init={{
                                                    plugins: 'quickjump preview searchreplace autolink directionality visualblocks visualchars fullscreen image template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern help emoticons autosave autoresize',
                                                    menubar:'',
                                                    inline:true,

                                                    link_title:false,
                                                    min_height: 800,
                                                    toolbar: 'undo redo| cut copy paste pastetext | styleselect bold italic strikethrough quickjump| alignleft aligncenter alignright alignjustify outdent indent | bullist numlist | blockquote subscript superscript removeformat | table image media charmap hr insertdatetime print preview',
                                                    images_upload_handler: (blobInfo, success, failure)=>{
                                                        // success("data:image/jpeg;base64,"+blobInfo.base64())
                                                        if (blobInfo.blob()) {
                                                            const formData = new window.FormData();
                                                            formData.append('file', blobInfo.blob())
                                                            formData.append('timestamp',this.state.timestamp)
                                                            axios.post(mainurl+"/bodyimage_upload",formData).then((res) => {
                                                                console.log(res.data)
                                                                if(res.data){
                                                                        // 将图片插入到编辑器中
                                                                        success(res.data)
                                                                    }
                                                            }).catch((error) => {
                                                                        alert(error);
                                                            })
                                                        } else {
                                                            alert('error');
                                                        }
                                                    },
                                                }}
                                                
                                            />
                                            </Form.Item>
                                        </div>
                                    
                                    <div className="test111"><div dangerouslySetInnerHTML={{__html: this.state.templateStr}}  /></div>
                                    {this.state.templateStr}
                                </div>
                            </div>
                            
                        </Col>
                        <Col span={4}>
                            <Affix offsetTop={5}>
                            <div className="createpart1">
                                <div className="createsubmitbutton">
                                <Form.Item>
                                    <Button type="primary" ghost size="large" style={{width:"100%"}} htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                                <Button type="primary" size="large" href="https://www.luohanacademy.com" style={{width:"100%"}} >
                                        Help?
                                </Button>
                                </div>
                            </div>
                            </Affix>
                        </Col>
                    </Row>
                    </Form>
                </div>
                
            </div>
        );
    }
}
