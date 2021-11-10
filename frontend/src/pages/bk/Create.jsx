import React, { Component } from 'react';

import {Card, Button,Layout} from 'antd'
import { Editor } from '@tinymce/tinymce-react'
const {Meta} = Card
let lotteryInstance = null
const {Content } = Layout



export default class Create extends Component {

    
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
            templateStr:'a',
            value:'hello'
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
    setvalue=(e)=>{
        this.setState({
            templateStr:e
        })
    }
    render() {
        // this.helpFunction()
        return (
            
            <div>
                <Editor
                    value={this.state.templateStr}
                    id={"tincyEditor"}
                    onEditorChange={(newvalue,editor)=>this.setvalue(newvalue)}
                    init={{
                        plugins: 'preview searchreplace autolink directionality visualblocks visualchars fullscreen image link template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave autoresize formatpainter',
                        menubar:'',
                        
                        toolbar: 'undo redo| cut copy paste pastetext | bold italic strikethrough link| alignleft aligncenter alignright alignjustify outdent indent | bullist numlist | blockquote subscript superscript removeformat | table image media charmap hr insertdatetime print preview',
                        images_upload_handler: (blobInfo, success, failure)=>{
                            success(123)
                        },
                        
                        // init_instance_callback:(editor) =>{
                        //     editor.on('input',(e)=>{
                        //         console.log(e)
                        //         this.setState({
                        //             templateStr:e.target.value
                        //         })
                        //     });
                        //     editor.on('change',(e)=>{
                        //         console.log(editor)
                        //         this.setState({
                        //             templateStr:e.target.value
                        //         })
                        //     });
                        // }
                    }}
                    
                />
                <div dangerouslySetInnerHTML={{__html: this.state.templateStr}}  />
                
            </div>
        );
    }
}
