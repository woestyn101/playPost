// Import Express.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

// Initialize an instance of Express.js
const app = express();

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Specify on which port the Express.js server will run
const PORT = process.env.PORT || 3006;
app.use(express.json());
//importing db.json file
const noteData = require('./db/db.json');

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
app.post('/api', (req, res) => {

  //copied code:
  const dbJson = JSON.parse(fs.readFileSync("db/db.json","utf8"));
  const newFeedback = {
    title: req.body.title,
    person: req.body.person,
    
  };
  dbJson.push(newFeedback);
  fs.writeFileSync("db/db.json",JSON.stringify(dbJson));
  res.json(dbJson);

  // end of copied code

      //    var dbJson =  fs.readFile('./db/db.json', (err, data) => {
      //       thedata = JSON.parse(data)
      //        console.log(thedata);        
      //   });


      //    var newFeedback = {
      //   title: req.body.title,
      //   person: req.body.person,
       
      // };
      // console.log(newFeedback);
      // console.log(dbJson);
     

      
      
      // function writeNewFile (allnewdata) { 
      //   fs.writeFile('./db/db.json', JSON.stringify(allnewdata), (err) => {
      //     if (err) throw err;
      //     console.log('The file has been saved!');
      //   });

      //  }
     
    
      })//end post


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

