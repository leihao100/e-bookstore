import React from "react";
import {Button, message, Descriptions, Popconfirm, Layout} from "antd";
import {useLocation,useParams} from "react-router";
import {UserOutlined} from "@ant-design/icons";
import Side from "../component/side";
import BookList from "../component/bookList";
import {Link} from "react-router-dom";
import {loginUser} from "../Service/checkLog";
var headstyle={
    textAlign:"center",
    backgroundColor:'#87CEFA',
}
var another={
    backgroundColor: '#E9ECEB',
}

function f(props) {
    localStorage.setItem(props,"book");
    if (localStorage.getItem("name")===null){

    }
}

var {Header,Content}=Layout;



export default function BookDetails() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get('name');
    return(
        <Detail name={name}/>
    );
}
const De = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get('name');
    return(
        <Detail name={name}/>
    );
}
//export default De;
/*class BookDetails extends React.Component{
    render() {
        return(
            <div>
                {De}
            </div>

        )
    }
}*/

class Detail extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            //name:C,
            name:this.props.name,
            data:null
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8080?name=${this.state.name}`,
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
                //const obj=JSON.parse(data)
                if (data!=null){
                this.setState({data:data})}
                console.log('Received data:', this.state.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    render(){
        if (this.state.data==null)return <div>404 error</div>;
        const {name,author,price,num}=this.state.data
        const buyclick=(e)=>{
            var name=this.state.name;
            fetch(`http://localhost:8080/orderbuy?book=${name}&name=${loginUser()}`,
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
            );
        }
        return(
            <div >
                <Layout >
                    <Header style={headstyle}>
                        <div style={{position:"absolute",right:30}}>
                            <UserOutlined size={40}/>
                        </div>
                        <div style={{position:"absolute",left:30}}>
                            <Button href={'/home'}>
                                home
                            </Button>
                        </div>
                        <h1>Details</h1>
                    </Header>
                </Layout>
                <Layout>
                    <Side/>
                    <Content style={another}>
                        <div>
                            <Descriptions title="书籍信息"  bordered style={{size:30}}>
                                <Descriptions.Item label="名称" >
                                    {name}
                                </Descriptions.Item>
                                <br/>
                                <br/>
                                <Descriptions.Item label="作者">{author}</Descriptions.Item>
                                <br/>
                                <br/>
                                <Descriptions.Item label="价格">{price}</Descriptions.Item>
                                <br/>
                                <br/>
                                <Descriptions.Item label="库存量">{num}</Descriptions.Item>
                                <br/>
                                <br/>
                            </Descriptions>
                        </div>
                        <Button style={{backgroundColor:'#0531F3' ,color:'#FFFFFF',position:"absolute",right:150}}
                        onClick={(e)=>click(name)}>
                            ADD TO SHOPPING CART
                        </Button>

                        <Popconfirm
                            title="Add to Order"
                            description="Are you sure to Add to Order?"
                            onConfirm={buyclick}
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

function click(name){
    alert(name+"已被添加至购物车")
    fetch(`http://localhost:8080/addcart?name=${name}&user=${loginUser()}&num=1`,
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

const confirm = (name) => {
    fetch(`http://localhost:8080/order?name=${name}`,
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
    );
};
const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
};