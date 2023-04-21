import './App.css';
import Main from './Components/Main';

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemInfo from './Components/ItemInfo';
import Imgup from './Components/Imgup';
import Imgdown from './Components/Imgdown';
import Mysidenav from './Components/Mysidenav.js';
import AdminLogin from './Admin/AdminLogin';
import CustomerLogin from './Customers/CustomerLogin';
import SellerLogin from './Sellers/SellerLogin';
import AddBooks from './Sellers/AddBooks';
import AddElectronics from './Sellers/AddElectronics';
import AddCosmetics from './Sellers/AddCosmetics';
import AddClothes from './Sellers/AddClothes';
import Shop from './Sellers/Shop';
import EditItem from './Sellers/EditItem';
import UserList from './Admin/UserList'
import Cart from './Customers/Cart';
import Orders from './Customers/Orders';
import Checkout from './Customers/Checkout';
import CheckOrder from './Customers/CheckOrder';
import OrderList from './Admin/OrderList';



function App() {
 
  return (

    <>     
     
      <Router>
         <Mysidenav />
        <Routes >
          <Route exact path='/' element={<Main />} />
          <Route exact path='/ItemInfo/:param1' element={<ItemInfo />} />
          <Route exact path='/AdminLogin' element={<AdminLogin />} />
          <Route exact path='/CustomerLogin' element={<CustomerLogin />} />
          <Route exact path='/SellerLogin' element={<SellerLogin />} />
          
          <Route exact path='/Imgup' element={<Imgup />} />
          <Route exact path='/Imgdown' element={<Imgdown />} />
          <Route exact path='/addBooks' element={<AddBooks/>} />
          <Route exact path='/addElectronics' element={<AddElectronics/>} />
          <Route exact path='/addCosmetics' element={<AddCosmetics/>} />
          <Route exact path='/addClothes' element={<AddClothes/>} />
          <Route exact path='/yourshop' element={<Shop/>} />
          <Route exact path='/editItem/:param1' element={<EditItem />} />
          <Route exact path='/userList' element={<UserList/>} />
       
          <Route exact path='/Cart' element={<Cart />} />
          <Route exact path='/Orders' element={<Orders />} />
          <Route exact path='/Checkout/:param1' element={<Checkout />} />
          <Route exact path='/checkOrder/:param1' element={<CheckOrder />} />
          <Route exact path='/orderList' element={<OrderList />} />


        </Routes>
      </Router>
       
      {/* aaa */}

    </>
  );
}

export default App;
