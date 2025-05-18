import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { setUserData } from '../../Redux/Slice'

const Layout = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const redux=useSelector(state=>state.auth)
  useEffect(()=>{
    check()
  },[])
  const check=()=>{
    if(!redux.Id){
      const userData=sessionStorage.getItem('userData')
      if(userData){
        dispatch(setUserData(userData))
      }
      else{
        navigate('/')
      }
      
     // console.log(userId);
      
    }
  }


 

   
  return (
    <Outlet/>
  )
}

export default Layout