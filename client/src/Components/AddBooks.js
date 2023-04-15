import React from 'react'
import Navbar from './Navbar'
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

    const [imgfile, setImgfile] = useState("");
    const [sellerid, setSellerid] = useState(0);


    axios.defaults.withCredentials = true;

    const setname = (e) => {
        setName(e.target.value);
    }
    const setprice = (e) => {
        setPrice(e.target.value);
    }
    const setgenre = (e) => {
        setGenre(e.target.value);
    }
    const setsummary = (e) => {
        setSummary(e.target.value);
    }
    const setauthor = (e) => {
        setAuthor(e.target.value);
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
        formData.append("genre", genre);
        formData.append("summary", summary);
        formData.append("author", author);

        // console.log(formData);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const res = await axios.post('http://localhost:3001/addbook', formData, config);

        if (res.data.message) {
            alert(res.data.message);
            
            window.location.reload();
        }
        else {
            alert(res.data.err);
        }

    }

    useEffect(() => {

        Axios.get('http://localhost:3001/sellerlogin').then((response) => {
            // console.log(response.data.loggedIn);
            if (response.data.loggedIn === true && response.data.user[0].Type === 'Seller') {
               
                setSellerid(response.data.user[0].ID);

            }
        });

    }, []);

    return (
        <>
            <Navbar></Navbar>
            <div style={{ paddingLeft: '50px' }} className="container mt-3">
                <h1 style={{ textAlign: 'center' }}>Add A Book</h1>
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
                        <Form.Label>Genre</Form.Label>
                        <Form.Control type="text" name='fname' onChange={setgenre} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Summary</Form.Label>
                        <Form.Control type="text" name='fname' onChange={setsummary} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" name='fname' onChange={setauthor} />
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
