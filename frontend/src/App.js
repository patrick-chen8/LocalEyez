import React from "react";
import Browse from "./pages/Browse";
import ChangePassword from "./pages/ChangePassword";
import Checkout from "./pages/Checkout";
import CreateAccount from "./pages/CreateAccount";
import CreateConfirmation from "./pages/CreateConfirmation";
import EditProfile from "./pages/EditProfile";
import EnterPayment from "./pages/EnterPayment";
import ForgotPassword from "./pages/ForgotPassword";
import ForgotPasswordEmail from "./pages/ForgotPasswordEmail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LoginPrompt from "./pages/LoginPrompt";
import Movie from "./pages/Movie";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderHistory from "./pages/OrderHistory";
import OrderSummary from "./pages/OrderSummary";
import Search from "./pages/Search";
import Seat from "./pages/Seat";
import { Switch, Link, Route, Routes } from "react-router-dom";
import Navbar from "./navbars/Navbar";
import CustomerNavbar from "./navbars/CustomerNavbar";
import AdminNavbar from "./navbars/AdminNavbar";
import './styles.css';
import EmailVerify from "./EmailVerify";
import AddCardCA from "./pages/AddCardCA"
import AddCard from "./pages/AddCard"


import EmptyNavbar from "./navbars/EmptyNavbar.js";
import CustomerRoutes from "./Routing/CustomerRoutes.js";
//import LoginRoutes from "./Routing/LoginRoutes.js" 
import PasswordRoutes from "./Routing/PasswordRoutes.js"
import AdminRoutes from "./Routing/AdminRoutes.js"
import GuestRoutes from "./Routing/GuestRoutes.js"
//import CreatingAccountRoutes from "./Routing/CreatingAccountRoutes.js"
import InactiveCustomerRoutes from "./Routing/InactiveCustomerRoutes.js"

import AdminHome from "./admin/AdminHome.js"
import AddMovie from "./admin/AddMovie.js"
import EditPromo from "./admin/EditPromo.js"
import ManagePromos from "./admin/ManagePromos.js"
import ScheduleMovie from "./admin/ScheduleMovie.js"
import ManageUsers from "./admin/ManageUsers.js"
import AdminSearch from "./admin/AdminSearch.js"
import AdminMovie from "./admin/AdminMovie.js"
import AdminEditProfile from "./admin/AdminEditProfile";

const App = () => {
	let logged = sessionStorage.getItem("loggedIn");
    let admin = sessionStorage.getItem("admin");
    let empty = sessionStorage.getItem("empty");
	let CurrentNav = Navbar;
    if (empty == "true") {
		CurrentNav = EmptyNavbar;
	}
	if (logged == "true") {
		CurrentNav = CustomerNavbar;
	}
    if (admin == "true") {
        CurrentNav = AdminNavbar;
    }

 return (
    <>
        <CurrentNav />
        {/*<div className="container"><Component /></div>*/}
        <Routes>
            <Route path="/" element=<Home/> />
            <Route path="/home" element=<Home/> />
            <Route path="/browse" element=<Browse/> />
            <Route path="/movie/:id" element=<Movie/> />
            <Route path="/search" element=<Search/> />
            {/*<Route path="/book" element=<Book/> />*/}
            <Route path="/seat/:id" element=<Seat/> />
            <Route path="/changepassword" element=<ChangePassword /> />
            <Route path="/forgotpasswordemail" element=<ForgotPasswordEmail/> />
            <Route path="/forgotpassword" element=<ForgotPassword /> />
            <Route element = { <CustomerRoutes /> }>
                <Route path="/editprofile" element=<EditProfile/> />
                <Route path="/checkout" element=<Checkout /> />
                <Route path="/enterpayment" element=<EnterPayment/> />
                <Route path="/orderconfirmation" element=<OrderConfirmation /> />
                <Route path="/orderhistory" element=<OrderHistory/> />
                <Route path="/ordersummary" element=<OrderSummary/> />
                <Route path="/addcard" element=<AddCard/> />
            </Route>
            <Route element = { <InactiveCustomerRoutes />} >
                <Route path="/addcardca" element=<AddCardCA/> />
                <Route path="/createconfirmation" element=<CreateConfirmation/> />
            </Route>
            <Route element = { <AdminRoutes /> }>
                <Route path="/admin/" element=<AdminHome /> />
                <Route path="/admin/home" element=<AdminHome /> />
                <Route path="/admin/movie/:id" element=<AdminMovie/> />
                <Route path="/admin/addmovie" element=<AddMovie /> />
                <Route path="/admin/editpromo" element=<EditPromo /> />
                <Route path="/admin/managepromos" element=<ManagePromos /> />
                <Route path="/admin/schedulemovie/:id" element=<ScheduleMovie /> />
                <Route path="/admin/manageusers" element=<ManageUsers /> />
                <Route path="/admin/search" element=<AdminSearch /> />
                <Route path="/admin/profile" element=<AdminEditProfile /> />
            </Route>
            <Route element = { <PasswordRoutes /> }>
            </Route>
            <Route element = { <GuestRoutes /> }>
                <Route path="/createaccount" element=<CreateAccount/> />
                <Route path="/login" element=<Login/> />
                <Route path="/loginprompt" element=<LoginPrompt/> />
                <Route path="/users/:id/verify/:token" element=<EmailVerify/> />

            </Route>
            <Route path="*" element=<Home /> />
        </Routes>

    </>
  );
};
 
export default App;
