export async function updateUI(data) {

    document.getElementById('sentiment-score').innerHTML = data.score_tag
    document.getElementById('consistency').innerHTML = data.agreement
    document.getElementById('subjectivity').innerHTML = data.subjectivity
    document.getElementById('irony').innerHTML = data.irony
    document.getElementById('confidence').innerHTML = data.confidence
  
  }