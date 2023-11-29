import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addprojectAPI } from '../services/allAPI';
import { addProjectResponseContext } from '../Contexts/ContextShare';

function AddProjects() {
    const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
    const [show, setShow] = useState(false);
    const [projectDetails, setProjectDetails] = useState({
         title: "", language: "",overview: "", github: "", website: "",projectImage: "" 
    })
    const [preview, setpreview] = useState("")
    const [token, setToken] = useState("")
    const handleClose = () => {
        setShow(false);
        setProjectDetails({
            title: "", language: "",overview: "", github: "", website: "",projectImage: "" 
        })
        setpreview("")
    }
    const handleShow = () => setShow(true);
    // console.log(projectDetails);

    useEffect(() => {
        if (projectDetails.projectImage) {
            setpreview(URL.createObjectURL(projectDetails.projectImage))
        }
    }, [projectDetails.projectImage])

    useEffect(() => {
        if(sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        } else {
            setToken("")
        }
    },[])

    const handleAdd = async(e) => {
        e.preventDefault()
        const { title, language, overview, projectImage, github, website } = projectDetails
        if (!title || !language || !overview || !projectImage || !github || !website) {
            toast.info("please fill the form completely!!")
        }else{
            const reqBody = new FormData()
            reqBody.append("title", title)
            reqBody.append("language", language)
            reqBody.append("overview", overview)
            reqBody.append("projectImage", projectImage)
            reqBody.append("github", github)
            reqBody.append("website", website)
            if (token) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const result = await addprojectAPI(reqBody,reqHeader)
                if (result.status===200) {
                    console.log(result.data);
                    handleClose()
                    setAddProjectResponse(result.data)
                } else {
                    console.log(result);
                    toast.warning(result.response.data);
                }
            }

        }
    }

    return (
        <div>
            <button onClick={handleShow} className='btn btn-warning'>Add Project</button>
            <div>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    size='lg'
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Project Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='row'>
                            <div className="col-lg-6 mt-4">
                                <label>
                                    <input type="file" style={{ display: 'none' }} onChange={e => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })} />
                                    <img className='img-fluid' src={preview ? preview : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png"} alt="" />
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
                        <Button variant="warning" onClick={handleAdd}>Add</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <ToastContainer
                theme="colored"
                autoClose={2000}
                position="top-right" />
        </div>
    )
}

export default AddProjects