import {Button, Layout, message, Popconfirm, Table} from "antd";
import Side from "../component/side";
import {colums,Cartsource} from "../App";
import React from "react";
import {useState} from "react";
import {loginUser} from "../Service/checkLog";

var {Header,Sider,Content}=Layout;

var headstyle={
    textAlign:"center",
    verticalAlign:'middle',
    backgroundColor:'#87CEFA',
    height:'80px'
}
var style={
    textAlign:"center"
}

class ShoppingCart extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            data:null
        }
    }

    componentDidMount() {
        let user=loginUser()
        fetch(`http://localhost:8080/cart?name=${user}`,
            {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit.
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
            }
        )
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                //const obj=JSON.parse(data)
                if (data!=null){
                    console.log("ok");
                    //const adata = JSON.parse(data);
                    console.log(data);
                    this.setState({data:data});

                    }
                console.log('Received data:', this.state.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    render(){
        return(
            <div>
                <Layout >
                    <Header style={headstyle}>
                        <div style={{position:"absolute",left:30}}>
                            <Button>
                                <a href={'/'}>home</a>
                            </Button>
                        </div>
                        <h1>Shopping Cart</h1>
                    </Header>
                </Layout>
                <Layout>
                    <Side/>
                    <Content >
                        <h2>This is shopping cart!</h2>
                        <br/>
                        <Table columns={colums} dataSource={this.state.data}/>
                        <Popconfirm
                            title="Add to Order"
                            description="Are you sure to Add to Order?"
                            onConfirm={click}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button style={{backgroundColor:'#0531F3',color:'#FFFFFF',left:80}}>
                                BUY
                            </Button>

                        </Popconfirm>
                    </Content>
                </Layout>
            </div>
        );
    }
}

function click(){
    fetch(`http://localhost:8080/toOrder?name=${loginUser()}`,
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
}

const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
};
export default ShoppingCart;