import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import titleimage from '../Assests/title.jpg'
import ProjectCard from '../Components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProjectAPI } from '../services/allAPI'
function Home() {
  const [loggedin, setLoggedin] = useState(false)
  const [homeProjects, setHomeProjects] = useState([])
  // api calling
  const getHomeProjects = async () => {
    const result = await homeProjectAPI()
    if (result.status === 200) {
      setHomeProjects(result.data)
    } else {
      console.log(result);
      console.log(result.response.data);
    }
  }
  // console.log(homeProjects);
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLoggedin(true)
    } else {
      setLoggedin(false)
    }
    // api call
    getHomeProjects()
  }, [])

  return (
    <>
      {/* landing section */}
      <div style={{ width: '100%', height: '100vh', backgroundColor: '#90ee90' }} className='container-fluid rounded'>
        <Row className='p-5 align-items-center'>
          <Col sm={12} md={6}>
            <h1 style={{ fontSize: '80px' }} className='fw-bolder text-light'><i className="fa-brands fa-stack-overflow fa-bounce"></i> Project-Fair</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt nesciunt eveniet, mollitia doloremque alias nostrum quae dolor dolore? Saepe autem sint nesciunt cum totam perspiciatis laudantium maiores ea aut rerum.</p>
            {
              loggedin ?
                <Link to={'/dashboard'} className='btn btn-warning'>Manage Your Projects<i className="fa-solid fa-right-long fa-beat ms-2"></i> </Link>
                :
                <Link to={'/login'} className='btn btn-warning'>Start To Explore<i className="fa-solid fa-right-long fa-beat ms-2"></i> </Link>

            }
          </Col>
          <Col sm={12} md={6}>
            <img style={{ marginTop: '100px', borderRadius: '50%' }} className='w-75' src={titleimage} alt="" />
          </Col>
        </Row>
      </div>

      {/* all projects */}
      <div className="all-projects mt-5">
        <h1 className='text-center mb-5'>Explore Our Projects</h1>
        <marquee scrollAmount={25}>
          <div className='d-flex justify-content-between'>
            {homeProjects?.length > 0 ? homeProjects.map(project => (
              <div className='me-5' style={{ width: '500px' }}>
                <ProjectCard project={project}/>
              </div>
            )) : null

            }
          </div>
        </marquee>
        <div className="text-center mt-5 mb-5"> <Link to={'/project'}>View More Projects</Link></div>
      </div>
    </>
  )
}

export default Home

