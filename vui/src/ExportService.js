import axios from 'axios'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// A CHANGER --> const url = "http://localhost:6060/import/5e67bbe54b945e577482035f"
var jsonFileContent

window.addEventListener("load", function(){
    
    document.getElementById('send').onclick=function(){
        var collectionName = document.getElementById('CollectionName').value

        if(collectionName == '') {
            console.log('Collection Name cannot be empty')
        }else {
            console.log(collectionName)
            console.log(jsonFileContent)
        }
    }
    document.getElementById('input-file').addEventListener('change', getFile)
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