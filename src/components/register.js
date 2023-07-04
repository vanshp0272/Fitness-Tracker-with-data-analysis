import React, {useState} from 'react'
import './register.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Register() {
  
  const navigate = useNavigate()

  const handleclick = () => {
    navigate('/')
  }

  const [user, setUser] = useState({
    firstname: "",
    secondname: "",
    email: "",
    password: "",
    // reEnterPassword: ""
  })
  
  const handleChange = e => {
    // console.log(e.event)
    const {name, value} = e.target
    // console.log(name, value)
    setUser({
      ...user,
      [name]: value
    })
    // window.location.href = "http://localhost:3000";
  }

  const register = () => {
    const {name, email, password, reEnterPassword} = user
    if(name && email && password && reEnterPassword) {
      if(password == reEnterPassword) {

        alert("successfully registered")
      }else {
        alert("invalid")  
      }
      axios.post("http://localhost:9002/register", user)
      .then(res=> console.log(res))  
    }else {
      alert("invalid")
    }
    // window.location.href = "http://localhost:3000";
  }

  return (
       <div className="register">
         <h1>Register</h1>
         <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={handleChange}></input>
         <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={handleChange}></input>
         <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={handleChange}></input>
         <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Confirm Password" onChange={handleChange}></input>
         <div className="button" onClick={register}>Register</div>
         {/* <div>or</div> */}
         <div className="button" onClick={handleclick}>Login</div>
       </div>
    );
  }
  
  export default Register;
  