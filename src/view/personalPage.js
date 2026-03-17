import '../photos/cat.jpg'
import {Button, Image,Input, Layout,Modal} from "antd";
import React, { useState } from 'react';
import { Badge, Descriptions } from 'antd';
import head from '../photos/head.jpg'
import Side from "../component/side";
import {checkLog, loginUser} from "../Service/checkLog";
import {CheckType} from "../Service/checkType";

let person = {
    name: "LGG",
    age: 20,
    photoSrc: "src/photos/head.jpg",
    note: "没有未来的未来不是我想要的未来"
};

var perstyle={
    display:"inline-block"
}
var {Header,Sider,Content}=Layout;


var headstyle={
    textAlign:"center",
    backgroundColor:'#87CEFA',
}
var another={
    backgroundColor: '#FFFFFF',

}


const Edit= () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary" size={"large"} style={{backgroundColor:'#b0e0e6'}} onClick={showModal}>
                Edit
            </Button>
            <Modal title="Edit your info" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input placeholder={"Your name:"} defaultValue={person.name}/>
                <Input placeholder={"Your age:"} defaultValue={person.age}/>
                <Input placeholder={"Your note:"} defaultValue={person.note}/>
            </Modal>
        </>
    );
};
function PersonalList(){
    return(
        <div>
            <Descriptions title="用户信息"  bordered style={{size:30}}>
                <Descriptions.Item label="头像" span={1}>
                    <Image src={head} height={250}/>
                </Descriptions.Item>
                <br/>
                <br/>
                <Descriptions.Item label="姓名">{person.name}</Descriptions.Item>
                <br/>
                <br/>
                <Descriptions.Item label="账户">{loginUser()}</Descriptions.Item>
                <br/>
                <br/>
                <Descriptions.Item label="账户权限">{CheckType()}</Descriptions.Item>
                <br/>
                <br/>
                <Descriptions.Item label="年龄">{person.age}</Descriptions.Item>
                <br/>
                <br/>
                <Descriptions.Item label="签名">
                    {person.note}
                </Descriptions.Item>
            </Descriptions>
        </div>
    );
}

export default function PersonalPage(){
    if (!checkLog()){
        window.location.href="/login"
    }
     return(
        <div>
            <Layout >
                <Header style={headstyle}>
                    <div style={{position:"absolute",left:30}}>
                        <Button>
                            <a href={'/'}>home</a>
                        </Button>
                    </div>
                    <h1>Personal Page</h1>
                </Header>
            </Layout>
            <Layout>
                <Side/>
                <Content style={another}>
                    <div style={{position:"absolute",right:30}}>
                        <Edit/>
                    </div>
                    <PersonalList/>
                </Content>
            </Layout>
        </div>
    )
}



