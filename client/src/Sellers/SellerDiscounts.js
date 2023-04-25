import React from 'react'
import Navbar from '../Components/Navbar'
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';


export default function Orders() {


    const [seller, setSeller] = useState(false);
    const [sellerID, setSellerID] = useState();

    Axios.defaults.withCredentials = true;

    const [discounts, setDiscounts] = useState([]);


    const importDiscounts = () => {

        Axios.post('http://localhost:3001/getDiscounts', { SellerID: sellerID }).then((response) => {
            if (response.data.length > 0) {
                setDiscounts(response.data);
            }
            else {
                setDiscounts([]);
            }
        })
    }
    // console.log(sellerID)
    // console.log(discounts);



    useEffect(() => {

        Axios.get('http://localhost:3001/login').then((response) => {
            if (response.data.type === 'Seller') {
                setSeller(true);
                setSellerID(response.data.user[0].ID);
            }
        }
        )
        if (seller) {
            importDiscounts();
        }

        // eslint-disable-next-line
    }, [seller, sellerID])



    return (
        <div>
            <Navbar />


            <div className='container' style={{marginLeft:'300px'}}>


                <div className="row">
                    <div className="col-12">
                        <table className="table table-image">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Percentage</th>
                                    <th scope="col">Expiration Date</th>
                                    <th scope="col">Product ID</th>
                                    <th scope="col">Check Product</th> 
                                    <th scope="col">Delete Discount</th>                                  
                                </tr>
                            </thead>
                            <tbody>
                                {discounts.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.Percentage}</td>
                                    <td>{item.ExpirationDate}</td>
                                    <td>{item.ProductID}</td>
                                    <td><Button variant="primary" href={`/itemInfo/${item.ProductID}`}>Check Product</Button></td>
                                    <td><Button variant="danger" onClick={() => {
                                        console.log(item.ID);
                                        Axios.post('http://localhost:3001/deleteDiscount', { DiscountID: item.ID }).then((response) => {
                                            if (response.data.status === 201) {
                                                importDiscounts();
                                            }
                                        })
                                    }}>Delete Discount</Button></td>

                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>

    )
}

