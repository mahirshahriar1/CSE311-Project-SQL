import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import Navbar from './Navbar'
import { Modal, Button, Form } from 'react-bootstrap';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function Main() {
  var id = window.location.href.split('/').reverse()[0]
  // console.log(id);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [type, setType] = useState('');
  const [prodQuantity, setProdQuantity] = useState(0);
  const [prodQuantity2, setProdQuantity2] = useState(0);
  const [quantity, setQuantity] = useState(0);



  const [userType, setUserType] = useState('');
  const [userID, setUserID] = useState();

  const [cartID, setCartID] = useState('');


  const postReport = () => {
    Axios.post('http://localhost:3001/postReport', {
      CustomerID: userID, ProductID: id, comment: comment, Image: image
    }).then((response) => {
      if (response.status === 200) {
        alert('Reported Successfully');
      }
    });
    handleClose();
  }

  useEffect(() => {
    const getUserType = () => {
      Axios.get('http://localhost:3001/login').then((response) => {
        if (response.data.loggedIn === true) {
          setUserID(response.data.user[0].ID);
          setUserType(response.data.user[0].Type);
          Axios.get('http://localhost:3001/getCartID', { params: { id: response.data.user[0].ID } }).then((response) => {
            setCartID(response.data[0].ID);
          })
        }
      });
    };

    const getData = () => {
      Axios.post('http://localhost:3001/specific', { id: id }).then((response) => {
        //console.log(response.data);
        setName(response.data[0].Name);
        setPrice(response.data[0].Price);
        setType(response.data[0].product_type);
        setImage(response.data[0].Image);

        setProdQuantity(response.data[0].Quantity);
        setProdQuantity2(response.data[0].Quantity);


      });
    };
    getData();
    getUserType();



  }, [id, userType, cartID])


  const [show, setShow] = useState(false);
  const [comment, setComment] = useState('');


  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleCart = () => setCart(true);
  const [cart, setCart] = useState(false);
  const handleCartClose = () => setCart(false);


  const addToCart = async (id, CartID, quantity) => {
    if (quantity <= 0) {
      alert("Quantity cannot be zero!");
      return;
    } else if (quantity > prodQuantity2) {
      alert("Quantity cannot be greater than available quantity!");
      return;
    }


    // console.log(id);
    // console.log(CartID);
    // console.log(quantity);       

    const res = await Axios.post(`http://localhost:3001/addToCart`, {
      ProductID: id,
      CartID: CartID,
      quantity: quantity
    });
    // console.log(res);
    if (res.status === 200) {
      alert("Added to cart");
      setProdQuantity2(prodQuantity - quantity);
      handleCartClose();
    }

    else {
      alert("Something went wrong");
    }


  }


  return (
    <div >
      <Navbar />
      <div className='container '
        style={{
          marginTop: '50px',
          display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', height: '80vh',
        }}
      >
        <div >
          <h5
            style={{
              color: 'black', fontWeight: 'bold',
              background: 'white'
            }}
          >Scroll to zoom in and out</h5>
        </div>
        <div style={{ borderRadius: '10px', borderBlockColor: 'black', border: '5px solid black', background: 'black' }}>

          <TransformWrapper defaultScale={1}
            defaultPositionX={100}
            defaultPositionY={200}
          >
            <TransformComponent>
              <img src={`http://localhost:3001/uploads/${image}`}
                style={{ height: '400px', width: '400px' }} alt="..." />
            </TransformComponent>
          </TransformWrapper>
        </div>
        <div>
          <h1>{name}</h1>
        </div>
        <div>
          <h3>{price}</h3>
        </div>
        <div>
          <h3>{type}</h3>
        </div>



        {userType === 'Customer' && <div>

          <Button style={{ '--clr': 'lightgreen' }} className='btnn' onClick={() => { handleCart(); }}>
            <i> <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '95%', }}>Add To Cart</span></i>
          </Button>
          <Button style={{ '--clr': 'red', marginTop: '50px' }} className='btnn' onClick={() => { handleShow(); }}>
            <i> <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '95%', }}>Report</span></i>
          </Button>


        </div>}

      </div>

      <Modal show={show} onHide={handleClose} centered
      // backdrop="static" 
      //backdrop might remove the close button                            
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Write your Report Comment : </Form.Label>
              <Form.Control
                type="text"
                // placeholder="name@example.com"
                autoFocus onChange={(e) => { setComment(e.target.value); }} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={() => { postReport(); }}>Send Report</Button>
        </Modal.Footer>
      </Modal>


      <Modal show={cart} onHide={handleCartClose}
        centered

      // backdrop="static" 
      //backdrop might remove the close button                            
      >
        <Modal.Header closeButton>
          <Modal.Title>{''}</Modal.Title>
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



    </div>
  )
}
