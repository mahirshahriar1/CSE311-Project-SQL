import React from 'react'
import Item from '../Components/Item'
import Navbar from '../Components/Navbar'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Axios from 'axios';


export default function UserList() {
   
    const [userList, setuserList] = useState([]);
    // eslint-disable-next-line 
    const [userType, setuserType] = useState('');

    const [color1, setcolor1] = useState('');
    const [color2, setcolor2] = useState('');
    const [auth, setauth] = useState(false);
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
        //admin route
        axios.get('http://localhost:3001/importSellers', { utype: utype }).then((response) => {

            setuserList(response.data);

            //console.log(response.data)

        });
    };

    const getCustomers = (utype) => {
        //console.log(utype)
             //admin route
        axios.get('http://localhost:3001/importCustomers', { utype: utype }).then((response) => {

            setuserList(response.data);

            //console.log(response.data)

        });
    };

    useEffect(() => {
        //logreg route
        Axios.get('http://localhost:3001/login').then((response) => {
           //console.log(response.data);
            if (response.data.loggedIn === true && response.data.user[0].Type === 'Admin') {
                setauth(true);
            }
        }
        );

    }, [])

    return (
        
        auth && <div>
           
            <Navbar />
            <div className="container" > 


                <div className="row" style={{marginLeft:'300px', marginTop:'25px'}}>
                    <div className="col md-4" > 
                        <Button  className={`btn btn-${color1}`} onClick={setUser1}>Sellers</Button>
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
