const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017/?readPreference=primary&ssl=false&directConnection=true";

app.use(bodyParser.json())

app.post('/', (req, res) => {
  console.log(req.body)
  
  const client = new MongoClient(uri);

  async function run() {
    try {
      const database = client.db('mongodemo');
      const student = database.collection('student');
      const teacher = database.collection('teacher')

      // Query for a movie that has the title 'Back to the Future'
      // const query = [{ name: 'Charisse', age: 50000 }, {name: "Maryam", age: 100000}];
      const result = await student.updateOne({"name": "David"}, {$set: {"age": 20}});
      const result2 = await teacher.findOne(req.body[1])

      console.log(result, result2);
      
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
  res.send("Request received");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


