import React from 'react'
import Item from './Item'
import Navbar from './Navbar'
import Axios from 'axios';
import { useState, useEffect } from 'react';

export default function Main() {
    const [productList, setProductList] = useState([]);
    const [seller, setSeller] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [customer, setCustomer] = useState(false);
    const [customerID, setCustomerID] = useState(0);
    const [cartID, setCartID] = useState(0);

    const getProducts = () => {
        //home route
        Axios.get('http://localhost:3001/importProducts').then((response) => {
            //console.log(response.data);
            // console.log("Successlly got");
            // response.data.map((element) => {
            //     console.log(element.name);
            // })

            setProductList(response.data);
            //console.log(response.data);

        });
    };

    useEffect(() => {
        getProducts();

        Axios.get('http://localhost:3001/login').then((response) => {
            //console.log(response.data.user[0].ID)
            if (response.data.type === 'Seller') {
                //console.log("Seller");
                setSeller(true);
            } else if (response.data.type === 'Customer') {
                setCustomerID(response.data.user[0].ID)
                setCustomer(true);
               
                Axios.get('http://localhost:3001/getCartID', { params: { id: response.data.user[0].ID } }).then((response) => {
                   // console.log(response.data);
                   setCartID(response.data[0].ID);
                })


                // console.log("Customer");
            } else if (response.data.type === 'Admin') {
                setAdmin(true);
                // console.log("Admin");
            }

        }
        )

    }, [])

    return (
        <div>
            <Navbar />

            <div className="container">

                <div className="row">
                    {productList.map((element) => {

                        return <div className="col-md-4" key={element.ID} style={{ display: 'flex', justifyContent: 'center' }} >
                            <Item name={element.Name} description={element.Price}
                                imglink={element.Image} id={element.ID} product={true} admin={admin} customer={customer} seller={seller} customerID={customerID}
                                cartID={cartID} prodQuantity={element.Quantity}
                            />
                        </div>
                    })}

                </div>
            </div>
            <button className='cart-button fa-solid fa-cart-shopping'
               onClick={() => {
                    window.location.href = '/cart';
               }
                }
            
            > </button>


        </div>
    )
}
