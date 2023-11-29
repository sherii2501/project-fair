import React, { useState } from 'react'
import { Card,Modal,Col,Row } from 'react-bootstrap'
import projectPic from '../Assests/plant store.png'
import { BASE_URL } from '../services/baserul';
function ProjectCard({project}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
 {project &&<Card style={{width:'28rem'}} className='shadow mb-5 btn' onClick={handleShow}>
      <Card.Img style={{height:'200px'}}  variant="top" src={project?`${BASE_URL}/uploads/${project.projectImage}`:projectPic} />
      <Card.Body>
        <Card.Title>{project?.title}</Card.Title>
      </Card.Body>
    </Card>}
    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col md={6}>
                <img className='img-fluid' style={{height:'200px'}} src={project?`${BASE_URL}/uploads/${project.projectImage}`:projectPic} alt="project img" />
                </Col>
                <Col md={6}>
                    <h2 className='text-warning fw-bolder'>{project?.title}</h2>
                    <p>Project Overview : {project?.overview}</p>
                    <p >Language Used: <span className='fw-bolder text-danger'>{project?.language}</span></p>
                </Col>
            </Row>
            <div className='mt-3'>
                <a href="https://github.com/parvathysanthosh21/pronia" target='_blank' className='me-3 btn'><i class="fa-brands fa-github fa-xl"></i></a>
                <a href="https://pronia.netlify.app/" target='_blank' className='me-3 btn'><i class="fa-solid fa-link fa-xl"></i></a>
            </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ProjectCard