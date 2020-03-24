import axios from 'axios'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
const url = "http://localhost:6060/import/5e67bbe54b945e577482035f"

class ImportService {
    //get data
    static getData(){
        return new Promise(async (resolve, reject) => {
            try{
                const res = await axios.get(url)
                const data = res.data
                //console.log(data)
                console.log(Object.values(data))
                resolve(
                    Object.values(data).map(function(results) {
                    return results
                    })
                )
                
            } catch(err) {
                reject(err)
            }
        })
    }
}

export default ImportService

// v-for="(data, index) in results"
// v-bind:item="data"
// v-bind:index="index"
// v-bind:key="data.id"