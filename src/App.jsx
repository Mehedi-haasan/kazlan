import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Components/Share/Header.jsx'
import Footer from './Components/Share/Footer.jsx'
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import CreactProduct from "./Components/ProductCreate/CreactProduct.jsx";
import Product from './Components/Products/Products.jsx';
import SingleOrder from "./Components/SingleOrder/SingleOrder.jsx";
import Order from "./Components/Order/Order.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import Login from "./Components/Login/Login.jsx";
import Registration from "./Components/Login/Registration.jsx";
import Notification from "./Components/Notification/Notification.jsx";
import Category from "./Components/Category/Category.jsx";
import State from "./Components/State/State.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import PurchaseProduct from "./Components/PurchaseProduct/PurchaseProduct.jsx";
import BaseUrl from "./Constant.js";
import Sell from "./Components/Sell/Sell.jsx";
import WholeSell from "./Components/Wholesale/Wholesale.jsx";
import Customers from "./Components/Customers/Customers.jsx";
import Suppliers from "./Components/Supplier/Suppliers.jsx";
import ForgetPassword from "./Components/Login/ForgetPassword.jsx";
import OtpVarification from "./Components/Login/OtpVarification.jsx";
import RecentInvoice from "./Components/RecentInvoice/RecentInvoice.jsx";
import Brand from "./Components/Brand/Brand.jsx";
import SaleReturn from "./Components/SaleReturn/SaleReturn.jsx";
import PruchaseReturn from "./Components/PurchaseReturn/PurchaseReturn.jsx";
import User from "./Components/User/User.jsx";
import Company from "./Components/Company/Company.jsx";
import Setting from "./Components/Setting/Setting.jsx";
import CreateCustomer from "./Components/Customers/CreateCustomer.jsx";
import CreateSupplier from "./Components/Supplier/CreateSupplier.jsx";
import Sale from "./Components/Sale/Sale.jsx";
import House from "./Components/Warehouse/House.jsx";







function App() {
  const [auth, setAuth] = useState(false)
  const [open, setopen] = useState(true);
  const [info, setInfo] = useState({});
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [user, setUser] = useState([]);
  const [state, setState] = useState([]);
  const [shop, setShop] = useState([])

  let type = [{ id: 1, name: "Physical" }, { id: 2, name: "Digital" }]
  let paytype = [{ id: 201, name: "Cash" }, { id: 202, name: "Due" }]
  let entries = [{ id: 501, name: "10" }, { id: 502, name: "20" }, { id: 503, name: "30" }, { id: 504, name: "50" }]



  const getNotification = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BaseUrl}/api/get/notification`, {
      method: 'GET',
      headers: {
        "authorization": token,
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json()
    setData(data.items)
  }

  const getCategory = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BaseUrl}/api/get/category`, {
      method: 'GET',
      headers: {
        "authorization": token,
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json()
    setCategory(data.items)
  }

  const getBrand = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BaseUrl}/api/get/brand/${1}/${1}`, {
      method: 'GET',
      headers: {
        "authorization": token,
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json()
    setBrand(data.items)
  }

  const getUser = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BaseUrl}/api/get/users`, {
      method: 'GET',
      headers: {
        "authorization": token,
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json();
    if (data?.message === "Invalid token") {
      setAuth(false);
      alert("Your Login seassion expired. Please login again");
      localStorage.setItem('token', '')
    }
    setUser(data.items)
  }

  const getState = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BaseUrl}/api/get/state`, {
      method: 'GET',
      headers: {
        "authorization": token,
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json()
    setState(data.items)
  }

  const getShop = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BaseUrl}/api/get/shop`, {
      method: 'GET',
      headers: {
        "authorization": token,
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json()
    setShop(data.items)
  }

  useEffect(() => {

    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const image = localStorage.getItem('image');
    const role = localStorage.getItem('role');
    const id = localStorage.getItem('id');
    const usertype = localStorage.getItem('usertype');
    const logo = localStorage.getItem('logo');
    const shopname = localStorage.getItem('shopname');
    if (token && token !== "null") {
      setAuth(true);
      setInfo({ id: id, name: name, image: image, role: role, usertype: usertype, logo: logo, shopname: shopname })
    } else {
      setAuth(false)
    }


    if (role === "superadmi") {
      getShop()
    } else {
      setShop([{
        id: id,
        name: name
      }])
    }

    if (auth) {
      getNotification()
      getCategory();
      getBrand()
      getUser()
      getState()
    }

  }, [auth])



  return (
    <BrowserRouter>
      <Header auth={auth} isLoggedOut={(v) => setAuth(v)} open={open} isOpen={(v) => { setopen(v) }} notification={data} info={info} />
      <div className={`min-h-[calc(80vh-160px)] mt-12 bg-[#F7F7FF] transition-all font-bold w-full top-12 ease-in duration-500 ${!auth ? "pl-0" : open ? "pl-[230px]" : "pl-[60px]"} font-roboto`}>
        <Routes>
          <Route path="/" element={auth ? <Dashboard data={data} /> : <Login auth={(v) => { setAuth(v) }} />} />
          <Route path="/dashboard" element={auth ? <Dashboard data={data} /> : <Login auth={(v) => { setAuth(v) }} />} />
          <Route path="/registration" element={auth && info?.role === "superadmin" ? <Registration state={state} /> : <Login auth={(v) => { setAuth(v) }} />} />
          <Route path="/forget/password" element={auth ? <ForgetPassword /> : <Login auth={(v) => { setAuth(v) }} />} />
          <Route path="/OTP/varification" element={auth ? <OtpVarification /> : <Login auth={(v) => { setAuth(v) }} />} />
          <Route path="/create" element={auth ? <CreactProduct category={category} brand={brand} /> : <Login auth={(v) => { setAuth(v) }} />} />
          <Route path="/items" element={auth ? <Product category={category} type={type} brand={brand} entries={entries} shop={shop} user={user} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />
          <Route path="/user/order" element={auth ? <SingleOrder /> : <Login auth={(v) => { setAuth(v) }} />} />
          <Route path="/sale/order" element={auth ? <Sale category={category} type={type} brand={brand} entries={entries} shop={shop} state={state} paytype={paytype} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />
          <Route path="/notification" element={<Notification data={data} />} />
          <Route path="/company" element={<Company />} />
          <Route path="/app/setting" element={<Setting />} />
          <Route path="/create/customer" element={<CreateCustomer state={state} />} />
          <Route path="/create/supplier" element={<CreateSupplier state={state} />} />
          <Route path="/order" element={auth ? <Order category={category} type={type} brand={brand} entries={entries} shop={shop} state={state} paytype={paytype} user={user} /> : <Login auth={(v) => { setAuth(v) }} />} />
          <Route path="/state" element={auth ? <State entries={entries} state={state} /> : <Login auth={(v) => { setAuth(v) }} />} />
          <Route path="/warehouses" element={auth ? <House entries={entries} shop={shop} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />
          <Route path="/category" element={auth ? <Category category={category} entries={entries} /> : <Login auth={(v) => { setAuth(v) }} />} />
          <Route path="/brand" element={auth ? <Brand brands={brand} entries={entries} /> : <Login auth={(v) => { setAuth(v) }} />} />
          <Route path="/profile" element={auth ? <Profile /> : <Login auth={(v) => { setAuth(v) }} />} />
          <Route path="/users" element={auth ? <User entries={entries} /> : <Login auth={(v) => { setAuth(v) }} />} />
          <Route path="/recent/invoice" element={auth ? <RecentInvoice /> : <Login auth={(v) => { setAuth(v) }} />} />
          <Route path="/sale/return" element={auth ? <SaleReturn shop={shop} /> : <Login auth={(v) => { setAuth(v) }} />} />
          <Route path="/purchase/return" element={auth ? <PruchaseReturn shop={shop} paytype={paytype} /> : <Login auth={(v) => { setAuth(v) }} />} />
          <Route path="/customers" element={auth ? <Customers entries={entries} state={state} /> : <Login auth={(v) => { setAuth(v) }} />} />
          <Route path="/suppliers" element={auth ? <Suppliers entries={entries} state={state} /> : <Login auth={(v) => { setAuth(v) }} />} />
          <Route path="/update/product" element={auth ? <PurchaseProduct user={user} category={category} type={type} brand={brand} entries={entries} shop={shop} paytype={paytype} /> : <Login auth={(v) => { setAuth(v) }} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;


