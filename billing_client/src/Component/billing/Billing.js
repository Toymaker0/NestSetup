import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  Row,
  Table,
} from "react-bootstrap";
import { TbDoorExit } from "react-icons/tb";
import { Link } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AsyncTypeahead, Highlighter } from "react-bootstrap-typeahead";
import { useSelector } from "react-redux";

const Billing = () => {
  const rate = () => toast("Amt is '0'");
  const prodEmty = () => toast("Prod is emppty");
  const balZero = () => toast("Check the balance");
  const noBill = () => toast("Bill Not Saved");
  const mode = [
    {
      id: "1",
      name: "Cash",
    },
    {
      id: "2",
      name: "Gpay",
    },
  ];
  const perBill = {
    total: 0,
    balance: 0,
    discount: 0,
    PaymentType: 1,
    paidAmt: 0,
  };
  const BillProduct = {
    prodName: "",
    unitId: 0,
    units: [],
    Amt: 0,
    qty: 0,
    rate: 0,
  };
  const [units, setUnits] = useState([]);
  const [total, setTotal] = useState(0);
  const [product, setProduct] = useState();
  const [productList, setProductList] = useState([]);
  const [tempProd, setTempProd] = useState([BillProduct]);
  const [tempBill, setTempBill] = useState({ ...perBill });
  const [billNo, setBillNo] = useState({ billNo: "" });
  const [btn, setBtn] = useState({ print: true, bill: false });
  const userId = useSelector(state => state.auth.Id)


  const preFunction = () => {
    fetchUnits();
    fetchProds();
    handleCalculation();
  };
  useEffect(() => {
    handleBalance();
  }, [total]);

  const handleBalance = () => {
    let balance =
      Number(tempBill.total ? tempBill.total : 0) -
      Number(tempBill.discount ? tempBill.discount : 0) -
      Number(tempBill.paidAmt ? tempBill.paidAmt : 0);
    setTempBill({ ...tempBill, total: total, balance: balance });
  };
  const handleCalculation = () => {
    let total = 0;
    tempProd.map((prod) => {
      total = total + prod.rate;
      prod.rate = prod.Amt * prod.qty;
    });
    let balance =
      Number(tempBill.total ? tempBill.total : 0) -
      Number(tempBill.discount ? tempBill.discount : 0) -
      Number(tempBill.paidAmt ? tempBill.paidAmt : 0);
    setTempBill({ ...tempBill, total: total, balance: balance });
    setTotal(total);
  };
  const fetchUnits = async () => {
    const local = await axios.get("units/get");
    console.log(local);
    if (local.data.message == "success") {
      setUnits(local.data.result);
    }
  };
  const fetchProds = async () => {
    const local = await axios.get("product/get");
    if (local.data.message == "success") {
      setProduct(local.data.result);
    }
  };
  const handleProductSearch = async (query) => {
    const local = await axios.post("http://localhost:6060/searchProd", {
      query,
    });
    if (local.data) {
      if (local.data?.status == "success") {
        setProductList(local.data.result);
      }
    }
  };

  const handleProdSelect = async (selected, idx, item) => {
    if (selected[0]) {
      let prodId = selected[0].id;
      const local = await axios.post("http://localhost:6060/BillProd", {
        prodId: prodId,
      });
      if (local.data) {
        if (local.data?.status == "success") {
          let prod = local.data.result[0];
          tempProd[idx] = {
            ...prod,
            units,
            prodName: [prod.prodName],
            qty: 1,
            rate: prod.Amt,
          };
          setTempProd([...tempProd]);
        }
      }
      handleCalculation();
    }
  };
  const handleChangeQTY = (e, idx) => {
    tempProd[idx].qty = e.target.value;
    setTempProd([...tempProd]);
    handleCalculation();
  };
  const handleChangeUnit = (e, idx) => {
    tempProd[idx].unitId = e.target.value;
    setTempProd([...tempProd]);
  };

  const handleChangeAmt = (e, idx) => {
    tempProd[idx].Amt = e.target.value;
    setTempProd([...tempProd]);
    handleCalculation();
  };
  const handleChangeDiscount = (e) => {
    let balance =
      Number(tempBill.total ? tempBill.total : 0) -
      Number(e.target.value ? e.target.value : 0) -
      Number(tempBill.paidAmt ? tempBill.paidAmt : 0);
    console.log(balance);
    let disc = hanldeNumberInputZero(e.target.value)
    setTempBill({ ...tempBill, discount: disc, balance: balance });
  };
  const handlePaymentMode = (e) => {
    setTempBill({ ...tempBill, PaymentType: e.target.value });

  }
  const handlePaidAmt = (e) => {
    let balance =
      Number(tempBill.total ? tempBill.total : 0) -
      Number(tempBill.discount ? tempBill.discount : 0) -
      Number(e.target.value ? e.target.value : 0);
    let paid = hanldeNumberInputZero(e.target.value)
    setTempBill({ ...tempBill, paidAmt: paid, balance: balance });
  };
  const handleBill = async () => {
    if (tempProd[tempProd.length - 1].prodId) {
      if (tempBill.balance == 0) {
        let prod = [];
        tempProd.forEach((prd) => {
          let temp = {
            prodId: prd.prodId,
            unitId: prd.unitId,
            Amt: prd.unitId,
            qty: prd.qty,
          };
          prod.push(temp);
        });
        let save = { tempBill, prod, userId };
        const temp = await axios.post("http://localhost:6060/saveBill", save);
        console.log(temp.data);
        if (temp.data.success) {
          setBillNo({ ...billNo, billNo: temp.data.id });
          setBtn({ ...btn, print: false, bill: true });
        } else {
          noBill();
        }
      } else {
        balZero();
      }
    } else {
      prodEmty();
    }
  };
  const handleAddRow = (idx) => {
    if (tempProd[idx].rate != 0) {
      if (tempProd.length == idx + 1) {
        tempProd[tempProd.length] = BillProduct;
        setTempProd([...tempProd]);
        setTimeout(() => {
          tempProd[idx + 1].component.focus();
        }, 0);
        console.log(tempProd);
      }
    } else {
      rate();
    }
  };
  const hanldeNumberInputZero = (value) => {
    if (value.length > 1 && value[0] == "0") {
      value = value.slice(1, value.length)
    } else if (!value) {
      value = "0"
    } else {
      value = value
    }
    return value
  }
  const handleRemoveRow = (idx) => {
    console.log(1);
    if (tempProd.length > 1) {
      let temp = tempProd.filter((prod, iNo) => iNo != idx);
      setTempProd([...temp]);
    } else {
      setTempProd([...BillProduct]);
    }
  };
  const handleRefresh = () => {
    setTotal(0)
    setTempProd([BillProduct])
    setTempBill({ ...perBill })
    setBillNo({ billNo: "" })
    setBtn({ print: true, bill: false })
  }
  const handlePrint = () => {
    console.log(billNo);

  }
  useEffect(() => {
    preFunction();
  }, [tempProd]);
  return (
    <>
      <Navbar
        className="userManagement_nav_body"
        style={{ backgroundColor: "rgb(216, 240, 216)" }}
      >
        <Container>
          <Navbar.Brand>BILLING</Navbar.Brand>
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
        <Row>
          <div>
            <ToastContainer />
          </div>
          <Col>
            <Row className="billing_area_head">
              <Row className="p-3">
                <Col md={6}>
                  <Row>
                    <span className="fw-bold fs-5">STATUS : <span className="text-success">{billNo.billNo == '' ? 'PROGRESS' : 'BILLED'}</span> </span>
                  </Row>
                </Col>
                <Col md={6}>
                  <span className=" fw-bold fs-5">BILL NO : <span className="text-danger">{billNo.billNo}</span></span>
                </Col>
              </Row>
            </Row>
            <Row className="billing_area">
              <div>
                <Table className="text-center">
                  <thead className="sticky-top">
                    <tr>
                      <th>S.NO</th>
                      <th>PRODUCT</th>
                      <th>QUANTITY</th>
                      <th>UNIT</th>
                      <th>MRP</th>
                      <th>Total</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {tempProd?.map((item, idx) => {
                      return (
                        <tr key={idx}>
                          <td className="w-3 mw-3">{idx + 1}</td>
                          <td className="w-20 mw-20">
                            <AsyncTypeahead
                              className="min-w-200px typeahead-mark shadow-sm my-1"
                              filterBy={() => true}
                              isLoading={false}
                              size="sm"
                              id={`prodName${idx}`}
                              labelKey="prodName"
                              minLength={1}
                              selected={item?.prodName}
                              onSearch={(query) => handleProductSearch(query)}
                              options={productList}
                              placeholder="PRODUCT NAME"
                              // onFocus={(e) => handleMedicineSearch(item.searchMedName, item, idx)}
                              // onKeyDown={async (e) => await handleMedicineOnKeyDown(e, idx, item)}
                              onChange={(selected) =>
                                handleProdSelect(selected, idx, item)
                              }
                              flip={true}
                              ref={(component) => (item.component = component)}
                              renderMenuItemChildren={(option, { text }) => (
                                <>
                                  <Highlighter search={text}>
                                    {option.prodName}
                                  </Highlighter>
                                </>
                              )}
                            />
                          </td>
                          <td className="mw-5 w-5 ">
                            <Form.Control
                              type="text"
                              size="sm"
                              placeholder="oty"
                              value={item.qty}
                              className="shadow-sm "
                              onChange={(e) => {
                                handleChangeQTY(e, idx);
                              }}
                            />
                          </td>
                          <td className="mw-6 w-6">
                            <Form.Select
                              size="sm"
                              value={item.unitId}
                              className="w-5 mw-5 shadow-sm"
                              onChange={(e) => {
                                handleChangeUnit(e, idx);
                              }}
                              disabled
                            >
                              {item.units.map((unitD, iNo) => {
                                return (
                                  <option key={iNo} value={unitD.id}>
                                    {unitD.unit_name}
                                  </option>
                                );
                              })}
                            </Form.Select>
                          </td>
                          <td className="mw-6 w-6">
                            <Form.Control
                              type="text"
                              size="sm"
                              placeholder="mrp"
                              value={item.Amt}
                              className="shadow-sm"
                              onChange={(e) => {
                                handleChangeAmt(e, idx);
                              }}
                            />
                          </td>
                          <td className="mw-6 w-6">{item.rate}</td>
                          <td className="mw-10 w-10">
                            <Button
                              variant="success"
                              className="mw-3 w-3 mx-2"
                              size="sm"
                              onClick={() => {
                                handleAddRow(idx);
                              }}
                            >
                              <MdAdd />
                            </Button>
                            <Button
                              variant="danger"
                              className="mw-3 w-3 mx-2"
                              size="sm"
                              onClick={() => {
                                handleRemoveRow(idx);
                              }}
                            >
                              <MdOutlineDelete />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </Row>
          </Col>
          <Row className="m-2">
            <Col md={4}>
              <Row className="my-1">
                <Col className=" fw-bold fs-3">TOTAL</Col>
                <Col className=" fw-bold fs-3 text-primary">{total}</Col>
              </Row>
              <Row className="my-1">
                <Col>
                  <Col className=" fw-bold ">DISCOUNT</Col>
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    size="sm"
                    placeholder="Disc"
                    value={tempBill.discount}
                    onChange={(e) => {
                      handleChangeDiscount(e);
                    }}
                  />
                </Col>
              </Row>
              <Row className="my-1">
                <Col>
                  <Col className=" fw-bold ">PAYMENT TYPE</Col>
                </Col>
                <Col>
                  <Form.Select size="sm" className="w-5 mw-5" onChange={(e) => { handlePaymentMode(e) }}>
                    {mode.map((modex, iNo) => {
                      return (
                        <option key={iNo} value={modex.id}>
                          {modex.name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Col>

              </Row>
              <Row className="my-1">
                <Col md={4}>
                  <Button variant="warning" onClick={handleRefresh} >
                    REFRESH
                  </Button>
                </Col>

              </Row>
            </Col>
            <Col md={3}></Col>
            <Col md={5} className="">
              <Row className="my-1">
                <Col className=" fw-bold fs-3">BALANCE</Col>
                <Col className=" fw-bold fs-3 text-danger">
                  {tempBill.balance}
                </Col>
              </Row>
              <Row>
                <Col md={6} className=" fw-bold fs-5">
                  PAID
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Control
                      type="number"
                      placeholder="PAID AMT"
                      value={tempBill.paidAmt}
                      onChange={(e) => {
                        handlePaidAmt(e);
                      }}
                    />
                  </Form.Group>
                </Col>

              </Row>
              <Row>
                <Col>
                  <Button variant="success" disabled={btn.print} onClick={handlePrint}>
                    PRINT
                  </Button>
                </Col>

                <Col>
                  <Button
                    variant="primary"
                    onClick={handleBill}
                    disabled={btn.bill}
                  >
                    BILL
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Row>
      </Container>
    </>
  );
};

export default Billing;
