import { useEffect, useState } from "react";
import { getDetailsApi, setDetailsApi } from "../api/detailsapi";

export default function useDetails(){
    let [details, setDetails] = useState({})
    let [detailsLoading, setDetailsLoading] = useState(false)
    let [detailsStatus, setDetailsStatus] = useState({error: false, success: true, message: ""})

   

    async function setDetail(payload){
        setDetailsLoading(true)
        let res = await setDetailsApi(payload)
        if(res.err){
            setDetailsStatus({error: true, success: false, message: res.error?.message})
            setDetailsLoading(false)
        }else{
            await getDetails()
        }
    }

    async function getDetails(){
        setDetailsLoading(true)
        let res = await getDetailsApi()
        if(res.err){
            setDetailsStatus({error: true, success: false, message: res.error.message})
            setDetailsLoading(false)
        }else{
            setDetails(res.result?.data?.data)
            setDetailsLoading(false)
        }
    }

    useEffect(()=>{
        getDetails()
    }, [])

    return { 
        details, 
        detailsLoading, 
        detailsStatus, 
        setDetail
    }
}