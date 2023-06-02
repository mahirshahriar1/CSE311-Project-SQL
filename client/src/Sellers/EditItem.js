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
    const [quantity, setQuantity] = useState();

    const [quantity2, setQuantity2] = useState();

    //books
    const [genre, setGenre] = useState('');
    const [summary, setSummary] = useState('');
    const [author, setAuthor] = useState('');

    //cosmetics
    const [description, setDescription] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [Type, setType1] = useState('');

    //electronics
    const [specification, setSpecification] = useState('');

    axios.defaults.withCredentials = true;


    const setname = (e) => { setName(e.target.value); }
    const setprice = (e) => { setPrice(e.target.value); }
    const setimgfile = (e) => { setImgfile(e.target.files[0]); }
    const setquantity2 = (e) => { setQuantity2(e.target.value); }




    //clothes
    const setcolor = (e) => { setColor(e.target.value); }
    const setsize = (e) => { setSize(e.target.value); }
    const setbrand = (e) => { setBrand(e.target.value); }
    // eslint-disable-next-line no-unused-vars
    const setmaterial = (e) => { setMaterial(e.target.value); }


    //books
    // eslint-disable-next-line no-unused-vars
    const setgenre = (e) => { setGenre(e.target.value); }
    const setsummary = (e) => { setSummary(e.target.value); }
    const setauthor = (e) => { setAuthor(e.target.value); }

    //cosmetics
    const setdescription = (e) => { setDescription(e.target.value); }
    // eslint-disable-next-line no-unused-vars
    const settype1 = (e) => { setType1(e.target.value); }

    //electronics
    const setspecification = (e) => { setSpecification(e.target.value); }

    const [clothes, setClothes] = useState(false);
    const [books, setBooks] = useState(false);
    const [electronics, setElectronics] = useState(false);
    const [cosmetics, setCosmetics] = useState(false);


    const editproduct = (e) => {
        e.preventDefault();
        if (imgfile !== '') {

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
            formData.append("quantity", quantity2);
            formData.append("description", description);
            formData.append("specification", specification);
            formData.append("genre", genre);
            formData.append("summary", summary);
            formData.append("author", author);


            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            Axios.put('http://localhost:3001/editproduct/:id',
                formData, config
            ).then((response) => {
                if (response.data.message) {
                    alert(response.data.message);
                }
                else {
                    alert('Product edited successfully');
                    window.location.href = '/yourshop';
                }
            });

        }


        else {
            Axios.post('http://localhost:3001/editproduct/:id',
                {
                    name: name, price: price, type: type, color: color, brand: brand, size: size, material: material, sellerid: sellerid, id: id, oldimage: oldimage, quantity: quantity2, description: description, specification: specification, genre: genre, summary: summary, author: author
                }
            ).then((response) => {
                if (response.data.message) {
                    alert(response.data.message);
                }
                else {
                    alert('Product edited successfully');
                    window.location.href = '/yourshop';
                }
            });

        }



    }
    const [checkid, setCheckid] = useState(0);
    const [oldimage, setOldimage] = useState('');

    useEffect(() => {

        const getData = () => {
            //home route
            Axios.post('http://localhost:3001/specific1', { id: id }).then((response) => {

                //  console.log(response.data);

                setType(response.data[0].Type);
                setImage(response.data[0].Image);
                setCheckid(response.data[0].SellerID);
                setOldimage(response.data[0].Image);
                setName(response.data[0].Name);
                setPrice(response.data[0].Price);
                setImage(response.data[0].Image);
                setQuantity(response.data[0].Quantity);
                setQuantity2(response.data[0].Quantity);
                // console.log(response.data[0])
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
                //console.log(response.data[0].Type)
            }
            );

            //home route
            Axios.post('http://localhost:3001/specific2', { id: id }).then((response) => {

                //console.log(response.data);
                //console.log(response.data[0].Type)
                if (clothes) {
                    setColor(response.data[0].Color);
                    setBrand(response.data[0].Brand);
                    setSize(response.data[0].Size);
                    setMaterial(response.data[0].Material);
                }
                else if (books) {
                    setGenre(response.data[0].Genre);
                    setSummary(response.data[0].Summary);
                    setAuthor(response.data[0].Author);
                } else if (cosmetics) {
                    setDescription(response.data[0].Description);
                    setBrand(response.data[0].Brand);
                    setType1(response.data[0].Type);
                } else if (electronics) {
                    setSpecification(response.data[0].Specification);
                    setBrand(response.data[0].Brand);
                    setType1(response.data[0].Type);
                }


            });

        };
        getData();


        Axios.get('http://localhost:3001/sellerLogin').then((response) => {
            // console.log(response.data.loggedIn);
            if (response.data.loggedIn === true && response.data.user[0].Type === 'Seller') {
                setSellerid(response.data.user[0].ID);

            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clothes, books, electronics, cosmetics])


    console.log(checkid);
    console.log(sellerid);
    return (
        checkid === sellerid && <>
            <Navbar />
            <div style={{ margin: '35px' }}></div>
            <div className="container" style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>

                <div className='container' style={{ display: 'flex', justifyContent: 'center' }}>
                    <div >
                        <img id='particles' src={`http://localhost:3001/uploads/${image}`} style={{ height: '430px', width: '500px', border: '5px solid black' }} alt="..." />
                    </div>

                </div>
                <div className="container">
                    <div id='particles' style={{ padding: '50px', background: 'rgb(5 37 62)', width: '800px' }} className="container mt-3">
                        <h1 style={{ textAlign: 'center', color: 'white', fontFamily: 'cursive' }}>Edit this {type}</h1>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Name</Form.Label>
                                <Form.Control type="text" name='fname' onChange={setname} defaultValue={name} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Price</Form.Label>
                                <Form.Control type="text" name='fname' onChange={setprice} defaultValue={price} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Quantity</Form.Label>
                                <Form.Control type="text" name='fname' onChange={setquantity2} defaultValue={quantity} />
                            </Form.Group>

                            {clothes && <>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Color</Form.Label>
                                    <Form.Control type="text" name='fname' onChange={setcolor} defaultValue={color} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Brand</Form.Label>
                                    <Form.Control type="text" name='fname' onChange={setbrand} defaultValue={brand} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Size</Form.Label>
                                    <Form.Control type="text" name='fname' onChange={setsize} defaultValue={size} />
                                </Form.Group>
                                {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Material</Form.Label>
                                    <Form.Control type="text" name='fname' onChange={setmaterial} defaultValue={material} />
                                </Form.Group> */}
                            </>}

                            {books && <>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Author</Form.Label>
                                    <Form.Control type="text" name='fname' onChange={setauthor} defaultValue={author} />
                                </Form.Group>
                                {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Genre</Form.Label>
                                    <Form.Control type="text" name='fname' onChange={setgenre} defaultValue={genre} />
                                </Form.Group> */}
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Summary</Form.Label>
                                    <Form.Control type="text" name='fname' onChange={setsummary} defaultValue={summary} />
                                </Form.Group>
                            </>}

                            {cosmetics && <>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Description</Form.Label>
                                    <Form.Control type="text" name='fname' onChange={setdescription} defaultValue={description} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Brand</Form.Label>
                                    <Form.Control type="text" name='fname' onChange={setbrand} defaultValue={brand} />
                                </Form.Group>
                                {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Type</Form.Label>
                                    <Form.Control type="text" name='fname' onChange={settype1} defaultValue={Type} />
                                </Form.Group> */}
                            </>}
                            {electronics && <>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Brand</Form.Label>
                                    <Form.Control type="text" name='fname' onChange={setbrand} defaultValue={brand} />
                                </Form.Group>
                                {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Type</Form.Label>
                                    <Form.Control type="text" name='fname' onChange={settype1} defaultValue={Type} />
                                </Form.Group> */}
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Specification</Form.Label>
                                    <Form.Control type="text" name='fname' onChange={setspecification} defaultValue={specification} />
                                </Form.Group>
                            </>

                            }



                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label style={{ color: 'white', fontFamily: 'cursive' }}>Select your image</Form.Label>
                                <Form.Control type="file" name='photo' onChange={setimgfile} />
                            </Form.Group>


                            <div style={{ display: 'flex', justifyContent: 'center', }}>

                                <Button style={{ '--clr': '#2baefb' }} className='btnn'
                                    variant="primary" type="submit" onClick={editproduct}>
                                    <i>
                                        <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '95%', }}>
                                            Submit Edit
                                        </span>
                                    </i>
                                </Button>
                            </div>                           
                        </Form>
                    </div>
                </div>

            </div>
        </>
    )
}