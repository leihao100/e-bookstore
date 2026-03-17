import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './Book.css';
import Excel from "./view/booklist";
import {Link} from "react-router-dom";
import {Button, Card, Input, Modal, Select} from "antd";
import EditBook from "./component/editbook";
import {loginUser} from "./Service/checkLog";
export default function App(){

}

export let bookdata=[
    {
        name:'西游记',
        author:'吴承恩',
        price:49,
        photo:'photos/xiyou.jpg'
    },
    {
        name:'三国演义',
        author:'罗贯中',
        price:48,
        photo:'photos/sanguo.jpg'
    },
    {
        name:'水浒传',
        author:'施耐庵',
        price:55,
        photo:'photos/shuihu.jpg'
    },
    {
        name: '红楼梦',
        author: '曹雪芹',
        price: 51,
        photo:'photos/honglou.jpg'
    }
]

export const colums=[
    {
        title:'name',
        dataIndex:['book','name'],

    },
    {
        title:'price',
        dataIndex:['book','price'],

    },
    {
        title:'件数',
        dataIndex:'num',
    },
    {
        title:'总价',
        dataIndex:'totalprice',
    },
]
export const orderDetailColums=[
    {
        title:'name',
        dataIndex:['book','name'],

    },
    {
        title:'price',
        dataIndex:['book','price'],

    },
    {
        title:'件数',
        dataIndex:'num',
    },
    {
        title:'价格',
        dataIndex:'price',
    },

]
export const orderColums=[
    {
        title:'订单号',
        dataIndex:'id',

    },
    {
        title:'用户名',
        dataIndex:'name',

    },
    {
        title:'时间',
        dataIndex:'time',

    },
    {
        title:'总价',
        dataIndex:'cost',

    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Link to={{pathname:`/orderDetails`, search: `?name=${record.id}` }}
                  state={{id:record.id}}>
                详情
            </Link>
        ),
    },
]

export const ManageColum=[
    {
        title:'名称',
        dataIndex:'name',
    },
    {
        title:'作者',
        dataIndex:'author',
    },
    {
        title:'价格',
        dataIndex:'price',
    },
    {
        title:'在售',
        dataIndex:'valid',
        render(_,record){
            if (record.valid===1){
                return <a>yes</a>
            }else {
                return <a>no</a>
            }
        }
    },
    {
        title:'操作',
        render: (_, record) => (
            <Link to={{pathname:`/editbooks`, search: `?name=${record.name}` }}
                  state={{id:record.id}}>
                编辑
            </Link>
        )
    },

]
function forbidUser(name,valid){
    console.log("fengjin "+name)
    {fetch(`http://localhost:8080/valid?name=${name}&valid=${valid}`,
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
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}
export const userSums=[
    {
        title:"书名",
        dataIndex:['key','name'],
    },
    {
        title:"数量",
        dataIndex:'value',
    },
    {
        title:"总价",
        render(_,record){
            return(
                <a>{record.key.price*record.value}</a>
            )
        }
    }

]
export const userManageColum=[
    {
        title:'姓名',
        dataIndex:'name',
    },
    {
        title:'封禁与否',
        dataIndex:'valid',
        render(_,record){
            if (record.valid===1){
                return <a>no</a>
            }else {
                return <a>yes</a>
            }
        }
    },
    {
        title:'权限',
        dataIndex:['userAuth','type'],
        render(_,record){
            if (record.userAuth.type===1){
                return <a>普通用户</a>
            }else {
                return <a>管理员</a>
            }
        }
    },
    {
        title:'操作',
        render: (_, record) => (
            <div>
                <Button onClick={()=>forbidUser(record.name,0)}>
                封禁{record.name}
                </Button>
                <Button onClick={()=>forbidUser(record.name,1)}>
                解禁
                </Button>
            </div>
        )
    },

]
export const Cartsource=[
    {
        name:'西游记',
        publisher:'吴承恩',
        price:49,
        num:1
    },
    {
        name:'三国演义，',
        publisher:'罗贯中',
        price:48,
        num:1
    },
    {
        name:'水浒传',
        publisher:'施耐庵',
        price:55,
        num:1
    }
]
export const bookSumColum=[
    {
        title:'书名',
        dataIndex:['key','name'],
    },
    {
        title: '销量',
        dataIndex: 'value'
    }
]
export const userSumColum=[
    {
        title:'用户名',
        dataIndex:['key','name'],
    },
    {
        title: '消费额',
        dataIndex: 'value'
    }
]
Excel.propTypes = {
    headers: PropTypes.arrayOf(
        PropTypes.string
    ),
    initialData: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.string
        )
    ),
};//检查数据类型

//export default App;
