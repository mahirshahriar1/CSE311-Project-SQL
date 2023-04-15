import React, { useEffect } from 'react'
import '../App.css';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Navbar from './Navbar';
import axios from 'axios';
import { useState } from 'react';
import moment from 'moment';


export default function Imgdown() {
    const [data, setData] = useState([]);

    const getUserData = async () => {
        const res = await axios.get('http://localhost:3001/getdata', {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.data.status === 201) {

            setData(res.data.data);
        } else {
            alert("Something went wrong");
        }
    }

    const dltUser = async (id,userimg ) => {
        const res = await axios.delete(`http://localhost:3001/dltuser/${id}/${userimg}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.data.status === 201) {
            setData(data.filter((val) => {
                return val.id !== id;
            }));
            //could have called getuserdata again
        } else {
            alert("Something went wrong");
        }

    }


    useEffect(() => {
        getUserData();
    }, [])

    return (
        <>
            <Navbar></Navbar>
            <div className="container mt-2">
                <h1 className='text-center mt-2'>Image Upload Projects With Mysql database</h1>

                <div className='text-end'>
                    <Button variant="primary"><NavLink to="/Imgup" className="text-decoration-none text-light"> Add User</NavLink></Button>
                </div>


                <div className='d-flex justify-content-between align-iteams-center mt-5 row'>
                    {

                        data.length > 0 ? data.map((el, i) => {

                            return (
                                <div key={el.id} className='col-md-4'>
                                    <Card style={{ width: '22rem', height: 'fit-content' }} className="mb-3" >

                                        <Card.Img variant="top" src={`http://localhost:3001/uploads/${el.userimg}`} style={{ width: '100px', textAlign: "center", margin: "auto" }} className="mt-2" />
                                        <Card.Body className='text-center'>
                                            <Card.Title>UserName : {el.username}</Card.Title>
                                            <Card.Text>
                                                Date Added : {moment(el.date).format('DD-MM-YYYY HH:mm:ss')}
                                            </Card.Text>
                                            <Button variant="danger" onClick={
                                                () => {
                                                    dltUser(el.id,el.userimg);
                                                }
                                            } className='col-lg-6 text-center'>Delete</Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        }) : <h1 className='text-center'>No Data Found</h1>

                    }
                </div>
            </div>

        </>
    )
}

