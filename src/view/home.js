import {Button, Layout} from "antd";
import App from "../App";
import HomeCarousel from "../component/homeCarousel";
import Side from "../component/side";
import React from "react";
import {UserOutlined,SearchOutlined} from "@ant-design/icons";
import BookList from "../component/bookList";
import {checkLog, logout} from "../Service/checkLog";
import Search from "antd/es/input/Search";

var {Header,Content}=Layout;

function LogButton(){
    if (checkLog()){
        return(
            <div style={{position:"absolute",right:50}}>
            <Button onClick={logout}>Log out</Button>
        </div>)
    }else {
        return (
            <div style={{position:"absolute",right:50}}>
                <Button href={'login'}>Log in</Button>
            </div>
        )
    }
}
var sidestyle={
    backgroundColor:'#DCDCDC',
    height:2000
}
var headstyle={
    textAlign:"center",
    backgroundColor:'#87CEFA',
}
var another={
    backgroundColor: '#E9ECEB',
}
export default function Home (){
    //var style=document.createElement("style");
    //style.style.textAlign='100px';
    return(
        <div >
            <Layout >
                <Header style={headstyle}>
                    <div style={{position:"absolute",right:30}}>
                        <UserOutlined size={40}/>
                    </div>
                    <LogButton/>
                    <div style={{position:"absolute",left:30}}>
                        <Button href={'/home'}>
                            home
                        </Button>
                    </div>

                    <h1>Welcome To My bookstore!</h1>
                </Header>
            </Layout>
            <Layout>
                <Side/>
                <Content style={another}>

                    <HomeCarousel/>
                    <div style={{textAlign:"center"}}>
                    <h2 >书籍详情</h2>
        </div>
                    <br/>
                    <BookList/>
                </Content>
            </Layout>
        </div>
    )
}
