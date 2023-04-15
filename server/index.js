const express = require('express');
const cors = require('cors');
const app = express();


const logreg=require("./routes/logreg")
const products=require("./routes/products")

const db=require("./db/conn");


app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST","DELETE"],
    credentials: true
}));


app.use("/uploads", express.static("./uploads"))


app.use(logreg)
app.use(products)

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });


app.listen(3001, () => {
    console.log('Server is running on port 3001');
});