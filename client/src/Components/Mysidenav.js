import React from 'react'
//eslint-disable-next-line
import Sidenav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';



export default function Mysidenav() {
    const navigate = useNavigate();


    const [sellerStatus, setsellerStatus] = useState(false);
    const [adminStatus, setadminStatus] = useState(false);
    const [customerStatus, setcustomerStatus] = useState(false);
    //eslint-disable-next-line
    const [username, setUsername] = useState("");
    Axios.defaults.withCredentials = true;

    useEffect(() => {

        //logerg route
        Axios.get('http://localhost:3001/login').then((response) => {
            // console.log(response.data.loggedIn);
            if (response.data.loggedIn === true && response.data.user[0].Type === 'Seller') {
                setsellerStatus(true);
                setUsername(response.data.user[0].Username);

            } else if (response.data.loggedIn === true && response.data.user[0].Type === 'Admin') {
                setadminStatus(true);
                setUsername(response.data.user[0].Username);
            }else if (response.data.loggedIn === true && response.data.user[0].Type === 'Customer') {
                setcustomerStatus(true);
                setUsername(response.data.user[0].Username);
            }
        });

    }, []);

    return (
        <div  >

            <Sidenav style={{ background: '#2c3e50', position: 'fixed' }}
                onSelect={(selected) => {
                    // console.log(selected);
                    if (selected !== '')
                        navigate('/' + selected);
                    else navigate('/');
                }}
            >
                <Sidenav.Toggle />
                <Sidenav.Nav defaultSelected="home">
                    <NavItem eventKey=''   >
                        <NavIcon> <i className='fa fa-fw fa-home' style={{ fontsize: "1.5em" }}></i> </NavIcon>
                        <NavText>
                            Home  
                        </NavText>
                    </NavItem>
                    {sellerStatus && <NavItem eventKey='yourshop'>
                        <NavIcon> <i className='fa fa-fw  fa-shop' style={{ fontsize: "1.5em" }}></i> </NavIcon>
                        <NavText>
                            Check your Products
                        </NavText>
                    </NavItem>
                    }
                    {sellerStatus && <NavItem eventKey='menus' >
                        <NavIcon><i className='fa fa-fw fa-bars' style={{ fontsize: "1.5em" }}></i> </NavIcon>
                        <NavText style={{ background: 'black' }} >
                            Upload Product

                        </NavText>
                        <NavItem eventKey='addBooks'>
                            <NavText >
                                Books
                            </NavText>
                        </NavItem>
                        <NavItem eventKey='addElectronics'>
                            <NavText>
                                Electronics
                            </NavText>
                        </NavItem>
                        <NavItem eventKey='addCosmetics'>
                            <NavText>
                                Cosmetics
                            </NavText>
                        </NavItem>
                        <NavItem eventKey='addClothes'>
                            <NavText>
                                Clothes
                            </NavText>
                        </NavItem>

                    </NavItem>
                    }
                    {
                        adminStatus && <NavItem eventKey='userList'>
                            <NavIcon> <i className='fa fa-fw  fa-shop' style={{ fontsize: "1.5em" }}></i> </NavIcon>
                            <NavText>
                                Check Users
                            </NavText>
                        </NavItem>
                    }
                    {
                        adminStatus && <NavItem eventKey='orderList'>
                            <NavIcon> <i className='fa fa-fw  fa-bag-shopping' style={{ fontsize: "1.5em" }}></i> </NavIcon>
                            <NavText>
                                Check Orders
                            </NavText>
                        </NavItem>
                    }


                    {
                        customerStatus   && <NavItem eventKey='cart'>
                            <NavIcon> <i className='fa fa-fw  fa-cart-shopping' style={{ fontsize: "1.5em" }}></i> </NavIcon>
                            <NavText>
                                Cart
                            </NavText>
                        </NavItem>

                    } 
                    {
                        customerStatus   && <NavItem eventKey='Orders'>
                            <NavIcon> <i className='fa fa-fw  fa-bag-shopping' style={{ fontsize: "1.5em" }}></i> </NavIcon>
                            <NavText>
                                Orders
                            </NavText>
                        </NavItem>

                    }
                    


                </Sidenav.Nav>

            </Sidenav>
        </div>
    )
}

