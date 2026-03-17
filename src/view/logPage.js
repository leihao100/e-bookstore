import {EyeTwoTone, LockTwoTone} from "@ant-design/icons";
import React from "react";
import {useHistory,useNavigate} from "react-router-dom";
import {UserOutlined,LockOutlined} from "@ant-design/icons";
import {EyeInvisibleOutlined} from "@ant-design/icons";
import cat from '../photos/cat.jpg'
import {Button, Space,Alert} from "antd";
import {Input} from "antd";
import Cookies from "js-cookie";
import JumpHome from "../Service/jumpHome";
import {onLogin} from "../Service/checkLog";
const style={
    backgroundImage:cat,
    height:500,
    width:500

}
const inputStyle={
    verticalAlign:`center`
}

function JumpSign(){
    const navigate=useNavigate();
    navigate("/sign")
}

var user={
    name:"administrator",
    password:"123456"
}

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            clientHeight: document.documentElement.clientHeight, // 屏幕高度
            clientName:"administrator",
            clientPassword:"12345"
        };
        this.resize = this.resize.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize); //增加
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize); //取消
    }

    resize() {
        this.setState({ clientHeight: document.documentElement.clientHeight }); //监听
    }


    login() {
        let newname=document.getElementById("name").value
        let newpass=document.getElementById("password").value
        if (newname===null){
            alert("用户名不能为空")
            return;
        }
        fetch(`http://localhost:8080/login?name=${newname}&password=${newpass}`,
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
                    console.log("ok");
                    console.log(data);
                    if (data===2){
                        onLogin(newname)
                        window.location.href='/home';
                    }
                    else if (data===0){
                        alert("wrong password")
                    }else {
                        alert("you have been forbidden!!")
                    }
                }
                console.log('Received data:', this.state.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    render() {
        return (
            <div className="login-container"
                 style={{ height: this.state.clientHeight ,
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
                    <Button onClick={this.login}>Log in</Button>
                    <Button href={'/sign'}>Sign up</Button>
                </Space>

            </div>
        )
    }
}
export default Login;