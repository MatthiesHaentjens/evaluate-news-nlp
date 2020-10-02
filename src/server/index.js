const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const meaningCloud = require('./sentimentAnalysis.js')

const app = express()

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)

var https = require('follow-redirects').https;

const apiKeyURLMeaningCloud = process.env.API_KEY

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/check', function (req, res) {
    console.log(req)
    const text = req.body.text
    console.log(text)
    
    var options = {
        'method': 'POST',
        'hostname': 'api.meaningcloud.com',
        'path': encodeURI('/sentiment-2.1?key=' + apiKeyURLMeaningCloud + '&lang=en&txt=' + text),
        'headers': {
        },
        'maxRedirects': 20
      };
      
    var request = https.request(options, function (res) {
        var chunks = [];
        
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
        
        res.on("end", function (chunk) {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
        });
        
        res.on("error", function (error) {
            console.error(error);
        });
    });
    
    request.end();

    res.send(body)
})

