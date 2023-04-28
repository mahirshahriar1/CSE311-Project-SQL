import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
// import { Button } from 'react-bootstrap';


export default function Navbar() {

  var link = window.location.href.split('/').reverse()[0]
  var link2=window.location.href.split('/').reverse()[1]
  if (link === '') {
    link = 'main';
  }


  const [loginStatus, setLoginStatus] = useState(false);
  const [username, setUsername] = useState("");
  Axios.defaults.withCredentials = true;

  useEffect(() => {

    Axios.get('http://localhost:3001/login').then((response) => {
      // console.log(response.data.loggedIn);
      if (response.data.loggedIn === true) {
        setLoginStatus(true);
        if (response.data.user[0].Name)
          setUsername(response.data.user[0].Name);
        else
          setUsername('Admin');
      }
    });

  }, []);
  const logout = () => {
    Axios.get('http://localhost:3001/logout').then((response) => {
      alert(response.data);
    });

    localStorage.removeItem("token");
  };

  const [search, setSearch] = useState("");
  const Search = () => {
    if (search === '') {
      alert('Please enter something to search');
      return;
    }

    if (link === 'clothes' || link2==='clothes') {
      window.location.href = `/search/clothes/${search}`
    } else if (link === 'cosmetics'||link2==='cosmetics') {
      window.location.href = `/search/cosmetics/${search}`
    } else if (link === 'electronics'||link2==='electronics') {
      window.location.href = `/search/electronics/${search}`
    } else if (link === 'books'||link2==='books') {
      window.location.href = `/search/books/${search}`
    } else {
      window.location.href = `/search/main/${search}`
    }

  }



  return (

    <>
      <div className="container"  >


        <nav style={{ marginLeft: '50px', backgroundColor: '#131414'   }} className="navbar navbar-expand-lg ">
          <div className="container-fluid">
            <a style={{ color: '#e3dede' }} className="navbar-brand " href='/'>  Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a style={{ color: '#e3dede' }} className="nav-link active" aria-current="page" href='/'>Home</a>
                </li>
                <li className="nav-item">
                  <a style={{ color: '#e3dede' }} className="nav-link" href='/category/clothes'>Clothes</a>
                </li>
                <li className="nav-item">
                  <a style={{ color: '#e3dede' }} className="nav-link" href='/category/cosmetics'>Cosmetics</a>
                </li>
                <li className="nav-item">
                  <a style={{ color: '#e3dede' }} className="nav-link" href='/category/electronics'>Electronics</a>
                </li>
                <li className="nav-item">
                  <a style={{ color: '#e3dede' }} className="nav-link" href='/category/books'>Books</a>
                </li>

                {!loginStatus && <li className="nav-item dropdown">
                  <a style={{ color: '#e3dede' }} className="nav-link dropdown-toggle" href='/' role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Login
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href='/AdminLogin'>Admin</a></li>
                    <li><a className="dropdown-item" href='/SellerLogin'>Seller</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href='/CustomerLogin'>Customer</a></li>
                  </ul>
                </li>
                }

                {loginStatus && <li className="nav-item">
                  <a className="nav-link disabled" style={{ color: '#e3dede' }} aria-current="page" href='/'>Welcome {username}</a>
                </li>
                }

                {loginStatus && <li className="nav-item">
                  <a style={{ color: '#e3dede' }} onClick={logout} className="nav-link active" aria-current="page" href='/'>Logout</a>
                </li>
                }

                {/* <li className="nav-item dropdown">
                <a style={{color:'#e3dede'}}  className="nav-link dropdown-toggle" href='/' role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li style={{color:'#e3dede'}}  ><a className="dropdown-item" href='/'>Action</a></li>
                  <li><a className="dropdown-item" href='/'>Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li style={{color:'#e3dede'}}  ><a className="dropdown-item" href='/'>Something else here</a></li>
                </ul>
              </li> */}


              </ul>
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}

                />
                <button type="button" className="btn btn-outline-success"
                  onClick={Search}
                >Search</button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </>

  )
}

