const express = require("express")
const router = express.Router()
const ProductController = require("../controller/Product")
const verifyToken = require("../middleware/VerifyToken")
router.post("/set",ProductController.insert)
router.get("/getByPage/:page"/*,verifyToken*/,ProductController.getByPage)
router.get("/getBySize/:size",ProductController.getBySize)
router.get("/getByName/:name",ProductController.getByCategory)
router.delete("/delete/:id",ProductController.delete)
router.get("/get/:id",ProductController.getById)
router.put("/update/:id",ProductController.update)
router.get("/getBySearch/:name",ProductController.findBySearchingName)

module.exports = router