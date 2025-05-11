import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { CiMoneyBill } from "react-icons/ci";
import { TbDoorExit, TbReportMoney } from "react-icons/tb";
import { TbReportSearch } from "react-icons/tb";
import { TbUsersGroup } from "react-icons/tb";
import { PiPasswordThin } from "react-icons/pi";
import { AiFillProduct } from "react-icons/ai";
import { GiWeightScale } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { setUserId } from '../../Redux/Slice';


const SelectionArea = () => {
  const user = useSelector(state => state.auth)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [userDetails, setUserDetails] = useState([])
  useEffect(() => {
    fetchUser()
  }, [user])
  const fetchUser = async () => {
    if (user.Id) {
      const res = await axios.post('http://localhost:6060/getUser', { id: user?.Id })
      console.log(res)
      setUserDetails(res.data)
    }

  }
  const handleLogout = () => {
    sessionStorage.clear('userId')  // session storage
    dispatch(setUserId(0)) //Redux storage
    navigate('/')
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className='Selection_nav_body'>
        <Container>
          <Navbar.Brand href="">Selection Area</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" >
            <Nav className="me-auto">


            </Nav>
            <Nav >
              <Nav.Link className='Selection_nav_user' >Hello! <span style={{ color: 'red' }} className='text-uppercase'> {userDetails[0]?.uName}</span> </Nav.Link>
              <Nav.Link eventKey={2} className='Selection_nav_logout' onClick={handleLogout}>
                Log Out <TbDoorExit size='17px' />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <div className='selection_content row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 justify-content-center mt-3'>
          <Link to='/billing' style={{ textDecoration: 'none', color: 'black' }}>  <div className="selection_content_box col " id='billing'   >
            <div className="content_box_icon">
              <CiMoneyBill size={'50px'} />    </div>
            <p>BLLING</p>
          </div></ Link>
          <Link to='/duplicatebill' style={{ textDecoration: 'none', color: 'black' }}>
            <div className="selection_content_box col " id='duplicateBill'>
              <div className="content_box_icon">
                <TbReportMoney size={'50px'} />    </div>
              <p>DUPLICATE BILL</p>
            </div></ Link>
          <Link to='/report' style={{ textDecoration: 'none', color: 'black' }}>
            <div className="selection_content_box col " id='Report'>
              <div className="content_box_icon">
                <TbReportSearch size={'50px'} />    </div>
              <p>REPORT</p>
            </div></ Link>
          <Link to='/userManagement' style={{ textDecoration: 'none', color: 'black' }}>
            <div className="selection_content_box col " id='UserManagement'>
              <div className="content_box_icon">
                <TbUsersGroup size={'50px'} />    </div>
              <p>USER MANAGEMENT</p>
            </div></Link>
          <Link to='/changePassword' style={{ textDecoration: 'none', color: 'black' }}>
            <div className="selection_content_box col " id='ChangePassword'>
              <div className="content_box_icon">
                <PiPasswordThin size={'50px'} />    </div>
              <p>CHANGE PASSWORD</p>
            </div></ Link>
          <Link to='/product' style={{ textDecoration: 'none', color: 'black' }}>
            <div className="selection_content_box col " id='ChangePassword'>
              <div className="content_box_icon">
                <AiFillProduct size={'50px'} />   </div>
              <p>PRODUCTS</p>
            </div></ Link>
          <Link to='/unit' style={{ textDecoration: 'none', color: 'black' }}>
            <div className="selection_content_box col " id='ChangePassword'>
              <div className="content_box_icon">
                <GiWeightScale size={'50px'} />    </div>
              <p>UNITS</p>
            </div></ Link>
        </div>
      </Container>

    </>
  )
}

export default SelectionArea