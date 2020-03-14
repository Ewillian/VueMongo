import axios from 'axios'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
const url = "http://localhost:6060/api/import/5e67b699b57e321f3781ec3d"

class ImportService {
    //get data
    static getData(){
        return new Promise(async (resolve, reject) => {
            try{
                const res = await axios.get(url)
                const data = res.data
                resolve(
                    data.map(result => ({
                    ...result
                    }))
                )
            } catch(err) {
                reject(err)
            }
        })
    }
}

export default ImportService