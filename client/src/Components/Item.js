import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';

const Item = (props) => {
    let { name, description, imglink, id, seller, customer, admin, product, customerID, cartID, prodQuantity ,home} = props;

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

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [quantity, setQuantity] = useState(0);

    const addToCart = async (id, CartID,quantity) => {      
       if(quantity<=0){
            alert("Quantity cannot be zero!");
            return ;
        }else if(quantity>prodQuantity){
            alert("Quantity cannot be greater than available quantity!");
            return ;
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
        if(res.status === 200){
            alert("Added to cart");
            setProdQuantity2(prodQuantity-quantity);
            handleClose();
        }
        else{
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
                        {product  ? <p className='card-text'>Quantity- {prodQuantity2}</p> : null}
                       

                        {product ? <Link to={`/ItemInfo/${id}`} className="btn btn-primary">Check</Link> : null}
                        {!home && seller ? <Link to={`/EditItem/${id}`} style={{ marginLeft: '24px' }} className="btn btn-warning">Edit</Link> : null}
                        {!home && seller && product ? <Button style={{ marginLeft: '24px' }} className="btn btn-danger" onClick={() => {
                            dltProduct(id, imglink);
                        }}>Delete</Button> : null}

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
                                        if(quantity>0)    
                                            addToCart(id, cartID, quantity);                                        
                                    }
                                }
                                >
                                    Add to Cart
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
