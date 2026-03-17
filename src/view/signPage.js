import {EyeTwoTone, LockTwoTone} from "@ant-design/icons";
import React, {useState} from "react";
import {useHistory,useNavigate} from "react-router-dom";
import {UserOutlined,LockOutlined} from "@ant-design/icons";
import {EyeInvisibleOutlined} from "@ant-design/icons";
import cat from '../photos/cat.jpg'
import {Button, Space, Alert, Select} from "antd";
import {Input} from "antd";
import Cookies from "js-cookie";
import JumpHome from "../Service/jumpHome";
const style={
    backgroundImage:cat,
    height:500,
    width:500

}
const inputStyle={
    verticalAlign:`center`
}



export default function SignPage(){
    const [type,settype]=useState('')
    const handleTypeChange = (value) =>{
        settype(value)
    }
    const Signup=()=> {
        let newname=document.getElementById("name").value
        let newpass=document.getElementById("password").value
        let repass=document.getElementById("repassword").value
        if (repass!==newpass){
            alert("两次输入的密码不一致!")
            return
        }
        fetch(`http://localhost:8080/signup?name=${newname}&password=${newpass}&type=1`,
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
                    console.log(data);
                    if (data===true){
                        window.location.href='/home';
                    }
                    else {
                        alert("用户已存在！")
                    }
                }
                console.log('Received data:', this.state.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        window.location.href="/login"
    }


    return (
            <div className="login-container"
                 style={{ height: document.documentElement.clientHeight,
                     backgroundImage: "url(" + require("../photos/log.jpg") + ")" ,
                     width:"auto",
                     textAlign:"center",
                     verticalAlign:"middle"
                     /*lineHeight:30*/}}>
                <Space size="small" direction="vertical" style={{position:"relative",top:200}}>
                    <Input
                        id="name"
                        prefix={<UserOutlined/>}
                        //onChange={this.handleInputChange}
                        placeholder="input id(administrator)"
                    />
                    <br/>
                    <Input.Password
                        id="password"
                        placeholder="input password(123456)"
                        prefix={<LockOutlined/>}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                    <br/>
                    <Input.Password
                        id="repassword"
                        placeholder="确认password"
                        prefix={<LockOutlined/>}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                    <Button onClick={Signup}>Sign up</Button>
                    <Button href={'/login'}>Log in</Button>
                </Space>

            </div>
        );

}
