import React from 'react'
import Navbar from '../Components/Navbar'
import Axios from 'axios';
import { useState, useEffect } from 'react';


export default function Orders() {


    const [customerID, setCustomerID] = useState(0);
    const [customer, setCustomer] = useState(false);

    Axios.defaults.withCredentials = true;

    const [orders, setOrders] = useState([]);


    useEffect(() => {

        Axios.get('http://localhost:3001/login').then((response) => {
            if (response.data.type === 'Customer') {
                setCustomerID(response.data.user[0].ID);
                setCustomer(true);
            }
        }
        )

        const getOrders = () => {

            Axios.post('http://localhost:3001/getOrders', { CustomerID: customerID }).then((response) => {
                console.log(response.data);
                setOrders(response.data);
            }
            );
        };

        getOrders();

    }, [customerID])



    return (
        customer && <div id='particles'>
            <Navbar />
            <div className="container " style={{marginTop:'20px',}}>
                <div className="row">
                    <div className="col-12">
                        <table className="table table-striped table-dark " style={{color:'rgb(227, 222, 222)'}}>
                            <thead thead-dark>
                                <tr>
                                    <th scope="col"   >#</th>
                                    <th scope="col"   >Date of Order</th>
                                    <th scope="col"   >Total Price</th>
                                    <th scope="col"   >Order Status</th>
                                    <th scope="col"   >Check Order</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>
                                            {item.DateOfOrder.trim().split('T')[0]}
                                        </td>
                                        <td>
                                            {item.TotalAmount}
                                        </td>
                                        <td style={{
                                            color: item.OrderStatus === 'Pending' ? 'yellow' : item.OrderStatus === 'Confirmed' ?
                                                '#35f135' : 'red'
                                        }}>
                                            {item.OrderStatus}
                                        </td>
                                        <td>                                            
                                            <a href={`/checkOrder/${item.CartID}`} className="btn btn-primary">Check Order</a>
                                        </td>

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

