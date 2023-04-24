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
    console.log(sellerID)
    console.log(discounts);



    useEffect(() => {

        Axios.get('http://localhost:3001/login').then((response) => {
            if (response.data.type === 'Seller') {                
                setSeller(true);
                setSellerID(response.data.user[0].ID);
            }
        }
        )
        if(seller){
            importDiscounts();
        }


    }, [seller, sellerID])



    return (
        <div>
          {/*   <Navbar />

            <div className="container" style={{ marginLeft: "270px" }}>
                <div className='row' style={{ marginLeft: "200px", marginTop: '20px', marginBottom: '20px' }} >
                    <div className="col-4">
                        <Button className='btn btn-primary'
                            onClick={() =>
                                importOrders('Pending')
                            }
                        >Pending</Button>
                    </div>
                    <div className="col-4">
                        <Button className='btn btn-success' onClick={() =>
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
                        <table className="table table-image">
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
                                            {item.DateOfProcess.trim().split('T')[0] ? item.DateOfProcess.trim().split('T')[0] : 'Not Processed'}
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

            </div> */}
        </div>
    )
}

