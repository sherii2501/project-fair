import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthorisationContext } from '../Contexts/TokenAuth'

function Header({ insideDashboard }) {
  const {isAuthorized,setIsAuthorized}=useContext(tokenAuthorisationContext)
  const navigate = useNavigate()
  const handleLogout=()=>{
    // remove all existing user details from browser
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setIsAuthorized(false)
    // navigate to login page
    navigate('/')
  }
  return (
    <>
      <Navbar style={{ backgroundColor: '#90ee90' ,zIndex:"1"}} className="position-fixed top-0 w-100" >
        <Container>
          <Navbar.Brand>
            <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
              <i className="fa-brands fa-stack-overflow fa-bounce"></i>  Project Fair
            </Link>
          </Navbar.Brand>
          {insideDashboard &&
            <button onClick={handleLogout} style={{ border: 'none', background: 'none', fontSize: '20px', color: 'white' }}>Logout <i class="fa-solid fa-right-from-bracket"></i></button>
          }        </Container>
      </Navbar>
    </>
  )
}

export default Header