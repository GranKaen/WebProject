const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { json } = require('express');

const app = express();

app.use(express.json());

app.get('/', cors(), (req, res) => {
  res.send("Back-End side Home, check /books to view all the books")
})

app.get('/books', cors(), (req, res) => {
  fs.readFile('./books.json', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    //console.log(JSON.parse(data))
    res.json(JSON.parse(data))
  })
});

app.post('/addBooks', cors(), (req, res) => {
  var request = JSON.stringify(req.body)
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Access-Control-Allow-Origin');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  var current = ""
  fs.readFile('./books.json', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    console.log("1 " + data)
    current = data
  })
  setTimeout(function(){
  var newData2 = current.substring(0, current.length - 1);
  console.log("2 " + newData2)
  var lastID1 = newData2.split("{") 
  console.log("mm " + lastID1.length)
  var lastID2 = lastID1[lastID1.length-2]
  console.log("3 " + lastID2)
  var lastID3 = lastID2.split('"')
  var lastID4 = lastID3[lastID3.length-2]
  var lastID5 = parseInt(lastID4) + 1
  console.log("4 " + lastID5)
  var newData3 = newData2 + ',"' + lastID5 + '"' + ":" + request + "}"
  console.log("5 " + newData3)

  fs.writeFile('./books.json', newData3, function (err) {
    if (err) throw err;
    console.log('Replaced!');
  });
  }, 1000);
  res.send("meow")
})

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);