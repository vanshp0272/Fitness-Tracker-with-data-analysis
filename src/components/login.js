import React, {useState} from 'react'
import './login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {

    const navigate = useNavigate()
    const navigate2 = useNavigate()

    const handleclick = () => {
        navigate('/welcomepage')
    }

    const handleclick2 = () => {
      navigate2('/register')
  }

    const [user, setUser] = useState({
        email: "",
        password: ""
    })
      
    const handleChange = e => {
        // console.log(e.event)
        const {name, value} = e.target
        // console.log(name, value)
        setUser({
          ...user,
          [name]: value
        })
    }
    
    const login = ()=> {
        axios.post("http://localhost:9002/login", user)
        .then(res => console.log(res))
        const {email, password} = user
        if(email && password) {
            // alert("successfully registered")
            axios.post("http://localhost:9002/register", user)
            .then(res=> console.log(res))  
            navigate2('/homepage')
          }else {
            alert("invalid")
          }
    }

    return (

       <div className="login">
         <div class="background">
           <div class="shape"></div>
           <div class="shape"></div>
         </div>
         <h1>Login Here</h1>
         <input type="text" name="email" value={user.e1mail} placeholder="Enter your Email" onChange={handleChange}></input>
         <input type="password" name="password" value={user.password} placeholder="Enter your Password" onChange={handleChange}></input>
         <div className="button" onClick={handleclick}>Login</div>
         {/* <div>or</div> */}
         <p>Don't have an account? <a href="/register">Create Account</a></p>
         {/* <div className="button" onClick={handleclick2}>Register</div> */}
       </div>
    );
  }
  
  export default Login;
  