import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './App.css'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios"
import Button from 'react-bootstrap/esm/Button';
import './HomePage.css'
import { useRef } from 'react';

function HomePage() {
  const [productData, setProductData] = useState([]);
  const [allProductPage, setAllProductPage] = useState(true)
  const [appliancesPage, setAppliancesPage] = useState(false)
  const [computersPage, setComputersPage] = useState(false)
  const [laptopsPage, setLaptopsPage] = useState(false)
  const [mobilePhonesPage, setMobilePhonesPage] = useState(false)
  const [televisionsPage, setTelevisionsPage] = useState(false)
  const [bid, setBid] = useState(false)
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [canvasData, setCanvasData] = useState()
  const handleClose = () => setShow(false);
  const [pageData, setPageData] = useState()
  const [pageName, setPageName] = useState()
  const bidInputRef = useRef(null)
  const [bidDetails, setBidDetails] = useState()
  const [productName, setProductName] = useState()
  const [amount, setAmount] = useState(null)
  const [highestBid,setHighestBid] = useState(null)
  const [bidError,setBidError] = useState(null)
  // console.log(bidDetails,"=========")
  function handleShow(nme, cat, des, regp, bidp, biddt, img) {
    setCanvasData((canvasData) => ({ ...canvasData, name: nme, category: cat, description: des, regprice: regp, bidprice: bidp, biddate: biddt, image: img }))
    setShow(true);
    // console.log("can===", canvasData)
  }
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location)
  const resdata = location.state
  // console.log("id===", resdata);
  const scrollToBidInput = () => {
    // console.log("nnndndnn")
    // console.log(bidInputRef.current)
    bidInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    bidInputRef.current.focus()
  };
  function logout() {
    localStorage.removeItem("token")
    window.history.back()
    setTimeout(terminate, 500)
    function terminate() {
      navigate("/Login")
    }
  }
  function all() {
    setAppliancesPage(false)
    setComputersPage(false)
    setLaptopsPage(false)
    setMobilePhonesPage(false)
    setTelevisionsPage(false)
    setAllProductPage(true)
  }
  function appliances() {
    setPageName("Appliances")
    setAllProductPage(false)
    setComputersPage(false)
    setLaptopsPage(false)
    setMobilePhonesPage(false)
    setTelevisionsPage(false)
    setAppliancesPage(true)
  }
  function computers() {
    setPageName("Desktop Computers")
    setAllProductPage(false)
    setAppliancesPage(false)
    setLaptopsPage(false)
    setMobilePhonesPage(false)
    setTelevisionsPage(false)
    setComputersPage(true)
  }
  function laptops() {
    setPageName("Laptops")
    setAllProductPage(false)
    setAppliancesPage(false)
    setComputersPage(false)
    setMobilePhonesPage(false)
    setTelevisionsPage(false)
    setLaptopsPage(true)
  }
  function mobilePhones() {
    setPageName("Mobile Phone")
    setAllProductPage(false)
    setAppliancesPage(false)
    setComputersPage(false)
    setLaptopsPage(false)
    setTelevisionsPage(false)
    setMobilePhonesPage(true)
  }
  function televisions() {
    setPageName("Televisions")
    setAllProductPage(false)
    setAppliancesPage(false)
    setComputersPage(false)
    setLaptopsPage(false)
    setMobilePhonesPage(false)
    setTelevisionsPage(true)
  }
  function handleBidChange(event) {
    setBidDetails({ ...bidDetails, amount: event.target.value })
    setAmount(event.target.value)
  }
  // code for connecting nodejs this part of backend is not done in springboot
  function handleView(x) {
    axios.get(`http://localhost:8080/bidding/get/${x}`)
      .then((res) => {
        if (res.data.length === 1) {
          setCanvasData(canvasData => ({ ...canvasData, highestbid: res.data[0].amount }))
        }
        else {
          setCanvasData(canvasData => ({ ...canvasData, highestbid: "No one bids till now" }))
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }
  useEffect(() => {
    console.log("useeefeect handleView called");
    // console.log(productName);
    handleView(productName)
  }, [bid])
  //
  function handleSubmit(event) {
    event.preventDefault();
    // code for connecting springboot
    // axios.post(`http://localhost:8080/bidding/set/${resdata.id}`, bidDetails)
    // code for connecting nodejs
    if(amount > highestBid){
      setBidError(null)
      axios.post(`http://localhost:8080/bidding/set/${resdata._id}`, bidDetails)
      // 
      .then((response) => {
        console.log("bid===", response.data)
        alert("Bid submitted successfully!!")
        setBid(false)
      })
      .catch((error) => {
        console.log(error)
      })
    }
    else{
      setBidError("Your bids must be more than other users!")
    }
  }
  useEffect(() => {
    // code for connecting springboot
    // axios.get(`http://localhost:8080/product/getPage/${page}`)
    //   .then((response) => {
    //     console.log("page==", response.data)
    //     setProductData(response.data)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
    // code for connecting nodejs
    // console.log(localStorage.getItem("token"));
    axios.get(`http://localhost:8080/product/getByPage/${page}`, { headers: { "Authorization": localStorage.getItem("token") } })
      .then((res) => {
        console.log("all===", res.data);
        setProductData(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
    // 
    axios.get(`http://localhost:8080/product/getByName/${pageName}`)
      .then((response) => {
        console.log("name===", response.data)
        setPageData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [page, pageName])
  return (
    <>
      {['lg',].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-dark navbar-dark sticky-top">
          <Container fluid className='mx-0 mx-sm-5'>
            <Navbar.Brand href="#"><h4 className='text-white fw-bold navh'>Online Auction System</h4></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} className='border border-1' />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Online Auction System
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className='bg-dark'>
                <Nav className="justify-content-end flex-grow-1 pe-5 gap-5">
                  <Nav.Link className='text-white fw-bold'>Home</Nav.Link>
                  <Nav.Link className='text-white fw-bold'>About us</Nav.Link>
                  <Nav.Link className='text-white fw-bold'>Contact us</Nav.Link>
                  <li class="nav-item dropdown">
                    <div class="nav-link dropdown-toggle fw-bold text-white" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Welcome {resdata && resdata.username !== null ? resdata.username : ""}
                    </div>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><span class="dropdown-item fw-bold" type="button" onClick={logout}><i class="bi bi-box-arrow-in-left fw-bolder"></i> Logout</span></li>
                    </ul>
                  </li>
                </Nav>
                {/* <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form> */}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-3">
            <div class="card" style={{ width: '22rem', position: 'fixed', top: '11%' }}>
              <h3 className="card-header p-3" style={{ backgroundColor: 'rgb(247,247,247)' }}>Categories</h3>
              <div class="card-body p-4">
                <ul class="list-group list-group-flush">
                  <li class={`list-group-item border border-1 p-3 btn-outline-primary fs-5 fw-500 ${allProductPage ? 'bg-primary' : ''}`} style={{ color: allProductPage ? 'white' : '' }} type="button" onClick={all}>All</li>
                  <li class={`list-group-item border border-1 p-3 btn-outline-primary fs-5 fw-500 ${appliancesPage ? 'bg-primary' : ''}`} style={{ color: appliancesPage ? 'white' : '' }} type="button" onClick={appliances}>Appliances</li>
                  <li class={`list-group-item border border-1 p-3 btn-outline-primary fs-5 fw-500 ${computersPage ? 'bg-primary' : ''}`} style={{ color: computersPage ? 'white' : '' }} type="button" onClick={computers}>Desktop Computers</li>
                  <li class={`list-group-item border border-1 p-3 btn-outline-primary fs-5 fw-500 ${laptopsPage ? 'bg-primary' : ''}`} style={{ color: laptopsPage ? 'white' : '' }} type="button" onClick={laptops}>Laptops</li>
                  <li class={`list-group-item border border-1 p-3 btn-outline-primary fs-5 fw-500 ${mobilePhonesPage ? 'bg-primary' : ''}`} style={{ color: mobilePhonesPage ? 'white' : '' }} type="button" onClick={mobilePhones}>MobilePhones</li>
                  <li class={`list-group-item border border-1 p-3 btn-outline-primary fs-5 fw-500 ${televisionsPage ? 'bg-primary' : ''}`} style={{ color: televisionsPage ? 'white' : '' }} type="button" onClick={televisions}>Televisions</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-9">
            {allProductPage ? (
              <div className="py-5">
                <div className="row gap-5 justify-content-center">
                  {Array.isArray(productData) && productData.map((datas) => (
                    <div class="col-5 card shadow" key={datas.id}>
                      <div className="card-header overflow-hidden">
                        {/* code for connecting springboot*/}
                        {/* <img src={"http://localhost:8080/uploads/" + datas.image} class="card-img-top proimg" width="100%" height="400px" alt="..." /> */}
                        {/* code for connecting nodejs */}
                        <img src={"http://localhost:8080/public/" + datas.image} class="card-img-top proimg" width="100%" height="400px" alt="..." />
                        {/*  */}
                      </div>
                      <div class="card-body">
                        <div class="card-text d-flex gap-1"><p className='text-nowrap'>Name :</p><span className='fw-bold'>{datas.name}</span></div>
                        <div class="card-text d-flex gap-1"><p className='text-nowrap'>Category :</p><span className='fw-bold'>{datas.category}</span></div>
                        <div class="card-text d-flex gap-1"><p className='text-nowrap fw-bold'>Description :</p><span className='fst-italic'>{datas.description}</span></div>
                        <>
                          <div className="text-center mt-3">
                            <Button className='p-2 w-25' variant="primary" onClick={() => { handleShow(datas.name, datas.category, datas.description, datas.regprice, datas.bidprice, datas.biddate, datas.image); handleView(datas.name); setProductName(datas.name) }}>View</Button>
                            {/* <Button variant="primary" onClick={toggleShow} className="me-2">{name}</Button> */}
                          </div>
                          <Offcanvas show={show} onHide={handleClose} backdrop={false} scroll={true} placement='end'>
                            <Offcanvas.Header closeButton onClick={() => setBid(false)}>
                              <Offcanvas.Title>View Product</Offcanvas.Title>
                            </Offcanvas.Header>
                            <hr className='m-0'></hr>
                            {canvasData && (
                              <Offcanvas.Body>
                                <div>
                                  {/* code for connecting springboot*/}
                                  {/* <img src={"http://localhost:8080/uploads/" + canvasData.image} width="100%" /> */}
                                  {/* code for connecting nodejs */}
                                  <img src={"http://localhost:8080/public/" + canvasData.image} width="100%" />
                                  {/*  */}
                                  <div class="d-flex gap-1 mt-4"><p className='text-nowrap'>Name :</p><span className='fw-bold'>{canvasData.name}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Category :</p><span className='fw-bold'>{canvasData.category}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Regular Price :</p><span className='fw-bold'>{canvasData.regprice}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Starting Amount :</p><span className='fw-bold'>{canvasData.bidprice}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Until :</p><span className='fw-bold'>{canvasData.biddate}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Highest Bid :</p><span className='fw-bold'>{canvasData.highestbid}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap fw-bold'>Description :</p><span className='fst-italic'>{canvasData.description}</span></div>
                                  <div className="text-center mt-4">
                                    {/* <Link className='btn btn-primary p-2 w-25' to="/Login">Bid</Link> */}
                                    <Button variant="primary" className='w-25 p-2' onClick={() => { setBid(true); setTimeout(scrollToBidInput, 100); setBidDetails({ ...bidDetails, productName: canvasData.name });setHighestBid(canvasData.highestbid) }}>Bid</Button>
                                    {bid ? (
                                      <div className='text-center px-4'>
                                        <input type="number" ref={bidInputRef} placeholder="Enter your bid amount" className={`form-control form-control-lg mt-4 ${amount>canvasData.highestbid ? "was-validated" : "is-invalid"}`} aria-label=".form-control-lg example" required onChange={handleBidChange} />
                                        <p className='text-danger mt-2'>{bidError}</p>
                                        <div className='d-flex gap-5 mt-4 justify-content-center'>
                                            <Button variant="success" className='p-2 px-4' onClick={handleSubmit}>Submit</Button>
                                            <Button variant="danger" className='p-2 px-4' onClick={() => setBid(false)}>Cancel</Button>
                                        </div>
                                      </div>
                                    ) : ""
                                    }
                                  </div>
                                </div>
                              </Offcanvas.Body>
                            )}
                          </Offcanvas>
                        </>
                      </div>
                    </div>
                  ))}
                </div>
                <nav aria-label="..." className='mt-5 d-flex justify-content-center'>
                  <ul class="pagination pagination-lg">
                    {/* code for connecting springboot */}
                    {/* <li class="page-item">
                        <a class={`page-link ${(page === 0) ? "disabled" : ""}`} href='#' onClick={() => setPage(page - 1)}>Previous</a>
                    </li>
                    <li class="page-item">
                        <a class={`page-link ${(page === 0) ? "active" : ""}`} href='#' onClick={() => setPage(0)}>1</a>
                    </li>
                    <li class="page-item" aria-current="page">
                        <a class={`page-link ${(page === 1) ? "active" : ""}`} href='#' onClick={() => setPage(1)}>2</a>
                    </li>
                    <li class="page-item">
                        <a class={`page-link ${(page === 2) ? "active" : ""}`} href='#' onClick={() => setPage(2)}>3</a>
                    </li>
                    <li class="page-item">
                        <a class={`page-link ${(page === 3) ? "active" : ""}`} href='#' onClick={() => setPage(3)}>4</a>
                    </li>
                    <li class="page-item">
                        <a class={`page-link ${(page === 4) ? "active" : ""}`} href='#' onClick={() => setPage(4)}>5</a>
                    </li>
                    <li class="page-item">
                        <a class={`page-link ${(page === 4) ? "disabled" : ""}`} href='#' onClick={() => setPage(page + 1)}>Next</a>
                    </li> */}
                    {/* code for connecting nodejs */}
                    <li class="page-item">
                      <span class={`page-link ${(page === 1) ? "disabled" : ""}`} onClick={() => {setPage(page - 1);window.scrollTo({top:0,behavior:'smooth'})}}>Previous</span>
                    </li>
                    <li class="page-item">
                      <span class={`page-link ${(page === 1) ? "active" : ""}`} onClick={() => {setPage(1);window.scrollTo({top:0,behavior:'smooth'})}}>1</span>
                    </li>
                    <li class="page-item">
                      <span class={`page-link ${(page === 2) ? "active" : ""}`} onClick={() => {setPage(2);window.scrollTo({top:0,behavior:'smooth'})}}>2</span>
                    </li>
                    <li class="page-item">
                      <span class={`page-link ${(page === 3) ? "active" : ""}`} onClick={() => {setPage(3);window.scrollTo({top:0,behavior:'smooth'})}}>3</span>
                    </li>
                    <li class="page-item">
                      <span class={`page-link ${(page === 4) ? "active" : ""}`} onClick={() => {setPage(4);window.scrollTo({top:0,behavior:'smooth'})}}>4</span>
                    </li>
                    <li class="page-item">
                      <span class={`page-link ${(page === 5) ? "active" : ""}`} onClick={() => {setPage(5);window.scrollTo({top:0,behavior:'smooth'})}}>5</span>
                    </li>
                    <li class="page-item">
                      <span class={`page-link ${(page === 5) ? "disabled" : ""}`} onClick={() => {setPage(page + 1);window.scrollTo({top:0,behavior:'smooth'})}}>Next</span>
                    </li>
                    {/*  */}
                  </ul>
                </nav>
              </div>
            ) : appliancesPage ? (
              <div className="py-5">
                <div className="row gap-5 justify-content-center">
                  {Array.isArray(pageData) && pageData.map((datas) => (
                    <div class="col-5 card shadow" key={datas.id}>
                      <div className="card-header overflow-hidden">
                        {/* code for connecting springboot*/}
                        {/* <img src={"http://localhost:8080/uploads/" + datas.image} class="card-img-top proimg" width="100%" height="400px" alt="..." /> */}
                        {/* code for connecting nodejs */}
                        <img src={"http://localhost:8080/public/" + datas.image} class="card-img-top proimg" width="100%" height="400px" alt="..." />
                        {/*  */}
                      </div>
                      <div class="card-body">
                        <div class="card-text d-flex gap-1"><p className='text-nowrap'>Name :</p><span className='fw-bold'>{datas.name}</span></div>
                        <div class="card-text d-flex gap-1"><p className='text-nowrap'>Category :</p><span className='fw-bold'>{datas.category}</span></div>
                        <div class="card-text d-flex gap-1"><p className='text-nowrap fw-bold'>Description :</p><span className='fst-italic'>{datas.description}</span></div>
                        <>
                          <div className="text-center mt-3">
                            <Button className='p-2 w-25' variant="primary" onClick={() => { handleShow(datas.name, datas.category, datas.description, datas.regprice, datas.bidprice, datas.biddate, datas.image); handleView(datas.name);setProductName(datas.name) }}>View</Button>
                          </div>
                          <Offcanvas show={show} onHide={handleClose} backdrop={false} scroll={true} placement='end'>
                            <Offcanvas.Header closeButton onClick={() => setBid(false)}>
                              <Offcanvas.Title>View Product</Offcanvas.Title>
                            </Offcanvas.Header>
                            <hr className='m-0'></hr>
                            {canvasData && (
                              <Offcanvas.Body>
                                <div>
                                  {/* code for connecting springboot*/}
                                  {/* <img src={"http://localhost:8080/uploads/" + canvasData.image} width="100%" /> */}
                                  {/* code for connecting nodejs */}
                                  <img src={"http://localhost:8080/public/" + canvasData.image} width="100%" />
                                  {/*  */}
                                  <div class="d-flex gap-1 mt-4"><p className='text-nowrap'>Name :</p><span className='fw-bold'>{canvasData.name}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Category :</p><span className='fw-bold'>{canvasData.category}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Regular Price :</p><span className='fw-bold'>{canvasData.regprice}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Starting Amount :</p><span className='fw-bold'>{canvasData.bidprice}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Until :</p><span className='fw-bold'>{canvasData.biddate}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Highest Bid :</p><span className='fw-bold'>{canvasData.highestbid}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap fw-bold'>Description :</p><span className='fst-italic'>{canvasData.description}</span></div>
                                  <div className="text-center mt-4">
                                    <Button variant="primary" className='w-25 p-2' onClick={() => { setBid(true); setTimeout(scrollToBidInput, 100); setBidDetails({ ...bidDetails, productName: canvasData.name }) }}>
                                      Bid
                                    </Button>
                                    {bid ? (
                                      <div className='text-center px-4'>
                                        <input type="number" ref={bidInputRef} placeholder="Enter your bid amount" className={`form-control form-control-lg mt-4 ${amount>canvasData.highestbid ? "was-validated" : "is-invalid"}`} aria-label=".form-control-lg example" required onChange={handleBidChange} />
                                        <div className='d-flex gap-5 mt-4 justify-content-center'>
                                          <Button variant="success" className='p-2 px-4' onClick={handleSubmit}>Submit</Button>
                                          <Button variant="danger" className='p-2 px-4' onClick={() => setBid(false)}>Cancel</Button>
                                        </div>
                                      </div>
                                    ) : ""
                                    }
                                  </div>
                                </div>
                              </Offcanvas.Body>
                            )}
                          </Offcanvas>
                        </>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : computersPage ? (
              <div className="py-5">
                <div className="row gap-5 justify-content-center">
                  {Array.isArray(pageData) && pageData.map((datas) => (
                    <div class="col-5 card shadow" key={datas.id}>
                      <div className="card-header overflow-hidden">
                        {/* code for connecting springboot*/}
                        {/* <img src={"http://localhost:8080/uploads/" + datas.image} class="card-img-top proimg" width="100%" height="400px" alt="..." /> */}
                        {/* code for connecting nodejs */}
                        <img src={"http://localhost:8080/public/" + datas.image} class="card-img-top proimg" width="100%" height="400px" alt="..." />
                        {/*  */}
                      </div>
                      <div class="card-body">
                        <div class="card-text d-flex gap-1"><p className='text-nowrap'>Name :</p><span className='fw-bold'>{datas.name}</span></div>
                        <div class="card-text d-flex gap-1"><p className='text-nowrap'>Category :</p><span className='fw-bold'>{datas.category}</span></div>
                        <div class="card-text d-flex gap-1"><p className='text-nowrap fw-bold'>Description :</p><span className='fst-italic'>{datas.description}</span></div>
                        <>
                          <div className="text-center mt-3">
                            <Button className='p-2 w-25' variant="primary" onClick={() => { handleShow(datas.name, datas.category, datas.description, datas.regprice, datas.bidprice, datas.biddate, datas.image); handleView(datas.name);setProductName(datas.name) }}>View</Button>
                          </div>
                          <Offcanvas show={show} onHide={handleClose} backdrop={false} scroll={true} placement='end'>
                            <Offcanvas.Header closeButton onClick={() => setBid(false)}>
                              <Offcanvas.Title>View Product</Offcanvas.Title>
                            </Offcanvas.Header>
                            <hr className='m-0'></hr>
                            {canvasData && (
                              <Offcanvas.Body>
                                <div>
                                  {/* code for connecting springboot*/}
                                  {/* <img src={"http://localhost:8080/uploads/" + canvasData.image} width="100%" /> */}
                                  {/* code for connecting nodejs */}
                                  <img src={"http://localhost:8080/public/" + canvasData.image} width="100%" />
                                  {/*  */}
                                  <div class="d-flex gap-1 mt-4"><p className='text-nowrap'>Name :</p><span className='fw-bold'>{canvasData.name}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Category :</p><span className='fw-bold'>{canvasData.category}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Regular Price :</p><span className='fw-bold'>{canvasData.regprice}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Starting Amount :</p><span className='fw-bold'>{canvasData.bidprice}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Until :</p><span className='fw-bold'>{canvasData.biddate}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Highest Bid :</p><span className='fw-bold'>{canvasData.highestbid}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap fw-bold'>Description :</p><span className='fst-italic'>{canvasData.description}</span></div>
                                  <div className="text-center mt-4">
                                    <Button variant="primary" className='w-25 p-2' onClick={() => { setBid(true); setTimeout(scrollToBidInput, 100); setBidDetails({ ...bidDetails, productName: canvasData.name }) }}>
                                      Bid
                                    </Button>
                                    {bid ? (
                                      <div className='text-center px-4'>
                                        <input type="number" ref={bidInputRef} placeholder="Enter your bid amount" className={`form-control form-control-lg mt-4 ${amount>canvasData.highestbid ? "was-validated" : "is-invalid"}`} aria-label=".form-control-lg example" required onChange={handleBidChange} />
                                        <div className='d-flex gap-5 mt-4 justify-content-center'>
                                          <Button variant="success" className='p-2 px-4' onClick={handleSubmit}>Submit</Button>
                                          <Button variant="danger" className='p-2 px-4' onClick={() => setBid(false)}>Cancel</Button>
                                        </div>
                                      </div>
                                    ) : ""
                                    }
                                  </div>
                                </div>
                              </Offcanvas.Body>
                            )}
                          </Offcanvas>
                        </>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : laptopsPage ? (
              <div className="py-5">
                <div className="row gap-5 justify-content-center">
                  {Array.isArray(pageData) && pageData.map((datas) => (
                    <div class="col-5 card shadow" key={datas.id}>
                      <div className="card-header overflow-hidden">
                        {/* code for connecting springboot*/}
                        {/* <img src={"http://localhost:8080/uploads/" + datas.image} class="card-img-top proimg" width="100%" height="400px" alt="..." /> */}
                        {/* code for connecting nodejs */}
                        <img src={"http://localhost:8080/public/" + datas.image} class="card-img-top proimg" width="100%" height="400px" alt="..." />
                        {/*  */}
                      </div>
                      <div class="card-body">
                        <div class="card-text d-flex gap-1"><p className='text-nowrap'>Name :</p><span className='fw-bold'>{datas.name}</span></div>
                        <div class="card-text d-flex gap-1"><p className='text-nowrap'>Category :</p><span className='fw-bold'>{datas.category}</span></div>
                        <div class="card-text d-flex gap-1"><p className='text-nowrap fw-bold'>Description :</p><span className='fst-italic'>{datas.description}</span></div>
                        <>
                          <div className="text-center mt-3">
                            <Button className='p-2 w-25' variant="primary" onClick={() => { handleShow(datas.name, datas.category, datas.description, datas.regprice, datas.bidprice, datas.biddate, datas.image); handleView(datas.name);setProductName(datas.name) }}>View</Button>
                          </div>
                          <Offcanvas show={show} onHide={handleClose} backdrop={false} scroll={true} placement='end'>
                            <Offcanvas.Header closeButton onClick={() => setBid(false)}>
                              <Offcanvas.Title>View Product</Offcanvas.Title>
                            </Offcanvas.Header>
                            <hr className='m-0'></hr>
                            {canvasData && (
                              <Offcanvas.Body>
                                <div>
                                  {/* code for connecting springboot*/}
                                  {/* <img src={"http://localhost:8080/uploads/" + canvasData.image} width="100%" /> */}
                                  {/* code for connecting nodejs */}
                                  <img src={"http://localhost:8080/public/" + canvasData.image} width="100%" />
                                  {/*  */}
                                  <div class="d-flex gap-1 mt-4"><p className='text-nowrap'>Name :</p><span className='fw-bold'>{canvasData.name}</span></div>
                                  <div class="d-flex gap-1 mt-3"><p className='text-nowrap'>Category :</p><span className='fw-bold'>{canvasData.category}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Regular Price :</p><span className='fw-bold'>{canvasData.regprice}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Starting Amount :</p><span className='fw-bold'>{canvasData.bidprice}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Until :</p><span className='fw-bold'>{canvasData.biddate}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Highest Bid :</p><span className='fw-bold'>{canvasData.highestbid}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap fw-bold'>Description :</p><span className='fst-italic'>{canvasData.description}</span></div>
                                  <div className="text-center mt-4">
                                    <Button variant="primary" className='w-25 p-2' onClick={() => { setBid(true); setTimeout(scrollToBidInput, 100); setBidDetails({ ...bidDetails, productName: canvasData.name }) }}>
                                      Bid
                                    </Button>
                                    {bid ? (
                                      <div className='text-center px-4'>
                                        <input type="number" ref={bidInputRef} placeholder="Enter your bid amount" className={`form-control form-control-lg mt-4 ${amount>canvasData.highestbid ? "was-validated" : "is-invalid"}`} aria-label=".form-control-lg example" required onChange={handleBidChange} />
                                        <div className='d-flex gap-5 mt-4 justify-content-center'>
                                          <Button variant="success" className='p-2 px-4' onClick={handleSubmit}>Submit</Button>
                                          <Button variant="danger" className='p-2 px-4' onClick={() => setBid(false)}>Cancel</Button>
                                        </div>
                                      </div>
                                    ) : ""
                                    }
                                  </div>
                                </div>
                              </Offcanvas.Body>
                            )}
                          </Offcanvas>
                        </>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : mobilePhonesPage ? (
              <div className="py-5">
                <div className="row gap-5 justify-content-center">
                  {Array.isArray(pageData) && pageData.map((datas) => (
                    <div class="col-5 card shadow" key={datas.id}>
                      <div className="card-header overflow-hidden">
                        {/* code for connecting springboot*/}
                        {/* <img src={"http://localhost:8080/uploads/" + datas.image} class="card-img-top proimg" width="100%" height="400px" alt="..." /> */}
                        {/* code for connecting nodejs */}
                        <img src={"http://localhost:8080/public/" + datas.image} class="card-img-top proimg" width="100%" height="400px" alt="..." />
                        {/*  */}
                      </div>
                      <div class="card-body">
                        <div class="card-text d-flex gap-1"><p className='text-nowrap'>Name :</p><span className='fw-bold'>{datas.name}</span></div>
                        <div class="card-text d-flex gap-1"><p className='text-nowrap'>Category :</p><span className='fw-bold'>{datas.category}</span></div>
                        <div class="card-text d-flex gap-1"><p className='text-nowrap fw-bold'>Description :</p><span className='fst-italic'>{datas.description}</span></div>
                        <>
                          <div className="text-center mt-3">
                            <Button className='p-2 w-25' variant="primary" onClick={() => { handleShow(datas.name, datas.category, datas.description, datas.regprice, datas.bidprice, datas.biddate, datas.image); handleView(datas.name);setProductName(datas.name) }}>View</Button>
                          </div>
                          <Offcanvas show={show} onHide={handleClose} backdrop={false} scroll={true} placement='end'>
                            <Offcanvas.Header closeButton onClick={() => setBid(false)}>
                              <Offcanvas.Title>View Product</Offcanvas.Title>
                            </Offcanvas.Header>
                            <hr className='m-0'></hr>
                            {canvasData && (
                              <Offcanvas.Body>
                                <div>
                                  {/* code for connecting springboot*/}
                                  {/* <img src={"http://localhost:8080/uploads/" + canvasData.image} width="100%" /> */}
                                  {/* code for connecting nodejs */}
                                  <img src={"http://localhost:8080/public/" + canvasData.image} width="100%" />
                                  {/*  */}
                                  <div class="d-flex gap-1 mt-4"><p className='text-nowrap'>Name :</p><span className='fw-bold'>{canvasData.name}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Category :</p><span className='fw-bold'>{canvasData.category}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Regular Price :</p><span className='fw-bold'>{canvasData.regprice}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Starting Amount :</p><span className='fw-bold'>{canvasData.bidprice}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Until :</p><span className='fw-bold'>{canvasData.biddate}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Highest Bid :</p><span className='fw-bold'>{canvasData.highestbid}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap fw-bold'>Description :</p><span className='fst-italic'>{canvasData.description}</span></div>
                                  <div className="text-center mt-4">
                                    <Button variant="primary" ref={bidInputRef} className='w-25 p-2' onClick={() => { setBid(true); setTimeout(scrollToBidInput, 100); setBidDetails({ ...bidDetails, productName: canvasData.name }) }}>
                                      Bid
                                    </Button>
                                    {bid ? (
                                      <div className='text-center px-4'>
                                        <input type="number" ref={bidInputRef} placeholder="Enter your bid amount" className={`form-control form-control-lg mt-4 ${amount>canvasData.highestbid ? "was-validated" : "is-invalid"}`} aria-label=".form-control-lg example" required onChange={handleBidChange} />
                                        <div className='d-flex gap-5 mt-4 justify-content-center'>
                                          <Button variant="success" className='p-2 px-4' onClick={handleSubmit}>Submit</Button>
                                          <Button variant="danger" className='p-2 px-4' onClick={() => setBid(false)}>Cancel</Button>
                                        </div>
                                      </div>
                                    ) : ""
                                    }
                                  </div>
                                </div>
                              </Offcanvas.Body>
                            )}
                          </Offcanvas>
                        </>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : televisionsPage ? (
              <div className="py-5">
                <div className="row gap-5 justify-content-center">
                  {Array.isArray(pageData) && pageData.map((datas) => (
                    <div class="col-5 card shadow" key={datas.id}>
                      <div className="card-header overflow-hidden">
                        {/* code for connecting springboot*/}
                        {/* <img src={"http://localhost:8080/uploads/" + datas.image} class="card-img-top proimg" width="100%" height="400px" alt="..." /> */}
                        {/* code for connecting nodejs */}
                        <img src={"http://localhost:8080/public/" + datas.image} class="card-img-top proimg" width="100%" height="400px" alt="..." />
                        {/*  */}
                      </div>
                      <div class="card-body">
                        <div class="card-text d-flex gap-1"><p className='text-nowrap'>Name :</p><span className='fw-bold'>{datas.name}</span></div>
                        <div class="card-text d-flex gap-1"><p className='text-nowrap'>Category :</p><span className='fw-bold'>{datas.category}</span></div>
                        <div class="card-text d-flex gap-1"><p className='text-nowrap fw-bold'>Description :</p><span className='fst-italic'>{datas.description}</span></div>
                        <>
                          <div className="text-center mt-3">
                            <Button className='p-2 w-25' variant="primary" onClick={() => { handleShow(datas.name, datas.category, datas.description, datas.regprice, datas.bidprice, datas.biddate, datas.image); handleView(datas.name);setProductName(datas.name) }}>View</Button>
                          </div>
                          <Offcanvas show={show} onHide={handleClose} backdrop={false} scroll={true} placement='end'>
                            <Offcanvas.Header closeButton onClick={() => setBid(false)}>
                              <Offcanvas.Title>View Product</Offcanvas.Title>
                            </Offcanvas.Header>
                            <hr className='m-0'></hr>
                            {canvasData && (
                              <Offcanvas.Body>
                                <div>
                                  {/* code for connecting springboot*/}
                                  {/* <img src={"http://localhost:8080/uploads/" + canvasData.image} width="100%" /> */}
                                  {/* code for connecting nodejs */}
                                  <img src={"http://localhost:8080/public/" + canvasData.image} width="100%" />
                                  {/*  */}
                                  <div class="d-flex gap-1 mt-4"><p className='text-nowrap'>Name :</p><span className='fw-bold'>{canvasData.name}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Category :</p><span className='fw-bold'>{canvasData.category}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Regular Price :</p><span className='fw-bold'>{canvasData.regprice}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Starting Amount :</p><span className='fw-bold'>{canvasData.bidprice}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Until :</p><span className='fw-bold'>{canvasData.biddate}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap'>Highest Bid :</p><span className='fw-bold'>{canvasData.highestbid}</span></div>
                                  <div class="d-flex gap-1"><p className='text-nowrap fw-bold'>Description :</p><span className='fst-italic'>{canvasData.description}</span></div>
                                  <div className="text-center mt-4">
                                    <Button variant="primary" className='w-25 p-2' onClick={() => { setBid(true); setTimeout(scrollToBidInput, 100); setBidDetails({ ...bidDetails, productName: canvasData.name }) }}>
                                      Bid
                                    </Button>
                                    {bid ? (
                                      <div className='text-center px-4'>
                                        <input type="number" ref={bidInputRef} placeholder="Enter your bid amount" className={`form-control form-control-lg mt-4 ${amount>canvasData.highestbid ? "was-validated" : "is-invalid"}`} aria-label=".form-control-lg example" required onChange={handleBidChange} />
                                        <div className='d-flex gap-5 mt-4 justify-content-center'>
                                          <Button variant="success" className='p-2 px-4' onClick={handleSubmit}>Submit</Button>
                                          <Button variant="danger" className='p-2 px-4' onClick={() => setBid(false)}>Cancel</Button>
                                        </div>
                                      </div>
                                    ) : ""
                                    }
                                  </div>
                                </div>
                              </Offcanvas.Body>
                            )}
                          </Offcanvas>
                        </>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : ""}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage