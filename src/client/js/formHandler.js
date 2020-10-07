function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('text').value
    
    try {
        postData('/check', {text:formText})
            .then((data) => {
                console.log(data)
            })
    }
    catch (error) {
        console.log('error', error);
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

export { handleSubmit }
