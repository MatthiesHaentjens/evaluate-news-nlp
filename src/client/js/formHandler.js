function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    console.log(formText)
    
    try {
        Client.getSentiment(formText)
            .then((data) => {
                console.log(data)
            })
    }
    catch (error) {
        console.log('error', error);
    }

    // console.log("::: Form Submitted :::")
    // fetch('http://localhost:8080/test')
    // .then(res => res.json())
    // .then(function(res) {
    //     document.getElementById('results').innerHTML = res.message
    // })
}

export { handleSubmit }
