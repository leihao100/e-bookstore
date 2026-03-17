import {loginUser} from "./checkLog";
import {useState} from "react";

export const CheckType= () => {
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
    return type;
}