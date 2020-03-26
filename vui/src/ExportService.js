import axios from 'axios'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// A CHANGER --> const url = "http://localhost:6060/import/5e67bbe54b945e577482035f"
var jsonFileContent
var collectionName = ''

window.addEventListener("load", function(){
    if(document.getElementById('collectionName').value.length == 0){
        document.getElementById('send').disabled = true
        //console.log('Collection Name is empty')
        console.log(document.getElementById('collectionName').value.length)
        
    }

    document.getElementById('send').onclick=function(){
        collectionName = document.getElementById('collectionName').value
        console.log(collectionName)
        console.log(jsonFileContent)
    }
    
    document.getElementById('input-file').addEventListener('change', getFile)

    //Check if Collection Name input is empty or not
    document.getElementById('collectionName').onchange=function(){
        if(document.getElementById('collectionName').value.length == 0){
            document.getElementById('send').disabled = true
            console.log('vide')
            console.log(document.getElementById('collectionName').value.length)
        }else if(document.getElementById('collectionName').value.length != 1){
            console.log('there is a name')
            document.getElementById('send').disabled = false
        }
    }
     

    
})

function lockButton() {
    if(document.getElementById('collectionName').length = 1){
        document.getElementById('send').disabled = true
        console.log('vide')
    }else if(document.getElementById('collectionName').length > 1){
        console.log('there is a name')
        document.getElementById('send').disabled = false
    } 
}


function getFile(event) {
    const input = event.target
    if ('files' in input && input.files.length > 0) {
        placeFileContent(document.getElementById('content-target'),input.files[0])
  }
}

function placeFileContent(target, file) {
    readFileContent(file).then(content => {
        target.value = content
        jsonFileContent = JSON.parse(content)
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

export {collectionName}