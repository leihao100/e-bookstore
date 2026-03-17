import {useNavigate} from "react-router-dom";

export default function JumpHome(){
    const navigate=useNavigate()
    navigate("/home")
}