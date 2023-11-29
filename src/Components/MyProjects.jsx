import React, { useContext, useEffect, useState } from 'react'
import AddProjects from './AddProjects'
import { deleteProjectAPI, userProjectAPI } from '../services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import { addProjectResponseContext, editProjectResponseContent } from '../Contexts/ContextShare';
import EditProject from './EditProject';

function MyProjects() {
    const {editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContent)
    const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
    const [userProject,setUserProject] = useState([])
    const getUserProject = async ()=>{
        if(sessionStorage.getItem("token")){
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
            const result =  await userProjectAPI(reqHeader)
            if(result.status===200){
                setUserProject(result.data)
            }else{
                console.log(result);
                toast.warning(result.response.data)
            }
        }
    }
    const handleDelete=async(id)=>{
        const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        const result=await deleteProjectAPI(id,reqHeader)
        if(result.status===200){
            getUserProject()
        }else{
            toast.error(result.response.data)
        }
    }
    useEffect(()=>{
        getUserProject()
    },[addProjectResponse,editProjectResponse])
  return (
    <div className='card shadow p-3 mt-3 mb-5'>
        <div className='d-flex'>
            <h3>My Projects</h3>
            <div className="ms-auto"><AddProjects/></div>
        </div>
        <div className="mt-4">

            {
                userProject?.length>0?userProject.map(project=>(
                    <div className="border d-flex flex align-items-center rounded p-2 mb-4">
                    <h6>{project.title}</h6>
                    <div className="icons ms-auto">
                        <EditProject project={project}/>
                        <a href={`${project.github}`} target='_blank' className="btn">
                        <i class="fa-brands fa-github fa-2x"></i>
                        </a>
                        <button className="btn" onClick={()=>handleDelete(project._id)}>
                        <i class="fa-solid fa-trash fa-2x"></i>
                        </button>
                    </div>
                </div>
                )):
                <p className='text-danger fw-bolder mt-2'>No Projects uploaded yet!!!</p>

            }
        </div>
        <ToastContainer
                theme="colored"
                autoClose={2000}
                position="top-right" />
    </div>
  )
}

export default MyProjects