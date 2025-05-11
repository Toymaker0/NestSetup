import axios from 'axios';
import React, { useEffect, useId, useState } from 'react'
import { Container, Navbar , Tab, Tabs} from 'react-bootstrap'
import { TbDoorExit } from 'react-icons/tb'

import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const UserManagement = () => {
    const userAdd = () => toast("User Added succesfully 😍");
    const UserExist = () => toast("User Exist try another Name 🤣");
    const updateUsered = () => toast("User updated Succesfully");
    const userBlocked = () => toast("User has been Blocked");
    const userUnblocked = () => toast("User UnBlocked");

    const [user,setUser]=useState({uName:'',pass:''})
    const [userRights,setUserRights]=useState({billingR:0,duplicateBillR:0,reportR:0,userManagementR:0,passwordR:0})
    const [allUsers,setAllUsers]=useState()
    const [fetchUser,setFetchUser]=useState({})
    const [isblock,setIsblock]=useState({block:0})


    useEffect(()=>{
        fetchUsers()
        checkBlock()
      },[])
    const fetchUsers=async()=>{
       const user= await axios.get("http://localhost:6060/AllUsers")
        setAllUsers(user.data)
    }
    const handleChangeUser=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    const handleUserRights=(e)=>{
        if(e.target.checked===true){
            setUserRights({...userRights,[e.target.name]:1})
        }
        else if(e.target.checked===false){
           setUserRights({...userRights,[e.target.name]:0});
        }
    }
    const handleCreateNewUser=async()=>{
        const newUser={...user,...userRights}
        const cUser= await axios.post('http://localhost:6060/createUser/',newUser)
        if(cUser){
            if(cUser.data.message=='User Added'){
                userAdd()
                fetchUsers()
            }
            else if(cUser.data.message=='error'){
                if(cUser.data.err.code==='ER_DUP_ENTRY'){
                    UserExist()
                }
            }
        }
    }
    const handleSelectedUser=async(e)=>{
        const id=e.target.value
        setIsblock({...isblock,block:0})
        if(id!='default'){
          const Currentuser=  await axios.post('http://localhost:6060/getUser/',{id:id})
          setFetchUser(...Currentuser.data)
          
        }
        else if(id=='default'){
            document.getElementById('UuserName').value=''
            setFetchUser('')
        }
      
    }
    const checkBlock=()=>{
        if(fetchUser?.isblock){
            
            setIsblock({...isblock,block:1})
          }
    }
    const handleEditUser=(e)=>{
        if(e.target.name=='uName'){
            setFetchUser({...fetchUser,[e.target.name]:e.target.value})
        }
        else{
            setFetchUser({...fetchUser,[e.target.name]:e.target.checked===true?1:0})            
        }
    }
    const updateUser=async(userId)=>{
    const update= await axios.post('http://localhost:6060/updateUser/',{id:userId,userDetails:fetchUser})
    if(update.data){
            if (update.data.message=='user updated') {
                updateUsered()
            }
    }
    }
    const blockUser=async(userId)=>{
        if(isblock.block==1){
            
           const unblock= await axios.post('http://localhost:6060/checkblock/',{id:userId,block:0})
           if(unblock.data){
            if(unblock.data.message=='success'){
                userUnblocked()
                setIsblock({...isblock,block:0})
            }
           }
            
        }
        else if(isblock.block==0){
            
          const block=  await axios.post('http://localhost:6060/checkblock/',{id:userId,block:1})
          if(block.data){
            if(block.data.message=='success'){
                userBlocked()
                setIsblock({...isblock,block:1})

            }
          }  
        }
    }
  return (
    <>
    <div>
        <ToastContainer />
      </div>
    <Navbar className="userManagement_nav_body" style={{backgroundColor:'rgb(216, 240, 216)'}}>
    <Container>
      <Navbar.Brand >USER MANAGEMENT</Navbar.Brand>
      <Navbar.Toggle />
     
      <Navbar.Collapse className='justify-content-end' >
          <Link to='/selectionArea' style={{textDecoration:'none',color:'black'}}> 
     <div className="selectionArea_path">Selection Area <TbDoorExit size='17px' /> </div>
     </Link>
      </Navbar.Collapse>
    </Container>
  </Navbar>
 
          <div className="User_management_content" >
                <div id='alert'></div>
                <div className="user_management_content_box tag_Area">
                    <Tabs
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="mb-3 "
                    >
                        <Tab eventKey="ADD" title="Add User" className='' >

                            <div className="add_user">
                                <h3>User Details</h3>
                                <div className="input_box">
                                    <input type="text" name='uName' id='C_userName' onChange={handleChangeUser} required />
                                    <label htmlFor="C_userName">User Name</label>
                                </div>
                                <div className="input_box">
                                    <input type="password" name='pass' id='C_password' onChange={handleChangeUser} required />
                                    <label htmlFor="C_password">Password</label>
                                </div>
                                <div className="user_rights">
                                    <h5>User Rights</h5>
                                    <div className="form-check form-switch">
                                        <label className="form-check-label" htmlFor="billingModule">Billing</label>
                                        <input className="form-check-input" type="checkbox" role="switch" name="billingR" id="billingModule"  style={{ backgroundColor: 'rgb(75, 211, 75)' }} onChange={handleUserRights} />
                                    </div>
                                    <div className="form-check form-switch">
                                        <label className="form-check-label" htmlFor="duplicateBillModule">Duplicate Module</label>
                                        <input className="form-check-input" type="checkbox" role="switch" name="duplicateBillR" id="duplicateBillModule"  style={{ backgroundColor: 'rgb(75, 211, 75)' }} onChange={handleUserRights} />

                                    </div>
                                    <div className="form-check form-switch">
                                        <label className="form-check-label" htmlFor="reportModule">Report</label>
                                        <input className="form-check-input" type="checkbox" role="switch" name="reportR" id="reportModule"  style={{ backgroundColor: 'rgb(75, 211, 75)' }} onChange={handleUserRights} />

                                    </div>
                                    <div className="form-check form-switch">
                                        <label className="form-check-label" htmlFor="userManagementModule">User Management</label>
                                        <input className="form-check-input" type="checkbox" role="switch" name="userManagementR" id="userManagementModule"  style={{ backgroundColor: 'rgb(75, 211, 75)' }} onChange={handleUserRights} />

                                    </div>
                                    <div className="form-check form-switch">
                                        <label className="form-check-label" htmlFor="passwordModule">Change Password</label>
                                        <input className="form-check-input" type="checkbox" role="switch" name="passwordR" id="passwordModule"  style={{ backgroundColor: 'rgb(75, 211, 75)' }} onChange={handleUserRights} />

                                    </div>
                                </div>
                                <div className="createUser">
                                    <button className='btn ' type='submit' style={{ backgroundColor: 'rgb(75, 211, 75)' }} onClick={handleCreateNewUser} >Create User</button>
                                </div>
                            </div>


                        </Tab>
                        <Tab eventKey="EDIT" title="Edit User" >
                            <div className="edit_user">
                                <h3>Edit User</h3>
                                <div className="select_user" >
                                    <select name="" id="selectedUser" onChange={handleSelectedUser}>
                                        <option key={2} value={'default'}>Select User</option>
                                        {
                                            allUsers?.map((obj, i) => {
                                                return <option key={i} value={`${obj.id}`}>{obj.uName}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="input_box">
                                    <input type="text" name='uName' id='UuserName' value={fetchUser?.uName} onChange={handleEditUser} required />
                                    <label htmlFor="UuserName">User Name</label>
                                </div>
                                <div className="input_box" hidden >
                                    <input type="password" name='Upassword'  id='Upassword' onChange={handleEditUser} />
                                    <label htmlFor="Upassword">Password</label>
                                </div>
                                <div className="user_rights">
                                    <h5>User Rights</h5>
                                    <div className="form-check form-switch">
                                        <label className="form-check-label" htmlFor="billingModuleU">Billing</label>
                                        <input className="form-check-input" type="checkbox" role="switch" name="billingR" id="billingModuleU"  checked={fetchUser?.billingR==1?true:false}  style={{ backgroundColor: 'rgb(75, 211, 75)' }} onChange={handleEditUser} />
                                    </div>
                                    <div className="form-check form-switch">
                                        <label className="form-check-label" htmlFor="duplicateBillModuleU">Duplicate Module</label>
                                        <input className="form-check-input" type="checkbox" role="switch" name="duplicateBillR" checked={fetchUser?.duplicateBillR==1?true:false} id="duplicateBillModuleU"  style={{ backgroundColor: 'rgb(75, 211, 75)' }} onChange={handleEditUser} />

                                    </div>
                                    <div className="form-check form-switch">
                                        <label className="form-check-label" htmlFor="reportModuleU">Report</label>
                                        <input className="form-check-input" type="checkbox" role="switch" name="reportR" checked={fetchUser?.reportR==1?true:false} id="reportModuleU"  style={{ backgroundColor: 'rgb(75, 211, 75)' }} onChange={handleEditUser} />

                                    </div>
                                    <div className="form-check form-switch">
                                        <label className="form-check-label" htmlFor="userManagementModuleU">User Management</label>
                                        <input className="form-check-input" type="checkbox" role="switch" name="userManagementR" checked={fetchUser?.userManagementR==1?true:false} id="userManagementModuleU"  style={{ backgroundColor: 'rgb(75, 211, 75)' }} onChange={handleEditUser} />

                                    </div>
                                    <div className="form-check form-switch">
                                        <label className="form-check-label" htmlFor="passwordModuleU">Change Password</label>
                                        <input className="form-check-input" type="checkbox" role="switch" name="passwordR" checked={fetchUser?.passwordR==1?true:false} id="passwordModuleU" style={{ backgroundColor: 'rgb(75, 211, 75)' }} onChange={handleEditUser} />

                                    </div>
                                </div>
                                <div className="alter_buttons">
                                    <button className='btn' style={{ backgroundColor: 'rgb(75, 211, 75)' }} onClick={() => {
                                        updateUser(fetchUser.userId)
                                    }} >Update User</button>
                                    <button className='btn bg-danger' onClick={() => {
                                        blockUser(fetchUser.userId)
                                    }}>{isblock.block==0?'Block User':'UnBlock User'}</button>
                                </div>
                            </div>

                        </Tab>


                    </Tabs>


                </div>


            </div>
  </>
  )
}

export default UserManagement