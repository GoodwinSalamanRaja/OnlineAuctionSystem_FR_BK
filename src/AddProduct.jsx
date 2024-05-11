import { useState } from "react";

function AddProduct({ onBackButtonClick }) {
    const [data, setData] = useState({ name: "", category: "", description: "", regprice: "", bidprice: "", biddate: "" })
    const [image, setImage] = useState(null)
    var file;
    function handleInputChange(event) {
        const { name, value } = event.target;
        setData({ ...data, [name]: value })
    }
    function handleSubmit(event) {
        console.log("snnsn")
        event.preventDefault()
        console.log(data)
        console.log(image)
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("category", data.category)
        formData.append("description", data.description)
        formData.append("regprice", data.regprice)
        formData.append("bidprice", data.bidprice)
        formData.append("biddate", data.biddate)
        formData.append("productImage", image)
        fetch("http://localhost:8080/product/set", { method: "POST", body: formData })
            .then((response) => {
                console.log(response);
                if (response.ok) {
                    alert("Product added successfully!!")
                    window.location.reload();
                    return response.json()
                }
            })
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div>
            <div className="container-fluid">
                <div className="row p-4">
                    <div className="col">
                        <h3>Add Products</h3>
                    </div>
                    <div className="col text-end">
                        <button type="button" class="btn-close fs-4" aria-label="Close" onClick={() => onBackButtonClick()}></button>
                    </div>
                    <hr className="mt-3"></hr>
                </div>
                <form onSubmit={handleSubmit} class="row g-3 px-4 pb-5">
                    <div class="col-md-6 mb-3">
                        <label for="inputEmail4" class="form-label">Name</label>
                        <input type="text" class="form-control form-control-lg" id="inputEmail4" name="name" onChange={handleInputChange} />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="inputPassword4" class="form-label">Category</label>
                        <select class="form-select form-select-lg" aria-label="Default select example" type="button" name="category" onChange={handleInputChange}>
                            <option selected>Please select here</option>
                            <option value="Appliances">Appliances</option>
                            <option value="Desktop Computers">Desktop Computers</option>
                            <option value="Laptops">Laptops</option>
                            <option value="Mobile Phone">Mobile Phone</option>
                            <option value="Televisions">Televisions</option>
                        </select>
                    </div>
                    <div class="col-12 mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                        <textarea class="form-control form-control-lg" id="exampleFormControlTextarea1" rows="3" name="description" onChange={handleInputChange}></textarea>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="inputAddress2" class="form-label">Regular Price</label>
                        <input type="number" class="form-control form-control-lg" id="inputAddress2" name="regprice" onChange={handleInputChange} />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="inputCity" class="form-label">Starting Bidding Amount</label>
                        <input type="number" class="form-control form-control-lg" id="inputCity" name="bidprice" onChange={handleInputChange} />
                    </div>
                    <div class="col-md-7 mb-3">
                        <label for="datetime" class="form-label">Bidding End Date/Time</label>
                        <input type="datetime-local" id="datetime" class="form-control form-control-lg" name="biddate" onChange={handleInputChange}></input>
                    </div>
                    <div class="col-md-7 mb-3">
                        <label for="" class="form-label">Upload Product Image</label>
                        <div class="input-group">
                            <input type="file" class="form-control form-control-lg" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" name="image" onChange={(event) => { file = event.target.files[0] }} />
                            <button class="btn btn-outline-info" type="button" id="inputGroupFileAddon04" onClick={() => setImage(file)}>Upload</button>
                            <button class="btn btn-outline-danger" type="button" id="inputGroupFileAddon04" onClick={() => setImage(null)}>Delete</button>
                        </div>
                        <div className="text-center">
                            {image && (
                                <img className="mt-3" src={URL.createObjectURL(image)} alt="Not found" width="50%" />
                            )}
                        </div>
                    </div>
                    <div class="col-6 text-center">
                        <input type="submit" value="Insert" class="btn btn-success w-50 fw-bold fs-5 p-2" />
                    </div>
                </form>
            </div >
        </div >
    )
}

export default AddProduct;