import React from 'react'
import Navbar from '../Components/Navbar'
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';


export default function Orders() {


    const [admin, setAdmin] = useState(false);

    Axios.defaults.withCredentials = true;

    const [orders, setOrders] = useState([]);
   

    const importOrders = (status) => {
        //admin route
        Axios.post('http://localhost:3001/importOrders', { status: status }).then((response) => {
           // console.log(response.data);
            setOrders(response.data);
            //console.log(response.data);
        }
        );

    };



    useEffect(() => {
        //logreg route
        Axios.get('http://localhost:3001/login').then((response) => {
            if (response.data.type === 'Admin') {
                setAdmin(true);
            }
        }
        )

        importOrders('Pending');

    }, [admin])



    return (
        admin && <div id='particles'>
            <Navbar />

            <div className="container bg-dark" >
                <div className='row' style={{ marginLeft: "200px", marginTop: '20px', marginBottom: '20px' }} >
                    <div className="col-4">
                        <Button className='btn btn-primary'
                            onClick={() =>
                                importOrders('Pending')
                            }
                        >Pending</Button>
                    </div>
                    <div className="col-4">
                        <Button className='btn btn-success'  onClick={() =>
                            importOrders('Confirmed')
                        } >Confirmed</Button>
                    </div>
                    <div className="col-4">
                        <Button className='btn btn-danger' onClick={() =>
                            importOrders('Cancelled')
                        } >Cancelled</Button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <table className="table table-image" style={{color:'rgb(227, 222, 222)'}}>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Date of Order</th>
                                    <th scope="col">Date of Process</th>
                                    <th scope="col">Total Price</th>
                                    <th scope="col">Order Status</th>
                                    <th scope="col">Customer Name</th>
                                    <th scope="col">Customer Phone</th>
                                    <th scope="col">Customer Region</th>
                                    <th scope="col">Customer Address</th>
                                    <th scope="col">Check Order</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>
                                            {item.DateOfOrder.trim().split('T')[0]}
                                        </td>
                                        <td >
                                            {item.DateOfProcess.trim().split('T')[0]? item.DateOfProcess.trim().split('T')[0] : 'Not Processed'}
                                        </td>
                                        <td>
                                            {item.TotalAmount}
                                        </td>                                       
                                        <td style={{
                                            color: item.OrderStatus === 'Pending' ? 'black' : item.OrderStatus === 'Confirmed' ?
                                                'green' : 'red'
                                        }}>
                                            {item.OrderStatus}
                                        </td>
                                        <td>
                                            {item.Name}
                                        </td>
                                        <td>
                                            {item.Phone}
                                        </td>
                                        <td>
                                            {item.Region}
                                        </td>
                                        <td>
                                            {item.Address}
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

