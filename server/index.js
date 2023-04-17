const express = require('express');
const cors = require('cors');
const app = express();


const logreg=require("./routes/logreg")
const products=require("./routes/products")
const home=require("./routes/home")
const seller=require("./routes/seller")
const admin=require("./routes/admin");
const customer=require("./routes/customer")

const db=require("./db/conn");


app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST","DELETE", "PUT"],
    credentials: true
}));


app.use("/uploads", express.static("./uploads"))

app.use(customer)
app.use(logreg)
app.use(products)
app.use(home)
app.use(seller)
app.use(admin)

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });


app.listen(3001, () => {
    console.log('Server is running on port 3001');
});