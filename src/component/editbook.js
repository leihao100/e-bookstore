import React, {useEffect, useState} from "react";
import {Button, Input, Layout, Select, Table} from "antd";
import {useLocation} from "react-router";
import {Content, Header} from "antd/es/layout/layout";
import Side from "./side";
import {userSums} from "../App";

var headstyle={
    textAlign:"center",
    verticalAlign:'middle',
    backgroundColor:'#87CEFA',
    height:'80px'
}
export default function EditBook(){

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('name');
    const [book,setBook]=useState('')

    useEffect(() => {
        function fetchBusinesses() {
            fetch(`http://localhost:8080/?name=${id}`,
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
                        setBook(data)
                        console.log('Received data:', this.state.data);
                    }
                });
        }
        fetchBusinesses()
    }, [])


    const [bookName, setBookName] = useState('');
    const [price,setPrice] = useState('');
    const [author,setAuthor]=useState('');
    const [valid,setValid]=useState('');
    const [num,setNUm]=useState('');
    const handleValidChange=(value)=>{
        setValid(value)
        console.log(value)
    }
    const handleNameChange = (e) => {
        setBookName(e.target.value);
    };
    const handleNumChange = (e) => {
        setNUm(e.target.value);
    }

    const handlePriceChange =(e) =>{
        setPrice(e.target.value);
        console.log(price)
    }

    const handleAuthorChange = (e) => {
        setAuthor(e.target.value)
        console.log(author)
    }


    const handleOk = () => {
        fetch(`http://localhost:8080/editBook?name=${bookName}&author=${author}&price=${price}&valid=${valid}&num=${num}`,
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
        )
        window.location.href="/manage"
    };

    const handleCancel = () => {
        window.location.href="/manage"
    };
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
                    <>
                        <h2 style={{textAlign:"center"}}>You can edit book here!</h2>
                        <br/>
                        <br/>
                        <Input value={bookName} onChange={handleNameChange}  placeHolder={book.name} />
                        <br/>
                        <br/>
                        <Input value={author} onChange={handleAuthorChange} placeHolder={book.author} />
                        <br/>
                        <br/>
                        <Input value={price} onChange={handlePriceChange} placeHolder={book.price} />
                        <br/>
                        <br/>
                        <Input value={num} onChange={handleNumChange} placeHolder={book.num} />
                        <br/>
                        <br/>
                        <Select id={"type"}
                                value={valid}
                                defaultValue={book.valid}
                                style={{
                                    width: 120,
                                }}
                                onChange={handleValidChange}
                                options={[
                                    {
                                        value: 1,
                                        label: 'on sale',
                                    },
                                    {
                                        value: 0,
                                        label: 'off sale',
                                    },
                                ]}
                        />
                        <br/>
                        <br/>
                        <div>
                            <Button style={{backgroundColor:'#0531F3' ,color:'#FFFFFF',position:"absolute",right:150}}
                                    onClick={handleOk}>
                                OK
                            </Button>
                            <Button style={{backgroundColor:'#0531F3',color:'#FFFFFF',left:80}} onClick={handleCancel}>
                                cancel
                            </Button>
                        </div>
                    </>
                </Content>
            </Layout>
        </div>

    )
}