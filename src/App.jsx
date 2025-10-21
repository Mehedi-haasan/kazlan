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
import ExcelSheet from "./Components/ExcelSheet/ExcelSheet.jsx";
import english from './lang/en.json'
import bangla from './lang/bn.json'
import CreateAttribute from "./Components/Attribute/CreateAttribute.jsx";
import UpdateBrand from "./Components/Brand/UpdateBrand.jsx";
import UpdateCategory from "./Components/Category/UpdateCategory.jsx";
import UpdateAttribute from "./Components/Attribute/UpdateAttribute.jsx";
import UpdateCustomer from "./Components/Customers/UpdateCustomer.jsx";
import UpdateSupplier from "./Components/Supplier/UpdateSupplier.jsx";
import UpdateWarehouse from "./Components/Warehouse/UpdateWarehouse.jsx";
import UpdateUser from "./Components/User/UpdateUser.jsx";
import OpeningInvoice from "./Components/OpeningInvoice/OpeningInvoice.jsx";
import Expense from "./Components/Expense/Expense.jsx";
import ExpenseCreate from "./Components/Expense/ExpenseCreate.jsx";
import YearlyBonus from "./Components/User/YearlyBonus.jsx";
import AttributeTypeCreate from "./Components/Attribute/AttributeTypeCreate.jsx";
import CreateAttributeValue from "./Components/Attribute/CreateAttributeValue.jsx";
import EditCustomerBalance from "./Components/Payment/EditCustomerBalance.jsx";
import EditSupplierBalance from "./Components/Payment/EditSupplierBalance.jsx";
import PurchaseOrderEdit from "./Components/SaleOrderEdit/PurchaseOrderEdit.jsx";
import PurchaseInvoice from "./Components/Invoice/PurchaseInvoice.jsx";
import PurchaseReturnInvoice from "./Components/ReturnInvoice/PurchaseReturnInvoice.jsx";




function App() {
  const [auth, setAuth] = useState(false)
  const [open, setopen] = useState(true);
  const [info, setInfo] = useState({});
  const [data, setData] = useState([]);
  const [message, setMessage] = useState({ id: Date.now(), mgs: '' });
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [user, setUser] = useState([]);
  const [state, setState] = useState([]);
  const [shop, setShop] = useState([{ id: 1, name: "All" }])
  const [edition, setEdition] = useState([])
  let entries = [{ id: 501, name: "10" }, { id: 502, name: "20" }, { id: 503, name: "30" }, { id: 504, name: "50" }]
  const [lang, setLang] = useState({})



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
      setMessage({ ...message, id: Date.now(), mgs: "Your Login seassion expired. Please login again" })
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

  const Edition = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BaseUrl}/api/get/attribute/value/by/${1}`, {
      method: 'GET',
      headers: {
        "authorization": token,
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json()
    setEdition(data.items);
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
      // getNotification()
      getCategory();
      getBrand()
      getUser()
      getState()
      Edition()
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


  useEffect(() => {
    let language = localStorage.getItem('lan');

    // If not set or invalid, default to English
    if (!language || language === 'undefined') {
      language = 'en';
      localStorage.setItem('lan', 'en');
    }

    if (language === 'en') {
      setLang(english);
    } else if (language === 'bn') {
      setLang(bangla);
    } else {
      setLang(english);
    }
  }, [lang]);



  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);



  return (
    <BrowserRouter>
      <Header auth={auth} isLoggedOut={(v) => setAuth(v)} open={open} isOpen={(v) => { setopen(v) }}
        darkMode={darkMode}
        notification={data} info={info} lang={lang}
        changetheme={(v) => {
          if (v === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
          } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
          }
        }}
        message={message}
        changeLan={(v) => { if (v === 'bn') { setLang(bangla) } else { setLang(english) } }} />
      <div className={`min-h-[calc(80vh-160px)] ${auth ? 'mt-12' : ''} bg-[#F7F7FF] dark:bg-[#040404] transition-all font-bold w-full top-12 ease-in duration-200 ${!auth ? "pl-0" : open ? "pl-[170px] md:pl-[230px]" : "pl-0 md:pl-[60px]"} font-roboto`}>
        <Routes>
          <Route path="/" element={auth ? <Dashboard data={data} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/dashboard" element={auth ? <Dashboard data={data} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/registration" element={auth && info?.role === "superadmin" ? <Registration state={state} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/forget/password" element={auth ? <ForgetPassword /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/OTP/varification" element={auth ? <OtpVarification /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/create" element={auth ? <CreactProduct edition={edition} category={category} brand={brand} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/update/product/:id" element={auth ? <ProductUpdate category={category} brand={brand} info={info} editio={edition} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/tran/product/:id" element={auth ? <ProTransaction category={category} brand={brand} info={info} entries={entries} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/items" element={auth ? <Product category={category} brand={brand} entries={entries} shop={shop} user={user} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/user/order" element={auth ? <SingleOrder /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/sale/order" element={auth ? <WholeSell changeLan={lang} editio={edition} entries={entries} brand={brand} category={category} shop={shop} state={state} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/sale/order/edit/:id/:type" element={auth ? <SaleOrderEdit editio={edition} entries={entries} brand={brand} category={category} shop={shop} state={state} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/purchase/order/edit/:id/:type" element={auth ? <PurchaseOrderEdit editio={edition} entries={entries} brand={brand} category={category} shop={shop} state={state} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/notification" element={<Notification data={data} info={info} />} />

          <Route path="/customer/balance/:id" element={auth ? <CustomerPayment info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/supplier/balance/:id" element={auth ? <SupplierPayment info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/edit/customer/balance/:id/:invo/:type" element={auth ? <EditCustomerBalance info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/edit/supplier/balance/:id/:invo/:type" element={auth ? <EditSupplierBalance info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/company" element={<Company />} />

          <Route path="/excel/sheet" element={<ExcelSheet />} />

          <Route path="/sale/items" element={<SaleItems />} />

          <Route path="/return/items" element={<ReturnItems />} />

          <Route path="/app/setting" element={<Setting userinfo={info} />} />

          <Route path="/create/customer" element={<CreateCustomer state={state} info={info} />} />

          <Route path="/update/customer/:id/:thana" element={<UpdateCustomer state={state} info={info} />} />

          <Route path="/create/supplier" element={<CreateSupplier state={state} info={info} />} />

          <Route path="/update/supplier/:id" element={<UpdateSupplier state={state} info={info} />} />

          <Route path="/purchase/return/items" element={<ReturnPurchaseItem state={state} info={info} />} />

          <Route path="/order" element={auth ? <Order user={user} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/state" element={auth ? <State entries={entries} state={state} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/warehouses" element={auth ? <House entries={entries} shop={shop} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/update/warehouse/:id" element={auth ? <UpdateWarehouse entries={entries} shop={shop} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/category" element={auth ? <Category category={category} entries={entries} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/brand" element={auth ? <Brand brands={brand} entries={entries} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/attribute" element={auth ? <Attribute brands={brand} entries={entries} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/create/attribute" element={auth ? <CreateAttribute brands={brand} entries={entries} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/create/attribute/value" element={auth ? <CreateAttributeValue brands={brand} entries={entries} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/create/attribute/type" element={auth ? <AttributeTypeCreate brands={brand} entries={entries} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/update/attribute/:id" element={auth ? <UpdateAttribute brands={brand} entries={entries} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/create/category" element={auth ? <CreateCategory brands={brand} entries={entries} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/update/category/:id" element={auth ? <UpdateCategory brands={brand} entries={entries} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/create/brand" element={auth ? <CreateBrand brands={brand} entries={entries} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/update/brand/:id" element={auth ? <UpdateBrand brands={brand} entries={entries} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/profile" element={auth ? <Profile /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/users" element={auth ? <User entries={entries} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/update/user/:id" element={auth ? <UpdateUser entries={entries} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />



          <Route path="/sale/invoice/:id/:type" element={auth ? <Invoice info={info} entries={entries} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/purchase/invoice/:id/:type" element={auth ? <PurchaseInvoice info={info} entries={entries} /> : <Login auth={(v) => { setAuth(v) }} />} />



          <Route path="/opening/invoice/:id/:type" element={auth ? <OpeningInvoice info={info} entries={entries} /> : <Login auth={(v) => { setAuth(v) }} />} />



          <Route path="/sale/return/invoice/:id/:type" element={auth ? <ReturnInvoice info={info} entries={entries} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/purchase/return/invoice/:id/:type" element={auth ? <PurchaseReturnInvoice info={info} entries={entries} /> : <Login auth={(v) => { setAuth(v) }} />} />



          <Route path="/recent/invoice" element={auth ? <RecentInvoice /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/create/expense" element={auth ? <ExpenseCreate info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/yearly/bonus/:id" element={auth ? <YearlyBonus info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/expense" element={auth ? <Expense /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/sale/return" element={auth ? <SaleReturn shop={shop} info={info} state={state} editio={edition} brand={brand} category={category} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/purchase/return" element={auth ? <PruchaseReturn shop={shop} info={info} state={state} editio={edition} brand={brand} category={category} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/customers" element={auth ? <Customers entries={entries} state={state} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/payment/history/:id" element={auth ? <PaymentHistory category={category} brand={brand} info={info} entries={entries} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/suppliers" element={auth ? <Suppliers entries={entries} state={state} info={info} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/purchase/product" element={auth ? <PurchaseProduct shop={shop} info={info} state={state} editio={edition} brand={brand} category={category} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="/purchase/items" element={auth ? <PurchaseItems shop={shop} info={info} entries={entries} editio={edition} /> : <Login auth={(v) => { setAuth(v) }} />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;


