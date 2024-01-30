// Import Express.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

// Initialize an instance of Express.js
const app = express();

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Specify on which port the Express.js server will run
const PORT = process.env.PORT || 3006;

//importing db.json file
const noteData = require('./public/db/db.json');

// Static middleware pointing to the public folder
app.use(express.static('public'));

// Create Express.js routes for default '/', '/send' and '/routes' endpoints
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/api', (req, res) => {
  res.json(noteData);
})


app.post('/new', (req, res) => {
  
  // Access the data sent in the POST request
  const postData = req.body;
    
  // Do something with the data
  console.log(postData);
  console.log(postData.title);
  console.log(postData.person);
 

  // Read existing JSON file
  const dbJson = JSON.parse(fs.readFileSync("./public/db/db.json","utf8"));

    // Add new data to existing JSON object
    dbJson.push(postData);

    // Write updated JSON data back to file
    

 // Write JSON data to a file
 
 fs.writeFileSync("./public/db/db.json",JSON.stringify(dbJson));
 res.json(dbJson);
 
});

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
