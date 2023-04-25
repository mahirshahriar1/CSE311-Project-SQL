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

seller.post('/importShop', (req, res) => {
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

//delete product
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


seller.put("/editProduct/:id", upload.single("photo"), (req, res) => {
    const { filename } = req.file;
    const { name } = req.body;
    const { price } = req.body;
    // console.log(price);
    const { photo } = req.body;


    // console.log(sellerid);
    const { size } = req.body;
    const { color } = req.body;
    const { brand } = req.body;
    const { material } = req.body;
    const { type } = req.body;
    const { sellerid } = req.body;
    const { id } = req.body;
    const { oldimage } = req.body;
    const { quantity } = req.body;
    const { description } = req.body;
    const { specification } = req.body;
    const { genre } = req.body;
    const { summary } = req.body;
    const { author } = req.body;

    //products(Image,Price,SellerID, AdminID, Name,Type)  

    db.query("UPDATE products SET Image=?,Price=?,Name=?,Type=?,Quantity=? WHERE id=?", [filename, price, name, type, quantity, id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(oldimage)
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

    if (type === 'Clothes') {
        db.query("UPDATE clothes SET Size=?,Color=?,Brand=?,Material=? WHERE ProductID=?", [size, color, brand, material, id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Data Updated');
            }
        }
        );
    } else if (type === 'Cosmetics') {
        //Type Brand Description
        db.query("Update cosmetics set Type=?,Brand=?,Description=? where ProductID=?", [type, brand, description, id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                // console.log('Data Updated');
            }
        }
        )
    }
    else if (type === 'Electronics') {
        //Specification Type Brand
        db.query("Update electronics set Specification=?,Type=?,Brand=? where ProductID=?", [specification, type, brand, id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Data Updated');
            }
        }
        )
    }
    else if (type === 'Books') {
        //Genre Summary Author
        db.query("Update books set Genre=?,Summary=?,Author=? where ProductID=?", [genre, summary, author, id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Data Updated');
            }
        }
        )
    }

})


//edit product
seller.post("/editProduct/:id", (req, res) => {

    const name = req.body.name;
    const price = req.body.price;
    const size = req.body.size;
    const color = req.body.color;
    const brand = req.body.brand;
    const material = req.body.material;
    const type = req.body.type;
    const id = req.body.id;
    const oldimage = req.body.oldimage;
    const quantity = req.body.quantity;
    const description = req.body.description;
    const specification = req.body.specification;
    const genre = req.body.genre;
    const summary = req.body.summary;
    const author = req.body.author;

    //products(Image,Price,SellerID, AdminID, Name,Type)  

    db.query("UPDATE products SET Price=?,Name=?,Type=?,Quantity=? WHERE id=?", [price, name, type, quantity, id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(oldimage)
            res.status(201).json({ status: 201, data: result })
            console.log('Data Updated');
        }
    }
    );

    if (type === 'Clothes') {
        db.query("UPDATE clothes SET Size=?,Color=?,Brand=?,Material=? WHERE ProductID=?", [size, color, brand, material, id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Data Updated');
            }
        }
        );
    } else if (type === 'Cosmetics') {
        //Type Brand Description
        db.query("Update cosmetics set Type=?,Brand=?,Description=? where ProductID=?", [type, brand, description, id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Data Updated');
            }
        }
        )
    }
    else if (type === 'Electronics') {
        //Specification Type Brand
        db.query("Update electronics set Specification=?,Type=?,Brand=? where ProductID=?", [specification, type, brand, id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Data Updated');
            }
        }
        )
    }
    else if (type === 'Books') {
        //Genre Summary Author
        db.query("Update books set Genre=?,Summary=?,Author=? where ProductID=?", [genre, summary, author, id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Data Updated');
            }
        }
        )
    }

})



seller.post("/addDiscount", (req, res) => {
    const { ProductID } = req.body;
    const { Percentage } = req.body;

    const { EndDate } = req.body;

    //ID	Percentage	ExpirationDate	ProductID	

    db.query("INSERT INTO discounts (Percentage,ExpirationDate,ProductID) VALUES (?,?,?)", [Percentage, EndDate, ProductID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(201).json({ status: 201, data: result })
            // console.log('Data Inserted');
        }
    }
    );
})

seller.post("/checkDiscount", (req, res) => {
    const { ProductID } = req.body;

    db.query("SELECT * FROM discounts WHERE ProductID=?  and ExpirationDate >= NOW()", [ProductID], (err, result) => {
        if (err) {
            res.status(500).json({ status: 500, data: err })
        } else {
            if (result.length > 0) {
                res.status(201).json({ status: 201, data: result })
            }
            else {
                res.send(result)
            }
        }
    }
    );
})

//discounts(	ID Percentage ExpirationDate ProductID )
//products ( ID image price SellerID AdminID Name Type Quantity)

seller.post("/getDiscounts", (req, res) => {
    const { SellerID } = req.body;
    //SELECT discounts.ID,discounts.Percentage, discounts.ExpirationDate,discounts.ProductID FROM discounts INNER JOIN products ON discounts.ProductID=products.ID WHERE products.SellerID=33 and discounts.ExpirationDate >= NOW()
  
  
  
    db.query("SELECT discounts.ID,discounts.Percentage, discounts.ExpirationDate,discounts.ProductID FROM discounts INNER JOIN products ON discounts.ProductID=products.ID WHERE products.SellerID=? and discounts.ExpirationDate >= NOW() ", [SellerID], (err, result) => {
        if (err) {
            res.status(500).json({ status: 500, data: err })
        } else {
            if (result.length > 0) {
                res.send(result)
            }
            else {
                res.status(404).json({ status: 404, data: result })
            }
        }
    }

    );
  
  
  

})


seller.post("/deleteDiscount", (req, res) => {
    const { DiscountID } = req.body;
    // console.log(DiscountID)
    db.query("DELETE FROM discounts WHERE ID=?", [DiscountID], (err, result) => {
        if (err) {
            res.status(500).json({ status: 500, data: err })
        } else {
            res.status(201).json({ status: 201, data: result })
        }
    }
    );

})




module.exports = seller;
