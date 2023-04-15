import React from 'react'
import Navbar from '../Components/Navbar'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Axios from 'axios';


export default function AddClothes() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [brand, setBrand] = useState("");
    const [material, setMaterial] = useState("");
   

    const [imgfile, setImgfile] = useState("");
    const [sellerid, setSellerid] = useState(0);


    axios.defaults.withCredentials = true;

    const setname = (e) => {
        setName(e.target.value);
    }
    const setprice = (e) => {
        setPrice(e.target.value);
    }
    const setcolor = (e) => {
        setColor(e.target.value);
    }
    const setsize = (e) => {
        setSize(e.target.value);
    }
    const setbrand = (e) => {
        setBrand(e.target.value);
    }
    const setmaterial = (e) => {
        setMaterial(e.target.value);
    }


   

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
        formData.append("color", color);
        formData.append("size", size);
        formData.append("brand", brand);
        formData.append("material", material);
        // console.log(formData);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const res = await axios.post('http://localhost:3001/addclothes', formData, config);

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

        Axios.get('http://localhost:3001/sellerlogin').then((response) => {
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
            <div style={{ paddingLeft: '50px' }} className="container mt-3">
                <h1 style={{ textAlign: 'center' }}>Add A Cloth</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name='fname' onChange={setname} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name='fname' onChange={setprice} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Color</Form.Label>
                        <Form.Control type="text" name='fname' onChange={setcolor} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" name='fname' onChange={setbrand} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Size</Form.Label>
                        <Form.Control type="text" name='fname' onChange={setsize} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Material</Form.Label>
                        <Form.Control type="text" name='fname' onChange={setmaterial} />
                    </Form.Group>



                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Select your image</Form.Label>
                        <Form.Control type="file" name='photo' onChange={setimgfile} />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={addUserDate}>
                        Submit
                    </Button>
                </Form>
            </div>


        </>
    )
}
