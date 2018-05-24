const express = require('express');
const app = express();
const port = (process.env.VCAP_APP_PORT || 3000);
var Sentiment = require('sentiment');
var sentiment = new Sentiment();
var bodyParser = require('body-parser');
var storage = [];
var indexCounter = 1;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Set Static Public Directory for Serving HTML
app.use('/', express.static(__dirname + '/public'));


// //Test Routes
// app.get('/', (req, res) => res.send('Hello World'));

app.get('/hello', function(req, res){
  res.send('Heyyyyy Girl.');
})

//Analyze the Sentiment incoming from Form Data
app.post('/formData', function (req, res){
  var incoming = req.body;
  var score = sentiment.analyze(incoming.message);
  res.send(score);
  var combined = {
    index: indexCounter,
    text: incoming,
    score: score
  };
  storeResult(combined);
});

app.listen(port, () => console.log("Magic happens on port: " + port ));

function storeResult(result){
  storage.push(result);
  indexCounter++;
  for (i=0;i<storage.length;i++){
    console.log(storage);
  }
}
