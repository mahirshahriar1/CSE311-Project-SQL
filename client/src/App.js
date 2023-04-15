import './App.css';
import Main from './Components/Main';

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Components/Register'
import ItemInfo from './Components/ItemInfo';
import Imgup from './Components/Imgup';
import Imgdown from './Components/Imgdown';
import Mysidenav from './Components/Mysidenav.js';

function App() {
 
  return (

    <div>
      <Mysidenav />
     
      <Router>
        <Routes >
          <Route exact path='/' element={<Main />} />
          <Route exact path='/ItemInfo/:param1' element={<ItemInfo />} />
          <Route exact path='/Login' element={<Register />} />
          <Route exact path='/Imgup' element={<Imgup />} />
          <Route exact path='/Imgdown' element={<Imgdown />} />

        </Routes>
      </Router>
       
      {/* aaa */}

    </div>
  );
}

export default App;
