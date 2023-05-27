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
  const [prodQuantity, setProdQuantity] = useState(0);
  const [prodQuantity2, setProdQuantity2] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [summary, setSummary] = useState('');
  const [author, setAuthor] = useState('');

  const [color, setColor] = useState('');
  const [brand, setBrand] = useState('');
  const [size, setSize] = useState('');
  const [material, setMaterial] = useState('');

  const [specifications, setSpecifications] = useState('');
  const [elecType, setElecType] = useState('');

  const [costype, setCosType] = useState('');


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
        console.log(response.data);
        setName(response.data[0].Name);
        setPrice(response.data[0].Price);
        setImage(response.data[0].Image);

        setProdQuantity(response.data[0].Quantity);
        setProdQuantity2(response.data[0].Quantity);
        if (response.data[0].Description)
          setDescription(response.data[0].Description);
        if (response.data[0].Genre)
          setGenre(response.data[0].Genre);
        if (response.data[0].Summary)
          setSummary(response.data[0].Summary);
        if (response.data[0].Author)
          setAuthor(response.data[0].Author);

        if (response.data[0].Color)
          setColor(response.data[0].Color);

        if (response.data[0].clothes_brand)
          setBrand(response.data[0].clothes_brand);
        else if (response.data[0].cosmetics_brand)
          setBrand(response.data[0].cosmetics_brand);
        else if (response.data[0].electronics_brand)
          setBrand(response.data[0].electronics_brand);

        if (response.data[0].Size)
          setSize(response.data[0].Size);
        if (response.data[0].Material)
          setMaterial(response.data[0].Material);

        if (response.data[0].Specification)
          setSpecifications(response.data[0].Specification);
        if (response.data[0].electronics_type)
          setElecType(response.data[0].electronics_type);

        if (response.data[0].cosmetics_type)
          setCosType(response.data[0].cosmetics_type);


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
      <div style={{ padding: '75px' }}></div>

      <div className='container' style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>
        <div style={{ borderRadius: '10px', borderBlockColor: 'black', border: '5px solid black', background: 'black' }}>
          <div >
            <h5 id='particles' style={{ color: 'black', fontWeight: 'bold', background: 'rgb(255 163 163)' }}>
              <span style={{ marginLeft: '70px' }}> Scroll to zoom in and out </span>
            </h5>
          </div>
          <TransformWrapper defaultScale={1} defaultPositionX={100} defaultPositionY={200}>
            <TransformComponent>
              <img src={`http://localhost:3001/uploads/${image}`} style={{ height: '400px', width: '400px' }} alt="..." />
            </TransformComponent>
          </TransformWrapper>
        </div>
        <div style={{ marginLeft: '20px' }}>

          <div id='particles'
            style={{ display: 'grid', justifyContent: 'left', paddingLeft: '20px', alignItems: 'center', height: 'auto', width: '440px', borderRadius: '10px', borderBlockColor: 'black', border: '5px solid black', background: 'rgb(8, 22, 33)', flexDirection: 'column' }}>

            <h3 style={{ color: '#ece9e9', fontWeight: 'bold', fontFamily: 'cursive' }}>Name: {name}</h3>
            <h3 style={{ color: '#ece9e9', fontWeight: 'bold', fontFamily: 'cursive' }}>Price : {price} BDT</h3>

            <h3 style={{ color: '#ece9e9', fontWeight: 'bold', fontFamily: 'cursive' }}>Quantity : {prodQuantity2 === 0 ? <span style={{ color: '#df3838' }}>Out of Stock!</span> : prodQuantity2}</h3>
            {description !== '' && <h3 style={{ color: '#ece9e9', fontWeight: 'bold', fontFamily: 'cursive' }}>Description : {description}</h3>}
            {genre !== '' && <h3 style={{ color: '#ece9e9', fontWeight: 'bold', fontFamily: 'cursive' }}>Genre : {genre}</h3>}
            {summary !== '' && <h3 style={{marginLeft:'5px', color: '#ece9e9', fontWeight: 'bold', fontFamily: 'cursive' }}>Summary : {summary}</h3>}
            {author !== '' && <h3 style={{ color: '#ece9e9', fontWeight: 'bold', fontFamily: 'cursive' }}>Author : {author}</h3>}
            {color !== '' && <h3 style={{ color: '#ece9e9', fontWeight: 'bold', fontFamily: 'cursive' }}>Color : {color}</h3>}
            {brand !== '' && <h3 style={{ color: '#ece9e9', fontWeight: 'bold', fontFamily: 'cursive' }}>Brand : {brand}</h3>}
            {size !== '' && <h3 style={{ color: '#ece9e9', fontWeight: 'bold', fontFamily: 'cursive' }}>Size : {size}</h3>}
            {material !== '' && <h3 style={{ color: '#ece9e9', fontWeight: 'bold', fontFamily: 'cursive' }}>Material : {material}</h3>}
            {specifications !== '' && <h3 style={{ color: '#ece9e9', fontWeight: 'bold', fontFamily: 'cursive' }}>Specifications : {specifications}</h3>}
            {elecType !== '' && <h3 style={{ color: '#ece9e9', fontWeight: 'bold', fontFamily: 'cursive' }}>Type : {elecType}</h3>}
            {costype !== '' && <h3 style={{ color: '#ece9e9', fontWeight: 'bold', fontFamily: 'cursive' }}>Type : {costype}</h3>}

          </div>


        </div>
      </div>
      <div
        className='container'
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '35px' }}
      >
        {userType === 'Customer' && (
          <div>
            <Button style={{ '--clr': 'lightgreen' }} className='btnn' onClick={() => { handleCart(); }}>
              <i><span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '95%' }}>Add To Cart</span></i>
            </Button>
            <Button style={{ '--clr': 'red', marginTop: '50px' }} className='btnn' onClick={() => { handleShow(); }}>
              <i><span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '95%' }}>Report</span></i>
            </Button>
          </div>
        )}
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
