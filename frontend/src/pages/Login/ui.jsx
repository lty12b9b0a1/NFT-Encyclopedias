import React from 'react'
import {Button, Card, Icon, Image, Statistic } from 'semantic-ui-react'

const CardExampleCard = (props) => (
    <Card>
        <Card.Content>
            <Card.Header>彩票Demo</Card.Header>
            <Card.Meta>
                <p style={{ wordBreak: 'break-word' }}>管理员地址: {props.manager}</p>
                <p style={{ wordBreak: 'break-word' }}>当前地址: {props.currentAccount}</p>
                <p style={{ wordBreak: 'break-word' }}>上期中奖者:{props.winner}</p>
            </Card.Meta>
            <Card.Description>每晚8点准时开奖！！</Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button>
                <Icon name='user' />
                {props.playerCounts} 人参与
            </Button>
        </Card.Content>

        <Card.Content extra>
            <Statistic color='red'>
                <Statistic.Value>{props.balance}ETH</Statistic.Value>
                <Statistic.Label>奖金池</Statistic.Label>
            </Statistic>
        </Card.Content>

        <Card.Content extra>
            <Statistic color='blue'>
                <Statistic.Value>第{props.round}期</Statistic.Value>
                <a href='https://ropsten.etherscan.io/address/0x66F06D938F90b8cc1604F6f2C4b4520cBDD23DCf'>点击我查看交易历史</a>
            </Statistic>
        </Card.Content>

        <Button animated='fade' color='orange' onClick={props.play} disabled={props.isClicked}>
            <Button.Content visible>投注产生希望</Button.Content>
            <Button.Content hidden>购买放飞梦想</Button.Content>
        </Button>

        <Button inverted color='red' style={{ display: props.isShowButton }} onClick={props.draw}
            disabled={props.isClicked}>
            开奖
        </Button>
        <Button inverted color='orange' style={{ display: props.isShowButton }} onClick={props.refund}
            disabled={props.isClicked}>
            退奖
        </Button>
    </Card >
)

export default CardExampleCard