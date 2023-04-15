const express = require('express');

const log = new express.Router();
const db = require("../db/conn");

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

log.use(cookieParser());
log.use(bodyParser.urlencoded({ extended: true }));
log.use(session({
    key: "userId",
    secret: "makeaverybigsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 2 * 60 * 60 * 1000,
    },
}));



log.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT Username FROM users WHERE Username = ?", [username], (err, result) => {
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
                db.query("INSERT INTO users (Username, Password) VALUES (?, ?)", [username, hash], (err, result) => {
                    console.log(err);
                });
            });
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




log.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

  
    db.query("SELECT * FROM users WHERE Username = ?;", username,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
           // console.log(result);        
         
            if (result.length > 0) {
             
                bcrypt.compare(password, result[0].password, (error, response) => {
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