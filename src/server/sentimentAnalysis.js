const fetch = require("node-fetch");

const baseURLMeaningCloud = 'https://api.meaningcloud.com/sentiment-2.1?key='
const apiKeyURLMeaningCloud = process.env.API_KEY

async function getSentiment(text) {
    const res = await fetch(baseURLMeaningCloud+apiKeyURLMeaningCloud+'&of=json&txt='+text+'&lang=en');
    console.log(res)
    try {
      const data = await res.json();
      return data;
    }
    catch(error) {
      console.log("error", error);
    }
}

module.exports = { getSentiment }



