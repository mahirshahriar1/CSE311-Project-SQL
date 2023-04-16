import React from 'react'
import Item from '../Components/Item'
import Navbar from '../Components/Navbar'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

export default function UserList() {
    const [userList, setuserList] = useState([]);

    const [userType, setuserType] = useState('');

    const [color1, setcolor1] = useState('');
    const [color2, setcolor2] = useState('');
    axios.defaults.withCredentials = true;
    function setUser1() {
        setuserType('Sellers');
        setcolor2('primary');
        setcolor1('success');
        getSellers();
    }
    function setUser2() {
        setuserType('Customers');
        setcolor1('primary');
        setcolor2('success');
        getCustomers();
    }



    const getSellers = (utype) => {
        // console.log(utype)
        axios.get('http://localhost:3001/importSellers', { utype: utype }).then((response) => {

            setuserList(response.data);

            //console.log(response.data)

        });
    };

    const getCustomers = (utype) => {
        console.log(utype)
        axios.get('http://localhost:3001/importCustomers', { utype: utype }).then((response) => {

            setuserList(response.data);

            //console.log(response.data)

        });
    };

    // useEffect(() => {
    //     getProducts();
    //     //putemployees();

    // }, [])

    return (
        <div>
            <Navbar />
            <div className="container" style={{marginLeft:'500px', marginTop:'25px'}}> 


                <div className="row" >
                    <div className="col md-4">
                        <Button className={`btn btn-${color1}`} onClick={setUser1}>Sellers</Button>
                    </div>
                    <div className="col md-4">
                        <Button className={`btn btn-${color2}`} onClick={setUser2}>Customers</Button>
                    </div>

                </div>
            </div>



            <div className="container">

                <div className="row">
                    {userList.map((element) => {

                        return <div className="col-md-4" key={element.ID} style={{ display: 'flex', justifyContent: 'center' }} >
                            <Item name={element.Name} description={element.Phone}
                                imglink={element.Image} id={element.ID} admin={true} product={false} user={true}
                                Type={element.Type}
                            />
                        </div>
                    })}

                </div>

            </div>
        </div>



    )
}
