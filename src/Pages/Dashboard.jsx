import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import MyProfile from '../Components/MyProfile'
import MyProjects from '../Components/MyProjects'

function Dashboard() {
  const [username,setUsername] = useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
    }
  },[])
  return (
    <>
      <Header insideDashboard />
      <Row style={{ marginTop: '100px' }} className='container-fluid'>
        <Col sm={12} md={8}>
          <h2>Welcome <span className='text-warning'>{username}</span> </h2>
         <MyProjects/>
        </Col>
        <Col sm={12} md={4}>
          <MyProfile/>
        </Col>
      </Row>
     
    </>
  )
}

export default Dashboard