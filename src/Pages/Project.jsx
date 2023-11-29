import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { allProjectAPI } from '../services/allAPI'

function Project() {
  const [searchKey,setSearchKey] = useState("")
  const [allProjects, setAllProjects] = useState([])
  const getallProjects = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      const result = await allProjectAPI(searchKey, reqHeader)
      if (result.status === 200) {
        setAllProjects(result.data)
      } else {
        console.log(result);
      }
    }
  }
  useEffect(() => {
    getallProjects()
  },[searchKey])
  return (
    <>
      <Header />
      <div style={{ marginTop: '100px' }} className='projects'>
        <h2 className='text-center fw-bolder mb-5'>All Projects</h2>
        <div className='d-flex justify-content-center align-items-center w-100'>
          <div className="d-flex border w-50 rounded">
            <input type="text" className='form-control' placeholder='Search Projects By Technologies' onChange={e=>setSearchKey(e.target.value)} />
            <i style={{ marginLeft: '-45px', marginTop: '13px' }} class="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <Row className='mt-5 container-fluid'>
          {
            allProjects?.length>0?allProjects.map(project => (
              <Col sm={12} md={6} lg={4}>
                <ProjectCard project={project}/>
              </Col>
            )) : <p style={{"fontSize":'30px',textAlign:'center'}} className='fw-bolder text-danger m-5'>Please Login To View All Projects!!!</p>
          }
        </Row>
      </div>
    </>
  )
}

export default Project