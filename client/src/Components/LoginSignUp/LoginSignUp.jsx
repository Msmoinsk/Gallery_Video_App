import React, { createContext, useContext, useState } from 'react'
import './LoginSignUp.css'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import axios from 'axios'

export const NameContext = createContext()
export const NameProvider = ({children}) => {
    const [name, setName] = useState('')
    return <NameContext.Provider value={{name, setName}} >{children}</NameContext.Provider>
}

const LoginSignUp = () => {

    const [action, setAction] = useState('Login')
    console.log(action)
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: ""
    })
    const { setName } = useContext(NameContext)

    function usernameChange(event){
        setInputs( input => ({
            ...input,
            username: event.target.value
        }) )
    }
    function emailChange(event){
        setInputs( input => ({
            ...input,
            email: event.target.value
        }) )
    }
    function passwordChange(event){
        setInputs( input=> ({
            ...input,
            password: event.target.value
        }) )
    }

    async function onClickSignUp(){
        if(action==='Sign Up' && inputs.username, inputs.email, inputs.password !== ""){
            try {
                const { data } = await axios.post('http://localhost:8800/api/v1/user/signup', {
                    ...inputs
                })
                localStorage.setItem('token', data.token)
                localStorage.setItem('username', data.username)
                setName(data.username)
            } catch (error) {
                localStorage.removeItem('token')
                localStorage.removeItem('username')
                alert(error.response.data.msg)
            }
        }
        setAction('Sign Up')
        
    }
    async function onClickLogin(){
        if(action==='Login' && inputs.username, inputs.password !== ""){
            try {
                const { data } = await axios.post('http://localhost:8800/api/v1/user/login', {
                    ...inputs
                })
                localStorage.setItem('token', data.token)
                localStorage.setItem('username', data.username)
                setName(data.username)
            } catch (error) {
                localStorage.removeItem('token')
                localStorage.removeItem('username')
                alert(error.response.data.msg)
            }
        }
        setAction('Login')
    }

  return (
    <div className='containers'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
            <PersonIcon />
            <input type="text" onChange={usernameChange} required/>
        </div>
        {
        action==="Login"? <div></div> 
        :<div className="input">
            <EmailIcon />
            <input type="email" onChange={emailChange} required/>
        </div> 
        }
        <div className="input">
            <PasswordIcon />
            <input type="password" onChange={passwordChange} required/>
        </div>
      </div>
      {
      action==='Login'?  
        <div className="forgotpassword">Give Your Credentials<span> Or Create New User</span></div>
      : <div></div> 
      }
      <div className="submit-container">
        <div className={action==='Login'?'submit gray': 'submit'} onClick={onClickSignUp}>SignUp</div>
        <div className={action==='Sign Up'?'submit gray': 'submit'} onClick={onClickLogin}>Login</div>
      </div>
    </div>
  )
}

export default LoginSignUp
