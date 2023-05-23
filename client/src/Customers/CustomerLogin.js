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
        //regex to check phone number

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


        const res = await axios.post('http://localhost:3001/customerRegister',
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

        axios.post('http://localhost:3001/customerLogin', {
            username: username,
            password: password
        }).then((response) => {
            //console.log(response);
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


    ///////////////////////////get customer data///////////////////////////
    ///////////////////////////not yet utilized this function///////////////////////////
    const getCustomerData = () => {

        if (bool === false) {

            axios.post('http://localhost:3001/getCustomerData',
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
                            <input type="text" onChange={(e) => setUsernameReg(e.target.value)} />
                            <label > Password </label>
                            <input type="text" onChange={(e) => setPasswordReg(e.target.value)} />
                            <label > Name </label>
                            <input type="text" onChange={(e) => setNameReg(e.target.value)} />
                            <label > Phone </label>
                            <input type="text" onChange={(e) => setPhoneReg(e.target.value)} />
                            <label > Image </label>
                            <Form>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Select your image</Form.Label>
                                    <Form.Control type="file" name='photo' onChange={setimgfile} />
                                </Form.Group>
                            </Form>


                            <button id="sp" onClick={register} >Register</button>
                        </div>
                    </div>



                    <div className="col-md-6">
                        <div className="login">
                            <h1>Login</h1>

                            <label> Username </label>
                            <input type="text" placeholder="Username..."
                                onChange={(e) => setUsername(e.target.value)} />

                            <label > Password </label>
                            <div className="password-container">
                                <input type="password" placeholder="Password" id="password-input" onChange={(e) => setPassword(e.target.value)} />
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

                            <button id="sp" onClick={login} >Login</button>
                            <h1 style={{ marginTop: '15px', color: 'black' }}>{message}</h1>

                            {/* {loginStatus &&  */}
                            {mittha &&
                                <div>
                                    {getCustomerData()}
                                    {/* <img src={`http://localhost:3001/uploads/${imagepath}`} alt="" /> */}
                                    <button id="sp" style={{ background: '#4c99af' }} onClick={userAuthenticated}> Check if Authenticated</button>
                                    <br />
                                    {/* <button  id="sp" style={{ background: '#4c99af' }} onClick={goto}  >Check Role </button><br /> */}
                                    <button id="sp" style={{ background: '#bd1d1d' }} onClick={logout}>Logout</button>


                                </div>
                            }

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
