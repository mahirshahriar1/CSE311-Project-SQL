const express = require('express');

const product = new express.Router();
const db = require("../db/conn");


product.use(express.json())


product.get('/products', (req, res) => {
           
    db.query("SELECT * FROM products", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


product.post('/specific', (req, res) => {
    const id = req.body.iid;

    db.query("SELECT * FROM products WHERE id=?", [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);

        }
    });
});

product.post('/add', (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const imglink = req.body.imglink;
    const price = req.body.price;
   
    
    db.query("INSERT INTO products (name,description,imglink,price) VALUES (?,?,?,?)", [name,price, description, imglink ], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Values inserted");
        }
    });
});


module.exports = product;
