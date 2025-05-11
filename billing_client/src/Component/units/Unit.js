import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap'
import { TbDoorExit } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';



const Unit = () => {
  const unitAdd = () => toast("Unit Added");
  const unitExist = () => toast("Unit Exist");
  const userId=useSelector(state=>state.auth.Id)

  const [unit,setUnit]=useState({unit:''})
  const [hold,setHold]=useState({hold:0})
  const [ExistUnits,setExistUnits]=useState([])

    useEffect(()=>{
      fetchUnits()
    },[hold])
    const handleLogout=()=>{
    
    }
    const blockUnit=async(id)=>{
      setHold({...hold,hold:0})
      const block=await axios.post('http://localhost:6060/blockUnit',{id:id,userId})
      if(block.data.message=='success'){
        setHold({...hold,hold:1})
      }
      else if(block.data.message=='error'){

      }
    }
    const fetchUnits=async()=>{
      const fetch=await axios.get('http://localhost:6060/FetchUnits')

      if(fetch.data.message=='success'){
        setExistUnits(fetch.data.result)
      }
      if(fetch.data.message=='error'){
        
      }

    }
    const addUnit=async()=>{
      setHold({...hold,hold:0})
      if(unit.unit!=''){
        const AddUnit= await axios.post('http://localhost:6060/addUnit',{...unit,userId})
       if(AddUnit.data.message=='success'){
        unitAdd()
        setHold({...hold,hold:1})
        setUnit({unit:''})
        document.getElementById('C_unit').value=''
       }
       else if(AddUnit.data.message=='error'){
        
        if(AddUnit.data.errD.code=='ER_DUP_ENTRY'){
          unitExist()
        }
       }
      }
    }
    const handleUnit=(e)=>{
      setUnit({...unit,[e.target.name]:e.target.value})
    }

  return (
    <>
    <div>
        <ToastContainer />
      </div>
    <Navbar className="userManagement_nav_body" style={{backgroundColor:'rgb(216, 240, 216)'}}>
        <Container>
          <Navbar.Brand >UNITS</Navbar.Brand>
          <Navbar.Toggle />
        
          <Navbar.Collapse className='justify-content-end' >
              <Link to='/selectionArea' style={{textDecoration:'none',color:'black'}}> 
        <div className="selectionArea_path">Selection Area <TbDoorExit size='17px' /> </div>
        </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    <Container className='unit_content'>
        <Row >
            <Col className='unit_content_box m-2'>
                <Row className=" text-center">
                    <h3>ADD UNITS</h3>
                </Row>
                <div className='d-flex justify-content-center units_input_area'>
                  <Row className="input_box">
                          <input type="text" name='unit' id='C_unit'  required onChange={handleUnit} />
                          <label htmlFor="C_unit">Unit Name</label>
                      </Row>
                </div>
                <div className='d-flex justify-content-center units_input_area'>
                 <button className='btn'style={{ backgroundColor: 'rgb(75, 211, 75)' }} onClick={addUnit}>Add</button>
                </div>
            </Col>     
            <Col className='unit_content_box m-2'>
                <Col >
                    <table className='table table-hover'>
                      <thead>
                        <tr>
                        <th>S.NO</th>
                        <th>UNIT NAME</th>
                        <th>DELETE</th>
                        </tr>
                      </thead>
                      <tbody>
                          {
                            ExistUnits.map((obj,i)=>{
                              return <tr key={i}> 
                                <td>{i+1}</td>
                                <td>{obj.unit_name}</td>
                                <td><button className='btn btn-danger' onClick={()=>{blockUnit(obj.id)}} >Delete</button></td>
                              </tr>
                            })
                          }
                      </tbody>
                    </table>
                </Col>
            
            </Col>     
        </Row> 
    </Container>
    </>
  )
}

export default Unit