const express = require('express');

const log = new express.Router();
const db = require("../db/conn");

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


const multer = require('multer');
const moment = require('moment');

const fs = require('fs');

log.use(cookieParser());
log.use(bodyParser.urlencoded({ extended: true }));
log.use(session({
    key: "userId",
    secret: "makeaverybigsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 200 * 600 * 60 * 10000,
    },
}));


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


log.post('/sellerRegister', upload.single("photo"), (req, res) => {
    // console.log(req.file);
    // console.log(req.body);
    const { fname } = req.body;
    const { username } = req.body;
    const { password } = req.body;
    const { filename } = req.file;
    const { phone } = req.body;




    db.query("SELECT Username FROM sellers WHERE Username = ?", [username], (err, result) => {
        if (err) {
            res.send({ err: err });
        }

        if (result.length > 0) {
            res.send({ message: "Username already exists" });

        } else {

            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    console.log(err);
                }
                //Username,   Password,   Name,   Phone,   Image, AdminID
                db.query("INSERT INTO sellers (Username, Password, Name, Phone, Image,AdminID,Type) VALUES (?,?,?,?,?,?,?)",

                    [username, hash, fname, phone, filename, 1, 'Seller'],
                    (err, result) => {
                        console.log(err);
                    }
                );
                if (err) {
                    res.send({ ok: false });
                }
                else {
                    res.send({ ok: true });
                }

            });
        }

    });
});


log.post('/customerRegister', upload.single("photo"), (req, res) => {
    // console.log(req.file);
    // console.log(req.body);
    const { fname } = req.body;
    const { username } = req.body;
    const { password } = req.body;
    const { filename } = req.file;
    const { phone } = req.body;


   

    db.query("SELECT Username FROM customers WHERE Username = ?", [username], (err, result) => {
        if (err) {
            res.send({ err: err });
        }

        if (result.length > 0) {
            res.send({ message: "Username already exists" });

        } else {

            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    console.log(err);
                }
                //Username,   Password,   Name,   Phone,   Image, AdminID
                db.query("INSERT INTO customers (Username, Password, Name, Phone, Image,AdminID,Type) VALUES (?,?,?,?,?,?,?)",

                    [username, hash, fname, phone, filename, 1, 'Customer'],
                    (err, result) => {
                         
                       if(err == null){
                             //carts(ID	DateModified	NumOfProducts	TotalPrice	CartStatus	CustomerID	)
                            db.query("INSERT INTO carts (DateModified,NumOfProducts,TotalPrice,CartStatus,CustomerID) VALUES (?,?,?,?,?)",
                            [moment().format('YYYY-MM-DD HH:mm:ss'),0,0,'Pending',result.insertId],
                            (err, result) => {
                                console.log(err);
                            }
                        );
                       }
                    }
                );
                if (err) {
                    res.send({ ok: false });
                }
                else {                   

                    res.send({ ok: true });
                }

            });
        }

    });



});

log.post("/getCustomerData", (req, res) => {
    const username = req.body.username;

    db.query("SELECT * FROM customers WHERE Username = ?", username, (err, result) => {
        if (err) {
            res.send({ err: err });
        }

        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({ message: "User doesn't exist" });
        }

    });
});


log.post("/getSellerData", (req, res) => {
    const username = req.body.username;

    db.query("SELECT * FROM sellers WHERE Username = ?", username, (err, result) => {
        if (err) {
            res.send({ err: err });
        }

        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({ message: "User doesn't exist" });
        }

    });
});

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        res.send('We need a token, please give it to us next time');
    } else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: 'You failed to authenticate' });

            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
}


log.get('/isUserAuth', verifyJWT, (req, res) => {
    res.send('You are authenticated');
});

log.get('/login', (req, res) => {
    if (req.session.user) {
        // console.log('logged in');
        res.send({ type: req.session.user[0].Type, loggedIn: true, user: req.session.user });
        //console.log(req.session.user);
        // console.log(req.session.user[0].Type);
    } else {
        // console.log('not logged in');
        res.send({ loggedIn: false });
    }
});

log.get('/sellerLogin', (req, res) => {

    if (req.session.user) {
        // console.log('logged in');        
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        // console.log('not logged in');
        res.send({ loggedIn: false });
    }

});




log.get('/logout', (req, res) => {
    req.session.destroy();

    res.send('logged out');
});




log.post('/sellerLogin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;


    db.query("SELECT * FROM sellers WHERE Username = ?;", username,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            //console.log(result);        

            if (result.length > 0) {

                bcrypt.compare(password, result[0].Password, (error, response) => {

                    if (response) {

                        const id = result[0].ID;
                        const token = jwt.sign({ id }, "jwtSecret", {
                            expiresIn: 300,
                        });
                        // console.log(req.session.user);  

                        req.session.user = result;
                        res.json({ auth: true, token: token, result: result });
                    } else {
                        res.json({ auth: false, message: "Wrong Username/Password Combination" });
                    }
                });
            } else {
                res.json({ auth: false, message: "No user exists" });
            }

        });
});


log.post('/customerLogin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;


    db.query("SELECT * FROM customers WHERE Username = ?;", username,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            //console.log(result);        

            if (result.length > 0) {

                bcrypt.compare(password, result[0].Password, (error, response) => {

                    if (response) {

                        const id = result[0].ID;
                        const token = jwt.sign({ id }, "jwtSecret", {
                            expiresIn: 300,
                        });
                        // console.log(req.session.user);  

                        req.session.user = result;
                        res.json({ auth: true, token: token, result: result });
                    } else {
                        res.json({ auth: false, message: "Wrong Username/Password Combination" });
                    }
                });
            } else {
                res.json({ auth: false, message: "No user exists" });
            }

        });


});



log.post('/adminlogin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;


    db.query("SELECT * FROM admin WHERE Username = ?;", username,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            //console.log(result);        

            if (result.length > 0) {

                bcrypt.compare(password, result[0].Password, (error, response) => {

                    if (response) {

                        const id = result[0].ID;
                        const token = jwt.sign({ id }, "jwtSecret", {
                            expiresIn: 300,
                        });
                        // console.log(req.session.user);  

                        req.session.user = result;
                        res.json({ auth: true, token: token, result: result });
                    } else {
                        res.json({ auth: false, message: "Wrong Username/Password Combination" });
                    }
                });
            } else {
                res.json({ auth: false, message: "No user exists" });
            }

        });
});

module.exports = log;