import React from 'react'
import Navbar from '../Components/Navbar'
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

export default function Cart() {
    //const CartID = window.location.href.split('/').reverse()[0]
    // console.log(CartID);

    const [customer, setCustomer] = useState(false);
    const [cartProducts, setCartProducts] = useState([]);

    Axios.defaults.withCredentials = true;



    const removeFromCart = (ProductID, TotalQuantity, Price) => {
        console.log(Price);
        //  console.log(ProductID);
        Axios.post('http://localhost:3001/removeFromCart', {
            CartID: CartID, ProductID: ProductID, TotalQuantity: TotalQuantity, Price: Price

        }).then((response) => {
            //console.log(response.data);
            //filter
            setCartProducts(cartProducts.filter((val) => {
                return val.ProductID !== ProductID;
            }))
        }
        );
    }
    // eslint-disable-next-line
    const [customerID, setCustomerID] = useState(0);
    const [CartID, setCartID] = useState(0);




    useEffect(() => {
        const getCartProducts = () => {
            Axios.post('http://localhost:3001/getCartProducts', { CartID: CartID }).then((response) => {
                //console.log(response.data);
                setCartProducts(response.data);
                // console.log(response.data);
            }
            );
        };

        getCartProducts();

        Axios.get('http://localhost:3001/login').then((response) => {
            //console.log(response.data.user[0].ID)
            if (response.data.type === 'Customer') {
                //console.log("Seller");
                setCustomer(true);
                Axios.get('http://localhost:3001/getCartID', { params: { id: response.data.user[0].ID } }).then((response) => {
                    // console.log(response.data);
                    setCartID(response.data[0].ID);
                })

            }
        }
        )

    }, [customer, CartID])

    function check(TotalPrice, Price, TotalQuantity) {

        if (parseFloat(TotalPrice) === parseFloat(Price * TotalQuantity)) {
            return 0;
        }

        if (TotalPrice !== Price * TotalQuantity) {

            let discount = TotalPrice - (Price * TotalQuantity);
            let percentage = (discount / TotalPrice) * 100;
            //absolute value
            if (percentage < 0) {
                percentage = percentage * -1;
            }
            return percentage.toFixed(0);
        }

    }


    return (
        customer && <div id='particles'>
            <Navbar />
            <div className="container" style={{ marginTop: '20px' }} >
                <div className="row">
                    <div className="col-12">
                        <table className="table table-striped table-dark" style={{ color: 'rgb(227, 222, 222)' }}>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Discount</th>
                                    <th scope="col">Total Price</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartProducts.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td className="w-25">
                                            <img
                                                style={{ height: '100px' }}
                                                src={`http://localhost:3001/uploads/${item.Image}`} className="img-fluid img-thumbnail" alt={item.Name} />
                                        </td>
                                        <td>{item.Name}</td>
                                        <td>{item.Price}</td>
                                        <td>{item.TotalQuantity}</td>
                                        <td>{check(item.TotalPrice, item.Price, item.TotalQuantity) === 0 ? 'No Discount' :
                                            check(item.TotalPrice, item.Price, item.TotalQuantity) + '%'}</td>
                                        <td>{item.TotalPrice}</td>
                                        <td><Button className='btn btn-danger' onClick={() => removeFromCart(item.ProductID, item.TotalQuantity, item.Price)} >Remove</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {cartProducts.length !== 0 &&
                    <div style={{ paddingBottom: '100px', paddingTop: '30px' }}>
                        <button style={{ marginLeft: '560px', height: '50px', '--clr': 'lightgreen' }} className='btnn'
                            onClick={() => {
                                //send cartid to checkout
                                window.location.href = `/checkout/${CartID}`

                            }
                            }
                        > <i>                 
                                Confirm Your Order                            
                            </i>
                        </button>
                    </div>
                }



            </div>
        </div>
    )
}

