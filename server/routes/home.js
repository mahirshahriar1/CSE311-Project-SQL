const express = require('express');

const home = new express.Router();
const db = require("../db/conn");


home.get('/importProducts', (req, res) => {

    //products (ID,Image,Price,SellerID,AdminID,Name)
    //cosmetics  (productid,type,brand,description)
    //clothes (productid,color,brand,size,material)
    //electronics (productid,specification,type,brand)
    //books (productid,genre,summary,author)

    db.query('SELECT * FROM products ORDER by ID DESC', (err, result) => {
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


home.get('/importBooks', (req, res) => {
    const category = req.query.category;
    const subcategory = req.query.subcategory;
    // console.log(category);
    // console.log(subcategory);

    db.query('SELECT * FROM products, books WHERE Type=? AND Genre=? AND products.ID=books.ProductID', [category, subcategory], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    }
    );
});

home.get('/importElectronics', (req, res) => {
    const category = req.query.category;
    const subcategory = req.query.subcategory;
    // console.log(category);
    // console.log(subcategory);
    //SELECT * FROM `products` as p, electronics as e where p.Type='Electronics' and e.Type='PC' and p.ID=e.ProductID
    db.query('SELECT * FROM products as p, electronics as e where p.Type=? and e.Type=? AND p.ID=e.ProductID', [category, subcategory], (err, result) => {  
        if (err) {
            console.log(err);
        }
        else {           
            res.send(result);
        }
    }
    );
});

home.get('/importCosmetics', (req, res) => {
    const category = req.query.category;
    const subcategory = req.query.subcategory;
    // console.log(category);
   //  console.log(subcategory);
    //SELECT * FROM `products` as p, electronics as e where p.Type='Electronics' and e.Type='PC' and p.ID=e.ProductID
    db.query('SELECT * FROM products as p, cosmetics as e where p.Type=? and e.Type=? AND p.ID=e.ProductID', [category, subcategory], (err, result) => {  
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
            res.send(result);
        }
    }
    );
});

home.get('/importClothes', (req, res) => {
    const category = req.query.category;
    const subcategory = req.query.subcategory;
    // console.log(category);
    // console.log(subcategory);
    //SELECT * FROM `products` as p, electronics as e where p.Type='Electronics' and e.Type='PC' and p.ID=e.ProductID
    db.query('SELECT * FROM products as p, clothes as e where p.Type=? and e.Material=? AND p.ID=e.ProductID', [category, subcategory], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    }
    );
});

home.get('/importFurnitures', (req, res) => {
    const category = req.query.category;
    const subcategory = req.query.subcategory;
    
    // console.log(category);
    // console.log(subcategory);
    //SELECT * FROM `products` as p, electronics as e where p.Type='Electronics' and e.Type='PC' and p.ID=e.ProductID
    db.query('SELECT * FROM products as p, furnitures as e where p.Type=? and e.Type=? AND p.ID=e.ProductID', [category, subcategory], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
           // console.log(result);
            res.send(result);
        }
    }
    );
});

home.post('/specific1', (req, res) => {
    const id = req.body.id;

    db.query("SELECT * FROM products WHERE id=?", [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {

            res.send(result);
        }
    }
    );

});

home.post('/specific2', (req, res) => {
    const id = req.body.id;

    db.query("SELECT * FROM products WHERE id=?", [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            //cosmetics  (productid,type,brand,description)
            //clothes (productid,color,brand,size,material)
            //electronics (productid,specification,type,brand)
            //books (productid,genre,summary,author)


            if (result[0].Type == 'Cosmetics') {
                db.query("SELECT * FROM cosmetics WHERE productid=?", [id], (err, result1) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(result1);
                    }
                }
                );
            }
            else if (result[0].Type == 'Clothes') {
                db.query("SELECT * FROM clothes WHERE productid=?", [id], (err, result1) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(result1);
                    }
                }
                );
            }
            else if (result[0].Type == 'Electronics') {
                db.query("SELECT * FROM electronics WHERE productid=?", [id], (err, result1) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(result1);
                    }
                }
                );
            }
            else if (result[0].Type == 'Books') {

                db.query("SELECT * FROM books WHERE productid=?", [id], (err, result1) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(result1);
                    }
                }
                );
            }


        }

    });
});

home.post('/specific', (req, res) => {
    const id = req.body.id;
    //console.log(id);



    db.query(`SELECT p.*, c.*, cl.*, e.*, b.* ,
              p.Type AS product_type,
              c.Type AS cosmetics_type,
              e.Type AS electronics_type,
              c.Brand AS cosmetics_brand,
              cl.Brand AS clothes_brand,
              e.Brand AS electronics_brand
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
    // console.log(id);
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

//        Axios.get('http://localhost:3001/importProducts/'+cat+'/'+name).then((response) => {

home.get('/importProducts/:cat/:name', (req, res) => {
    const cat = req.params.cat;
    const name = req.params.name;

    //console.log(name);
    if (cat === 'Main') {
        db.query('SELECT * FROM products WHERE Name LIKE ? Order by ID DESC', ['%' + name + '%'], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(result);
            }
        });

    }
    else {
        db.query('SELECT * FROM products WHERE Type=? AND Name LIKE ?', [cat, '%' + name + '%'], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(result);
            }
        });

    }
});

// Axios.get('http://localhost:3001/importProducts/' + Cat + '/' + name + '/' + userID).then((response) => {

home.get('/importProducts2/:cat/:name/:userID', (req, res) => {

    const cat = req.params.cat;
    const name = req.params.name;
    const userID = req.params.userID;
    console.log(cat);
    //console.log(name);

    db.query('SELECT * FROM products WHERE Name LIKE ? AND SellerID=? Order by ID DESC', ['%' + name + '%', userID], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });

});


home.get('/sortProducts/:txt1/:txt2', (req, res) => {
    const txt1 = req.params.txt1;
    const txt2 = req.params.txt2;
    //console.log(txt);
    //console.log(txt2);
    if (txt1 === 'Quantity') {
        db.query('SELECT * FROM products where Quantity>0 ORDER BY ' + txt1 + ' ' + txt2, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(result);
            }
        }
        );

    } else {

        db.query('SELECT * FROM products ORDER BY ' + txt1 + ' ' + txt2, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(result);
            }
        });
    }

});

//sort categories

home.get('/sortCategories/:cat/:txt1/:txt2', (req, res) => {

    const cat = req.params.cat;
    const txt1 = req.params.txt1;
    const txt2 = req.params.txt2;
    // console.log(txt);
    // console.log(txt2);
    db.query('SELECT * FROM products WHERE Type=? ORDER BY ' + txt1 + ' ' + txt2, [cat], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
});




module.exports = home;

