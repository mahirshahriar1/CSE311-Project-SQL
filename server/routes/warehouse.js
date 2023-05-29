const express = require('express');

const warehouse = new express.Router();
const db = require("../db/conn");
const fs = require('fs');
const moment = require('moment');





warehouse.post('/delivery', (req, res) => {
    const id = req.body.CartID;
    const status = req.body.Status;
    console.log(status);
    const date=moment().format('YYYY-MM-DD');
    db.query('UPDATE orders SET OrderStatus=? , DateOfProcess=? WHERE CartID=?', [status, date, id], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    }
    );

});

module.exports = warehouse;
