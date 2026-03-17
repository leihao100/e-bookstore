import {Card, Col, Row, Image, List} from 'antd';
import React, {useEffect, useState} from "react";
import shuihu from '../photos/shuihu.jpg'
import honglou from '../photos/honglou.jpg'
import sanguo from '../photos/sanguo.jpg'
import {NavLink} from "react-router-dom";
import {Link} from "react-router-dom";
import Search from "antd/es/input/Search";
const {Meta}=Card;
var photoStyle={
    width:150,
    height:150,
    margin:"20px auto"
}
var textStyle={
    textAlign:'middle',
}
const MyContext = React.createContext();

class BookCard extends React.Component{
    constructor() {
        super();
        this.state={
        }
    }

    render(){
        console.log(this.props)
        let photo=this.props.photo
        if (this.props.photo==null){
            photo="photos/cat.jpg"
        }
        return(

            <div>
                <MyContext.Provider value={{name:this.props.name}}>
                    <Link to={{pathname:`/details`, search: `?name=${this.props.name}` }}
                          state={{name:this.props.name ,author:this.props.author ,price:this.props.price,photo:this.props.photo}}>

                        <Card  bordered={true} hoverable={true}
                               cover={<img style={photoStyle} src={require('../'+photo)} alt="xxxiyou"/>}
                        >
                            <a  style={textStyle}>{this.props.name}</a>
                        </Card>
                    </Link>
                </MyContext.Provider>

            </div>
        );
    }
}

export default function BookList () {
    const [bookdatas,setBookdatas] =useState('');
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
                    setBookdatas(data)
                }
                console.log('Received search data:', bookdatas);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
        useEffect(() => {
            // 在初始渲染时执行的代码
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
                        setBookdatas(data)
                    }
                    console.log('Received data:', bookdatas);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            // 可以在这里执行其他操作
        }, []); // 空的依赖数组



    if (bookdatas===null){
        return (<a>无相关书籍</a>)
    }
    return (
        <div>
        <Search
            style={{ left: 30,  width: 250 }}
            placeholder="搜索栏"
            allowClear
            enterButton="Search"
            onSearch={handleEnter}
        />
        <List
            grid={{gutter: 3, column: 3}}
            dataSource={bookdatas}
            renderItem={item => (
                <List.Item>
                    <BookCard
                        name={item.name}
                        author={item.author}
                        price={item.price}
                        photo={item.picture}
                    />
                </List.Item>
            )
            }
        />
        </div>
    );
}

