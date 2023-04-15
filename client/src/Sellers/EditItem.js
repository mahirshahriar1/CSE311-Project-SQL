import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import Navbar from '../Components/Navbar'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';


export default function EditItem() {
    var id = window.location.href.split('/').reverse()[0]
    // console.log(id);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [type, setType] = useState('');
    const [color, setColor] = useState('');
    const [brand, setBrand] = useState('');
    const [size, setSize] = useState('');
    const [material, setMaterial] = useState('');
    const [imgfile, setImgfile] = useState('');
    const [sellerid, setSellerid] = useState(0);


    axios.defaults.withCredentials = true;


    const setname = (e) => {
        setName(e.target.value);   
    }
    const setprice = (e) => {
        setPrice(e.target.value);
    }
    const setcolor = (e) => {
        setColor(e.target.value);
    }
    const setsize = (e) => {
        setSize(e.target.value);
    }
    const setbrand = (e) => {
        setBrand(e.target.value);
    }
    const setmaterial = (e) => {
        setMaterial(e.target.value);
    }
    const setimgfile = (e) => {
        // console.log(e.target.files[0])
        setImgfile(e.target.files[0]);
    }


    const [clothes, setClothes] = useState(false);
    const [books, setBooks] = useState(false);
    const [electronics, setElectronics] = useState(false);
    const [cosmetics, setCosmetics] = useState(false);


    const editproduct = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("photo", imgfile);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("type", type);
        formData.append("color", color);
        formData.append("brand", brand);
        formData.append("size", size);
        formData.append("material", material);
        formData.append("sellerid", sellerid);
        formData.append("id", id);
        formData.append("oldimage", oldimage);
        console.log(oldimage)
    
       
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        Axios.put('http://localhost:3001/editproduct/:id',
            formData,

            config
        ).then((response) => {
           if(response.data.message){
               alert(response.data.message);
           }
              else{
                alert('Product edited successfully');
                window.location.href = '/yourshop';
            }
        });

        
    }
    const [checkid, setCheckid] = useState(0);
    const [oldimage, setOldimage] = useState('');
    const [bool, setBool] = useState(false);
    useEffect(() => {
        // getEmployees();

        const getData = () => {
            Axios.post('http://localhost:3001/specific1', { id: id }).then((response) => {

                console.log(response.data);
              
                setType(response.data[0].Type);
                setImage(response.data[0].Image);
                setCheckid(response.data[0].SellerID);
                setOldimage(response.data[0].Image);
                if (response.data[0].Type === 'Clothes') {
                    setClothes(true);
                }
                else if (response.data[0].Type === 'Books') {
                    setBooks(true);
                }
                else if (response.data[0].Type === 'Electronics') {
                    setElectronics(true);
                }
                else if (response.data[0].Type === 'Cosmetics') {
                    setCosmetics(true);
                }
            }
            );

            Axios.post('http://localhost:3001/specific2', { id: id }).then((response) => {

                console.log(response.data);


            });
            
        };
        getData();


        Axios.get('http://localhost:3001/sellerlogin').then((response) => {
            // console.log(response.data.loggedIn);
            if (response.data.loggedIn === true && response.data.user[0].Type === 'Seller') {               
                setSellerid(response.data.user[0].ID);

            }
        });

    }, [id])



    return (
      checkid===sellerid && <>
            <Navbar />
            <div className='container' style={{ paddingLeft: '500px' }}>

                <div >
                    <img src={`http://localhost:3001/uploads/${image}`} style={{ height: '240px', width: '300px' }} alt="..." />
                </div>
            </div>
            <div className="container">
                <div style={{ paddingLeft: '50px' }} className="container mt-3">
                    <h1 style={{ textAlign: 'center' }}>Add A Cloth</h1>
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
                            <Form.Label>Color</Form.Label>
                            <Form.Control type="text" name='fname' onChange={setcolor} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type="text" name='fname' onChange={setbrand} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Size</Form.Label>
                            <Form.Control type="text" name='fname' onChange={setsize} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Material</Form.Label>
                            <Form.Control type="text" name='fname' onChange={setmaterial} />
                        </Form.Group>



                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Select your image</Form.Label>
                            <Form.Control type="file" name='photo' onChange={setimgfile} />
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={editproduct}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>

        </>
    )
}
