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
import House from "./Components/Warehouse/House.jsx";
import CreateCategory from './Components/Category/CreateCategory.jsx'
import CreateBrand from "./Components/Brand/CreateBrand.jsx";
import ProductUpdate from "./Components/Products/ProductUpdate.jsx";
import ProTransaction from "./Components/Products/ProTransaction.jsx";
import PaymentHistory from "./Components/Payment/PaymentHistory.jsx";
import Invoice from "./Components/Invoice/Invoice.jsx";
import PurchaseItems from "./Components/PurchaseItem/PurchaseItems.jsx";
import CustomerPayment from "./Components/Payment/CustomerPayment.jsx";
import SupplierPayment from "./Components/Payment/SupplierPayment.jsx";
import WholeSell from "./Components/Wholesale/Wholesale.jsx";
import ReturnPurchaseItem from "./Components/PurchaseReturn/ReturnPurchaseItem.jsx";
import SaleItems from "./Components/SaleReturn/SaleItems.jsx";
import ReturnItems from "./Components/SaleReturn/ReturnItems.jsx";
import ReturnInvoice from "./Components/ReturnInvoice/ReturnInvoice.jsx";
import Attribute from './Components/Attribute/Attribute.jsx'
import SaleOrderEdit from "./Components/SaleOrderEdit/SaleOrderEdit.jsx";




function App() {
  const [auth, setAuth] = useState(false)
  const [open, setopen] = useState(true);
  const [info, setInfo] = useState({});
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [user, setUser] = useState([]);
  const [state, setState] = useState([]);
  const [shop, setShop] = useState([{ id: 1, name: "All" }])

  let entries = [{ id: 501, name: "10" }, { id: 502, name: "20" }, { id: 503, name: "30" }, { id: 504, name: "50" }]
  let years = Array.from({ length: 27 }, (_, i) => {
    const year = 2026 - i;
    return {
      id: year - 2000,
      name: year.toString()
    };
  });




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
    if (data && data?.message === "Invalid token" || data?.message === "User not found") {
      localStorage.setItem('token', null);
      setAuth(false);
    }
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
    if (data && data?.message === "Invalid token" || data?.message === "User not found") {
      localStorage.setItem('token', null);
      setAuth(false);
    }
    setCategory(data.items)
  }

  const getBrand = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BaseUrl}/api/get/brand/${1}/${20}`, {
      method: 'GET',
      headers: {
        "authorization": token,
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json()
    if (data && data?.message === "Invalid token" || data?.message === "User not found") {
      localStorage.setItem('token', null);
      setAuth(false);
    }
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
    if (data && data?.message === "Invalid token" || data?.message === "User not found") {
      localStorage.setItem('token', null);
      setAuth(false);
    }
    setState(data?.items);
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
    if (data && data?.message === "Invalid token" || data?.message === "User not found") {
      localStorage.setItem('token', null);
      setAuth(false);
    }
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
    const compId = localStorage.getItem('compId');
    const shopcode = localStorage.getItem('shopcode');

    if (token && token !== "null") {
      setAuth(true);
      setInfo({
        id: id,
        name: name,
        image: image,
        role: role,
        usertype: usertype,
        logo: logo,
        shopname: shopname,
        compId: compId,
        shopcode: shopcode
      })
    } else {
      setAuth(false)
    }


    if (auth && role === "superadmin") {
      getShop()
    } else if (auth && role === "admin") {
      setShop([{
        id: id,
        name: shopname
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


  // useEffect(() => {
  //   const handleContextMenu = (e) => {
  //     e.preventDefault();
  //   };
  //   document.addEventListener("contextmenu", handleContextMenu);
  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //   };
  // }, []);

  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (
  //       e.key === "F12" ||
  //       (e.ctrlKey && e.shiftKey && ["I", "C", "J"].includes(e.key)) ||
  //       (e.ctrlKey && e.key === "U") // View Source
  //     ) {
  //       e.preventDefault();
  //     }
  //   };
  //   document.addEventListener("keydown", handleKeyDown);
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);



  return (
    <BrowserRouter>
      <Header auth={auth} isLoggedOut={(v) => setAuth(v)} open={open} isOpen={(v) => { setopen(v) }} notification={data} info={info} />
      <div className={`min-h-[calc(80vh-160px)] mt-12 bg-[#F7F7FF] transition-all font-bold w-full top-12 ease-in duration-200 ${!auth ? "pl-0" : open ? "pl-[170px] md:pl-[230px]" : "pl-0 md:pl-[60px]"} font-roboto`}>
        <Routes>
          <Route path="/" element={auth ? <Dashboard data={data} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/dashboard" element={auth ? <Dashboard data={data} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/registration" element={auth && info?.role === "superadmin" ? <Registration state={state} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/forget/password" element={auth ? <ForgetPassword /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/OTP/varification" element={auth ? <OtpVarification /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/create" element={auth ? <CreactProduct years={years} category={category} brand={brand} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/update/product/:id" element={auth ? <ProductUpdate category={category} brand={brand} info={info} editio={years} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/tran/product/:id" element={auth ? <ProTransaction category={category} brand={brand} info={info} entries={entries} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/items" element={auth ? <Product category={category} brand={brand} entries={entries} shop={shop} user={user} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/user/order" element={auth ? <SingleOrder /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/sale/order" element={auth ? <WholeSell editio={years} entries={entries} brand={brand} category={category} shop={shop} state={state} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/sale/order/edit/:id" element={auth ? <SaleOrderEdit editio={years} entries={entries} brand={brand} category={category} shop={shop} state={state} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/notification" element={<Notification data={data} info={info} />} />

          <Route path="/customer/balance/:id" element={<CustomerPayment info={info} />} />

          <Route path="/supplier/balance/:id" element={<SupplierPayment info={info} />} />

          <Route path="/company" element={<Company />} />

          <Route path="/sale/items" element={<SaleItems />} />

          <Route path="/return/items" element={<ReturnItems />} />

          <Route path="/app/setting" element={<Setting userinfo={info} />} />

          <Route path="/create/customer" element={<CreateCustomer state={state} info={info} />} />

          <Route path="/create/supplier" element={<CreateSupplier state={state} />} />

          <Route path="/purchase/return/items" element={<ReturnPurchaseItem state={state} />} />

          <Route path="/order" element={auth ? <Order user={user} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/state" element={auth ? <State entries={entries} state={state} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/warehouses" element={auth ? <House entries={entries} shop={shop} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/category" element={auth ? <Category category={category} entries={entries} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/brand" element={auth ? <Brand brands={brand} entries={entries} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/attribute" element={auth ? <Attribute brands={brand} entries={entries} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/create/category" element={auth ? <CreateCategory brands={brand} entries={entries} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/create/brand" element={auth ? <CreateBrand brands={brand} entries={entries} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/profile" element={auth ? <Profile /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/users" element={auth ? <User entries={entries} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/invoice/:id" element={auth ? <Invoice info={info} entries={entries} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/return/invoice/:id" element={auth ? <ReturnInvoice info={info} entries={entries} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/recent/invoice" element={auth ? <RecentInvoice /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/sale/return" element={auth ? <SaleReturn shop={shop} info={info} state={state} editio={years} brand={brand} category={category} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/purchase/return" element={auth ? <PruchaseReturn shop={shop} info={info} state={state} editio={years} brand={brand} category={category} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/customers" element={auth ? <Customers entries={entries} state={state} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/payment/history/:id" element={auth ? <PaymentHistory category={category} brand={brand} info={info} entries={entries} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/suppliers" element={auth ? <Suppliers entries={entries} state={state} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/purchase/product" element={auth ? <PurchaseProduct shop={shop} info={info} state={state} editio={years} brand={brand} category={category} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/purchase/items" element={auth ? <PurchaseItems shop={shop} info={info} entries={entries} editio={years} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;


