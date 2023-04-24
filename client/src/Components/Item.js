import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import format from 'date-fns/format';


const Item = (props) => {
    // eslint-disable-next-line
    let { name, description, imglink, id, seller, customer, admin, product, customerID, cartID, prodQuantity, home } = props;

    let Type = props.Type;
    // console.log(props);

    //console.log(props);
    // console.log("id", id);
    axios.defaults.withCredentials = true;
    const [prodQuantity2, setProdQuantity2] = useState(prodQuantity);


    const dltProduct = async (id, imglink) => {
        console.log(id);


        const res = await axios.delete(`http://localhost:3001/dltProduct/${id}/${imglink}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.data.status === 201) {
            window.location.reload();
            //could have called getuserdata again
        } else {
            alert("Something went wrong");
        }

    }



    const dltUser = async (id, Type, imglink) => {
        // console.log(id);
        // console.log(Type);
        const res = await axios.delete(`http://localhost:3001/dltUser/${id}/${Type}/${imglink}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.data.status === 201) {
            window.location.reload();
            //could have called getuserdata again
        } else {
            alert("Something went wrong");
        }

    }
    //console.log(id);
    const [show, setShow] = useState(false);
    const [showdis, setShowdis] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleShowdis = () => setShowdis(true);
    const handleCloseDis = () => setShowdis(false);

    const [quantity, setQuantity] = useState(0);


    const [Percentage, setPercentage] = useState(0);
    const [EndDate, setEndDate] = useState("");


    const addDiscount = async (id, Percentage, EndDate) => {
        //item.DateOfProcess.trim().split('T')[0]
        //console.log(EndDatetrim().split('T')[0])


        // console.log(format(new Date(EndDate), 'yyyy-MM-dd'));

        const res1 = await axios.post(`http://localhost:3001/checkDiscount/`,
            {
                ProductID: id,
            }
        );
        if (res1.data.status === 200) {
            alert("Discount already exists");
            return;
        }



        const res = await axios.post(`http://localhost:3001/addDiscount`, {
            ProductID: id,
            Percentage: Percentage,
            EndDate: format(new Date(EndDate), 'yyyy-MM-dd')
        });
        if (res.status === 201) {
            alert("Discount added");
            handleCloseDis();
        }
        else {
            alert("Something went wrong");
        }

    }

    const addToCart = async (id, CartID, quantity) => {
        if (quantity <= 0) {
            alert("Quantity cannot be zero!");
            return;
        } else if (quantity > prodQuantity) {
            alert("Quantity cannot be greater than available quantity!");
            return;
        }


        // console.log(id);
        // console.log(CartID);
        // console.log(quantity);       

        const res = await axios.post(`http://localhost:3001/addToCart`, {
            ProductID: id,
            CartID: CartID,
            quantity: quantity
        });
        // console.log(res);
        if (res.status === 200) {
            alert("Added to cart");
            setProdQuantity2(prodQuantity - quantity);
            handleClose();
        }
        else {
            alert("Something went wrong");
        }


    }



    return (
        <div>
            <div className="container my-3">
                <div className="card" style={{ width: '18rem' }}>
                    <img src={`http://localhost:3001/uploads/${imglink}`} className="card-img-top " style={{ height: '240px', width: '100%' }} alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">{description}</p>
                        {product ? <p className='card-text'>Quantity- {prodQuantity2}</p> : null}


                        {product ? <Link to={`/ItemInfo/${id}`} className="btn btn-primary">Check</Link> : null}
                        {!home && seller ? <Link to={`/EditItem/${id}`} style={{ marginLeft: '98px' }} className="btn btn-warning">Edit</Link> : null}

                        {!home && seller && product && <div style={{ marginTop: '5px' }}>
                            {!home && seller && product ? <Button className="btn btn-success" onClick={() => {
                                handleShowdis();
                            }}>Add Discount</Button> : null}

                            {!home && seller && product ? <Button style={{ marginLeft: '44px' }} className="btn btn-danger" onClick={() => {
                                dltProduct(id, imglink);
                            }}>Delete</Button> : null}
                        </div>}

                        {admin && !product ?
                            <Button style={{ marginLeft: '75px', width: '100px' }} className="btn btn-danger" onClick={() => {
                                dltUser(id, Type, imglink);
                            }}>Delete</Button>

                            : null
                        }
                        {customer && product ?
                            <Button style={{ marginLeft: '55px', width: '125px' }} className="btn btn-success" onClick={() => {

                                handleShow();
                            }}>Add to Cart</Button>

                            : null
                        }


                        <Modal show={show} onHide={handleClose}
                            centered

                        // backdrop="static" 
                        //backdrop might remove the close button                            
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>{props.name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Quantity Available : {prodQuantity2}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            // placeholder="name@example.com"
                                            autoFocus
                                            onChange={(e) => {
                                                setQuantity(e.target.value);
                                            }
                                            }
                                        />
                                    </Form.Group>
                                    {/* <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlTextarea1"
                                    >
                                        <Form.Label>Example textarea</Form.Label>
                                        <Form.Control as="textarea" rows={3} />
                                    </Form.Group> */}
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={
                                    () => {
                                        if (quantity > 0)
                                            addToCart(id, cartID, quantity);
                                    }
                                }
                                >
                                    Add to Cart
                                </Button>
                            </Modal.Footer>
                        </Modal>


                        <Modal show={showdis} onHide={handleCloseDis}
                            centered

                        // backdrop="static" 
                        //backdrop might remove the close button                            
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Add Discount</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Add Discount Percentage</Form.Label>
                                        <Form.Range
                                            value={Percentage}
                                            onChange={(e) => setPercentage(e.target.value)}
                                            min={5}
                                            max={100}
                                        />
                                        <Form.Control
                                            type="text"
                                            value={`${Percentage}%`}
                                            readOnly
                                        />
                                    </Form.Group>
                                    {/* <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlTextarea1"
                                    >
                                        <Form.Label>Example textarea</Form.Label>
                                        <Form.Control as="textarea" rows={3} />
                                    </Form.Group> */}
                                    {/* 
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Start Date</Form.Label>
                                        <DatePicker
                                            selected={StartDate}
                                            onChange={(date) => setStartDate(date)}
                                            dateFormat="yyyy/MM/dd"
                                            className="form-control"
                                        />


                                    </Form.Group> */}
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Expiration Date</Form.Label>
                                        <DatePicker
                                            selected={EndDate}
                                            onChange={(date) => setEndDate(date)}
                                            dateFormat="yyyy/MM/dd"
                                            className="form-control"
                                            minDate={new Date()}
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseDis}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={
                                    () => {
                                        if (Percentage <= 100 && Percentage > 0) {
                                            addDiscount(id, Percentage, EndDate);
                                            handleCloseDis();
                                        } else {
                                            alert("Discount cannot be zero!!");
                                        }
                                    }
                                }
                                >
                                    Confirm
                                </Button>
                            </Modal.Footer>
                        </Modal>


                    </div>
                </div>
            </div>
        </div >
    )
}
export default Item
