
const baseURLMeaningCloud = 'https://api.meaningcloud.com/sentiment-2.1?key='
const apiKeyURLMeaningCloud = process.env.API_KEY

export async function getSentiment(text) {
    const res = await fetch(baseURLMeaningCloud+apiKeyURLMeaningCloud+'&of=json&txt='+text+'&lang=en');
    try {
      const data = await res.json();
      return data;
    }
    catch(error) {
      console.log("error", error);
    }
}

export async function postData( url = '', data = {}) {
    const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
   // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
    });
    try {
      const data = await res.json();
      return data;
    }
    catch(error) {
      console.log("error", error);
    }
  }