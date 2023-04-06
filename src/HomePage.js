import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";
import { ColorRing } from "react-loader-spinner";
import React, { useState, useEffect } from "react";
import axios from "axios";
let depUrl = "https://samvidhi.onrender.com";
const HomePage = () => {
  let [obj, setObj] = useState();
  let [exchangeRate, setExchangeRate] = useState();
  let [convertMax, setConvertMax] = useState(0);
  let [convertMin, setConvertMin] = useState(0);
  let [from, setFrom] = useState("");
  let [to, setTo] = useState("");
  let [amount, setAmount] = useState(1);
  let [visible, setVisible] = useState("");
  let [errorMessage, setErrorMessage] = useState("");
  function onChangeFrom(value) {
    // console.log(from,to)
    setFrom(value);
    // console.log(from,to,"from")
  }

  function onChangeTo(value) {
    setTo(value);

    // console.log(from,to)
  }
  useEffect(()=>{if(from.length!=0 && to.length!=0){
    setVisible(true)
    axios
      .get(`${depUrl}/currency-exchange?from=${from}&to=${to}`)
      .then((res) => {
        // console.log(res,"res")
        setObj(res.data.data);

        // console.log(res.data, "res");
        setVisible("")
        setExchangeRate(res.data.data[0].exchange_rate);
      }).catch(err=>{
        setErrorMessage("Unable to fetch details");
       
      });
  }},[from,to])

  function onchangeAmount(event) {
    // if (value <= 0) setAmount(1);
    setAmount(event.target.value);
  }

  function onClickExchangeRate() {
    // console.log(`${depUrl}/currency-exchange?from=${from}&to=${to}`)
    
  }

  function onClickConvert() {
    axios
      .get(`${depUrl}/convert?from=${from}&to=${to}&amount=${amount}`, {
        headers: { data: JSON.stringify(obj) },
      })
      .then((res) => {
        console.log(res.data.data);
        setConvertMax(res.data.data.max_value);
        setConvertMin(res.data.data.min_value);
      });
  }

  function onClickReverse(){
    let str=from
    setFrom(to)
    setTo(str)
  }
  // return (
  //   <Container fluid>
  //     <h1
  //       style={{
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //       }}
  //     >
  //       Currency Converter
  //     </h1>
  //     <Row>
  //       <Col md={4} className="m-5" style={{ margin: "20px" }}>
  //         <Row className="m-2">
  //           <Col>from-</Col>
  //           <Col>
  //             <Form.Select
  //               aria-label="Default select example"
  //               size="sm"
  //               defaultValue={to}
  //               onChange={(event) => onChangeFrom(event.target.value)}
  //             >
  //               <option>Select from</option>
  //               <option value="INR">INR</option>
  //               <option value="KRW">KRW</option>
  //               <option value="USD">USD</option>
  //               <option value="EUR">EUR</option>
  //               <option value="CNY">CNY</option>
  //             </Form.Select>
  //           </Col>
  //         </Row>

  //         <Row className="m-2">
  //           <Col>to-</Col>

  //           <Col>
  //             <Form.Select
  //               aria-label="Default select example"
  //               size="sm"
  //               onChange={(event) => onChangeTo(event.target.value)}
  //             >
  //               <option>Select to</option>
  //               <option value="INR">INR</option>
  //               <option value="KRW">KRW</option>
  //               <option value="USD">USD</option>
  //               <option value="EUR">EUR</option>
  //               <option value="CNY">CNY</option>
  //             </Form.Select>
  //           </Col>
  //         </Row>

  //         <Row className="m-2">
  //           <Col>amount-</Col>

  //           <Col>
  //             <input type="number" min={1} defaultValue={1} onChange={onchangeAmount}>
  //             </input>
  //           </Col>
  //         </Row>
  //       </Col>

  //       <Col md={4} className="m-5" style={{ margin: "20px" }}>
  //         <Row className="mb-3">
  //           <Col md={6}>
  //             <Button variant="secondary" onClick={onClickExchangeRate}>
  //               exchangeRate
  //             </Button>{" "}
  //           </Col>
  //           <Col md={6} className="mt-1">
  //             <span className="square border height-2 bg-light">
  //               {exchangeRate}
  //             </span>
  //           </Col>
  //         </Row>
  //         <Row>
  //           <Col md={6}>
  //             <Button variant="secondary" onClick={onClickConvert}>
  //               convert
  //             </Button>{" "}
  //           </Col>
  //           <Col md={6} className="mt-1">
  //             <span className="square border height-2 bg-light ">
  //               max-{convertMax}
  //             </span><br/>
  //             <span className="square border height-2 bg-light ">
  //               min-{convertMin}
  //             </span>
  //           </Col>
  //         </Row>
  //       </Col>
  //     </Row>
  //   </Container>
  // );
  // useEffect(()=>{
  //   if(from != "select from" && to!="select from"){
  //     setVisible(true)
  //   }
  // },[])
  return (
    <div style={{ 
      height:"100vh"
    }}>
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Currency Converter
      </h1>
      <Container
        style={{
          border: "2px solid #000000",
          backgroundColor:"white",
          height: "350px",
          backgroundSize: 'cover',
            overflow: 'hidden',
          width: "990px",
          marginTop: "10px",
          overflow: "scroll",
          marginTop:"150px"
        }}
      >
        <Row
          className="mt-5"
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Col md={3}>
            <Row className="mb-2">
              <span className="fw-bold">Convert From</span>
            </Row>
            <Row className="mb-5">
              <span>
                <Form.Select
                  aria-label="Default select example"
                  size="sm"
                  value={from}
                  onChange={(event) => onChangeFrom(event.target.value)}
                >
                  <option>Select from</option>
                  <option value="INR">INR</option>
                  <option value="KRW">KRW</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="CNY">CNY</option>
                </Form.Select>
              </span>
            </Row>
            <Row>
              <span className="mt-3 fw-bold " style={{ display: 'inline-flex', alignItems: 'center' }}>
                Exchange Rate - {exchangeRate}
              </span>
            </Row>
          </Col>
          <Col md={2}>
            <Row className="m-3">
              <Button style={{ marginTop: "10px" }} variant="light" onClick={onClickReverse}>
                <i className="bi bi-arrow-left-right text-primary"></i>
              </Button>
            </Row>
            <Row style={{ marginRight: "8px", marginTop: "50px" }}>
              <ColorRing
                height="50"
                width="4"
                visible={visible}
                ariaLabel="	color-ring-loading"
              />
            </Row>
          </Col>
          <Col md={3}>
            <Row className="mb-2">
              <span className="fw-bold">Convert To</span>
            </Row>
            <Row className="mb-5">
              <span>
                <Form.Select
                  aria-label="Default select example"
                  size="sm"
                  value={to}
                  onChange={(event) => onChangeTo(event.target.value)}
                >
                  <option>Select from</option>
                  <option value="INR">INR</option>
                  <option value="KRW">KRW</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="CNY">CNY</option>
                </Form.Select>
              </span>
            </Row>
            <Row>
              <span className="mt-3">
                <Button variant="primary" onClick={onClickConvert}>Convert</Button>
              </span>
            </Row>
          </Col>
          <Col md={3}>
            <Row className="mb-2">
              <span className="fw-bold">Amount</span>
            </Row>
            <Row className="mb-5">
              <span>
                <input
                  style={{ width: "100px" }}
                  type="number"
                  min={1}
                  defaultValue={1}
                  onChange={onchangeAmount}
                ></input>
              </span>
            </Row>
            <Row>
              <span className="fw-bold">max-</span>
              <span >{convertMax}</span> 
              <span className="fw-bold">min-</span>
              <span >{convertMin}</span> 
            </Row>
          </Col>

        </Row>
        
      </Container>
    </div>
  );
};

export default HomePage;
