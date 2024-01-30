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

// POST method route
app.post('/', (req, res) => {
    const newData = req.body;
  res.send(newData);
 // res.send('POST request to the homepage')
 fs.readFile('./public/db/db.json', (err, data) => {
  if (err) throw err;
  var olddata = JSON.parse(data);
  console.log(typeof(olddata));
  console.log(typeof(newData));
  olddata.push(newData);
  console.log(olddata);
  writeNewfile(olddata);
});

// Write the updated data back to the file
function writeNewfile (olddata) {

  fs.writeFile('./public/db/db.json', JSON.stringify(olddata), (err) => {
    if (err) {
        console.error(err);
        //res.status(500).send('Error writing file');
       
    }
   
   
    console.log("data saved");
          
  
   
  });
  
} 


 
})


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

