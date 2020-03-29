import axios from 'axios'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

window.addEventListener("load", function(){

    if(document.getElementById('collectionName').value.length == 0){
        document.getElementById('send').disabled = true
    }
  
    //Check if Collection Name input is empty or not
    document.getElementById('collectionName').onchange=function(){
        if(document.getElementById('collectionName').value.length == 0){
            document.getElementById('send').disabled = true
        }else if(document.getElementById('collectionName').value.length >= 1){
            document.getElementById('send').disabled = false
        }
    }
})