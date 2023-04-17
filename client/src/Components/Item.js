import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {  useEffect } from 'react';

const Item = (props) => {
    let { name, description, imglink, id,seller, customer,admin,product,customerID } = props;
 
    let Type = props.Type;

    //console.log(props);
    // console.log("id", id);


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

    const addToCart = async(id,customerID) =>{
        //console.log(id+' '+customerID)
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
  

    return (
        <div>
            <div className="container my-3">
                <div className="card" style={{ width: '18rem' }}>
                    <img src={`http://localhost:3001/uploads/${imglink}`} className="card-img-top " style={{ height: '240px', width: '100%' }} alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">{description}</p>

                        {product ? <Link to={`/ItemInfo/${id}`} className="btn btn-primary">Check</Link> : null}
                        {seller ? <Link to={`/EditItem/${id}`} style={{ marginLeft: '24px' }} className="btn btn-warning">Edit</Link> : null}
                        {seller && product ? <Button style={{ marginLeft: '24px' }} className="btn btn-danger" onClick={() => {
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
                                 addToCart(id,customerID)  
                            }}>Add to Cart</Button>

                            : null
                        }


                    </div>
                </div>
            </div>
        </div>
    )
}
export default Item
