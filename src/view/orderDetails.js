import {Button, Layout, Table} from "antd";
import Side from "../component/side";
import {orderDetailColums} from "../App";
import React, {useState} from "react";
import {checkLog, loginUser} from "../Service/checkLog";
import {useLocation} from "react-router";
var {Header,Sider,Content}=Layout;

var headstyle={
    textAlign:"center",
    verticalAlign:'middle',
    backgroundColor:'#87CEFA',
    height:'80px'
}


export default function OrderDetails (){
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('name');
    const [detail,setDetail]=useState('')
    fetch(`http://localhost:8080/orderDetails?id=${id}`,
            {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit.
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded’,
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *client
                //body: JSON.stringify(data) // body data type must match "Content-Type" header
            }
        )
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                //var result=data.map(item =>Object.keys(item).map(i=>item[i]))
                //const obj=JSON.parse(data)
                if (data!=null) {
                    setDetail(data)
                    console.log('Received data:', this.state.data);
                }
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
                        <h1>Order</h1>
                    </Header>
                </Layout>
                <Layout>
                    <Side/>
                    <Content >
                        <h2>These are Details!</h2>
                        <br/>
                        <Table columns={orderDetailColums} dataSource={detail}/>
                    </Content>
                </Layout>
            </div>
        );

}
