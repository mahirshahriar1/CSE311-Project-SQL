import React from 'react'
import Item from '../Components/Item'
import Navbar from '../Components/Navbar'
import Axios from 'axios';
import { useState, useEffect } from 'react';

export default function Main() {
    const [productList, setProductList] = useState([]);
    const [ID, setID] = useState('');




    useEffect(() => {
        Axios.get('http://localhost:3001/sellerlogin').then((response) => {
            // console.log(response.data.loggedIn);
            if (response.data.loggedIn === true && response.data.user[0].Type === 'Seller') {
                setID(response.data.user[0].ID);
            }
        });        
        const getYourShop = () => {

            // console.log(ID);
            Axios.post('http://localhost:3001/importshop',
                { ID: ID }).then((response) => {
                   setProductList(response.data);
                }
                );
        };

        getYourShop();

    }, [ID])

    return (
        <div>
            <Navbar />

            <div className="container">

                <div className="row">
                    {productList.map((element) => {

                        return <div className="col-md-4" key={element.ID} style={{ display: 'flex', justifyContent: 'center' }} >
                            <Item name={element.Name} description={element.Price}
                                imglink={element.Image} id={element.ID} auth={true}
                            />
                        </div>
                    })}

                </div>
            </div>


        </div>
    )
}
