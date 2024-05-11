import AddProduct from "./AddProduct";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminProducts() {
   const [showContent, setShowContent] = useState(true)
   const [productData, setProductData] = useState([])
   const [size, setSize] = useState(5)
   const [id, setId] = useState()
   const [productName, setProductName] = useState()
   var count = 1;
   // console.log("id===",id)
   function handleBackButtonClick() {
      setShowContent(true);
   };
   function handleDelete() {
      console.log(id);
      axios.delete(`http://localhost:8080/product/delete/${id}`)
         .then((response) => {
            // console.log(response)
            // console.log(response.data)
            alert(response.data.msg)
            // code for connecting springboot
            // setProductData(productData.filter(product => product.id !== id));
            // code for connecting nodejs
            setProductData(productData.filter(product => product._id !== id));
            // 
         })
         .catch((error) => {
            console.log(error)
         })
   }
   useEffect(() => {
      console.log("productName===", productName)
      // code for connecting springboot
      // axios.get(`http://localhost:8080/product/getBySearch/${encodeURIComponent(productName)}`)
      // code for connecting nodejs
      axios.get(`http://localhost:8080/product/getBySearch/${encodeURIComponent(productName || " ")}`)
      // 
         .then((response) => {
            console.log("search====", response.data)
            setProductData(response.data)
         })
         .catch((error) => {
            console.log(error)
         })
   }, [productName])
   // code for connecting springboot
   // useEffect(() => {
   //    axios.get(`http://localhost:8080/product/getFive/${size}`)
   //       .then((response) => {
   //          console.log("ten==",response.data)
   //          setProductData(response.data)
   //       })
   //       .catch((error) => {
   //          console.log(error)
   //       })
   // },[size])
   // code for connecting nodejs
   useEffect(() => {
      axios.get(`http://localhost:8080/product/getBySize/${size}`)
         .then((res) => {
            console.log("all===", res.data);
            setProductData(res.data)
         })
         .catch((error) => {
            console.log(error)
         })
   }, [size])
   // 
   return (
      <div className="bg-white">
         {showContent ? (
            <div className="container-fluid p-0">
               <div className="row py-3 px-4">
                  <div className="col d-flex">
                     <h3 className="align-self-center fw-bold">List of products</h3>
                  </div>
                  <div className="col text-end">
                     <button className="bg-primary text-white border-0 px-4 py-2" onClick={() => setShowContent(false)}><i class="bi bi-plus-lg"></i> New Entry</button>
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
                        {/* <input type="search" className='form-control border-primary' onChange={(event) => { setProductName("%" + event.target.value + "%") }}></input> */}
                        {/* code for connecting nodejs */}
                        <input type="search" className='form-control border-primary' onChange={(event) => { setProductName(event.target.value) }}></input>
                        {/*  */}
                     </div>
                  </div>
               </div>
               <div className="table-responsive p-3">
                  <table class="table table-hover table-bordered align-middle">
                     <thead>
                        <tr className="border border-2">
                           <th scope="col" className="ps-3">#</th>
                           <th scope="col" className="ps-3">Image</th>
                           <th scope="col" className="ps-3">Category</th>
                           <th scope="col" className="ps-3">Product</th>
                           <th scope="col" className="ps-3">Other Info</th>
                           <th scope="col" className="ps-3">Actions</th>
                        </tr>
                     </thead>
                     {Array.isArray(productData) && productData.map((datas) => (
                        // code for connecting springboot
                        // <tbody className="border border-2" key={datas.id}></tbody>
                        // code for connecting nodejs
                        <tbody className="border border-2" key={datas._id}>
                           {/*  */}
                           <tr className="border border-2">
                              <th scope="row" className="border border-2 ps-3">{count++}</th>
                              <td className="align-self-center border border-2 ps-3">
                                 {/* code for connecting springboot */}
                                 {/* <img width="100%" alt="not found" src={"http://localhost:8080/uploads/" + datas.image} /> */}
                                 {/* code for connecting nodejs */}
                                 <img width="100%" alt="not found" src={"http://localhost:8080/public/" + datas.image} />
                              </td>
                              <td className="fw-bold align-self-center border border-2 ps-3">{datas.category}</td>
                              <td className="border border-2 ps-3">
                                 <div>
                                    <p>Name : <span className="fw-bold">{datas.name}</span></p>
                                    <div className="d-flex gap-1">
                                       <span className="fw-bold">Description:</span>
                                       <p style={{ fontStyle: 'italic' }} className="text-wrap">{datas.description}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="border border-2 ps-3">
                                 <div>
                                    <p>Regular Price : <span className="fw-bold">{datas.regprice}</span></p>
                                    <p>Start Price : <span className="fw-bold">{datas.bidprice}</span></p>
                                    <p>End Date/Time : <span className="fw-bold text-nowrap">{datas.biddate}</span></p>
                                 </div>
                              </td>
                              <td className="border border-2 ps-3">
                                 <div className="d-flex gap-3">
                                    {/* code for connecting springboot */}
                                    {/* <Link to={`/ManageProduct/${datas.id}`} type="button" class="btn btn-outline-primary">Edit</Link> */}
                                    {/* <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setId(datas.id)}>Delete</button> */}
                                    {/* code for connecting nodejs */}
                                    <Link to={`/ManageProduct/${datas._id}`} type="button" class="btn btn-outline-primary">Edit</Link>
                                    <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setId(datas._id)}>Delete</button>
                                    {/*  */}
                                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                       <div class="modal-dialog">
                                          <div class="modal-content">
                                             <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Confirmation</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                             </div>
                                             <div class="modal-body">Are you sure to delete this product?</div>
                                             <div class="modal-footer">
                                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleDelete}>Confirm</button>
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                             </div>
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
         ) : (<AddProduct onBackButtonClick={handleBackButtonClick} />)}
      </div>
   )
}

export default AdminProducts;