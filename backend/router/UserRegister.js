const express = require("express")
const router = express.Router()
const UserRegisterController = require("../controller/UserRegister")
router.post("/register",UserRegisterController.insert)
router.post("/login",UserRegisterController.check)
router.get("/getBySize/:size",UserRegisterController.getBySize)
router.delete("/delete/:id",UserRegisterController.delete)
router.get("/get/:id",UserRegisterController.get)
router.put("/update/:id",UserRegisterController.update)
router.get("/getBySearch/:name",UserRegisterController.getBySearch)
router.get("/userwithbid/:size",UserRegisterController.getUserWithBid)
router.get("/searchuserwithbid/:name",UserRegisterController.searchuserwithbid)

module.exports = router