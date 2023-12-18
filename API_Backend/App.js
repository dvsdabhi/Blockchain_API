require('dotenv').config();
const express = require("express");
const app = express();
const Routes = require("./routers/Route.js");
const cors = require('cors');

app.use(cors());
// app.use(express.text());
app.use(express.json());
app.use("/api/route",Routes);

app.listen(3000,()=>{
    console.log(`Yes I Am Connected`);
});