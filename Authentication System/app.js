
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const db =  require('./db_handler')

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");

// Home page Get route
app.get("/", function(req,res){
    res.render("signup");
});

// Post request for home page
app.post("/", async function(req,res){
    let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let email = req.body.email;
    let password = req.body.password;
  
    const response = await db.insertData({
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password
    });
    console.log("response:" ,response);
    if (response){
        console.log("Inserted data.");
        res.redirect("/signin");
    }
    else{
        res.send("<script>alert('Email already registered.'); window.location.href = '/';</script>");
        // res.redirect("/");
    }
    
});


// Post request for signin page
app.post("/signin", async function(req,res){
    let email = req.body.email;
    let password = req.body.password;
    jsonData ={
        "email": email,
        "password": password,
    }
    const response = await db.searchData(jsonData);
    console.log("response",response);
    if(response){
        const users = await db.getData();
        let currentUser;
        console.log(users)
       
        users.forEach(user=>{
            if(user.email === jsonData.email){
                // console.log("Matched User", user);
                currentUser = user;
                users.splice(user,1);
                console.log(currentUser)
            }
        });
        
        res.render("success", {users: users, user:currentUser});
    }else{
        res.render("failure");
    }
    
});

// Get request for sign in page
app.get("/signin",function(req,res){
    res.render("signin");
})

// Get request for sign up page
app.get("/signup",function(req,res){
    res.redirect("/");
})

// Post for handling try again option if sign in fail and redirect to sign in
app.post("/failure", function(req,res){
    res.redirect("/signin");
});

// Server listen at port 3000
app.listen(3000, function(){
    console.log('Server is running at port 3000');
});