import {useRouteError} from "react-router-dom";
var deStyle={
    textAlign:"center"
}
export default function Deafultpage(){
    //var style=document.createElement("style");
    //style.style.textAlign='center';
    //const error=useRouteError();
    return(
        <div style={deStyle}>
    <h1>
        404 NOT FOUND!(也许此页面不存在）
    </h1>
        </div>
    );
}