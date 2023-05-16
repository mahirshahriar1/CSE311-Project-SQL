import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import format from 'date-fns/format';


const Item = (props) => {
    // eslint-disable-next-line
    let { name, price, imglink, id, seller, customer, admin, product, customerID, cartID, prodQuantity, home } = props;

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
        if (Type === "Seller") {
            const res1 = await axios.post(`http://localhost:3001/checkOrderList`);
            //console.log(res1);
            if (res1.data.length > 0) {
                alert("Cannot delete seller as their product might be in orders. Check Orders First");
                return;
            }
        }

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


    const [Percentage, setPercentage] = useState(5);
    const [EndDate, setEndDate] = useState("");


    const addDiscount = async (id, Percentage, EndDate) => {
        //item.DateOfProcess.trim().split('T')[0]
        //console.log(EndDatetrim().split('T')[0])s


        // console.log(format(new Date(EndDate), 'yyyy-MM-dd'));
        // console.log(id);

        const res1 = await axios.post(`http://localhost:3001/checkDiscount`, {
            ProductID: id,
        });
        if (res1.status === 201) {
            alert("Discount already exists");
            handleCloseDis();
            return;
        } else {
            // console.log(res1.status);
        }



        const res = await axios.post(`http://localhost:3001/addDiscount`, {
            ProductID: id,
            Percentage: Percentage,
            EndDate: format(new Date(EndDate), 'yyyy-MM-dd')
        });
        if (res.status === 201) {
            alert("Discount added");
            handleCloseDis();
            window.location.reload();
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
    const [discountPercentage, setDiscountPercentage] = useState();
    const [discountEndDate, setDiscountEndDate] = useState("");
    const [hasdiscount, setHasDiscount] = useState(false);
    useEffect(() => {
        const getProductDiscount = async () => {
            const res = await axios.get(`http://localhost:3001/getProductDiscount/${id}`);
            //console.log(res.data[0]);

            if (res.status === 200) {
                setDiscountPercentage(res.data[0].Percentage);
                setDiscountEndDate(res.data[0].EndDate);
                setHasDiscount(true);
            }
        }
        getProductDiscount();
    }, [id, discountPercentage, discountEndDate])
    // console.log(id);
    // console.log(discountPercentage);
    // console.log(discountEndDate);
    //console.log(hasdiscount);


    return (
        <div>
            <div className="container my-3">
                <div className="card text-white" style={{ width: '18rem' , background:'#081621'}}>
                    {hasdiscount && <div style={{position: 'absolute', right: '0', top: '0', start:'100', }}>
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {discountPercentage + '%'}
                        </span >
                    </div>}
                    <img src={`http://localhost:3001/uploads/${imglink}`} className="card-img-top " style={{ height: '240px', width: '100%' }} alt="..." />
                    <div className="card-body">
                        <h5 className="card-title"  
                        // center the text
                        style={{textAlign: 'center'}}
                        >{name}</h5>

                    {  product &&  <p className="card-text">{price} BDT</p>}
                        {/* {product ? <p className="card-text">Discount - {discountPercentage}</p> : null} */}

                        {product ? <p className='card-text'>{ prodQuantity2>0?`${prodQuantity2} pcs Available`:"Sold Out"}  </p> : null}
                    

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
