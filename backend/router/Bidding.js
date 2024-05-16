const express = require("express")
const router = express.Router()
const BiddingController = require("../controller/Bidding")
router.post("/set/:id",BiddingController.setBiddingToUser)
router.get("/get/:name",BiddingController.getAll)
router.get("/winner",BiddingController.getWinnerOfBids)

module.exports = router