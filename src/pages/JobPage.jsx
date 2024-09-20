import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import Spinner from "../components/Spinner"

const JobPage = () => {
    const {id}= useParams()
    const [job,setJob]=useState(null)
    const [loading,setLoading]= useState(true)

    useEffect(()=>{
        const fetchJob= async ()=>{
            try{
                const res=await fetch(`/api/jobs/${id}`);
        
                const data= await res.json();
                console.log(data)
                setJob(data)
              }
              catch(error){
                console.error('Error fetching data...',error)
              } finally{
                setLoading(false)
              }
        }
        fetchJob()
    },[])


  return (
    loading ? <Spinner/>:(<h1>Job {job.id}</h1>)
  )
}


export default JobPage