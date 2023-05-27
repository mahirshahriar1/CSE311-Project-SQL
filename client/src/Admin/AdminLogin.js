import '../App.css';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Navbar from '../Components/Navbar';


export default function Registration(props) {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState(false);
    const [message, setMessage] = useState("");

    Axios.defaults.withCredentials = true;

    const login = () => {
        if (password === "") {
            alert("Please enter password");
            return;
        }
        if (username === "") {
            alert("Please enter username");
            return;
        }
        //logreg route
        Axios.post('http://localhost:3001/adminlogin', {
            username: username,
            password: password
        }).then((response) => {
            // console.log(response);
            if (!response.data.auth) {
                setMessage(response.data.message);
                setLoginStatus(false);
            } else {
                //console.log(response.data);
                setMessage(response.data.result[0].Username + " is logged in");

                localStorage.setItem("token", response.data.token);
                setLoginStatus(true);

                window.location.reload(false);

            }
        });
    };

    // const userAuthenticated = () => {
    //     Axios.get('http://localhost:3001/isUserAuth', {
    //         headers: {
    //             "x-access-token": localStorage.getItem("token")
    //         },

    //     }).then((response) => {
    //         // console.log(response);
    //         alert(response.data);
    //     });

    // };

    useEffect(() => {
        //logreg route
        Axios.get('http://localhost:3001/login').then((response) => {
            if (response.data.loggedIn === true) {
                setLoginStatus(true);
                setMessage(response.data.user[0].Username + " is logged in");
            }
        });

    }, []);


    const logout = () => {
        //logreg route
        Axios.get('http://localhost:3001/logout').then((response) => {
            alert(response.data);
        });

        localStorage.removeItem("token");
        window.location.reload(false);

        setLoginStatus(false);
        setMessage("Logged out");
    };

    const keyPress = (e) => {
        if (e.keyCode === 13) {
            login();
        }
    }
    const mittha = false;

    return (

        <div>

            <Navbar />
            <div style={{ marginTop: '20px' }}></div>
            <div className="container" id='spec2'>

                <div className="containery login " id='spec2'>
                    <h1>Login</h1>

                    <label> Username </label>
                    <input type="text" placeholder="Username..."
                        onChange={(e) => setUsername(e.target.value)} onKeyDown={keyPress} />

                    <label > Password </label>
                    <div className="password-container">
                        <input type="password" placeholder="Password" id="password-input" onChange={(e) => setPassword(e.target.value)} onKeyDown={keyPress}
                        />
                        <i className="toggle-password fas fa-eye" onClick={
                            () => {
                                console.log("clicked");
                                var x = document.getElementById("password-input");
                                if (x.type === "password") {
                                    x.type = "text";
                                } else {
                                    x.type = "password";
                                }
                            }
                        }></i>
                    </div>
                    <div className="containerb" style={{ marginTop: '30px' }}>
                        <div className="btn"><a href="# " onClick={login}>Login</a></div>
                    </div>


                    <h1 style={{ color: 'black' }}>{message}</h1>

                    {mittha && loginStatus && (
                        <div style={{ marginBottom: '20px' }} >
                            {/* <button id="sp" style={{ background: '#4c99af' }} onClick={userAuthenticated}> Check if Authenticated</button> */}
                            <br />
                            <button id="sp" style={{ background: '#bd1d1d' }} onClick={logout}>Logout</button>
                        </div>

                    )}

                </div>

            </div>
        </div >

    )
}
