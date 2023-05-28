import './App.css';
import Main from './Components/Main';

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemInfo from './Components/ItemInfo';
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
import SellerDiscounts from './Sellers/SellerDiscounts';
import Category from './Components/Category';
import ReportList from './Admin/ReportList';
import Search from './Components/Search';

import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import particlesOptions from './particleOptions';

 
function App() {

  const particlesInit = async (main) => {
    //console.log(main);
    await loadFull(main);
  };
  const particlesLoaded = (container) => {
    //console.log(container);
  };

  // document.body.style.backgroundAttachment = "fixed";
  // document.body.style.backgroundRepeat = "no-repeat";
  // document.body.style.backgroundSize = "cover";
  // document.body.style.backgroundPosition = "center";
  // document.body.style.height = 'auto';

  // document.body.style.backgroundImage = `url(${Background})`
  // document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/b9/c8/f8/b9c8f893c9a782033a01f47e0c0b1d6e.jpg')"
  // console.log(document.body.style.backgroundImage);

  return (
    <>

     
      <Particles 

        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesOptions}
      />

      <Router>
        <Mysidenav />
        <Routes >
          <Route exact path='/' element={<Main />} />
          <Route exact path='/ItemInfo/:param1' element={<ItemInfo />} />
          <Route exact path='/AdminLogin' element={<AdminLogin />} />
          <Route exact path='/CustomerLogin' element={<CustomerLogin />} />
          <Route exact path='/SellerLogin' element={<SellerLogin />} />


          <Route exact path='/addBooks' element={<AddBooks />} />
          <Route exact path='/addElectronics' element={<AddElectronics />} />
          <Route exact path='/addCosmetics' element={<AddCosmetics />} />
          <Route exact path='/addClothes' element={<AddClothes />} />
          <Route exact path='/yourshop' element={<Shop />} />
          <Route exact path='/editItem/:param1' element={<EditItem />} />
          <Route exact path='/userList' element={<UserList />} />

          <Route exact path='/Cart' element={<Cart />} />
          <Route exact path='/Orders' element={<Orders />} />
          <Route exact path='/Checkout/:param1' element={<Checkout />} />
          <Route exact path='/checkOrder/:param1' element={<CheckOrder />} />
          <Route exact path='/category/:param1' element={<Category />} />
          <Route exact path='/orderList' element={<OrderList />} />

          <Route exact path='/yourDiscounts' element={<SellerDiscounts />} />
          <Route exact path='/reportList' element={<ReportList />} />
          <Route exact path='/search/:param1/:param2' element={<Search />} />

        </Routes>
      </Router>


      {/* aaa */}

    </>
  );
}

export default App;
