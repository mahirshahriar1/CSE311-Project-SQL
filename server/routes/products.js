const express = require('express');

const products = new express.Router();
const db = require("../db/conn");
const multer = require('multer');
const moment = require('moment');



// img storage config
var imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads');
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`);
    }
})

// img filter 
const isImage = (req, file, callback) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        callback(null, true);
    } else {
        callback(new Error('Only Image is Allowed'), false);
    }
}

var upload = multer({
    storage: imgconfig,
    fileFilter: isImage
})


products.post('/addbook', upload.single("photo"), (req, res) => {
    // console.log(req.file);
    // console.log(req.body);
        const {filename}=req.file;
        const {name}=req.body;
        const {price}=req.body;
        //console.log(filename);
        const {sellerid}=req.body;
    // console.log(sellerid);
        const {genre}=req.body;
        const {summary}=req.body;
        const {author}=req.body;

    db.query("INSERT INTO products (Image,Price,SellerID, AdminID, Name) VALUES (?,?,?,?,?)", [filename, price,sellerid,1,name], (err, result) => {
        if (err) {           
            res.send({ err: err });
        }
        else {           
            //books (productid,genre,summary,author)

            db.query("Insert into books (productid,genre,summary,author) values (?,?,?,?)", [result.insertId, genre, summary, author], (err, result) => {
                if (err) {
                    res.send({ err: err });
                }
                else {                    
                    res.send({ message: "Book Added Successfully" });
                }
            });
        }
        
    }   
    );

});

module.exports = products;
