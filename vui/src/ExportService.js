import axios from 'axios'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

window.addEventListener("load", function(){

    if(document.getElementById('collectionName').value.length == 0){
        document.getElementById('send').disabled = true
    }
    
    document.getElementById('input-file').addEventListener('change', getFile)
    document.getElementById('input-file').onchange=function(){
        document.getElementById('content-target').focus()
    }

    //Check if Collection Name input is empty or not
    document.getElementById('collectionName').onchange=function(){
        if(document.getElementById('collectionName').value.length == 0){
            document.getElementById('send').disabled = true
        }else if(document.getElementById('collectionName').value.length != 1){
            document.getElementById('send').disabled = false
        }
    }
})

function getFile(event) {
    const input = event.target
    if ('files' in input && input.files.length > 0) {
        placeFileContent(document.getElementById('content-target'),input.files[0])
  }
}

function placeFileContent(target, file) {
    readFileContent(file).then(content => {
        target.value = content
    })
}

function readFileContent(file) {
	const reader = new FileReader()
    return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result)
    reader.onerror = error => reject(error)
    reader.readAsText(file)
  })
}