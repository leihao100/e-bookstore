import {BrowserRouter, Route, Routes} from "react-router-dom";
import PersonalPage from "./view/personalPage";
import Home from "./view/home";
import Deafultpage from "./view/deafultpage";
import ShoppingCart from "./view/shoppingCart";
import Login from "./view/logPage";
import Order from "./view/order";
import BookDetails from "./view/details";
import Signup from "./view/signPage";
import AddBook from "./view/addBook"
import OrderDetails from "./view/orderDetails";
import Manage from "./view/manage";
import EditBook from "./component/editbook";
import AdminSum from "./view/adminSum";
import UserSum from "./view/userSum";

export default function Router(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path={"/personalPage"} element={<PersonalPage/>} errorElement={<Deafultpage/>}/>
            <Route path={"/home"} element={<Home/>}/>
            <Route errorElement={<Deafultpage/>}/>
            <Route path={"/shoppingCart"} element={<ShoppingCart/>}/>
            <Route path={"/details"} element={<BookDetails/>}/>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/order'} element={<Order/>}/>
            <Route path={'/sign'} element={<Signup/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'addBook'} element={<AddBook/>}/>
            <Route path={'/orderDetails'} element={<OrderDetails/>}/>
            <Route path={'/manage'} element={<Manage/>}/>
            <Route path={'/editbooks'} element={<EditBook/>}/>
            <Route path={'/adminSum'} element={<AdminSum/>}/>
            <Route path={'/userSum'} element={<UserSum/>}/>
        </Routes>
        </BrowserRouter>
    )
}