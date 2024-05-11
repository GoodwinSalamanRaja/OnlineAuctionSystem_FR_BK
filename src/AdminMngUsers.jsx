import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"

function AdminMngUsers() {
    const [userData, setuserData] = useState([])
    const [size, setSize] = useState(5)
    const [id, setId] = useState()
    const [username, setusername] = useState()
    const [updateUser, setUpdateUser] = useState({ name: "", username: "", email: "", password: "" })
    const [updateId, setUpdateId] = useState()
    const [user, setUser] = useState({ name: "", username: "", email: "", password: "" })
    var count = 1;
    // console.log("id===",id)
    function handleChange(event) {
        const { name, value } = event.target;
        setUpdateUser({ ...updateUser, [name]: value })
        // console.log(updateUser)
        setUser({ ...user, [name]: value })
        console.log(user)
    }
    function addUser() {
        axios.post("http://localhost:8080/user/register", user)
            .then((response) => {
                console.log(response.data)
                alert("User added successfully")
                setuserData([...userData, response.data.user]);
                // console.log(userData)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    function getUser(id) {
        axios.get(`http://localhost:8080/user/get/${id}`)
            .then((response) => {
                console.log(response)
                console.log("user====", response.data)
                setUpdateUser(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    function handleUpdate() {
        console.log("id-==", updateId)
        console.log(updateUser);
        axios.put(`http://localhost:8080/user/update/${updateId}`, updateUser)
            .then((response) => {
                console.log(response)
                console.log(response.data)
                alert("User updated successfully!!")
                setuserData(userData.map(user => {
                    //  code for connecting springboot
                    //   if (user.id === updateId) {
                    //  code for connecting nodejs
                    if (user._id === updateId) {
                    // 
                        return response.data;
                    } else {
                        return user;
                    }
                }))
                console.log(userData);
            })
            .catch((error) => {
                console.log(error)
            })
    }
    function handleDelete() {
        axios.delete(`http://localhost:8080/user/delete/${id}`)
            .then((response) => {
                console.log(response)
                console.log(response.data)
                // code for connecting springboot
                // alert("User deleted successfully!!")
                // code for connecting nodejs
                alert(response.data.msg)
                // 
                setuserData(userData.filter(user => user._id !== id));
            })
            .catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        // code for connecting springboot
        // axios.get(`http://localhost:8080/user/getBySearch/${encodeURIComponent(username)}`)
        // code for connecting nodejs
        axios.get(`http://localhost:8080/user/getBySearch/${encodeURIComponent(username || " ")}`)
        // 
            .then((response) => {
                console.log("search====", response.data)
                setuserData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [username])
    useEffect(() => {
        // code for connecting springboot
        // axios.get(`http://localhost:8080/user/getFive/${size}`)
        // code for connecting nodejs
        axios.get(`http://localhost:8080/user/getBySize/${size}`)
            // 
            .then((response) => {
                console.log("ten==", response.data)
                setuserData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [size])
    return (
        <div className="bg-white">
            <div className="container-fluid p-0">
                <div className="row py-3 px-4">
                    <div className="col d-flex">
                        <h3 className="align-self-center fw-bold">List of Users</h3>
                    </div>
                    <div className="col text-end">
                        <button className="bg-primary text-white border-0 px-4 py-2" data-bs-toggle="modal" data-bs-target="#newuserModal"><i class="bi bi-plus-lg"></i> New User</button>
                    </div>
                </div>
                <div class="modal fade" id="newuserModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3 class="modal-title" id="exampleModalLabel">New User</h3>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label-lg">Name:</label>
                                        <input name="name" type="text" class="form-control form-control-lg" id="recipient-name" onChange={handleChange} />
                                    </div>
                                    <div class="mb-3">
                                        <label for="message-text" class="col-form-label-lg">Username:</label>
                                        <input name="username" type="text" class="form-control form-control-lg" id="message-text" onChange={handleChange} />
                                    </div>
                                    <div class="mb-3">
                                        <label for="message-email" class="col-form-label-lg" >Email:</label>
                                        <input name="email" type="email" class="form-control form-control-lg" id="message-email" onChange={handleChange} />
                                    </div>
                                    <div class="mb-3">
                                        <label for="message-pass" class="col-form-label-lg" >Password:</label>
                                        <input name="password" type="password" class="form-control form-control-lg" id="message-pass" onChange={handleChange} />
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={addUser}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="m-0"></hr>
                <div className="row py-3 px-4">
                    <div className="col d-flex align-items-center gap-1 fs-5">
                        <span>Show</span>
                        <select class="border-1" style={{ width: '4rem' }} aria-label="Default select example" onChange={(event) => setSize(event.target.value)}>
                            <option selected value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                        <span>entries</span>
                    </div>
                    <div className="col d-flex justify-content-end fs-5">
                        <div className="d-flex gap-2 w-50 input-group input-group-sm">
                            <span>Search :</span>
                            {/* code for connecting springboot */}
                            {/* <input type="search" className='form-control border-primary' onChange={(event) => { setusername("%" + event.target.value + "%") }}></input> */}
                            {/* code for connecting nodejs */}
                            <input type="search" className='form-control border-primary' onChange={(event) => { setusername(event.target.value) }}></input>
                            {/*  */}
                        </div>
                    </div>
                </div>
                <div className="table-responsive p-3">
                    <table class="table table-hover table-bordered align-middle">
                        <thead>
                            <tr className="border border-2">
                                <th scope="col" className="text-center">#</th>
                                <th scope="col" className="text-center">Name</th>
                                <th scope="col" className="text-center">Username</th>
                                <th scope="col" className="text-center">Email</th>
                                <th scope="col" className="text-center">Actions</th>
                            </tr>
                        </thead>
                        {Array.isArray(userData) && userData.map((datas) => (
                            <tbody className="border border-2" key={datas.id}>
                                <tr className="border border-2">
                                    <th scope="row" className="border border-2 text-center py-3">{count++}</th>
                                    <td className="fw-bold align-self-center border border-2 text-center">{datas.name}</td>
                                    <td className="border border-2 text-center">{datas.username}</td>
                                    <td className="border border-2 text-center">{datas.email}</td>
                                    <td className="d-flex justify-content-center">
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                Action
                                            </button>
                                            <ul class="dropdown-menu">
                                                {/* code for connecting springboot */}
                                                {/* <li><button type="button" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => {getUser(datas.id);setUpdateId(datas.id)}}>Edit</button></li>
                                                <li><button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => setId(datas.id)}>Delete</button></li> */}
                                                {/* code for connecting nodejs */}
                                                <li><button type="button" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => { getUser(datas._id); setUpdateId(datas._id) }}>Edit</button></li>
                                                <li><button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => setId(datas._id)}>Delete</button></li>
                                                {/*  */}
                                            </ul>
                                        </div>
                                        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h3 class="modal-title" id="exampleModalLabel">Edit User</h3>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <form>
                                                            <div class="mb-3">
                                                                <label for="recipient" class="col-form-label-lg">Name:</label>
                                                                <input name="name" type="text" class="form-control form-control-lg" id="recipient" value={updateUser.name} onChange={handleChange} />
                                                            </div>
                                                            <div class="mb-3">
                                                                <label for="message-name" class="col-form-label-lg">Username:</label>
                                                                <input name="username" type="text" class="form-control form-control-lg" id="message-name" value={updateUser.username} onChange={handleChange} />
                                                            </div>
                                                            <div class="mb-3">
                                                                <label for="message-ema" class="col-form-label-lg">Email:</label>
                                                                <input name="email" type="email" class="form-control form-control-lg" id="message-ema" value={updateUser.email} onChange={handleChange} />
                                                            </div>
                                                            <div class="mb-3">
                                                                <label for="message-p" class="col-form-label-lg">Password:</label>
                                                                <input name="password" type="password" class="form-control form-control-lg" id="message-p" onChange={handleChange} />
                                                                <p className="fst-italic">Leave this blank if you dont want to change the password.</p>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleUpdate}>Save</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="exampleModalLabel">Confirmation</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">Are you sure to delete this user?</div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleDelete}>Confirm</button>
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminMngUsers;