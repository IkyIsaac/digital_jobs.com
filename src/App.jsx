import React from 'react'
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage,{jobLoader} from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';



const App = () => {
  // Add new Job
  const addJob = async (newJob)=>{
    const  res = await fetch ('/api/jobs',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(newJob)
    })
    return;
  }

  // Delete Job
  const deleteJob= async(id )=>{
    // Before making the actual API call we test if our function is receiving data as intended
    // console.log('delete',id)

    const  res = await fetch (`/api/jobs/${id}`,{
      method:'DELETE',
    })
    return;
  }
  
  // Update
  const updateJob = async (job)=>{
    const  res = await fetch (`/api/jobs/${job.id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(job)
    })
    return;
  }
  
  
  const router= createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout/>}>
        <Route index element={<HomePage/>} />
        <Route path="/jobs" element={<JobsPage/>}/>
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob}/>}/>
        <Route path="/jobs/:id" element={<JobPage deleteJob={deleteJob}/>} loader={jobLoader} />
        <Route path="/edit-job/:id" element={<EditJobPage updateJobSubmit={updateJob}/>} loader={jobLoader} />
        <Route path="*" element={<NotFoundPage/>}/>
      </Route>
  ))

  return <RouterProvider router={router} />
}

export default App


{/* <Router>
     <Navbar/>
      <Routes>
        <Route path="/" element={<Hero/>} />
        <Route path="/homecards" element={<HomeCards />} />
        <Route path="/joblistings" element={<JobListings />} />
        <Route path="/viewalljobs" element={<ViewAllJobs />} />
      </Routes>
      <ViewAllJobs/>
    </Router> */}