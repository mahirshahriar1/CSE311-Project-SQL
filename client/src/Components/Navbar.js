import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';


export default function Navbar() {

  const [loginStatus, setLoginStatus] = useState(false);
  const [username, setUsername] = useState("");
  Axios.defaults.withCredentials = true;

  useEffect(() => {

    Axios.get('http://localhost:3001/login').then((response) => {
     // console.log(response.data.loggedIn);
      if (response.data.loggedIn === true) {
        setLoginStatus(true);
        setUsername(response.data.user[0].username);
      }
    });

  }, []);
  const logout = () => {
    Axios.get('http://localhost:3001/logout').then((response) => {
      alert(response.data);
    });

    localStorage.removeItem("token");


  };


  return (

    <>
    <div className="container">

   
      <nav style={{marginLeft:'50px'}} className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand "  href='/'>  Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href='/'>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href='/'>Link</a>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href='/' role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href='/'>Action</a></li>
                  <li><a className="dropdown-item" href='/'>Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href='/'>Something else here</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href='/'>Disabled</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href='/imgup'>imgup</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href='/imgdown'>imgdown</a>
              </li>

              {!loginStatus && <li className="nav-item">
                <a className="nav-link active" aria-current="page" href='/Login'>Login</a>
              </li>
              }
              
              {loginStatus && <li className="nav-item">
                <a className="nav-link disabled" style={{color:'black'}}  aria-current="page" href='/'>Welcome {username}</a>
              </li>
              }

              {loginStatus && <li className="nav-item">
                <a onClick={logout} className="nav-link active" aria-current="page" href='/'>Logout</a>
              </li>
              }


            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
      </div>
    </>

  )
}

