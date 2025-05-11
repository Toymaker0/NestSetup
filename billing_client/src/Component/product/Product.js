import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Nav, Navbar, Row, Tab, Tabs,Table, Form } from "react-bootstrap";
import { TbDoorExit } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


const Product = () => {
  const ProdExist = () => toast("Product Name already Exist");
  const Added = () => toast("Product Added");
  const prodEdited = () => toast("Product Edited");


  const userId = useSelector(state => state.auth.Id)
  const [hold, setHold] = useState({ hold: 0 });
  const [ExistUnits, setExistUnits] = useState([]);
  const [AddProd, setAddProd] = useState([])
  const [EditProd, setEditProd] = useState({})
  // const [EditedProd,setEditedProd]=useState({})
  const [Allprod, setAllProd] = useState([])
 

  const fetchUnits = async () => {
    const fetch = await axios.get("http://localhost:6060/FetchUnits");
    if (fetch.data.message == "success") {
      setExistUnits(fetch.data.result);
    }
    if (fetch.data.message == "error") {
    }
  };
  const handleAddProd = (e) => {
    setAddProd({ ...AddProd, [e.target.name]: e.target.value })
  }
  const handleSelectProd = (e) => {
    if (e.target.value != 'default') {
      const ProdId = e.target.value
      const selectedProd = Allprod.filter((prod) => {
        return prod.prodId == ProdId
      })
    
      setEditProd(selectedProd[0])
    }
    else {
      setEditProd('')
      document.querySelector('#Eproduct').value = '';
      document.querySelector('#EAmount').value = '';
      document.querySelector('#selectedUnitE').value = 'default';
    }

  }
  const handleEditProduct = (value, name) => {
    if (value != 'default') {
      setEditProd({ ...EditProd, [name]: value })
    }
  }
  const handleAltertProd = async () => {
    setHold({ ...hold, hold: 1 })
    
    const response = await axios.post('http://localhost:6060/EditProduct', { ...EditProd, userId })
    if (response.data.error) {
      if (response.data.error.code == "ER_DUP_ENTRY") {
        ProdExist()
      }
     
    }
    else if (response.data.message) {
     
      setEditProd({})
      document.querySelector('#Eproduct').value = '';
      document.querySelector('#EAmount').value = '';
      document.querySelector('#selectedUnitE').value = 'default';
      prodEdited()
      setHold({ ...hold, hold: 0 })
    }
  }
  const addProduct = async () => {
    setHold({ ...hold, hold: 1 })
    if (AddProd) {
      const response = await axios.post('http://localhost:6060/addprod', { ...AddProd, userId })
      if (response.data.message == "err") {
        if (response.data.errP.code == "ER_DUP_ENTRY") {
          ProdExist()
        }
      }
      else if (response.data.message == "success") {
        document.querySelector('#prod_name').value = '';
        document.querySelector('#prod_mount').value = '';
        document.querySelector('#selectedUnit').value = 'default';
        setAddProd([])
        Added()
        setHold({ ...hold, hold: 0 })

      }
    }
  }
  const fetchProd = async () => {
    const fetch = await axios.get("http://localhost:6060/FetchProd");
    setAllProd(fetch.data.result)
  }
  useEffect(() => {
    fetchUnits();
    fetchProd();
  }, [hold]);
  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <Navbar
        className="userManagement_nav_body"
        style={{ backgroundColor: "rgb(216, 240, 216)" }}
      >
        <Container>
          <Navbar.Brand>PRODUCT</Navbar.Brand>
          <Navbar.Toggle />

          <Navbar.Collapse className="justify-content-end">
            <Link
              to="/selectionArea"
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="selectionArea_path">
                Selection Area <TbDoorExit size="17px" />{" "}
              </div>
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row className="product_content">
          <Col className="product_content_box m-2">
            <div>
              <Tabs
                defaultActiveKey="ADD"
                id="uncontrolled-tab-example"
                className="mb-3 "
              >
                <Tab eventKey="ADD" title="Add Product" className="" >
                  <div>
                    <div className="product_input">
                      <div className="input_box">
                        <input type="text" name="prodName" id="prod_name" required onChange={handleAddProd} />
                        <label htmlFor="prod_name">Product Name</label>
                      </div>
                    </div>
                    <div className="product_input">
                      <div className="input_box">
                        <input type="text" name="prodAmt" id="prod_mount" required onChange={handleAddProd} />
                        <label htmlFor="prod_mount">Amount as per unit</label>
                      </div>
                    </div>
                    <div className="select_user" onChange={handleAddProd}>
                      <select name="ProdUnitId" id="selectedUnit">
                        <option key={2.2} value={"default"}>
                          Select Unit
                        </option>
                        {ExistUnits?.map((obj, i) => {
                          return (
                            <option key={i} value={`${obj.id}`}>
                              {obj.unit_name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="select_user">
                      <button className="btn btn-secondary" onClick={addProduct}>Add product</button>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="EDIT" title="Edit Product">
                  <div>
                    <div className='product_input' >
                      <select name="" id="selectedProd" onChange={handleSelectProd}>
                        <option key={2.2} value={'default'}>Select Product</option>
                        {
                          Allprod?.map((obj, i) => {
                            return <option key={i} value={`${obj.prodId}`}>{obj.prodName}</option>
                          })
                        }
                      </select>

                    </div>
                    <div className='product_input'>
                      <div className="input_box">
                        <input type="text" name='prodName' id='Eproduct' value={EditProd?.prodName} required onChange={(e) => { handleEditProduct(e.target.value, e.target.name) }} />
                        <label htmlFor="Eproduct">Product</label>
                      </div>
                    </div>
                    <div className='product_input'>
                      <div className="input_box">
                        <input type="text" name='Amt' id='EAmount' value={EditProd?.Amt} required onChange={(e) => { handleEditProduct(e.target.value, e.target.name) }} />
                        <label htmlFor="EAmount">Amount as per unit</label>
                      </div>
                    </div>
                    <div className="select_user" name='unitId' onChange={(e) => { handleEditProduct(e.target.value, e.target.name) }}>
                      <select name="unitId" id="selectedUnitE" >
                        <option key={2.2} value={'default'}>Select Unit</option>
                        {
                          ExistUnits?.map((obj, i) => {
                            return <option key={i} name='unitId' value={`${obj.id}`}>{obj.unit_name}</option>
                          })
                        }
                      </select>
                    </div>
                    <div className="select_user" >
                      <button className='btn btn-secondary' onClick={handleAltertProd}>Edit product</button>
                    </div>
                  </div>
                </Tab>
              </Tabs>

            </div>
          </Col>
          <Col className="product_content_box2 m-2">
          <Row className="m-2">
             <Form.Control style={{borderColor:"rgb(75, 211, 75)"}} type="text" placeholder="Search" />
          </Row>
          <Table striped bordered hover>
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>PRODUCT NAME</th>
                  <th>COST</th>
                  <th>UNIT</th>
                </tr>
              </thead>
              <tbody>
                {
                  Allprod.map((product,i)=>{
                    return (
                      <tr key={i}>
                      <td>{i+1}</td>
                      <td>{product.prodName}</td>
                      <td>{product.Amt}</td>
                      <td>{product.unit_name}</td>
                    </tr>
                    )
                  })
                }
               
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Product;
