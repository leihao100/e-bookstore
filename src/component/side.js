import React, {useState} from "react";
import {Button, Layout} from "antd";
import {HomeOutlined, ShoppingCartOutlined, UserOutlined,ContainerOutlined} from "@ant-design/icons";
import {CheckType} from "../Service/checkType";
import {loginUser} from "../Service/checkLog";
var {Sider}=Layout;
var sidestyle={
    backgroundColor:'#DCDCDC',
    height:'auto'

}
/**
 * some points:1:null
 * 2.shilishibie:
 * 3:jinitaimei: 30+25+18+20=93
 * */
export default function Side(){
    let user=loginUser()
    const [type,setType]=useState('');
    fetch(`http://localhost:8080/type?name=${user}`,
        {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit.
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
        }
    ).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then(data => {
            //const obj=JSON.parse(data)
            if (data!=null){

                setType(data)
            }
            console.log('Received data:',type);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    if (type<=1)
    return(
            <Sider width={150} style={sidestyle} defaultCollapsed={false} breakpoint={"xs"}>
                <ul>
                    <Button style={{backgroundColor:'#FFFFFF',width:120,left:10,position:"fixed"}} href="/home">
                        <HomeOutlined />首页</Button>
                    <br/>
                    <br/>
                    <Button style={{backgroundColor:'#FFFFFF',width:120,left:10,position:"fixed"}} href="/personalPage">
                        <UserOutlined />个人</Button>
                    <br/>
                    <br/>
                    <Button style={{backgroundColor:'#FFFFFF',width:120,left:10,position:"fixed"}} href="/shoppingCart">
                        <ShoppingCartOutlined />购物车</Button>
                    <br/>
                    <br/>
                    <Button style={{backgroundColor:'#FFFFFF',width:120,left:10,position:"fixed"}} href="/order">
                        <ContainerOutlined />订单</Button>
                    <br/>
                    <br/>
                    <Button style={{backgroundColor:'#FFFFFF',width:120,left:10,position:"fixed"}} href="/userSum">
                        <ContainerOutlined />统计</Button>

                </ul>
            </Sider>
);
    else {
        return (<Sider width={150} style={sidestyle} defaultCollapsed={false} breakpoint={"xs"}>
            <ul>
                <Button style={{backgroundColor:'#FFFFFF',width:120,left:10,position:"fixed"}} href="/home">
                    <HomeOutlined />首页</Button>
                <br/>
                <br/>
                <Button style={{backgroundColor:'#FFFFFF',width:120,left:10,position:"fixed"}} href="/personalPage">
                    <UserOutlined />个人</Button>
                <br/>
                <br/>
                <Button style={{backgroundColor:'#FFFFFF',width:120,left:10,position:"fixed"}} href="/shoppingCart">
                    <ShoppingCartOutlined />购物车</Button>
                <br/>
                <br/>
                <Button style={{backgroundColor:'#FFFFFF',width:120,left:10,position:"fixed"}} href="/order">
                    <ContainerOutlined />订单</Button>
                <br/>
                <br/>
                <Button style={{backgroundColor:'#FFFFFF',width:120,left:10,position:"fixed"}} href="/manage">
                    <ContainerOutlined />管理</Button>
                <br/>
                <br/>
                <Button style={{backgroundColor:'#FFFFFF',width:120,left:10,position:"fixed"}} href="/adminSum">
                    <ContainerOutlined />统计</Button>
            </ul>
        </Sider>);
    }
}