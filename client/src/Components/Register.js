import '../App.css';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
// eslint-disable-next-line
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';


export default function Registration(props) {

    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState(false);
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("red");

    // eslint-disable-next-line
    const [redirect, setRedirect] = useState("false");
    Axios.defaults.withCredentials = true;

    const register = () => {
        Axios.post('http://localhost:3001/register', {
            username: usernameReg,
            password: passwordReg
        }).then((response) => {
            alert(response.data.message);
        });
    };

    const login = () => {

        Axios.post('http://localhost:3001/login', {
            username: username,
            password: password
        }).then((response) => {
            // console.log(response);
            if (!response.data.auth) {
                setMessage(response.data.message);
                setLoginStatus(false);
                setColor("red");
            } else {
                //console.log(response.data);
                setMessage(response.data.result[0].username + " is logged in");

                localStorage.setItem("token", response.data.token);
                setLoginStatus(true);
                setColor("green");
                setTimeout(() => {
                    setRedirect("true");
                }, 2000);
                window.location.reload(false);

            }
        });
    };

    const userAuthenticated = () => {
        Axios.get('http://localhost:3001/isUserAuth', {
            headers: {
                "x-access-token": localStorage.getItem("token")
            },

        }).then((response) => {
            // console.log(response);
            alert(response.data);
        });

    };


    useEffect(() => {

        Axios.get('http://localhost:3001/login').then((response) => {
            if (response.data.loggedIn === true) {
                setLoginStatus(true);
                setMessage(response.data.user[0].username + " is logged in");
                setColor("green");
                setTimeout(() => {
                    setRedirect("true");
                }, 2000);
            }
        });
      
    }, []);


    const logout = () => {
        Axios.get('http://localhost:3001/logout').then((response) => {
            alert(response.data);
        });
        
        localStorage.removeItem("token");
        
        setLoginStatus(false);
        setMessage("Logged out");
    };

    // const goto = () => {
      
    //     window.location.href='/Main';
  
    // }


    return (
        // (redirect === "true" && (
        //     <Navigate to="/Main" />
        // )) ||
       
        <div className="App">
             <Navbar/>
            <div className="registration">
                <h1>Registration</h1>
                <label> Username </label>
                <input type="text" onChange={(e) => setUsernameReg(e.target.value)} />
                <label > Password </label>
                <input type="text" onChange={(e) => setPasswordReg(e.target.value)} />
                <button id="sp" onClick={register} >Register</button>
            </div>


            <div className="login">
                <h1>Login</h1>

                <label> Username </label>
                <input type="text" placeholder="Username..."
                    onChange={(e) => setUsername(e.target.value)} />

                <label > Password </label>
                <input type="text" placeholder="Password..."
                    onChange={(e) => setPassword(e.target.value)} />

                <button id="sp" onClick={login} >Login</button>
            </div>


            {loginStatus && (
                <div>  
                    <button id="sp" style={{ background: '#4c99af' }}onClick={userAuthenticated}> Check if Authenticated</button>
                    <br />
                    {/* <button  id="sp" style={{ background: '#4c99af' }} onClick={goto}  >
                        Check Role </button>
                    <br /> */}
                    <button id="sp" style={{ background: '#bd1d1d' }} onClick={logout}>Logout</button>
                    

                </div>
               


            )}
            {/* {
                redirect === "true" && <Navigate to="/Main" />
            } */}


            <h1 style={{ color }}>{message}</h1>


        </div>


    )
}
