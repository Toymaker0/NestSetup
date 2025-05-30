import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../Redux/Slice';


const Login = () => {
  const  initiate=async()=>{ await axios.get("/initiate/setDb")}
 
  const navigate = useNavigate()
  const [loginUser, setLoginUser] = useState({})
  const dispatch = useDispatch()


  const loged = () => toast("succesfully login 😍");
  const incorrect = () => toast("Incorrect Password 🫡");
  const noUser = () => toast("User does not exist");
  const userisblocked = () => toast('you are blocked contact Admin')

  const handleChangeLogin = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value })
  }
  const logIn = (e) => {
    loged()
    navigate('/selectionArea')
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    const login = await axios.post("/auth/login", loginUser)
    console.log(login);

    if (login.data) {

      if (login.data.auth) {
        const userData = login.data.userData
        sessionStorage.setItem('userData', JSON.stringify(userData))
        dispatch(setUserData(userData)) //Redux storage
        logIn()
      }
      else {
        incorrect()
      }
    }
  }

  useEffect(()=>{
     initiate()
  },[])

  return (
    <div className='login'>
      <form action="" id='formId'>
        <div>
          <ToastContainer />
        </div>
        <div className="login_content_box">
          <h1>LOGIN</h1>
          <div className="login_input_box">
            <input type="text" name='userName' id='uName' onChange={handleChangeLogin} required />
            <label htmlFor="uName">User Name</label>
          </div>

          <div className="login_input_box">
            <input type="password" name='password' id='uPassword' onChange={handleChangeLogin} required />
            <label htmlFor="uPassword">Password</label>
          </div>

          <div className='submin_box'>
            <button className='btn btn-secondary ' onClick={(e) => { handleLogin(e) }}  >Log In</button>
          </div>
          <div className="signUp_login">
            <div className='toogle_section'> Not have a account <span className='signUp loginSignUp_Link'> Contact Admin</span></div>
          </div>
        </div>
      </form>

    </div>
  )
}

export default Login