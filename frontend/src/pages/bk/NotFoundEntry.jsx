import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {Card, Button,Layout} from 'antd'
import { VerticalAlignBottomOutlined ,EditOutlined} from '@ant-design/icons'
const {Meta} = Card
let lotteryInstance = null
const {Content } = Layout



export default class NotFoundEntry extends Component {

    
    constructor() {
        super()
        this.state = {
            entryname:""
        }
    }

    componentDidMount() {

    }

    componentWillMount() {
        this.setState({
            entryname:this.props.match.params.entryname
        })
        
    }

    render() {
        // this.helpFunction()
        return (
            
            <div>
                <div className="nowalletpart1">
                    <img className="pic5" style={{width:"80%",marginLeft:"10%"}} src="../resources/notfound.png"/>
                </div>
                
                <div className="notfoundentryword">
                    Entry "{this.state.entryname}" is not created yet.
                </div>
                <div className="nowalletpart3">
                    <Link to={{pathname:"/jump/Create"}}><Button size="large" type="primary" ghost ><EditOutlined />Create now!</Button></Link>
                </div>
            </div>
        );
    }
}
