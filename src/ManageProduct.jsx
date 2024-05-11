import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ManageProduct() {
    const navigate = useNavigate()
    const [image, setImage] = useState(null)
    const [comingImage, setComingImage] = useState(null)
    const [productData, setProductData] = useState({ name: "", category: "", description: "", regprice: "", bidprice: "", biddate: "" })
    const { productId } = useParams()
    console.log("datasss", productId)
    var file;
    function handleInputChange(event) {
        const { name, value } = event.target;
        setProductData({ ...productData, [name]: value })
        console.log("onchng==", productData)
    }
    function handleSubmit(event) {
        console.log("snnsn")
        event.preventDefault()
        // console.log(image)
        const formData = new FormData()
        formData.append("name", productData.name)
        formData.append("category", productData.category)
        formData.append("description", productData.description)
        formData.append("regprice", productData.regprice)
        formData.append("bidprice", productData.bidprice)
        formData.append("biddate", productData.biddate)
        formData.append("productImage", image)
        fetch(`http://localhost:8080/product/update/${productId}`, { method: "PUT", body: formData })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((data) => {
                console.log("update==", data)
                alert(data.msg)
                navigate("/AdminIndex")
            })
            .catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        axios.get(`http://localhost:8080/product/get/${productId}`)
            .then((response) => {
                // console.log(response)
                console.log("response data:", response.data)
                setProductData(response.data)
                console.log(response.data.image.files);
                setComingImage(response.data.image)
                // console.log("=====", productData)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    return (
        <div>
            <div className="container-fluid">
                <div className="row p-4">
                    <div className="col">
                        <h1>Manage Products</h1>
                    </div>
                    <div className="col text-end">
                        <button type="button" class="btn-close fs-4" aria-label="Close" onClick={() => window.history.back()}></button>
                    </div>
                    <hr className="mt-3"></hr>
                </div>
                <form onSubmit={handleSubmit} class="row gap-1 px-4 pb-5 justify-content-center">
                    <div class="col-md-6 mb-3 fs-5">
                        <label for="inputEmail4" class="form-label">Name</label>
                        <input type="text" class="form-control form-control-lg" id="inputEmail4" name="name" value={productData.name} onChange={handleInputChange} />
                    </div>
                    <div class="col-md-6 mb-3 fs-5">
                        <label for="inputPassword4" class="form-label">Category</label>
                        <select class="form-select form-select-lg" aria-label="Default select example" type="button" name="category" value={productData.category} onChange={handleInputChange}>
                            <option value="Appliances">Appliances</option>
                            <option value="Desktop Computers">Desktop Computers</option>
                            <option value="Laptops">Laptops</option>
                            <option value="Mobile Phone">Mobile Phone</option>
                            <option value="Televisions">Televisions</option>
                        </select>
                    </div>
                    <div class="col-md-6 fs-5 mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                        <textarea class="form-control form-control-lg" id="exampleFormControlTextarea1" rows="3" name="description" value={productData.description} onChange={handleInputChange}></textarea>
                    </div>
                    <div class="col-md-6 fs-5 mb-3">
                        <label for="inputAddress2" class="form-label">Regular Price</label>
                        <input type="number" class="form-control form-control-lg" id="inputAddress2" name="regprice" value={productData.regprice} onChange={handleInputChange} />
                    </div>
                    <div class="col-md-6 fs-5 mb-3">
                        <label for="inputCity" class="form-label">Starting Bidding Amount</label>
                        <input type="number" class="form-control form-control-lg" id="inputCity" name="bidprice" value={productData.bidprice} onChange={handleInputChange} />
                    </div>
                    <div class="col-md-6 fs-5 mb-3">
                        <label for="datetime" class="form-label">Bidding End Date/Time</label>
                        <input type="datetime-local" id="datetime" class="form-control form-control-lg" name="biddate" value={productData.biddate} onChange={handleInputChange}></input>
                    </div>
                    <div class="col-md-6 fs-5 mb-3 d-flex flex-column">
                        <label for="" class="form-label">Upload Product Image</label>
                        <div class="input-group">
                            <input type="file" class="form-control form-control-lg" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" name="image" onChange={(event) => { file = event.target.files[0] }} />
                            <button class="btn btn-outline-info" type="button" id="inputGroupFileAddon04" onClick={() => setImage(file)}>Upload</button>
                            <button class="btn btn-outline-danger" type="button" id="inputGroupFileAddon04" onClick={() => { setImage(null); setComingImage(null) }}>Delete</button>
                        </div>
                        <div className="text-center">
                            {/* code for connecting springboot */}
                            {/* {comingImage && (<img className="mt-3" src={"http://localhost:8080/uploads/" + comingImage} alt="not found" width="50%" />)} */}
                            {/* code for connecting nodejs */}
                            {comingImage && (<img className="mt-3" src={"http://localhost:8080/public/" + comingImage} alt="not found" width="50%" />)}
                            {/*  */}
                            {image && (
                                <img className="mt-3" src={URL.createObjectURL(image)} alt="Not found" width="50%" />
                            )}
                        </div>
                    </div>
                    <div class="col-12 text-center mt-3">
                        <input type="submit" value="Update" class="btn btn-success w-25 fw-bold fs-5 p-2" />
                    </div>
                </form>
            </div >
        </div >
    )
}

export default ManageProduct;