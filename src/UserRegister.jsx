import './UserRegister.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function UserRegister() {
    const [data, setData] = useState({ name: "", email: "", username: "", password: "", })
    const [error, setError] = useState({ username: "", password: "" })
    const[showpass,setShowPass] = useState(true)
    const navigate = useNavigate()
    function handleChange(event) {
        const { name, value } = event.target
        setData({ ...data, [name]: value })
    }
    function handleSubmit(event) {
        event.preventDefault()
        console.log(data)
        if ((data.username.length >= 8) && (data.password.length >= 8)) {
            console.log("username success")
            console.log("password success")
            setError({ ...error, username: "", password: "" })
            fetch("http://localhost:8080/user/register", { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(data) })
                .then((response) => {
                    console.log(response)
                    if (response.status === 200) {
                        return response.json()
                    }
                    else {
                        throw new Error("Response was not ok")
                    }
                })
                .then((data) => {
                    console.log(data)
                    // Code for connecting springboot
                    // if (data.statusCodeValue === 200) {
                    //     alert("Account created successfully,Click OK to Login!")
                    //     navigate('/Login')
                    // }
                    // else {
                    //     alert(data.body)
                    // }
                    // Code for connecting nodejs
                    if(Array.isArray(data)){
                        alert(data[0].msg)
                    }
                    else{
                        alert(data.msg)
                        navigate('/Login')
                    }
                    // 
                })
                .catch((error) => {
                    console.log("Failed to fetch data ", error)
                })
        }
        else if ((data.username.length <= 8) && (data.password.length <= 8)) {
            setError({ ...error, username: "username must exceeds eight character", password: "password must exceeds eight character" })
        }
        else if (data.username.length <= 8) {
            setError({ ...error, username: "username must exceeds eight character", password: "" })
        }
        else if (data.password.length <= 8) {
            setError({ ...error, username: "", password: "password must exceeds eight character" })
        }
    }
    return (
        <div className='container-fluid'>
            <form className='row justify-content-center align-items-center regform' onSubmit={handleSubmit}>
                <fieldset className='col-10 col-sm-8 col-md-6 col-lg-5 col-xl-3 p-5 d-flex flex-column gap-2 gap-md-3 justify-content-center regfieldset'>
                    <h2 className='text-white fw-bold text-center mb-2 mb-lg-4'>Register</h2>
                    <div class="form-floating">
                        <input name="name" value={data.name} onChange={handleChange} type="text" class="form-control shadow-lg" id="floatingInput" placeholder="name@example.com" required />
                        <label for="floatingInput">Name</label>
                    </div>
                    <div class="form-floating mt-3">
                        <input name="email" value={data.email} onChange={handleChange} type="email" class="form-control shadow-lg" id="floatingInput" placeholder="name@example.com" required />
                        <label for="floatingInput">Email</label>
                    </div>
                    <div class="form-floating mt-3">
                        <input name="username" value={data.username} onChange={handleChange} type="text" class="form-control shadow-lg" id="floatingInput" placeholder="name@example.com" required />
                        <label for="floatingInput">Username</label>
                        <p className='text-danger'>{error.username}</p>
                    </div>
                    <div class="form-floating mt-3 position-relative">
                        <input name="password" value={data.password} onChange={handleChange} type={showpass ? "password" : "text"} class="form-control" id="floatingPassword" placeholder="Password" required />
                        <label for="floatingPassword">
                            <div>Password</div>
                        </label>
                        <i class="bi bi-eye-fill position-absolute fs-4 absl" type="button" onClick={() => setShowPass(!showpass)}></i>
                        <p className='text-danger'>{error.password}</p>
                    </div>
                    <div className='text-center'>
                        <input type='submit' value="SignUp" className='bg-success rounded-pill text-white fw-bold p-2 w-50 border-0' />
                    </div>
                </fieldset>
            </form>
        </div>
    )
}

export default UserRegister