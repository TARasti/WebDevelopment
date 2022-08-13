const {MongoClient, ServerApiVersion} = require('mongodb');

function dbClient(){
    const uri = "mongodb://localhost:27017/users";
    const client = new MongoClient(uri,{serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        }
    });
    return client;
}
//  Search for data
async function searchData(data){
    const client = dbClient();

    try {
        // Connecting to database
        await client.connect();
        console.log('Connected...');
        // find({}) find method without any parameters return all records
        const rdata = await client.db("accounts").collection("user").findOne(data);
        // console.log(rdata)
        if(rdata){
            // console.log(rdata)
            return 1;
        }
        else{
            console.log("Does not exist");
            return 0;
        }
    }
     catch (error) {
        console.log(error);
    } finally{
        await client.close();
    }
}

// Creating function for geting data from mongodb
async function getData(){
    const client = dbClient();

    try {
        // Connecting to database
        await client.connect();
        console.log('Connected...');
        // find({}) find method without any parameters return all records
        const data = await client.db("accounts").collection("user").find({}).toArray();
        return data;
    }
     catch (error) {
        console.log(error);
    } finally{
        await client.close();
    }
}

// Creating Function that will insert data
async function insertData(data){
    const client = dbClient();
    try {
        // Connecting to database
        await client.connect();
        console.log('Connected...',data.email);
        const isExist = await searchData({"email":data.email});
        console.log(isExist)
        if(isExist){
            return 0;
        }else{
            const rdata = await client.db("accounts").collection("user").insertOne(data);
            return 1;
        }
        
    }
     catch (error) {
        console.log(error);
        return 0;
    } finally{
        await client.close();
    }
}

// Creating function that will delete data from db

async function deleteData(data){
    const client = dbClient();
    try {
        // Connecting to database
        await client.connect();
        console.log('Connected...');
        if (getData()){
            await client.db("accounts").collection("user").deleteOne(data);
            return 1;
        }
        else{
            // console.log("Do data in db");
            return 0;
        }  
        
    }
     catch (error) {
        console.log(error);
        return 0;
    } finally{
        await client.close();
    }
}

// getData();

module.exports.getData = getData;
module.exports.insertData = insertData;
module.exports.deleteData = deleteData;
module.exports.searchData = searchData;