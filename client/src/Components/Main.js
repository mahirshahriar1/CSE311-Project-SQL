import React from 'react'
import Item from './Item'
import Navbar from './Navbar'
import Axios from 'axios';
import { useState, useEffect } from 'react';

export default function Main() {
    const [productList, setProductList] = useState([]);

 

    const getEmployees = () => {
        Axios.get('http://localhost:3001/products').then((response) => {
            //console.log(response.data);
            // console.log("Successlly got");
            // response.data.map((element) => {
            //     console.log(element.name);
            // })

            setProductList(response.data);
          
        });
    };
    // eslint-disable-next-line
    const putemployees = ()=>{
        Axios.post('http://localhost:3001/add', {
            name: "test",
            description: "test",
            imglink: "test",
            price: 100,
            quantity: 100
        }).then(() => {
            console.log("success");
        });

    }
    useEffect(() => {
        getEmployees();
        //putemployees();

    }, [])

    return (
        <div>
            <Navbar />
          
            <div className="container">

                <div className="row">
                    {productList.map((element) => {

                        return <div className="col-md-4" key={element.id} style={{ display: 'flex', justifyContent: 'center' }} >
                            <Item name={element.name} description={element.description}
                                imglink={element.imglink} id={element.id}
                            />
                        </div>
                    })}

                </div>
            </div>


        </div>
    )
}
