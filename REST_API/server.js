// Importing modules
const express = require("express");
const bodyparser = require("body-parser");
const {getData, deleteData, insertData} = require("./db_handler");


// Creating object of express
const app = express();
app.use(bodyparser.json());
// Run server at port 3000
app.listen(3000, ()=>{
    console.log("Server listening at port 3000.");
});

// Handle get request at main '/' page
app.get('/',async (req,res)  => {
    await getData().then((result)=>{
        res.send({'status code': res.statusCode,
        'data': result});
    });
});
    

// request for deleting record
app.delete('/',async (req,res)  => {
    await deleteData(req.body).then(()=>{
        res.send(
            {'status code': res.statusCode,
            'data': req.body});
    });
});

// request for inserting record
app.post('/',async (req,res)  => {
    await insertData(req.body).then(()=>{
        res.send({'status code': res.statusCode,
            'data': req.body});
    });
});
// 'https://www.youtube.com/'
