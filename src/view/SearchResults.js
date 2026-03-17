import {Component, useState} from "react";
import {Button, Layout, List, Table} from "antd";
import React from "react";
import {Card, Col, Row} from 'antd';
import {Link} from "react-router-dom";
import {useLocation} from "react-router";
import {Content, Header} from "antd/es/layout/layout";
import Side from "../component/side";
import {ManageColum} from "../App";
const photoStyle = {
    width: 150,
    height: 150,
    margin: "20px auto"
};
const textStyle = {
    textAlign: 'middle',
};
var headstyle={
    textAlign:"center",
    verticalAlign:'middle',
    backgroundColor:'#87CEFA',
    height:'80px'
}

export default function SearchResults() {
    const [result,setResult]=useState('');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get('name');
    fetch(`http://localhost:8080/search?name=${name}`)
        .then(response => {
            if (response.ok) {
                return response.json(); // 将响应内容解析为 JSON 对象
            } else {
                throw new Error('请求失败');
            }
        })
        .then(data => {
            console.log(data)
            // 请求成功，data 包含了返回的数据
            setResult(data);
        })
        .catch(error => {
            // 请求失败，error 包含了错误信息
            console.error(error);
        });

    return(
        <div>
            <Layout >
                <Header style={headstyle}>
                    <div style={{position:"absolute",left:30}}>
                        <Button>
                            <a href={'/'}>home</a>
                        </Button>
                    </div>
                    <h1>Manage</h1>
                </Header>
            </Layout>
            <Layout>
                <Side/>
                <Content >
                    <h2 style={{textAlign:"center"}}>You can manage books here!</h2>
                    <br/>
                    <Table columns={ManageColum} dataSource={result}/>
                    <br/>
                </Content>
            </Layout>
        </div>



    );
}