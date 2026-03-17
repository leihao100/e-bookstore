import {CheckType} from "../Service/checkType";
import React, {useState} from "react";
import {Button, Input, Layout, Select} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import Side from "../component/side";

var headstyle={
    textAlign:"center",
    verticalAlign:'middle',
    backgroundColor:'#87CEFA',
    height:'80px'
}
export default function AddBook(){
    if (CheckType<=1){
        alert("You are not administrator")
        window.location.href="/login"
    }
    const [bookName, setBookName] = useState('');
    const [picture, setPicture] = useState('');
    const [price,setPrice] = useState('');
    const [author,setAuthor]=useState('');
    const [num,setNum]=useState('');
    const handleNameChange = (e) => {
        setBookName(e.target.value);
    };
    /*const handleTasteChange = (value) => {
        setTaste(value);
    }*/
    const handlePriceChange =(e) =>{
        setPrice(e.target.value);
    }
    const handlePictureChange = (e) => {
        setPicture(e.target.value);
    };
    const handleNumChange = (e) => {
        setNum(e.target.value)
    }

    const handleAuthorChange = (e) => {
        setAuthor(e.target.value)
    }
    const handleOk = () => {
        fetch(`http://localhost:8080/addBook?name=${bookName}&author=${author}&price=${price}&num=${num}`,
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
                    <div>
                        <h2 style={{textAlign:"center"}}>You can add books here!</h2>
                        <br/>
                        <br/>
                        <Input value={bookName} onChange={handleNameChange} placeholder="书籍名称" />
                        <br/>
                        <br/>
                        <Input value={picture} onChange={handlePictureChange} placeholder="书籍图片URL" />
                        <br/>
                        <br/>
                        <Input value={author} onChange={handleAuthorChange} placeholder="作者" />
                        <br/>
                        <br/>
                        <Input value={price} onChange={handlePriceChange} placeholder="书籍价格" />
                        <br/>
                        <br/>
                        <Input value={num} onChange={handleNumChange} placeholder="书籍库存" />
                        <br/>
                        <br/>
                        <Button style={{backgroundColor:'#0531F3' ,color:'#FFFFFF',position:"absolute",right:150}}
                                onClick={handleOk}>
                            OK
                        </Button>
                        <Button style={{backgroundColor:'#0531F3',color:'#FFFFFF',left:80}} onClick={handleCancel}>
                            cancel
                        </Button>
                    </div>
                </Content>
            </Layout>
        </div>


    );
}