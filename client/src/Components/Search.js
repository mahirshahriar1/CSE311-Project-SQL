import React from 'react'
import Item from './Item'
import Navbar from './Navbar'
import Axios from 'axios';
import { useState, useEffect } from 'react';

export default function Search() {
    var name = window.location.href.split('/').reverse()[0];
    var cat = window.location.href.split('/').reverse()[1];


    const [seller, setSeller] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [customer, setCustomer] = useState(false);
    const [customerID, setCustomerID] = useState(0);
    const [cartID, setCartID] = useState(0);

    const [bool, setBool] = useState(false);
    const [productList, setProductList] = useState([]);
    const [allProducts, setAllProducts] = useState([]);



    const [isLoading, setIsLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const getProducts = () => {
        var Cat = capitalizeFirstLetter(cat);
        if (cat === 'yourshop') {
            console.log("Your Shop");
            Axios.get('http://localhost:3001/importProducts2/' + Cat + '/' + name + '/' + userID).then((response) => {              
                console.log(response.data);
                setAllProducts(response.data);
                setProductList(response.data.slice(0, 6));
            });

        } else {
            Axios.get('http://localhost:3001/importProducts/' + Cat + '/' + name).then((response) => {
                console.log(response.data);
                setAllProducts(response.data);
                setProductList(response.data.slice(0, 6));
            });
        }

    };

    const getMoreProducts = () => {
        const numFetchedProducts = productList.length;
        const remainingProducts = allProducts.length - numFetchedProducts;
        console.log(remainingProducts);
        if (remainingProducts === 0) {
            setIsComplete(true);
            setIsLoading(false);
            return;
        }

        setTimeout(() => {
                setProductList((prevProductList) =>

                    prevProductList.concat(allProducts.slice(prevProductList.length, prevProductList.length + 6))
                );
                setIsLoading(false);

            }, 500);

    };

    
    //const [loginStatus, setLoginStatus] = useState(false);
    const [userID, setuserID] = useState("");

    useEffect(() => {

        Axios.get('http://localhost:3001/login').then((response) => {
            //console.log(response.data);
            if (response.data.loggedIn === true) {
               // setLoginStatus(true);
                if (response.data.user[0].ID)
                    setuserID(response.data.user[0].ID);
            }
            //console.log(loginStatus);
        });

        if (bool === false) {
          
                getProducts();
                setBool(true);
            

            Axios.get('http://localhost:3001/login').then((response) => {
                //console.log(response.data.user[0].ID)
                if (response.data.type === 'Seller') {
                    //console.log("Seller");
                    setSeller(true);
                } else if (response.data.type === 'Customer') {
                    setCustomerID(response.data.user[0].ID)
                    setCustomer(true);

                    Axios.get('http://localhost:3001/getCartID', { params: { id: response.data.user[0].ID } }).then((response) => {
                        // console.log(response.data);
                        setCartID(response.data[0].ID);
                    })


                    // console.log("Customer");
                } else if (response.data.type === 'Admin') {
                    setAdmin(true);
                    // console.log("Admin");
                }

            }
            )

        }

        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.documentElement.offsetHeight &&
                !isLoading && !isComplete
            ) {
                setIsLoading(true);
                getMoreProducts();
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, productList, userID])

    return (
        <div>
            <Navbar />

            <div className="container">

                <div className="row">
                    {productList.map((element) => {

                        return <div className="col-md-4" key={element.ID} style={{ display: 'flex', justifyContent: 'center' }} >
                            <Item name={element.Name} description={element.Price}
                                imglink={element.Image} id={element.ID} product={true} admin={admin} customer={customer} seller={seller} customerID={customerID}
                                cartID={cartID} prodQuantity={element.Quantity} home={true}
                            />
                        </div>
                    })}

                </div>

            </div>
            {isLoading && (
                <div style={{ marginTop: '50px', height: '200px', display: "flex", justifyContent: "center" }}>
                    <div style={{ height: '60px', width: '60px' }} className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
            {customer && <button className='cart-button fa-solid fa-cart-shopping'
                onClick={() => {
                    //send cartid to /cart

                    window.location.href = `http://localhost:3000/cart/`

                }
                }

            > </button>}


        </div>
    )
}
