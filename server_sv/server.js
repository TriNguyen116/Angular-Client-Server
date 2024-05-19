const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {MongoClient, Collection} = require('mongodb');
const multer = require('multer')

const db = {
  name: "angular-app-db",
  collection: "item"
}
var corsOptions = {
  origin: 'http://localhost:4200',
  //domain được phép gọi request mà server chấp nhận (vd: request đến từ http://localhost:4200  được server cho phép), 
  //giả sử node server là http://localhost:8000
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
};
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = "mongodb+srv://nguyentantria4:1234@22012035-angular.2hixt55.mongodb.net/?retryWrites=true&w=majority&appName=22012035-angular"
const client = new MongoClient(uri)
var database = client.db(db.name);
var collection = database.collection(db.collection)
app.listen(8000,()=>{
  client.connect().then(()=>{
       database
       collection
  })
})
app.get('/api/get',  (req,res)=>{
  collection.find({}).toArray().then(data=>{
    console.log(data)
    res.send(data)
  })
})

app.post('/api/post', async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debug log to see the request body
    const name = Array.isArray(req.body) ? req.body[0]?.name : req.body.name;
    
    if (!name) {
      return res.status(400).send("Name field is required");
    }

    // Find the document with the highest id
    const highestDoc = await collection.find().sort({ id: -1 }).limit(1).toArray();
    const highestId = highestDoc.length > 0 ? parseInt(highestDoc[0].id) : 0;

    const newItem = {
      id: (highestId + 1).toString(),
      name: name
    };

    await collection.insertOne(newItem);
    res.status(201).send(newItem);
  } catch (err) {
    res.status(500).send(err.message);
  }
});



app.delete('/api/delete', async (req, res) => {
  try {
    const result = await collection.deleteOne({ id: req.query.id });
    if (result.deletedCount === 1) {
      res.status(200).send({ message: 'Item deleted successfully' });
    } else {
      res.status(404).send({ message: 'Item not found' });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// async function main(){
//   try {
//     await client.connect()
//     console.log("Connected to MongoDB");
//     await listDatabases(client);
//     app.listen(8000,()=>{
//       console.log("Connect Server")
//     });
    
//   }catch(error){
//     console.log(error);
//   }
// }
// main().catch(console.error);

// async function listDatabases(client){
//   databasesList = await client.db().admin().listDatabases();

//   console.log("Databases:");
//   databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };



app.route('/api/items').get((req, res) => {
  console.log('items');
  res.send([{ name: 'lilly', id:'id1' }, { name: 'Oscar', id:'id3333' }]
  );
 
});

//insert
app.route('/api/insert').post((req, res) => {
		 
  console.log('insert item');
  console.log('item info:'+req.body);
  res.send(201, req.body);
  // res.status(201).send(req.body);
  });


