const express = require('express');

const customer = new express.Router();
const db = require("../db/conn");
const fs = require('fs');
const moment = require('moment');


customer.get('/getCartID', (req, res) => {
    const CustomerID = req.query.id;
    const CartStatus = 'Pending';
    //Carts(ID DateModified NumOfProducts TotalPrice CartStatus CustomerID)

    db.query("SELECT * FROM carts WHERE CustomerID=? and CartStatus=?", [CustomerID, CartStatus], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    }
    );

});

//Carts(ID DateModified NumOfProducts TotalPrice CartStatus CustomerID)
//cart_product(CartID	ProductID	DateAdded	Quantity)
//product( ID	Image	Price	SellerID	AdminID	Name	Type	Quantity	)

customer.post('/addToCart', (req, res) => {
    const CartID = req.body.CartID;
    const ProductID = req.body.ProductID;
    const Quantity = req.body.quantity;
    const DateAdded = moment().format('YYYY-MM-DD HH:mm:ss');
    // console.log('quantity' + ' ' + Quantity);
    // console.log('CartID' + ' ' + CartID);
    // console.log('ProductID' + ' ' + ProductID);

    db.query("INSERT INTO cart_product (CartID,ProductID,DateAdded,Quantity) VALUES (?,?,?,?)", [CartID, ProductID, DateAdded, Quantity], (err, result) => {
        if (err) {
            console.log(err);

        } else {

            //get price
            db.query("SELECT * FROM products WHERE ID=?", [ProductID], (err, result1) => {
                if (err) {
                    console.log(err);
                } else {
                    //update cart
                    const Price = result1[0].Price;
                    const TotalPrice = Quantity * Price;

                    db.query("UPDATE carts SET TotalPrice = TotalPrice + ? , NumOfProducts=NumOfProducts+? WHERE ID=?", [TotalPrice, Quantity, CartID], (err, result2) => {
                        if (err) {
                            console.log(err);
                        } else {
                            // console.log(result2);
                            const response = { result, result2 };

                            res.send(response);

                            //product( ID	Image	Price	SellerID	AdminID	Name	Type	Quantity	)
                            db.query("UPDATE products SET Quantity = Quantity - ? WHERE ID=?", [Quantity, ProductID], (err, result3) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    //console.log(result3);
                                }
                            }
                            );

                        }
                    }
                    );
                }
            }
            );


        }
    }
    );

});



//Carts(ID DateModified NumOfProducts TotalPrice CartStatus CustomerID)
//cart_product(CartID	ProductID	DateAdded	Quantity)
//product( ID	Image	Price	SellerID	AdminID	Name	Type	Quantity	)


customer.post('/getCartProducts', (req, res) => {
    const CartID = req.body.CartID;

    db.query("SELECT cp.ProductID, p.Name, SUM(cp.Quantity) AS TotalQuantity, p.Price, p.Image FROM cart_product cp INNER JOIN products p ON cp.ProductID = p.ID WHERE cp.CartID = ? GROUP BY cp.ProductID, p.Name, p.Price, p.Image", [CartID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    }
    );

});

customer.post('/removeFromCart', (req, res) => {
    const CartID = req.body.CartID;
    const ProductID = req.body.ProductID;
    const Quantity = req.body.TotalQuantity;
    const Price = req.body.Price;
    console.log('quantity' + ' ' + Quantity);
    console.log('price' + ' ' + Price);
    db.query("DELETE FROM cart_product WHERE CartID=? AND ProductID=?", [CartID, ProductID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            //update cart
            const TotalPrice = Quantity * Price;

            db.query("UPDATE carts SET TotalPrice = TotalPrice - ? , NumOfProducts=NumOfProducts-? WHERE ID=?", [TotalPrice, Quantity, CartID], (err, result2) => {
                if (err) {
                    console.log(err);
                } else {
                    // console.log(result2);


                    //product( ID	Image	Price	SellerID	AdminID	Name	Type	Quantity	)
                    db.query("UPDATE products SET Quantity = Quantity + ? WHERE ID=?", [Quantity, ProductID], (err, result3) => {
                        if (err) {
                            console.log(err);
                        } else {
                            const response = { result, result2, result3 };
                            res.send(response);
                        }
                    }
                    );

                }
            }
            );
        }
    }
    );

});







module.exports = customer;
