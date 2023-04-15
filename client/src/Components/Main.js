import React from 'react'
import Item from './Item'
import Navbar from './Navbar'
import Axios from 'axios';
import { useState, useEffect } from 'react';

export default function Main() {
    const [productList, setProductList] = useState([]);

 

    const getProducts = () => {
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
        //putemployees();

    }, [])

    return (
        <div>
            <Navbar />
          
            <div className="container">

                <div className="row">
                    {productList.map((element) => {

                        return <div className="col-md-4" key={element.ID} style={{ display: 'flex', justifyContent: 'center' }} >
                            <Item name={element.Name} description={element.Price}
                                imglink={element.Image} id={element.ID}
                            />
                        </div>
                    })}

                </div>
            </div>


        </div>
    )
}
