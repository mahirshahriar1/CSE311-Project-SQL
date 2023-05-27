import React from 'react'
import Navbar from '../Components/Navbar'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Axios from 'axios';


export default function AddBooks() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [genre, setGenre] = useState("");
    const [summary, setSummary] = useState("");
    const [author, setAuthor] = useState("");
    const [quantity, setQuantity] = useState(0);

    const [imgfile, setImgfile] = useState("");
    const [sellerid, setSellerid] = useState(0);


    axios.defaults.withCredentials = true;

    const setname = (e) => { setName(e.target.value); }
    const setprice = (e) => { setPrice(e.target.value); }
    const setgenre = (e) => { setGenre(e.target.value); }
    const setsummary = (e) => { setSummary(e.target.value); }
    const setauthor = (e) => { setAuthor(e.target.value); }
    const setimgfile = (e) => { setImgfile(e.target.files[0]); }
    const setquantity = (e) => { setQuantity(e.target.value); }

    const addUserDate = async (e) => {
        e.preventDefault();

        var formData = new FormData();
        formData.append("photo", imgfile);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("sellerid", sellerid);
        formData.append("genre", genre);
        formData.append("summary", summary);
        formData.append("author", author);
        formData.append("quantity", quantity);

        // console.log(formData);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        //products route
        const res = await axios.post('http://localhost:3001/addBook', formData, config);

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
                <h1 style={{ textAlign: 'center', color: 'white', fontFamily: 'cursive' }}>Add A Book</h1>
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
                        <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Genre</Form.Label>
                        <Form.Control type="text" name='fname' onChange={setgenre} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Author</Form.Label>
                        <Form.Control type="text" name='fname' onChange={setauthor} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Quantity</Form.Label>
                        <Form.Control type="text" name='fname' onChange={setquantity} />
                    </Form.Group>
                    <Form.Group className="mb-3 " controlId="formBasicEmail">
                        <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Summary</Form.Label>
                        <Form.Control type="text" name='fname' style={{ height: '100px' }} onChange={setsummary} />
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
