
import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tokenAuthorisationContext } from '../Contexts/TokenAuth';

function Auth({register}) {
  const {isAuthorized,setIsAuthorized}=useContext(tokenAuthorisationContext)
  const navigate = useNavigate()
  const [userData,setUserData] = useState({
    username:"",email:"",password:""
  })
  const isRegisterForm = register?true:false

   const handleRegister = async (e) =>{
    e.preventDefault()
    const {username,email,password} = userData
    if(!username || !email || !password){
      toast.info("Please fill the form completely")
    }else{
      const result = await registerAPI(userData)
      if(result.status===200){
        toast.success(`${result.data.username} has registerd successfully!!!`)
        setUserData({
          username:"",email:"",password:""
        })
        navigate('/login')
      }else{
        toast.warning(result.response.data)
        console.log(result);
      }
    }
   }
  const handleLogin = async (e)=>{
    e.preventDefault()
    const {email,password} = userData
    if(!email || !password){
      toast.info("Please fill the form completely")
    }else{
      const result = await loginAPI(userData)
      if(result.status===200){
        // toast.success(`${result.data.username} has registerd successfully!!!`)
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)
        setIsAuthorized(true)
        setUserData({
          email:"",password:""
        })
        navigate('/')
      }else{
        toast.warning(result.response.data)
        console.log(result);
      }
    }
  }
  return (
    <div style={{width:'100%',height:'100vh'}} className='d-flex justify-content-center align-items-center'>
       <div className='w-75 container'>
            <Link  to={'/'} style={{textDecoration:'none',color:'blue'}}> <i class="fa-solid fa-arrow-left"></i> Back To Home</Link>
            <div className="card shadow p-5 bg-success">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <img src="https://www.planstudyabroad.com/images/login.png" alt="Auth img" className='rounded-start w-100'/>
                    </div>
                    <div className="col-lg-6">
                        <div className="d-flex align items center flex-column">
                        <h1 className='fw-bolder text-light'><i className="fa-brands fa-stack-overflow fa-bounce"></i> Project-Fair</h1>
                        <h5 className='fw-bolder text-light mt-2 pb-3'>
                            {
                                isRegisterForm ? 'Sign up to your Account':'Sign in to your Account'
                            }
                        </h5>
                        <Form className='text-light w-100'>
                        {
                                isRegisterForm &&
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="text" placeholder="Username" value={userData.username} onChange={e=>setUserData({...userData,username:e.target.value})}/>
                                </Form.Group>
                            }
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control type="email" placeholder="Enter Email Id" value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control type="password" placeholder="Enter Password" value={userData.password} onChange={e=>setUserData({...userData,password:e.target.value})}/>
                            </Form.Group>
                              {
                                isRegisterForm ? 
                                <div>
                                    <button className='btn btn-light' onClick={handleRegister}>Register</button>
                                    <p>Already have an Account? Click Here To <Link style={{textDecoration:'none',color:'red'}} to={'/login'}>Login</Link> </p>
                                </div>:
                                <div>
                                <button className='btn btn-light' onClick={handleLogin}>Login</button>
                                <p>New User? Click Here To <Link style={{textDecoration:'none',color:'red'}} to={'/register'}>Register</Link> </p>
                            </div>
                              }
                        </Form>
                        </div>
                    </div>
                </div>
            </div>
       </div>
       <ToastContainer 
       theme="colored"
       autoClose={2000}
       position="top-right"/>
    </div>
  )
}

export default Auth