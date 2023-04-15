const express = require('express');

const home = new express.Router();
const db = require("../db/conn");


home.get('/importProducts', (req, res) => {

    //products (ID,Image,Price,SellerID,AdminID,Name)
    //cosmetics  (productid,type,brand,description)
    //clothes (productid,color,brand,size,material)
    //electronics (productid,specification,type,brand)
    //books (productid,genre,summary,author)

    db.query('SELECT * FROM products ', (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });

});

home.post('/specific1', (req, res) => {
    const id = req.body.iid;

    db.query("SELECT * FROM products WHERE id=?", [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {

            res.send(result);
        }
    }
    );

});

home.post('/specific2', (req, res) => {
    const id = req.body.iid;


    db.query("SELECT * FROM products WHERE id=?", [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            //cosmetics  (productid,type,brand,description)
            //clothes (productid,color,brand,size,material)
            //electronics (productid,specification,type,brand)
            //books (productid,genre,summary,author)

          
            if (result[0].Type == 'Cosmetics') {
                db.query("SELECT * FROM cosmetics WHERE productid=?", [id], (err, result1) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(result1);
                    }
                }
                );
            }
            else if (result[0].Type == 'Clothes') {
                db.query("SELECT * FROM clothes WHERE productid=?", [id], (err, result1) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(result1);
                    }
                }
                );
            }
            else if (result[0].Type == 'Electronics') {
                db.query("SELECT * FROM electronics WHERE productid=?", [id], (err, result1) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(result1);
                    }
                }
                );
            }
            else if (result[0].Type == 'Books') {
                
                db.query("SELECT * FROM books WHERE productid=?", [id], (err, result1) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(result1);
                    }
                }
                );
            }


        }

    });
});


module.exports = home;
