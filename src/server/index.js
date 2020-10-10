const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
// const meaningCloud = require('./sentimentAnalysis.js')

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
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/check', function (req, res) {

    const url = req.body.url
    
    let options = {
        'method': 'POST',
        'hostname': 'api.meaningcloud.com',
        'path': encodeURI('/sentiment-2.1?key=' + apiKeyURLMeaningCloud + '&lang=en&url=' + url),
        'headers': {
        },
        'maxRedirects': 20
      };
      
    const request = https.request(options, function (x) {
        let chunks = [];
        
        x.on("data", function (chunk) {
            chunks.push(chunk);
        });
        
        x.on("end", function (chunk) {
            let body = Buffer.concat(chunks);
            res.send(body)
        });

        x.on("error", function (error) {
            console.error(error);
        });

    });
    
    request.end();
    

})

module.exports = app