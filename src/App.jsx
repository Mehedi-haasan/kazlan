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
import Return from "./Components/Return/Return.jsx";





function App() {
  const [auth, setAuth] = useState(false)
  const [open, setopen] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && token !== "null") {
      setAuth(true)
    } else {
      setAuth(false)
    }
  }, [])

  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);

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
  useEffect(() => {
    getNotification()
    getCategory();
  }, [])



  return (
    <BrowserRouter>
      <Header auth={auth} open={open} isOpen={(v) => { setopen(v) }} notification={data} />
      <div className={`absolute bg-[#F7F7FF] transition-all font-bold w-full top-12 ease-in duration-500 ${open ? "pl-[230px]" : "pl-[60px]"} font-roboto`}>
        <Routes>
          <Route path="/" element={<Login auth={(v) => { setAuth(v) }} />} />
          <Route path="/dashboard" element={<Dashboard data={data} />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/success" element={<Success />} />
          <Route path="/create" element={<CreactProduct />} />
          <Route path="/product" element={<Product category={category}/>} />
          <Route path="/user/order" element={<SingleOrder />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/wholesale" element={<WholeSell />} />
          <Route path="/notification" element={<Notification data={data} />} />
          <Route path="/order" element={<Order />} />
          <Route path="/state" element={<State />} />
          <Route path="/company/info" element={<Company />} />
          <Route path="/category" element={<Category category={category}/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/return" element={<Return />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/update/product" element={<PurchaseProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


