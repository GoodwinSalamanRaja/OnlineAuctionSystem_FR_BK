import './UserLogin.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function UserLogin() {
  const [data, setData] = useState({ username: "", password: "" })
  const [error, setError] = useState({ username: "", password: "" })
  const [showpass, setShowPass] = useState(true)
  const navigate = useNavigate()
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
              if(resdata.status===true){
                setError({ ...error, username: "", password: "" });
                setTimeout(success, 100)
                function success() {
                  console.log("success");
                  localStorage.setItem("token",resdata.token)
                  alert("Successfully Login!");
                  navigate("/Home", { state: resdata.data });
                }
              }
              else if (resdata.status===false) {
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
    <div className='container-fluid'>
      <form className='row justify-content-center align-items-center form' onSubmit={handleSubmit}>
        <fieldset className='col-10 col-sm-6 col-lg-4 col-xl-3 h-75 p-5 d-flex flex-column justify-content-center fieldset'>
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
    </div>
    // <div>
    //   <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    //     bid
    //   </button>
    //   <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    //     <div class="modal-dialog">
    //       <div class="modal-content">
    //         <div class="modal-header">
    //           <h4 class="modal-title fw-bold" id="exampleModalLabel">Login</h4>
    //           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //         </div>
    //           <div className='container-fluid'>
    //             <form className='modal-body row justify-content-center align-items-center py-4 py-md-5 form' onSubmit={handleSubmit}>
    //               <fieldset className='col-10 col-lg-9 p-5 d-flex flex-column justify-content-center fieldset'>
    //                 <h3 className='text-white fw-bold text-center mb-5'>Login</h3>
    //                 <div class="form-floating">
    //                   <input name="username" value={data.username} onChange={handleChange} type="text" class="form-control shadow-lg" id="floatingInput" placeholder="name@example.com" required/>
    //                   <label for="floatingInput">Username</label>
    //                   <p className='text-danger'>{error.username}</p>
    //                 </div>
    //                 <div class="form-floating mt-3">
    //                   <input name="password" value={data.password} onChange={handleChange} type="password" class="form-control" id="floatingPassword" placeholder="Password" required/>
    //                   <label for="floatingPassword">Password</label>
    //                   <p className='text-danger'>{error.password}</p>
    //                 </div>
    //                 <div className='text-center mt-3'>
    //                   <input type='submit' value="Login" className='bg-success rounded-pill text-white fw-bold p-2 w-50 border-0' />
    //                 </div>
    //                 <Link to="/Register" className='text-center text-decoration-none mt-3'>create a new account?signup</Link>
    //               </fieldset>
    //             </form>
    //           </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default UserLogin