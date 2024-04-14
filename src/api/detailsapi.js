import axios from "axios"
const base_url = "https://token-swiper-server.onrender.com"

async function getDetailsApi(){
    try{
        let res = await axios.get(`${base_url}/details`)
        console.log(res)
        return{err: false, result: res}
    }catch(err){
        return { err: true, error: err}
    }
}

async function setDetailsApi(payload){
    try{
        let res = await axios.post(`${base_url}/details`, payload, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        } )
        console.log(res)
        return {err: false, result: res}
    }catch(err){
        return{err: true, error: err}
    }
}


export { getDetailsApi, setDetailsApi }