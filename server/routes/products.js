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


products.post('/addBook', upload.single("photo"), (req, res) => {
    // console.log(req.file);
    // console.log(req.body);
    const { filename } = req.file;
    const { name } = req.body;
    const { price } = req.body;
    //console.log(filename);
    const { sellerid } = req.body;
    // console.log(sellerid);
    const { genre } = req.body;
    const { summary } = req.body;
    const { author } = req.body;
    const { quantity } = req.body;

    db.query("INSERT INTO products (Image,Price,SellerID, AdminID, Name,Type, Quantity) VALUES (?,?,?,?,?,?,?)", [filename, price, sellerid, 1, name, 'Books', quantity], (err, result) => {
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



products.post('/addElectronics', upload.single("photo"), (req, res) => {
    // console.log(req.file);
    // console.log(req.body);
    const { filename } = req.file;
    const { name } = req.body;
    const { price } = req.body;
    //console.log(filename);
    const { sellerid } = req.body;
    // console.log(sellerid);
    const { spec } = req.body;
    const { type } = req.body;
    const { brand } = req.body;
    const { quantity } = req.body;


    db.query("INSERT INTO products (Image,Price,SellerID, AdminID, Name,Type,Quantity) VALUES (?,?,?,?,?,?,?)", [filename, price, sellerid, 1, name, 'Electronics', quantity], (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        else {
            //electronics (productid,specification,type,brand)

            db.query("Insert into electronics (productid,specification,type,brand) values (?,?,?,?)", [result.insertId, spec, type, brand], (err, result) => {
                if (err) {
                    res.send({ err: err });
                }
                else {
                    res.send({ message: "Electronics Added Successfully" });
                }
            });
        }

    }
    );

});


products.post('/addCosmetics', upload.single("photo"), (req, res) => {
    // console.log(req.file);
    // console.log(req.body);
    const { filename } = req.file;
    const { name } = req.body;
    const { price } = req.body;
    //console.log(filename);
    const { sellerid } = req.body;
    // console.log(sellerid);
    const { description } = req.body;
    const { type } = req.body;
    const { brand } = req.body;
    const { quantity } = req.body;


    db.query("INSERT INTO products (Image,Price,SellerID, AdminID, Name, Type,Quantity) VALUES (?,?,?,?,?,?,?)", [filename, price, sellerid, 1, name, 'Cosmetics', quantity], (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        else {
            //cosmetics (productid,type,brand,description)

            db.query("Insert into cosmetics (productid,type,brand,description) values (?,?,?,?)", [result.insertId, type, brand, description], (err, result) => {
                if (err) {
                    res.send({ err: err });
                }
                else {
                    res.send({ message: "Cosmetics Added Successfully" });
                }
            });
        }

    }
    );

});


products.post('/addClothes', upload.single("photo"), (req, res) => {
    // console.log(req.file);
    // console.log(req.body);
    const { filename } = req.file;
    const { name } = req.body;
    const { price } = req.body;
    //console.log(filename);
    const { sellerid } = req.body;
    // console.log(sellerid);
    const { size } = req.body;
    const { color } = req.body;
    const { brand } = req.body;
    const { material } = req.body;
    const { quantity } = req.body;

    db.query("INSERT INTO products (Image,Price,SellerID, AdminID, Name,Type,Quantity) VALUES (?,?,?,?,?,?,?)", [filename, price, sellerid, 1, name, 'Clothes', quantity], (err, result) => {

        if (err) {
            console.log(err)
            res.send({ err: err });
        }
        else {
            //clothes (productid,color,brand,size,material)

            db.query("Insert into clothes (productid,color,brand,size,material) values (?,?,?,?,?)", [result.insertId, color, brand, size, material], (err, result) => {
                if (err) {
                    res.send({ err: err });
                }
                else {
                    res.send({ message: "Clothes Added Successfully" });
                }
            });

        }

    }
    );

});







products.post('/addFurnitures', upload.single("photo"), (req, res) => {
    // console.log(req.file);
    // console.log(req.body);
    const { filename } = req.file;
    const { name } = req.body;
    const { price } = req.body;
    //console.log(filename);
    const { sellerid } = req.body;
    // console.log(sellerid);
       const { color } = req.body;
    const { brand } = req.body;
 
    const { quantity } = req.body;
    const { type } = req.body;
    const { description } = req.body;

    db.query("INSERT INTO products (Image,Price,SellerID, AdminID, Name,Type,Quantity) VALUES (?,?,?,?,?,?,?)", [filename, price, sellerid, 1, name, 'Furnitures', quantity], (err, result) => {

        if (err) {
            console.log(err)
            res.send({ err: err });
        }
        else {
            //Furnitures(ID	ProductID	Type	Brand	Description	Color	)

            db.query("Insert into furnitures(productId,type,brand,description,color) values (?,?,?,?,?)", [result.insertId, type, brand, description, color], (err, result) => {
                if (err) {
                    res.send({ err: err });
                }
                else {
                    res.send({ message: "Clothes Added Successfully" });
                }
            });

        }

    }
    );

});

module.exports = products;

