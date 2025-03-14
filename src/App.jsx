import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Components/Share/Header.jsx'
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import CreactProduct from "./Components/ProductCreate/CreactProduct.jsx";
import Product from './Components/Products/Products.jsx';
import SingleOrder from "./Components/SingleOrder/SingleOrder.jsx";
import Order from "./Components/Order/Order.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import Login from "./Components/Login/Login.jsx";
import Registration from "./Components/Login/Registration.jsx";
import Success from "./Components/Socket/Success.jsx";
import Notification from "./Components/Notification/Notification.jsx";
import Company from "./Components/Company/Company.jsx";
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






function App() {
  const [auth, setAuth] = useState(false)
  const [open, setopen] = useState(false);
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
    const response = await fetch(`${BaseUrl}/api/get/brand`, {
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
    const data = await response.json()
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
    getNotification()
    getCategory();
    getBrand()
    getUser()
    getState()

    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');
    const id = localStorage.getItem('id');
    if (token && token !== "null") {
      setAuth(true);
      setInfo({ id: id, name: name, role: role })
    } else {
      setAuth(false)
    }
    if (role === "superadmin" || role === "modarator") {
      getShop()
    } else {
      setShop([{
        id: id,
        name: name
      }])
    }
  }, [auth])



  return (
    <BrowserRouter>
      <Header auth={auth} isLoggedOut={(v) => setAuth(v)} open={open} isOpen={(v) => { setopen(v) }} notification={data} info={info} />
      <div className={`absolute bg-[#F7F7FF] transition-all font-bold w-full top-12 ease-in duration-500 ${!auth ? "pl-0" : open ? "pl-[230px]" : "pl-[60px]"} font-roboto`}>
        <Routes>
          <Route path="/" element={auth ? <Dashboard data={data} /> : <Login auth={(v) => { setAuth(v) }} />} />
          <Route path="/dashboard" element={<Dashboard data={data} />} />
          <Route path="/registration" element={<Registration state={state} />} />
          <Route path="/forget/password" element={<ForgetPassword />} />
          <Route path="/OTP/varification" element={<OtpVarification />} />
          <Route path="/success" element={<Success />} />
          <Route path="/create" element={<CreactProduct category={category} brand={brand} />} />
          <Route path="/product" element={<Product category={category} type={type} brand={brand} entries={entries} shop={shop} user={user} />} />
          <Route path="/user/order" element={<SingleOrder />} />
          <Route path="/sell" element={<Sell category={category} type={type} brand={brand} entries={entries} shop={shop} state={state} paytype={paytype} />} />
          <Route path="/wholesale" element={<WholeSell category={category} type={type} brand={brand} entries={entries} shop={shop} state={state} paytype={paytype} />} />
          <Route path="/notification" element={<Notification data={data} />} />
          <Route path="/order" element={<Order category={category} type={type} brand={brand} entries={entries} shop={shop} state={state} paytype={paytype} user={user} />} />
          <Route path="/state" element={<State entries={entries} state={state} />} />
          <Route path="/company/info" element={<Company />} />
          <Route path="/category" element={<Category category={category} entries={entries} />} />
          <Route path="/brand" element={<Brand brands={brand} entries={entries} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recent/invoice" element={<RecentInvoice />} />
          <Route path="/sale/return" element={<SaleReturn />} />
          <Route path="/purchase/return" element={<PruchaseReturn shop={shop} paytype={paytype} />} />
          <Route path="/customers" element={<Customers entries={entries} />} />
          <Route path="/suppliers" element={<Suppliers entries={entries} />} />
          <Route path="/update/product" element={<PurchaseProduct user={user} category={category} type={type} brand={brand} entries={entries} shop={shop} paytype={paytype} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


