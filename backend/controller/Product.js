const products = require("../model/Product")
const multer = require("multer")
const path = require("path")
const { body, validationResult } = require("express-validator")
let random;
const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, "./public/uploads")
        },
        filename: (req, file, cb) => {
            random = Date.now()
            cb(null, random + path.extname(file.originalname))
        },
    },
)
const upload = multer({ storage: storage })
exports.uploader = upload.single("productImage")
exports.insert = [
    body("name").trim().escape(),
    body("category").trim().escape(),
    body("description").trim().escape(),
    body("regprice").trim().escape(),
    body("bidprice").trim().escape(),
    body("biddate").trim().escape(),
    (req, res) => {
        console.log(req.file);
        const error = validationResult(req)
        if (error.isEmpty()) {
            const { name, category, description, regprice, bidprice, biddate } = req.body
            console.log(name);
            const product = new products(
                {
                    name: name,
                    category: category,
                    description: description,
                    regprice: regprice,
                    bidprice: bidprice,
                    biddate: biddate,
                    image: random + path.extname(req.file.originalname)
                }
            )
            product.save()
                .then((product) => {
                    res.status(200).send(product)
                })
                .catch((error) => {
                    res.status(200).send(error)
                })
        }
        else {
            res.status(200).send(error.array())
        }
    }
]

exports.getByPage = (req, res) => {
    let page = parseInt(req.params.page)
    const data = 4
    const skip = (page - 1) * data
    products.find().sort("createdAt").skip(skip).limit(data)
        .then((products) => {
            res.status(200).send(products)
        })
        .catch((error) => {
            res.status(200).send(error)
        })
}

exports.getBySize = (req, res) => {
    const data = parseInt(req.params.size)
    products.find().sort("createdAt").skip(0).limit(data)
        .then((products) => {
            res.status(200).send(products)
        })
        .catch((error) => {
            res.status(200).send(error)
        })
}

exports.getByCategory = (req, res) => {
    products.find({ category: req.params.name })
        .then((products) => {
            res.status(200).send(products)
        })
        .catch((error) => {
            res.status(200).send(error)
        })
}

exports.delete = (req, res) => {
    products.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).send({ msg: "Product deleted successfully!!" })
        })
        .catch((error) => {
            res.status(200).send(error)
        })
}

exports.getById = (req, res) => {
    products.findById(req.params.id)
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((error) => {
            res.status(200).send(error)
        })
}

exports.update = (req, res) => {
    const { name, category, description, regprice, bidprice, biddate } = req.body
    products.findByIdAndUpdate(req.params.id,
        {
            $set: {
                name: name,
                category: category,
                description: description,
                regprice: regprice,
                bidprice: bidprice,
                biddate: biddate,
                image: random + path.extname(req.file.originalname)
            }
        }
    )
        .then(() => {
            res.status(200).send({ msg: "Product updated successfully!!" })
        })
        .catch((error) => {
            res.status(200).send(error)
        })
}

exports.findBySearchingName = (req, res) => {
    if (req.params.name === " ") {
        products.find()
            .then((data) => {
                res.status(200).send(data)
            })
            .catch((error) => {
                res.status(200).send(error)
            })
    }
    else {
        const name = new RegExp(req.params.name, 'i')
        products.find({
            $or: [
                { name: { $regex: name } },
                { category: { $regex: name } }
            ]
        })
            .then((data) => {
                res.status(200).send(data)
            })
            .catch((error) => {
                res.status(200).send(error)
            })
    }
}
