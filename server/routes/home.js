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

home.get('/importCategoricalProducts', (req, res) => {
    const category = req.query.category;
    //console.log(category);
    db.query('SELECT * FROM products WHERE Type=?', [category], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
});

home.post('/specific', (req, res) => {
    const id = req.body.id;
    //console.log(id);
    db.query(`SELECT p.*, c.*, cl.*, e.*, b.* ,
              p.Type AS product_type
              FROM products p
              LEFT JOIN cosmetics c ON p.id = c.productid
              LEFT JOIN clothes cl ON p.id = cl.productid
              LEFT JOIN electronics e ON p.id = e.productid
              LEFT JOIN books b ON p.id = b.productid
              WHERE p.id = ?`, [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
           // console.log(result);
            res.send(result);
        }
    });
});

// const res = await axios.get(`http://localhost:3001/getProductDiscount/${id}`);

home.get('/getProductDiscount/:id', async (req, res) => {
    const id = req.params.id;
    db.query("SELECT * from discounts where ProductID=?  and ExpirationDate >= NOW()  ", [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length > 0) {
                res.status(200).send(result);
            } else {
                res.status(201).send("No Discount");
            }
        }
    }
    );

});




module.exports = home;
