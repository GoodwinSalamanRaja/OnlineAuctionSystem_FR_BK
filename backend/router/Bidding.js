const express = require("express")
const router = express.Router()
const BiddingController = require("../controller/Bidding")
router.post("/set/:id",BiddingController.setBiddingToUser)
router.get("/get",BiddingController.getAll)

module.exports = router