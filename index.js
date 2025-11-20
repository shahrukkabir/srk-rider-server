const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wi4y4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB!");

        const db = client.db('parcelDB');
        const usersCollection = db.collection('users');
        const parcelsCollection = db.collection('parcels');
        const trackingsCollection = db.collection("trackings");
        const paymentsCollection = db.collection('payments');
        const ridersCollection = db.collection('riders');

        app.post('/users', async (req, res) => {
            const email = req.body.email;
            const userExists = await usersCollection.findOne({ email })
            if (userExists) {
                // update last log in
                return res.status(200).send({ message: 'User already exists', inserted: false });
            }
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

    }
    catch (error) {
        console.error("❌ MongoDB connection error:", error);
    }
}

//run
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Server is up and running!");
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});