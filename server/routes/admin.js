const express = require('express');

const admin = new express.Router();
const db = require("../db/conn");
const fs = require('fs');


admin.get('/importSellers', (req, res) => {

    db.query('SELECT * FROM sellers ', (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });

});

admin.get('/importCustomers', (req, res) => {

    db.query('SELECT * FROM customers ', (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });

});


//delete user
admin.delete("/dltUser/:id/:Type/:imglink", (req, res) => {

    const id = req.params.id;
    const Type = req.params.Type;
    const userimg = req.params.imglink;
    try {
        if(Type=="Seller"){
            db.query("DELETE FROM sellers WHERE id=?", [id], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Data Deleted');
                    res.status(201).json({ status: 201, data: result })
                }
            })
        }
        else if(Type=="Customer"){
            db.query("DELETE FROM customers WHERE id=?", [id], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Data Deleted');
                    res.status(201).json({ status: 201, data: result })
                }
            })
        }
               
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





module.exports = admin;
