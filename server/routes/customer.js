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

    //discounts( ID Percentage ExpirationDate ProductID	)
    var Percentage = 0;
    db.query("SELECT * FROM discounts WHERE ProductID=? and ExpirationDate >= NOW()", [ProductID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length > 0) {
                Percentage = result[0].Percentage;
            }
        }
    }
    );





    //get price
    db.query("SELECT * FROM products WHERE ID=?", [ProductID], (err, result1) => {
        if (err) {
            console.log(err);
        } else {
            const Price = result1[0].Price;
            const DiscountedPrice = Price - (Price * Percentage / 100);
            const TotalPrice = Quantity * DiscountedPrice;
            console.log('TotalPrice' + ' ' + TotalPrice);
            db.query("INSERT INTO cart_product (CartID,ProductID,DateAdded,Quantity,Price) VALUES (?,?,?,?,?)", [CartID, ProductID, DateAdded, Quantity, TotalPrice], (err, result) => {
                if (err) {
                    console.log(err);

                } else {
                    //update cart

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

    db.query("SELECT cp.ProductID, p.Name, SUM(cp.Quantity) AS TotalQuantity, SUM(cp.Price) AS TotalPrice, p.Price, p.Image FROM cart_product cp INNER JOIN products p ON cp.ProductID = p.ID WHERE cp.CartID = ? GROUP BY cp.ProductID, p.Name, p.Price, p.Image", [CartID], (err, result) => {
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
    var Price = 0;
    // console.log('quantity' + ' ' + Quantity);
    // console.log('price' + ' ' + Price);

    db.query("Select * FROM cart_product WHERE CartID=? AND ProductID=?", [CartID, ProductID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            //console.log(result);
            for (var i = 0; i < result.length; i++) {
                Price = parseFloat(Price) + parseFloat(result[i].Price);
                // console.log('price' + ' ' + Price);
            }

        }
    }
    );


    db.query("DELETE FROM cart_product WHERE CartID=? AND ProductID=?", [CartID, ProductID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            //update cart
            const TotalPrice = Price;

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


//Orders(ID	OrderStatus	DateOfOrder	Address	Phone	TotalAmount	CartID	AdminID	CustomerID	)

customer.post('/placeOrder', (req, res) => {
    const CartID = req.body.CartID;
    const Address = req.body.Address;
    const Phone = req.body.Phone;
    const TotalAmount = 0;
    const CustomerID = req.body.CustomerID;
    const DateOfOrder = moment().format('YYYY-MM-DD HH:mm:ss');
    const OrderStatus = 'Pending';
    const Region = req.body.Region;
    const Name = req.body.Name;

    //get total amount
    db.query("SELECT TotalPrice FROM carts WHERE ID=?", [CartID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            const TotalAmount = result[0].TotalPrice;
            // console.log(TotalAmount);
            db.query("INSERT INTO orders (OrderStatus,DateOfOrder,Name,Region,Address,Phone,TotalAmount,CartID,AdminID,CustomerID) VALUES (?,?,?,?,?,?,?,?,?,?)", [OrderStatus, DateOfOrder, Name, Region, Address, Phone, TotalAmount, CartID, 1, CustomerID], (err, result1) => {
                if (err) {
                    console.log(err);
                } else {
                    //update cart
                    db.query("UPDATE carts SET CartStatus = 'Ordered' WHERE ID=?", [CartID], (err, result2) => {
                        if (err) {
                            console.log(err);
                        } else {

                            db.query("INSERT INTO carts (DateModified,NumOfProducts,TotalPrice,CartStatus,CustomerID) VALUES (?,?,?,?,?)",
                                [moment().format('YYYY-MM-DD HH:mm:ss'), 0, 0, 'Pending', CustomerID],
                                (err, result3) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        const response = { result, result1, result2, result3 };
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
        }
    }
    );

});


// Orders(ID OrderStatus DateOfOrder Address Phone TotalAmount CartID AdminID CustomerID)

customer.post('/getOrders', (req, res) => {
    const CustomerID = req.body.CustomerID;

    db.query("SELECT * FROM orders WHERE CustomerID=?", [CustomerID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    }
    );

});


//is this customers cart
customer.post('/isThisCustomersCart', (req, res) => {
    const CartID = req.body.CartID;
    const CustomerID = req.body.CustomerID;
    // console.log(CartID);
    // console.log(CustomerID);

    db.query("SELECT * FROM carts WHERE ID=? AND CustomerID=?", [CartID, CustomerID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length > 0) {
                res.send(true);
            } else {
                res.send(false);
            }
        }
    }
    );
});


//reports(ID	DateOfReport	TextOfReport	CustomerID	ProductID	)

customer.post('/postReport', (req, res) => {
    const CustomerID = req.body.CustomerID;
    const ProductID = req.body.ProductID;
    const comment = req.body.comment;
    const DateOfReport = moment().format('YYYY-MM-DD HH:mm:ss');

    db.query("INSERT INTO reports (DateOfReport,TextOfReport,CustomerID,ProductID) VALUES (?,?,?,?)", [DateOfReport, comment, CustomerID, ProductID], (err, result) => {
        if (err) {
            console.log(err);
        } else {       
            res.status(200).send({ message: 'Reported Successfully' });
        }
    }
    );
});





module.exports = customer;
