import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';

export default function Checkout() {
    const cartID = window.location.href.split('/').reverse()[0]
    // console.log(cartID);

    const [customerID, setCustomerID] = useState(0);
    const [checkCart, setcheckCart] = useState(cartID);

    const [selectedRegion, setSelectedRegion] = useState('');
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const setaddress = (e) => { setAddress(e.target.value); }
    const setname = (e) => { setName(e.target.value); }
    const setphone = (e) => { setPhone(e.target.value); }
    const handleRegionChange = (e) => { setSelectedRegion(e.target.value); };

    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log(selectedRegion);
        // console.log(address);
        // console.log(name);
        // console.log(phone);

        if (!selectedRegion) return alert('Please select a region');
        if (name === '') return alert('Please enter your name');
        if (phone === '') return alert('Please enter your phone number');
        if (address === '') return alert('Please enter your address');


       
        Axios.post('http://localhost:3001/placeOrder', {
            CartID: cartID, Address: address, Phone: phone, CustomerID: customerID
        }).then((response) => {
            console.log(response.data);
            alert('Order Placed Successfully');
            window.location.href = '/';
        }
        )
    }


  



useEffect(() => {
    Axios.get('http://localhost:3001/login').then((response) => {
        //console.log(response.data.user[0].ID)
        if (response.data.type === 'Customer') {
            //console.log("Seller");
            setCustomerID(response.data.user[0].ID);
        }
    })

    if (customerID !== 0) {
        Axios.get('http://localhost:3001/getCartID', { params: { id: customerID } }).then((response) => {
            // console.log(response.data);
            setcheckCart(response.data[0].ID);
        }
        );
    }


}, [customerID])
// console.log(checkCart);
// console.log(cartID);

return (
    // eslint-disable-next-line
    (checkCart == cartID) && <>
        <Navbar />
        <div style={{ paddingLeft: '50px' }} className="container mt-3">
            <h1 style={{ textAlign: 'center' }}>Checkout Your Cart</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail"  >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name='fname' onChange={setname}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" name='fname' onChange={setphone} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Select aria-label="Select region" name='address' value={selectedRegion} onChange={handleRegionChange}>
                        <option value="">Select Region</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chittagong">Chittagong</option>
                        <option value="Sylhet">Sylhet</option>
                        <option value="Rangpur">Rangpur</option>
                        <option value="Barishal">Barishal</option>
                    </Form.Select>
                    <div style={{ paddingTop: '30px' }}>
                        <Form.Label>Enter detailed location</Form.Label>
                        <Form.Control type="text" name='fname' style={{ height: '80px' }} onChange={setaddress} />
                    </div>


                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    </>
)
}
