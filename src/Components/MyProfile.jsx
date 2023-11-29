import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import { BASE_URL } from '../services/baserul';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editUserAPI } from '../services/allAPI';


function MyProfile() {
    const [open, setOpen] = useState(false);
    const [userProfile, setUserProfile] = useState({
        username: "", email: "", password: "", profile: "", github: "", linkedin: ""
    })
    const [existingImage, setExistingImage] = useState("")
    const [preview, setPreview] = useState("")
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("existingUser"))
        setUserProfile({ ...userProfile, username: user.username, email: user.email, password: user.password, profile: "", github: user.github, linkedin: user.linkedin })
        setExistingImage(user.profile)
    }, [open])

    useEffect(() => {
        if (userProfile.profile) {
            setPreview(URL.createObjectURL(userProfile.profile))
        } else {
            setPreview("")
        }
    }, [userProfile.profile])

    const handleProfileUpdate=async()=>{
        const{username,email,password,profile,github,linkedin}=userProfile
        if(!github||!linkedin){
            toast.info("please fill the form")
        }else{
            const reqBody=new FormData()
            reqBody.append("username", username)
            reqBody.append("email", email)
            reqBody.append("password",password)
            reqBody.append("github", github)
            reqBody.append("linkedin", linkedin)
            preview ? reqBody.append("profileImage",profile) : reqBody.append("profileImage", existingImage)
            const token = sessionStorage.getItem("token")
            if(preview){
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const res = await editUserAPI(reqBody,reqHeader)
                if(res.status===200){
                    setOpen(!open)
                    sessionStorage.setItem("existingUser",JSON.stringify(res.data))
                }else{
                    setOpen(!open)
                    console.log(res);
                    console.log(res.response.data);
                }
            }else{
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                const res = await editUserAPI(reqBody,reqHeader)
                if(res.status===200){
                    setOpen(!open)
                    sessionStorage.setItem("existingUser",JSON.stringify(res.data))
                }else{
                    setOpen(!open)
                    console.log(res);
                    console.log(res.response.data);
                }
            }
        }
    }

    return (
        <div className='border rounded shadow p-2 mb-5'>
            <div className='d-flex justify-content-between align-items-center m-3'>
                <h4>My Profile</h4>
                <button className='shadow btn p-3' onClick={() => setOpen(!open)}><i class="fa-solid fa-angle-down"></i></button>
            </div>
            <Collapse in={open}>
                <div>
                    <div className='d-flex justify-content-center align-items-center '>
                        <label htmlFor="profile">
                            <input id='profile' style={{ display: 'none' }} type="file" onChange={e => setUserProfile({ ...userProfile, profile: e.target.files[0] })} />
                            {
                                existingImage !== "" ?
                                    <img style={{ width: '250px', height: '250px', borderRadius: '50%' }} src={preview ? preview : `${BASE_URL}/uploads/${existingImage}`} alt="uploadpicture" /> : <img style={{ width: '250px', height: '250px', borderRadius: '50%' }} src={preview ? preview : "https://img.freepik.com/premium-vector/avatar-icon001_750950-50.jpg"} alt="uploadpicture" />}

                        </label>
                    </div>
                    <div className='mt-3 '>
                        <input type="text" className='form-control' placeholder='GitHub' value={userProfile.github} onChange={e => setUserProfile({ ...userProfile, github: e.target.value })} />
                    </div>
                    <div className='mt-3 mb-5'>
                        <input type="text" className='form-control' placeholder='linkedin' value={userProfile.linkedin} onChange={e => setUserProfile({ ...userProfile, linkedin: e.target.value })} />
                    </div>
                    <div className='mt-3 text-center d-grid'>
                        <Button onClick={handleProfileUpdate} className='btn btn-warning'>Update </Button>
                    </div>
                </div>
            </Collapse>
            <ToastContainer
                theme="colored"
                autoClose={2000}
                position="top-right" />
        </div>
    )
}

export default MyProfile