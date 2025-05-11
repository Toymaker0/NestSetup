import React from 'react'
import { Button, Col, Container, Form, Navbar, Row, Table } from 'react-bootstrap'
import { TbDoorExit } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const Report = () => {
  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <Navbar className="userManagement_nav_body" style={{ backgroundColor: 'rgb(216, 240, 216)' }}>
        <Container>
          <Navbar.Brand >REPORT</Navbar.Brand>
          <Navbar.Toggle />

          <Navbar.Collapse className='justify-content-end' >
            <Link to='/selectionArea' style={{ textDecoration: 'none', color: 'black' }}>
              <div className="selectionArea_path">Selection Area <TbDoorExit size='17px' /> </div>
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Col className="Report_box m-2">
        <Row className='my-4'>
          <Col>
            <Row className='justify-content-center'>
              <Col md={3}>
                <Row>
                  <Col> <span>From</span> </Col>
                  <Col> <Form.Control size='sm' type="date" /></Col>
                </Row>
              </Col>
              <Col md={3}>
                <Row>
                  <Col> <span>To</span> </Col>
                  <Col> <Form.Control size='sm' type="date" /></Col>
                </Row>
              </Col>
              <Col md={2}>
                <Button size='sm' variant='secondary'>Load</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Table size='sm' striped bordered hover>
          <thead>
            <tr>
              <th>S.NO</th>
              <th>Bill NO</th>
              <th>Time</th>
              <th>Date</th>
              <th>Discount</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Balance</th>
              {/* SELECT a.`id` ,a.`cTime`,a.`cDate`, a.`discount`,a.`prodTotal`,a.`paid`,a.`balance` FROM `ph_bills` a WHERE a.`cDate` BETWEEN '2024-10-02' AND '2024-10-02' */}
            </tr>
          </thead>
          <tbody>

          </tbody>
        </Table>
      </Col>
    </>
  )
}

export default Report