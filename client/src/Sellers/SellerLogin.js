import '../App.css';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line
import { Navigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Registration(props) {

    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [nameReg, setNameReg] = useState("");
    const [phonereg, setPhoneReg] = useState("");

    const [usernamelogin, setUsernameLogin] = useState("");


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // eslint-disable-next-line
    const [loginStatus, setLoginStatus] = useState(false);
    const [message, setMessage] = useState("");
    const [imgfile, setImgfile] = useState("");
    const setimgfile = (e) => {
        // console.log(e.target.files[0])
        setImgfile(e.target.files[0]);
    }

    // eslint-disable-next-line
    const [redirect, setRedirect] = useState("false");
    axios.defaults.withCredentials = true;
    // eslint-disable-next-line
    const history = useNavigate();


    const register = async (e) => {
        if (nameReg === "" || usernameReg === "" || passwordReg === "" || phonereg === "") {
            alert("Please fill all the fields");
            return;
        }
        if (imgfile === "") {
            alert("Please upload an image");
            return;
        }

        //regex for number
        const phoneRegex = /^[0-9]{11}$/;
        if (!phoneRegex.test(phonereg)) {
            alert("Invalid phone number");
            return;
        }



        e.preventDefault();


        var formData = new FormData();
        formData.append("photo", imgfile);
        formData.append("fname", nameReg);
        formData.append("username", usernameReg);
        formData.append("password", passwordReg);
        formData.append("phone", phonereg);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }


        const res = await axios.post('http://localhost:3001/sellerRegister',
            formData, config);
        console.log(res);
        if (res.data.message) {

            alert(res.data.message);
        }
        if (res.data.ok) {
            window.location.reload(false);
        }


    };

    const login = () => {
        
        if (username === "" || password === "") {
            alert("Please enter password");
            return;
        }

        axios.post('http://localhost:3001/sellerLogin', {
            username: username,
            password: password
        }).then((response) => {
            // console.log(response);
            if (!response.data.auth) {
                setMessage(response.data.message);
                setLoginStatus(false);
            } else {
                //console.log(response.data);
                setMessage(response.data.result[0].Name + " is logged in");
                setUsernameLogin(response.data.result[0].Username);

                localStorage.setItem("token", response.data.token);
                setLoginStatus(true);
                setTimeout(() => {
                    setRedirect("true");
                }, 2000);
                window.location.reload(false);

            }
        });
    };

    const userAuthenticated = () => {
        axios.get('http://localhost:3001/isUserAuth', {
            headers: {
                "x-access-token": localStorage.getItem("token")
            },

        }).then((response) => {
            console.log(response);
            alert(response.data);
        });

    };
    const [bool, setBool] = useState(false);
    // eslint-disable-next-line
    const [imagepath, setimagepath] = useState("");

    const getSellerData = () => {

        if (bool === false) {

            axios.post('http://localhost:3001/getSellerData',
                {
                    username: usernamelogin
                }
            ).then((response) => {

                setimagepath(response.data[0].Image);

            })
            setBool(true);
        }

    }


    useEffect(() => {

        axios.get('http://localhost:3001/login').then((response) => {
            if (response.data.loggedIn === true) {
                setLoginStatus(true);
                setMessage(response.data.user[0].Name + " is logged in");
                setUsernameLogin(response.data.user[0].Username);
                setTimeout(() => {
                    setRedirect("true");
                }, 2000);
            }
        });

    }, []);


    const logout = () => {
        axios.get('http://localhost:3001/logout').then((response) => {
            alert(response.data);
        });

        localStorage.removeItem("token");

        setLoginStatus(false);
        setMessage("Logged out");
    };

    // const goto = () => {

    //     window.location.href='/Main';

    // }
    const mittha = false;
    const keyPress1 = (e) => {
        if (e.keyCode === 13) {
            register();
        }
    }
    const keyPress2 = (e) => {

        if (e.keyCode === 13) {
            login();
        }
    }

    return (
        // (redirect === "true" && (
        //     <Navigate to="/Main" />
        // )) ||

        //flex box

        <>
            <Navbar />

            <div className="container" id='spec' >

                <div className="row containerx">
                    <div className="col-md-6">
                        <div className="registration">
                            <h1>Registration</h1>
                            <label> Username </label>
                            <input type="text" onChange={(e) => setUsernameReg(e.target.value)} onKeyDown={keyPress1} />
                            <label > Password </label>
                            <input type="text" onChange={(e) => setPasswordReg(e.target.value)} onKeyDown={keyPress1} />
                            <label > Name </label>
                            <input type="text" onChange={(e) => setNameReg(e.target.value)} onKeyDown={keyPress1} />
                            <label > Phone </label>
                            <input type="text" onChange={(e) => setPhoneReg(e.target.value)} onKeyDown={keyPress1} />
                            <label > Image </label>
                            <Form>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Select your image</Form.Label>
                                    <Form.Control type="file" name='photo' onChange={setimgfile} />
                                </Form.Group>
                            </Form>

                            <div className="containerb" style={{ marginTop: '30px' }}>
                                <div className="btn"><a href="# " onClick={register}>Register</a></div>
                            </div>
                        </div>
                    </div>



                    <div className="col-md-6">
                        <div className="login">
                            <h1>Login</h1>

                            <label> Username </label>
                            <input type="text" placeholder="Username..."
                                onChange={(e) => setUsername(e.target.value)} onKeyDown={keyPress2} />

                            <label > Password </label>
                            <div className="password-container">
                                <input type="password" placeholder="Password" id="password-input" onChange={(e) => setPassword(e.target.value)} onKeyDown={keyPress2} />
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
                            {mittha && (
                                <div>
                                    {getSellerData()}
                                    {/* <img src={`http://localhost:3001/uploads/${imagepath}`} alt="" /> */}
                                    <button id="sp" style={{ background: '#4c99af' }} onClick={userAuthenticated}> Check if Authenticated</button>
                                    <br />
                                    {/* <button  id="sp" style={{ background: '#4c99af' }} onClick={goto}  >Check Role </button><br /> */}
                                    <button id="sp" style={{ background: '#bd1d1d' }} onClick={logout}>Logout</button>
                                </div>

                            )}
                        </div>

                    </div>
                </div>





                {/* {
                redirect === "true" && <Navigate to="/Main" />
            } */}





            </div>


        </>
    )
}
