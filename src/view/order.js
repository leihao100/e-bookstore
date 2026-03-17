import {Button, DatePicker, Layout, Table} from "antd";
import Side from "../component/side";
import {orderColums,Cartsource} from "../App";
import React from "react";
import {checkLog, loginUser} from "../Service/checkLog";
const { RangePicker } = DatePicker;
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


class Order extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            name:"西游记",
            data:null
        }
    }

    handleOk=(dates) =>{
        const userName=loginUser()
        const startDate=dates[0]
        const endDate=dates[1]
        const startYear = startDate.year();
        let startMonth = startDate.month() + 1;
        if (startMonth<10){
            startMonth='0'+startMonth;
        }
        let startDay = startDate.date();
        if (startDay<10){
            startDay='0'+startDay
        }

        const endYear = endDate.year();
        let endMonth = endDate.month() + 1;
        if (endMonth<10){
            endMonth='0'+endMonth;
        }
        let endDay = endDate.date();
        if (endDay<10){
            endDay='0'+endDay
        }
        let startday=(startYear+'-'+startMonth+'-'+startDay);
        let endday=(endYear+'-'+endMonth+'-'+endDay)
        console.log(startday)
        console.log(endday)
        {
            console.log("按时间查找")
            console.log(startday)
            console.log(endday)
            fetch(`http://localhost:8080/orderWithTime?name=${userName}&startDate=${startday}&endDate=${endday}`,
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
                    if (data != null) {
                        this.setState({data: data})
                    }

                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8080/order?name=${loginUser()}`,
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
                var result=data.map(item =>Object.keys(item).map(i=>item[i]))
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
        if (!checkLog()){
            alert("请先登录")
            window.location.href='login'
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
                        <h1>Order</h1>
                    </Header>
                </Layout>
                <Layout>
                    <Side/>
                    <Content >
                        <h2>This is Order!</h2>
                        <br/>
                        <RangePicker showTime
                                     format="YYYY-MM-DD"
                                     onChange={(date)=>{
                                         this.handleOk(date)}}
                        />
                        <br/>
                        <Table columns={orderColums} dataSource={this.state.data}/>
                    </Content>
                </Layout>
            </div>
        );
    }
}
export default Order;