const express = require('express');
const photo = express.Router();

const multer = require('multer');
const moment = require('moment');

const db = require("../db/conn");
const fs = require('fs');


// img storage config
var imgconfig = multer.diskStorage({
   destination:(req, file, callback)=>{
         callback(null, './uploads');
    },
    filename:(req, file, callback)=>{
        callback(null, `image-${Date.now()}.${file.originalname}`);       
    }
})

// img filter 
const isImage = (req, file, callback)=>{
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        callback(null, true);
    }else{        
        callback(new Error('Only Image is Allowed'), false);
    }
}

var upload = multer({
    storage:imgconfig,
    fileFilter:isImage   
})

//register user image data

photo.post('/uploadphoto',upload.single("photo"), (req, res) => {
    // console.log(req.file);
    // console.log(req.body);
    const {fname}=req.body;
    const {filename}=req.file;
   
    if(!fname || !filename){
        return res.status(422).json({msg:'Please enter all fields'});
    }
    try {
        let date= moment (new Date()).format('YYYY-MM-DD HH:mm:ss');       
        db.query("INSERT INTO usersdata SET?",{username:fname,userimg:filename,date:
            date},(err, result)=>{
            if(err){
                console.log(err);
            }else{
               //console.log("Data Inserted");
               res.status(201).json({status:201,data:req.body})
            }
        })
    } catch (error) {
       res.status(422).json({status:422,error});
    }
})

// get user data
photo.get("/getdata", (req, res) => {
    try{
        db.query("SELECT * FROM usersdata",(err, result)=>{
            if(err){
                console.log(err);
            }else{
               // console.log('Data Fetched');
                res.status(201).json({status:201,data:result})
            }
        })
    }
    catch(error){
        res.status(422).json({status:422,error});
    }
})

//delete user
photo.delete("/dltuser/:id/:userimg", (req, res) => {
    const {id,userimg}=req.params;
    try{
        console.log(id);
        db.query("DELETE FROM usersdata WHERE id=?",[id],(err, result)=>{
            if(err){
                console.log(err);
            }else{
                console.log('Data Deleted');
                res.status(201).json({status:201,data:result})
            }
        })
    }
    catch(error){
        res.status(422).json({status:422,error});
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




module.exports = photo;