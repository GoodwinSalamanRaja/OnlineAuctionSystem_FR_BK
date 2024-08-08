import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function AdminBids() {
  const [biddingData, setBiddingData] = useState([]);
  const [size, setSize] = useState(5);
  const [name, setName] = useState();
  const [userData, setUserData] = useState();
  var count = 1;
  // console.log("id===",id)
  function BidUserDetails(a, b, c) {
    setUserData({ ...userData, name: a, username: b, email: c });
  }
  useEffect(() => {
    const bidAmountsByProduct = {};
    if (biddingData) {
      console.log("nsnnnnnnnnnn", biddingData);
      biddingData.forEach((element) => {
        element.biddings.forEach((bid) => {
          if (
            !bidAmountsByProduct[bid.productName] ||
            bidAmountsByProduct[bid.productName] < bid.amount
          ) {
            bidAmountsByProduct[bid.productName] = bid.amount;
          }
        });
      });
      console.log("======", bidAmountsByProduct);
    }
    const newResult = {}
    biddingData.forEach((element) => {
        element.biddings.forEach((bid) => {
          if (bid.amount === bidAmountsByProduct[bid.productName]) {
            newResult[bid._id] = "Highest In Bid";
          }
        });
      });
    setResult(newResult)
  }, [biddingData]);
  useEffect(() => {
    // code for connecting springboot
    // axios.get(`http://localhost:8080/user/searchuserwithbid/${encodeURIComponent(name)}`)
    // code for connecting nodejs
    axios
      .get(
        `http://localhost:8080/user/searchuserwithbid/${encodeURIComponent(
          name || " "
        )}`
      )
      //
      .then((response) => {
        console.log("search====", response.data);
        setBiddingData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [name]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/userwithbid/${size}`)
      .then((response) => {
        console.log("ten==", response.data);
        // console.log(response.data[0].biddings)
        // setBiddingData(response.data[0].biddings.map((data,i) => {
        //         console.log(data)
        // }))
        // setBidWithUserData(
        //     {
        //         for(var i=0;1===1;i++){
        //             if(Array.isArray(response.data[i].biddings)){
        //                 response.data[i].biddings.map((data,i) => {
        //                     console.log("====",data)
        //                     console.log(i);
        //                 })
        //             }
        //         }
        //     }
        // )
        console.log(response.data.length);
        // console.log("2",response.data[2].biddings);
        // for(var i=0;i < response.data.length;i++){
        //     if(response.data[i].biddings.length !== 0){
        //         console.log(i)
        //         if(size === 5){
        //            setBiddingData(response.data.slice(0,4))
        //         }
        //         else if(size === 10){
        //            setBiddingData(response.data.slice(5,9))
        //         }
        //         console.log("======",biddingData);
        //     }
        // }
        // console.log(bidWithUserData)
        setBiddingData(response.data);
        // console.log("checkk==", biddingData)
        // console.log(biddingData[0].biddings[0].productName)
        // console.log(biddingData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [size]);

  const [result, setResult] = useState();

  return (
    <div className="bg-white">
      <div className="container-fluid p-0">
        <div className="d-flex ps-4 py-3">
          <h3 className="align-self-center fw-bold">List of Bids</h3>
        </div>
        <hr className="m-0"></hr>
        <div className="row py-3 px-4">
          <div className="col d-flex align-items-center gap-1 fs-5">
            <span>Show</span>
            <select
              class="border-1"
              style={{ width: "4rem" }}
              aria-label="Default select example"
              onChange={(event) => setSize(event.target.value)}
            >
              <option selected value="5">
                5
              </option>
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
              {/* <input type="search" className='form-control border-primary' onChange={(event) => { setName("%" + event.target.value + "%") }}></input> */}
              {/* code for connecting nodejs */}
              <input
                type="search"
                className="form-control border-primary"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              ></input>
              {/*  */}
            </div>
          </div>
        </div>
        <div className="table-responsive p-3">
          <table class="table table-hover table-bordered align-middle">
            <thead>
              <tr className="border border-2">
                <th scope="col" className="text-center">
                  #
                </th>
                <th scope="col" className="text-center">
                  Product Name
                </th>
                <th scope="col" className="text-center">
                  UserName
                </th>
                <th scope="col" className="text-center">
                  Amount
                </th>
                <th scope="col" className="text-center">
                  Status
                </th>
                <th scope="col" className="text-center"></th>
              </tr>
            </thead>
            {Array.isArray(biddingData) &&
              biddingData.map((datas) => (
                // code for connecting springboot
                // <tbody className="border border-2" key={datas.id}>
                // code for connecting nodejs
                <tbody className="border border-2" key={datas._id}>
                  {/*  */}
                  {datas.biddings.map((bidding) => {
                    // let amountss = []
                    // amountss.push(bidding.amount)
                    // console.log("aaa", amountss);
                    // const highestAmount = Math.max()
                    // console.log(highestAmount);
                    // const isWinner = highestAmount === bidding.amount
                    // console.log(isWinner);
                    // code for connecting springboot
                    // <tr className="border border-2" key={bidding.id}>
                    return (
                      // code for connecting nodejs
                      <tr className="border border-2" key={bidding._id}>
                        {/*  */}
                        <th
                          scope="row"
                          className="border border-2 text-center py-3"
                        >
                          {count++}
                        </th>
                        <td className="fw-bold align-self-center border border-2 text-center">
                          {bidding.productName}
                        </td>
                        <td className="border border-2 text-center">
                          {datas.name}
                        </td>
                        <td className="border border-2 text-center fw-bold">
                          {bidding.amount}
                        </td>
                        <td className="border border-2 text-center">
                          <span
                            className={`${result[bidding._id] ? "bg-success py-2 px-4 text-white fw-bold rounded-2" : "bg-secondary py-2 px-5 text-white fw-bold rounded-2"}`}
                          >
                            {result[bidding._id] || "Pending"}
                          </span>
                        </td>
                        <td className="border border-2 text-center">
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            onClick={() =>
                              BidUserDetails(
                                datas.name,
                                datas.username,
                                datas.email
                              )
                            }
                          >
                            View Buyer Details
                          </button>
                          {userData && (
                            <div
                              class="modal"
                              id="staticBackdrop"
                              data-bs-backdrop="static"
                              data-bs-keyboard="false"
                              tabindex="-1"
                              aria-labelledby="staticBackdropLabel"
                              aria-hidden="true"
                            >
                              <div class="modal-dialog">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5
                                      class="modal-title"
                                      id="staticBackdropLabel"
                                    >
                                      Buyer Details
                                    </h5>
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div class="modal-body">
                                    <div>
                                      <div className="d-flex gap-1">
                                        <p>Name :</p>
                                        <span className="fw-bold">
                                          {userData.name}
                                        </span>
                                      </div>
                                      <div className="d-flex gap-1">
                                        <p>UserName :</p>
                                        <span className="fw-bold">
                                          {userData.username}
                                        </span>
                                      </div>
                                      <div className="d-flex gap-1">
                                        <p>Email :</p>
                                        <span className="fw-bold">
                                          {userData.email}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="modal-footer">
                                    <button
                                      type="button"
                                      class="btn btn-secondary"
                                      data-bs-dismiss="modal"
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminBids;
