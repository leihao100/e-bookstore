import {CheckType} from "../Service/checkType";
import React, {useEffect, useState} from "react";
import {Button, Input, Layout, Modal, Select, Table} from "antd";
import {ManageColum, orderColums, userManageColum} from "../App";
import Side from "../component/side";
import {Content, Header} from "antd/es/layout/layout";
import {loginUser} from "../Service/checkLog";
import Search from "antd/es/input/Search";

var headstyle={
    textAlign:"center",
    verticalAlign:'middle',
    backgroundColor:'#87CEFA',
    height:'80px'
}
export default function Manage(){
    let user=loginUser()
    const [type,setType]=useState('');
    fetch(`http://localhost:8080/type?name=${user}`,
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
                setType(data)
            }
            console.log('Received data:',type);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    /*if (type<=1){
        alert("You are not administrator")
        window.location.href="/login"
    }*/
    const handleAdd=()=>{
        window.location.href="/addBook"
    }

    const [bookdata,setBookdata]=useState('')
    const [userdata,setUserdata]=useState('')
    useEffect(() => {
        function fetchBusinesses() {
            fetch(`http://localhost:8080/books`,
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
                        setBookdata(data)
                    }
                    console.log('Received data:', bookdata);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            fetch(`http://localhost:8080/allUser`,
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
                        setUserdata(data)
                    }
                    console.log('Received data:', bookdata);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
        fetchBusinesses()
    }, [])
    const handleEnter = (value) => {
        console.log(value)
        fetch(`http://localhost:8080/searchBook?name=${value}`,
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
                    setBookdata(data)
                }
                console.log('Received search data:', bookdata);
            })
            .catch(error => {
                console.error('Error:', error);
            });
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
                    <h1>Manage</h1>
                </Header>
            </Layout>
            <Layout>
                <Side/>
                <Content >
                    <h2 style={{textAlign:"center"}}>You can manage books here!</h2>
                    <br/>
                    <Button onClick={handleAdd}>Add book!</Button>
                    <br/>
                    <br/>
                    <Search
                        style={{ left: 30,  width: 250 }}
                        placeholder="搜索栏"
                        allowClear
                        enterButton="Search"
                        onSearch={handleEnter}
                    />
                    <Table columns={ManageColum} dataSource={bookdata}/>
                    <h2 style={{textAlign:"center"}}>You can manage users here!</h2>
                    <br/>
                    <Table columns={userManageColum} dataSource={userdata}/>

                    <br/>
                </Content>
            </Layout>
        </div>


    );

}

