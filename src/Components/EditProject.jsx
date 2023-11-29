import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { BASE_URL } from '../services/baserul';
import { editProjectAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProjectResponseContent } from '../Contexts/ContextShare';


function EditProject({ project }) {
    const {editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContent)
    const [projectDetails, setProjectDetails] = useState({
        id: project._id,projectImage: "", title: project.title, language: project.language, github: project.github, website: project.website, overview: project.overview
    })
    const [preview, setpreview] = useState("")
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setProjectDetails({
            id: project._id, title: project.title, language: project.language, github: project.github, website: project.website, overview: project.overview, projectImage: ""
        })
        setpreview("")
    }
    const handleUpdate = async () => {
        const { id, title, language, github, website, overview, projectImage } = projectDetails
        if (!title || !language || !github || !website || !overview) {
            toast.info("please fill the form completely!!")
        } else {
            const reqBody = new FormData()
            reqBody.append("title", title)
            reqBody.append("language", language)
            reqBody.append("github", github)
            reqBody.append("website", website)
            reqBody.append("overview", overview)
            preview ? reqBody.append("projectImage", projectImage) : reqBody.append("projectImage", project.projectImage)
            const token = sessionStorage.getItem("token")
            if (preview) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                //call API
                const result = await editProjectAPI(id, reqBody, reqHeader)
                if (result.status === 200) {
                    handleClose()
                    //pass response to my project
                    setEditProjectResponse(result.data)
                } else {
                    console.log(result);
                    console.log(result.response.data);
                }
            } else {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                //API call
                const result = await editProjectAPI(id, reqBody, reqHeader)
                if (result.status === 200) {
                    handleClose()
                    //pass response to my project
                    setEditProjectResponse(result.data)
                } else {
                    console.log(result);
                    console.log(result.response.data);
                }
            }
        }
    }


    useEffect(() => {
        if (projectDetails.projectImage) {
            setpreview(URL.createObjectURL(projectDetails.projectImage))
        }
    }, [projectDetails.projectImage])

    return (
        <>
            <button onClick={handleShow} className="btn"> <i className="fa-solid fa-pen-to-square fa-2x"></i> </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className="col-lg-6 mt-4">
                            <label>
                                <input type="file" style={{ display: 'none' }} onChange={e => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })} />
                                <img className='img-fluid' src={preview ? preview : `${BASE_URL}/uploads/${project.projectImage}`} alt="" />
                            </label>

                        </div>
                        <div className="col-lg-6">
                            <div className='mb-3'>
                                <input type="text" className='form-control' placeholder='Project Title' value={projectDetails.title} onChange={e => setProjectDetails({ ...projectDetails, title: e.target.value })} />
                            </div>
                            <div className='mb-3'>
                                <input type="text" className='form-control' placeholder='Language Used' value={projectDetails.language} onChange={e => setProjectDetails({ ...projectDetails, language: e.target.value })} />
                            </div>
                            <div className='mb-3'>
                                <input type="text" className='form-control' placeholder='GitHub Link' value={projectDetails.github} onChange={e => setProjectDetails({ ...projectDetails, github: e.target.value })} />
                            </div>
                            <div className='mb-3'>
                                <input type="text" className='form-control' placeholder='Website Link' value={projectDetails.website} onChange={e => setProjectDetails({ ...projectDetails, website: e.target.value })} />
                            </div>
                            <div className='mb-3'>
                                <input type="text" className='form-control' placeholder='Project Overview' value={projectDetails.overview} onChange={e => setProjectDetails({ ...projectDetails, overview: e.target.value })} />
                            </div>

                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="warning" onClick={handleUpdate}>Update</Button>
                </Modal.Footer>
                <ToastContainer position='top-right' theme='colored' />
            </Modal>
        </>

    )
}

export default EditProject