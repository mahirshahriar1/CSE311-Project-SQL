import React from 'react'
import Navbar from '../Components/Navbar'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Axios from 'axios';


export default function AddElectronics() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [specification, setSpec] = useState("");
    const [type, setType] = useState("");
    const [brand, setBrand] = useState("");
    const [quantity, setQuantity] = useState(0);


    const [imgfile, setImgfile] = useState("");
    const [sellerid, setSellerid] = useState(0);


    axios.defaults.withCredentials = true;

    const setname = (e) => { setName(e.target.value); }
    const setprice = (e) => { setPrice(e.target.value); }
    const setspec = (e) => { setSpec(e.target.value); }
    const settype = (e) => { setType(e.target.value); }
    const setbrand = (e) => { setBrand(e.target.value); }
    const setquantity = (e) => { setQuantity(e.target.value); }


    const setimgfile = (e) => {
        // console.log(e.target.files[0])
        setImgfile(e.target.files[0]);
    }

    const addUserDate = async (e) => {
        e.preventDefault();

        var formData = new FormData();
        formData.append("photo", imgfile);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("sellerid", sellerid);
        formData.append("spec", specification);
        formData.append("type", type);
        formData.append("brand", brand);
        formData.append("quantity", quantity);
        // console.log(formData);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const res = await axios.post('http://localhost:3001/addElectronics', formData, config);

        if (res.data.message) {
            alert(res.data.message);

            window.location.reload();
        }
        else {
            alert(res.data.err);
        }

    }
    const [bool, setBool] = useState(false);

    useEffect(() => {

        Axios.get('http://localhost:3001/sellerLogin').then((response) => {
            // console.log(response.data.loggedIn);
            if (response.data.loggedIn === true && response.data.user[0].Type === 'Seller') {
                setBool(true);
                setSellerid(response.data.user[0].ID);

            }
        });

    }, []);

    return (
        bool && <>
            <Navbar></Navbar>
            <div id='particles' style={{ padding: '50px', background: 'rgb(5 37 62)', width: '800px' }} className="container mt-3">
                <h1 style={{ textAlign: 'center', color: 'white', fontFamily: 'cursive' }}>Add An Electronics</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Name</Form.Label>
                        <Form.Control type="text" name='fname' onChange={setname} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Price</Form.Label>
                        <Form.Control type="text" name='fname' onChange={setprice} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Specifications</Form.Label>
                        <Form.Control type="text" name='fname' onChange={setspec} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Type</Form.Label>
                       
                        <Form.Select aria-label="Select region" name='address' value={type} onChange={settype}>
                            <option style={{ fontFamily: 'cursive' }} value="">Select Type</option>
                            <option style={{ fontFamily: 'cursive' }} value="PC">PC</option>
                            <option style={{ fontFamily: 'cursive' }} value="Laptop">Laptop</option>
                            <option style={{ fontFamily: 'cursive' }} value="Phone">Phone</option>
                            <option style={{ fontFamily: 'cursive' }} value="Office-Equipments">Office-Equipments</option>
                            <option style={{ fontFamily: 'cursive' }} value="Others">Others</option>
                        </Form.Select>


                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Brand</Form.Label>
                        <Form.Control type="text" name='fname' onChange={setbrand} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Quantity</Form.Label>
                        <Form.Control type="text" name='fname' onChange={setquantity} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Select your image</Form.Label>
                        <Form.Control type="file" name='photo' onChange={setimgfile} />
                    </Form.Group>
                    <div style={{ display: 'flex', justifyContent: 'center', }}>

                        <Button style={{ '--clr': '#2baefb' }} className='btnn'
                            variant="primary" type="submit" onClick={addUserDate}>
                            <i>
                                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '95%', }}>
                                    Submit
                                </span>
                            </i>
                        </Button>
                    </div>
                </Form>
            </div>


        </>
    )
}
