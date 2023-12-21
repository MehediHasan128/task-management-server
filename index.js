const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');


app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://task-management:QN5PAryLFQfICAkG@cluster0.jmtxbp5.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();




    const taskCollection = client.db("taskManagement").collection('task')


    app.post('/task', async(req, res) =>{
        const task = req.body;
        const result = await taskCollection.insertOne(task);
        res.send(result)
    })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);














app.get("/", (req, res) =>{
    res.send("Tassk managemnt server is running")
})

app.listen(port, () =>{
    console.log(`This server is running on port ${port}`);
})



// task-management
// QN5PAryLFQfICAkG