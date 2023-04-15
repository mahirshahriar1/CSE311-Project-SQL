import React from 'react'
import Navbar from './Navbar'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function Imgup() {
    const [fname, setFname] = useState("");
    const [imgfile, setImgfile] = useState("");

    const history=useNavigate();

    axios.defaults.withCredentials = true;

    const setdate = (e) => {
        setFname(e.target.value);       
    }

    const setimgfile=(e)=>{
       // console.log(e.target.files[0])
        setImgfile(e.target.files[0]);
    }

    const addUserDate= async (e)=>{
        e.preventDefault();

        var formData = new FormData();
        formData.append  ("photo", imgfile);
        formData.append  ("fname", fname);
       
       // console.log(formData);
        const config ={
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }

        const res = await axios.post('http://localhost:3001/uploadphoto', formData, config);
        
        if(res.status === 201){
            history('/Imgdown');
        }else{
            alert("Something went wrong");
        }
        
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="container mt-3">
                <h1>Upload Your Image Here</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name='fname' onChange={setdate} />

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
