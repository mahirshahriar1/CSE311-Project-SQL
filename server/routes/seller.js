const express = require('express');

const seller = new express.Router();
const db = require("../db/conn");
const multer = require('multer');
const moment = require('moment');
const fs = require('fs');

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

seller.post('/importshop', (req, res) => {
    const id = req.body.ID;

    db.query("SELECT * FROM products WHERE SellerID=?", [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {

            res.send(result);
        }
    }
    );

});

//delete user
seller.delete("/dltProduct/:id/:imglink", (req, res) => {

    const id = req.params.id;
    const userimg = req.params.imglink;
    try {
        db.query("DELETE FROM products WHERE id=?", [id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Data Deleted');
                res.status(201).json({ status: 201, data: result })
            }
        })
    }
    catch (error) {
        res.status(422).json({ status: 422, error });
    }

    console.log(userimg);
    fs.unlink(`./uploads/${userimg}`, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('File Deleted');
        }
    })

})

//edit product
seller.put("/editProduct/:id", upload.single("photo"), (req, res) => {
    const { filename } = req.file;
    const { name } = req.body;
    const { price } = req.body;
    console.log(price);

    // console.log(sellerid);
    const { size } = req.body;
    const { color } = req.body;
    const { brand } = req.body;
    const { material } = req.body;
    const { type } = req.body;
    const { sellerid } = req.body;
    const { id } = req.body;
    const { oldimage }=req.body;

    //products(Image,Price,SellerID, AdminID, Name,Type)
    db.query("UPDATE products SET Image=?,Price=?,Name=?,Type=? WHERE id=?", [filename, price, name, type, id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(oldimage)
            res.status(201).json({ status: 201, data: result })
            fs.unlink(`./uploads/${oldimage}`, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('File Deleted');
                }
            })
        }
    }
    );


})




module.exports = seller;
