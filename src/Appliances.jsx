import { useState } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/esm/Button';
import Modal from "react-bootstrap/esm/Modal";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Appliances({ appliancesData }) {
  console.log("appp===", appliancesData)
  const [show, setShow] = useState(false);
  const [canvasData, setCanvasData] = useState()
  const handleClose = () => setShow(false);
  const [sho, setSho] = useState(false);
  const handleClos = () => setSho(false);
  const handleSho = () => setSho(true);
  const [data, setData] = useState({ username: "", password: "" })
  const [error, setError] = useState({ username: "", password: "" })
  const [showpass, setShowPass] = useState(true)
  const navigate = useNavigate()
  function handleShow(nme, cat, des, regp, bidp, biddt, img) {
    setCanvasData({ ...canvasData, name: nme, category: cat, description: des, regprice: regp, bidprice: bidp, biddate: biddt, image: img })
    setShow(true);
  }
  function handleChange(event) {
    const { name, value } = event.target
    setData({ ...data, [name]: value })
  }
  function handleSubmit(event) {
    event.preventDefault()
    console.log("data===", data)
    fetch("http://localhost:8080/user/login", { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
        .then((response) => {
            console.log("res==", response)
            // code for connecting springboot
            // return response.json()
            // code for connecting nodejs
            if (response.status === 200) {
                return response.json()
                    .then(async (resdata) => {
                        console.log(resdata);
                        if (resdata.status === true) {
                            setError({ ...error, username: "", password: "" });
                            setTimeout(success, 100)
                            function success() {
                                console.log("success");
                                localStorage.setItem("token", resdata.token)
                                alert("Successfully Login!");
                                navigate("/Home", { state: data });
                            }
                        }
                        else if (resdata.status === false) {
                            setError({ ...error, username: "", password: resdata.msg })
                        }
                    })
            }
            else if (response.status === 404) {
                return response.json()
                    .then((data) => {
                        console.log(data);
                        setError({ ...error, username: data.msg, password: "" })
                    })
            }
            else {
                throw new Error("Response was not ok")
            }
        })
        // 
        // code for connecting springboot
        /*.then((resdata) => {
          console.log(resdata);
          // console.log(resdata)
          if (resdata.statusCodeValue === 409) {
            console.log("wrong")
            console.log(resdata.body)
            setError({ ...error, username: resdata.body, password: "" })
          }
          else {
            if ((data.username === resdata.username) && (data.password === resdata.password)) {
                setError({ ...error, username: "", password: "" });
                setTimeout(success,100)
                function success() {
                    console.log("success");
                    alert("Successfully Login!");
                    navigate("/Home",{state:resdata});
                }
            }
            else if (data.password !== resdata.password) {
              setError({ ...error, username: "", password: "The password you entered is incorrect" })
            }
          }
        })*/
        .catch((error) => {
            console.log("Failed to fetch data ", error)
        })
  }
  return (
    <div className="py-5">
      <div className="row gap-5 justify-content-center">
        {Array.isArray(appliancesData) && appliancesData.map((datas) => (
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
                  <Button className='p-2 w-25' variant="primary" onClick={() => handleShow(datas.name, datas.category, datas.description, datas.regprice, datas.bidprice, datas.biddate, datas.image)}>View</Button>
                </div>
                <Offcanvas show={show} onHide={handleClose} backdrop={false} scroll={true} placement='end'>
                  <Offcanvas.Header closeButton>
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
                        <div class="d-flex gap-1"><p className='text-nowrap fw-bold'>Description :</p><span className='fst-italic'>{canvasData.description}</span></div>
                        <div className="text-center mt-4">
                          <Button variant="primary" className='w-25 p-2' onClick={handleSho}>
                            Bid
                          </Button>
                          <Modal show={sho} onHide={handleClos}>
                            <Modal.Header closeButton>
                              <Modal.Title>Online Auction System</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className='p-0 overflow-hidden'>
                              <form className='row justify-content-center align-items-center py-4 py-md-5 modalhead' onSubmit={handleSubmit}>
                                <fieldset className='col-10 col-lg-9 p-5 d-flex flex-column justify-content-center modalbtn'>
                                  <h3 className='text-white fw-bold text-center mb-5'>Login</h3>
                                  <div class="form-floating">
                                    <input name="username" value={data.username} onChange={handleChange} type="text" class="form-control shadow-lg" id="floatingInput" placeholder="name@example.com" required />
                                    <label for="floatingInput">Username</label>
                                    <p className='text-danger'>{error.username}</p>
                                  </div>
                                  <div class="form-floating mt-3 position-relative">
                                    <input name="password" value={data.password} onChange={handleChange} type={showpass ? "password" : "text"} class="form-control" id="floatingPassword" placeholder="Password" required />
                                    <label for="floatingPassword">Password</label>
                                    <i class="bi bi-eye-fill position-absolute fs-4 absl" type="button" onClick={() => setShowPass(!showpass)}></i>
                                    <p className='text-danger'>{error.password}</p>
                                  </div>
                                  <div className='text-center mt-3'>
                                    <input type='submit' value="Login" className='bg-success rounded-pill text-white fw-bold p-2 w-50 border-0' />
                                  </div>
                                  <Link to="/Register" className='text-center text-decoration-none mt-3'>create a new account?signup</Link>
                                </fieldset>
                              </form>
                            </Modal.Body>
                          </Modal>
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
  )
}

export default Appliances;