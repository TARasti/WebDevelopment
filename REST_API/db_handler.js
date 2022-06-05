const {MongoClient, ServerApiVersion} = require('mongodb');

function dbClient(){
    const uri = "mongodb+srv://Tanveer:skipq2022@sprin4cluster.roblb.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri,{serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        }
    });
    return client;
}
// Creating function for geting data from mongodb
async function getData(){
    const client = dbClient();

    try {
        // Connecting to database
        await client.connect();
        console.log('Connected...');
        // find({}) find method without any parameters return all records
        const data = await client.db("webhealth").collection("urls").find({}).toArray();
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
        console.log('Connected...');
        await client.db("webhealth").collection("urls").insertOne(data);
        return 1;
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
        await client.db("webhealth").collection("urls").deleteOne(data);
        return 1;
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