import {loginUser} from "../Service/checkLog";
import React, {useEffect, useState} from "react";
import {Button, Layout, Table} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import Side from "../component/side";
import { DatePicker, Space } from 'antd';
import {bookSumColum, ManageColum, userManageColum, userSumColum} from "../App";

const { RangePicker } = DatePicker;
var headstyle={
    textAlign:"center",
    verticalAlign:'middle',
    backgroundColor:'#87CEFA',
    height:'80px'
}
const DateFormat="YYYY-MM-DD"


export default function AdminSum(){
    let user=loginUser();
    const [bookSum,setBookSum]=useState('');
    const [userSum,setUserSum]=useState('');
    const [date,setDate]=useState('');
    const [startday,setStartday]=useState('');
    const [endday,setEndday]=useState('');
    const [startdayu,setStartdayu]=useState('');
    const [enddayu,setEnddayu]=useState('');
    const handleOk=(dates) =>{
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
        setStartday(startYear+'-'+startMonth+'-'+startDay);
        setEndday(endYear+'-'+endMonth+'-'+endDay)
        console.log(startday)
        console.log(endday)
        {
            console.log("按时间查找")
            console.log(startday)
            console.log(endday)
            fetch(`http://localhost:8080/adminBookSumWithDate?startDate=${startday}&endDate=${endday}`,
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
                        setBookSum(data)
                    }
                    console.log('Received data:', bookSum);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }

    const handleUserChange =(dates)=>{
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
        setStartdayu(startYear+'-'+startMonth+'-'+startDay);
        setEnddayu(endYear+'-'+endMonth+'-'+endDay)
        {
            console.log("按时间查找")
            console.log(startday)
            console.log(endday)
            fetch(`http://localhost:8080/adminUserSumWithDate?startDate=${startday}&endDate=${endday}`,
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
                        setUserSum(data)
                    }
                    console.log('Received data:', bookSum);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }
    useEffect(() => {
        function fetchBusinesses() {
            if (startday == null||endday===null||startday==='') {
            console.log("no time")
            fetch(`http://localhost:8080/adminBookSum`,
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
                        setBookSum(data)
                    }
                    console.log('Received data:', bookSum);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
            else {
                console.log("按时间查找")
                console.log(startday)
                console.log(endday)
                fetch(`http://localhost:8080/adminBookSumWithDate?startDate=${startday}&endDate=${endday}`,
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
                            setBookSum(data)
                        }
                        console.log('Received data:', bookSum);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }

            fetch(`http://localhost:8080/adminUserSum`,
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
                    if (data!=null){
                        setUserSum(data)
                    }
                    console.log('Received data:', userSum);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
        fetchBusinesses()
    }, [])
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
                    <h2 style={{textAlign:"center"}}>以下是图书销量排行榜!</h2>
                    <br/>
                    <RangePicker showTime
                                 format="YYYY-MM-DD"
                                 onChange={(date)=>{
                                     setDate(date)
                                     handleOk(date)}}
                    />
                    <br/>
                    <Table columns={bookSumColum} dataSource={bookSum}/>
                    <h2 style={{textAlign:"center"}}>以下是消费榜！</h2>
                    <br/>
                    <RangePicker showTime
                                 format="YYYY-MM-DD"
                                 onChange={(date)=>{
                                     handleUserChange(date)}}
                    />
                    <br/>
                    <Table columns={userSumColum} dataSource={userSum}/>

                    <br/>
                </Content>
            </Layout>
        </div>


    );
}