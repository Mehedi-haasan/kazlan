import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Components/Share/Header.jsx'
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import CreactProduct from "./Components/ProductCreate/CreactProduct.jsx";
import Product from './Components/Products/Products.jsx';
import SingleOrder from "./Components/SingleOrder/SingleOrder.jsx";
import Order from "./Components/Order/Order.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import Login from "./Components/Login/Login.jsx";
import { useState, useEffect } from "react";
import Registration from "./Components/Login/Registration.jsx";
import Sell from "./Components/Sell/Sell.jsx";
import Success from "./Components/Socket/Success.jsx";
import Notification from "./Components/Notification/Notification.jsx";
import Company from "./Components/Company/Company.jsx";
import Category from "./Components/Category/Category.jsx";
import State from "./Components/State/State.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import UpdateProduct from "./Components/UpdateProduct/UpdateProduct.jsx";





function App() {
  const [auth, setAuth] = useState(false)
  const [open, setopen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && token !== "null") {
      setAuth(true)
    } else {
      setAuth(false)
    }
  }, [])


  return (
    <BrowserRouter>
      <Header auth={auth} open={open} isOpen={(v) => { setopen(v) }} />
      <div className={`absolute bg-[#F7F7FF] transition-all font-bold w-full top-12 ease-in duration-500 ${open ? "pl-[230px]" : "pl-[60px]"}`}>
        <Routes>
          <Route path="/" element={<Login auth={(v) => { setAuth(v) }} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/success" element={<Success />} />
          <Route path="/create" element={<CreactProduct />} />
          <Route path="/product" element={<Product />} />
          <Route path="/user/order" element={<SingleOrder />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/order" element={<Order />} />
          <Route path="/state" element={<State />} />
          <Route path="/company/info" element={<Company />} />
          <Route path="/category" element={<Category />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update/product" element={<UpdateProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


