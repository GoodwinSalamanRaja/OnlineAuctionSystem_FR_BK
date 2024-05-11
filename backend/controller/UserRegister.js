const users = require("../model/UserRegister")
const { body, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const bidding = require("../model/Bidding")
exports.insert = [
    body("name").trim(),
    body("email").isEmail().trim().withMessage("Kindly fill email"),
    body("username").trim().escape()
        .custom(async (value) => {
            const user = await users.findOne({ username: value })
            if (user !== null) {
                return Promise.reject("username already exists!")
            }
        }),
    (req, res) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const user = new users({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            })
            user.save()
                .then((data) => {
                    res.status(200).send({ msg: "Account created successfully,Click OK to Login!", user: data })
                })
                .catch((error) => {
                    res.status(200).send(error)
                })
        }
        else {
            res.status(200).send(errors.array())
        }
    }]
exports.check = [
    async (req, res) => {
        const user = await users.findOne({ username: req.body.username })
        console.log(user);
        if (user) {
            if (req.body.password === user.password) {
                const token = jwt.sign({ userId: user._id }, "random-token", { expiresIn: '1h' })
                res.status(200).send({ status: true, token, data: user })
            }
            else {
                res.status(200).send({ status: false, msg: "The password you entered is incorrect" })
            }
        }
        else {
            res.status(404).send({ msg: "The username doesnot exist" })
        }
    }
]

exports.getBySize = (req, res) => {
    const data = parseInt(req.params.size)
    users.find().sort("createdAt").skip(0).limit(data)
        .then((products) => {
            res.status(200).send(products)
        })
        .catch((error) => {
            res.status(200).send(error)
        })
}

exports.delete = (req, res) => {
    users.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).send({ msg: "User deleted successfully!!" })
        })
        .catch((error) => {
            res.status(200).send(error)
        })
}

exports.get = (req, res) => {
    users.findOne({ _id: req.params.id })
        .then((user) => {
            res.status(200).send(user)
        })
        .catch((error) => {
            res.status(200).send(error)
        })
}

exports.update = (req, res) => {
    users.findByIdAndUpdate(req.params.id,
        {
            $set: {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
            }
        },
        { new: true }
    )
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((error) => {
            res.status(200).send(error)
        })
}

exports.getBySearch = (req, res) => {
    if (req.params.name !== " ") {
        const name = new RegExp(req.params.name, 'i')
        users.find({
            $or: [
                { name: { $regex: name } },
                { username: { $regex: name } },
                { email: { $regex: name } }
            ]
        })
            .then((data) => {
                res.status(200).send(data)
            })
            .catch((error) => {
                res.status(200).send(error)
            })
    }
    else {
        users.find()
            .then((data) => {
                res.status(200).send(data)
            })
            .catch((error) => {
                res.status(200).send(error)
            })
    }
}

exports.getUserWithBid = (req, res) => {
    users.find({ biddings: { $exists: true, $not: { $size: 0 } } }).populate({ path: "biddings", select: "-__v", options: { sort: { updatedAt: "desc" } } }).skip(0).limit(parseInt(req.params.size))
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((error) => {
            res.status(200).send(error)
        })
}
exports.searchuserwithbid = (req, res) => {
    if (req.params.name !== " ") {
        const name = new RegExp(req.params.name, 'i')
        users.find({ $and: [{ biddings: { $exists: true, $not: { $size: 0 } } }, { username: { $regex: name } }] }).populate("biddings")
            .then((data) => {
                // const filteredData = data.filter((data) => { return data.biddings.filter((bid) => bid.productName.match(name)) || data.username.match(name) })
                res.status(200).send(data)
            })
            .catch((error) => {
                res.status(200).send(error)
            })
    }
    else {
        users.find().populate("biddings")
            .then((data) => {
                res.status(200).send(data)
            })
            .catch((error) => {
                res.status(200).send(error)
            })
    }
}