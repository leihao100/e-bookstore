import {Carousel} from "antd";
import p1 from '../photos/book1.jpg';
import p2 from '../photos/book2.jpg';
import p3 from '../photos/book3.jpg';
import p4 from '../photos/book4.jpg';

export default function HomeCarousel(){
    return(
        <div style={{border:"1 solid red" ,width:600,height:200,margin:"20px auto"}}>
            <Carousel autoplay={true} dotPosition={"bottom"} style={{height:200, textAlign:"center",verticalAlign:"middle"}}>
                <div>
                    <img alt={"p1"} src={p1} style={{height:200, verticalAlign:"middle"}}/>
                </div>
                <div>
                    <img src={p2} style={{height:200, verticalAlign:"middle"}}/>
                </div>
                <div>
                    <img src={p3} style={{height:200, verticalAlign:"middle"}}/>
                </div>
                <div>
                    <img src={p4} style={{height:200, verticalAlign:"middle"}}/>
                </div>
            </Carousel>
        </div>
    )
}