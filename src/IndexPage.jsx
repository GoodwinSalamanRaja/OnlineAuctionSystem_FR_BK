import NavBar from "./Navbar.jsx"
import { useState } from 'react';
import AllProducts from './AllProducts';
import Appliances from './Appliances';
import Computers from './Computers';
import Laptops from './Laptops';
import MobilePhones from './MobilePhones';
import Televisions from './Televisions';
import { useEffect } from "react";
import axios from "axios";

function IndexPage(){
  const [allProductPage, setAllProductPage] = useState(true)
  const [appliancesPage, setAppliancesPage] = useState(false)
  const [computersPage, setComputersPage] = useState(false)
  const [laptopsPage, setLaptopsPage] = useState(false)
  const [mobilePhonesPage, setMobilePhonesPage] = useState(false)
  const [televisionsPage, setTelevisionsPage] = useState(false)
  const [pageName,setPageName] = useState()
  const [datas,setDatas] = useState()
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
  useEffect(() => {
    console.log(pageName);
    axios.get(`http://localhost:8080/product/getByName/${pageName}`)
    .then((response) => {
      console.log("name===",response.data)
      setDatas(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  },[pageName])
   return(
     <div>
       <NavBar />
       <div className="container-fluid pe-4 py-4">
        <div className="row">
          <div className="col-3">
            <div class="card" style={{ width: '22rem',position:'fixed',top:'11%'}}>
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
          <div className="col-9" style={{backgroundColor:'rgb(245,245,245)'}}>
            {allProductPage?<AllProducts />:appliancesPage?<Appliances appliancesData={datas} />:computersPage?<Computers computersData={datas}/>:laptopsPage?<Laptops laptopsData={datas}/>:mobilePhonesPage?<MobilePhones mobilePhonesData={datas}/>:televisionsPage?<Televisions televisionsData={datas}/>:""}
          </div>
        </div>
      </div>
     </div>
   )
}

export default IndexPage