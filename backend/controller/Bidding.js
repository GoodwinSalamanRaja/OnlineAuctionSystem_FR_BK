const { all } = require("axios")
const biddings = require("../model/Bidding")
const users = require("../model/UserRegister")

exports.setBiddingToUser = (req,res) => {
    const bidding = new biddings(req.body)
    bidding.save()
    .then((bidding) => {
        users.findByIdAndUpdate(req.params.id,
            {
                $push:{biddings:bidding._id}
            },
            {new:true,useFindAndModify:false}
        )
        .then((user) => {
            res.status(200).send(user)
        })
        .catch((error) => {
            res.status(200).send(error)
        })
    })
    .catch((error) => {
        res.status(200).send(error)
    })
}

exports.getAll = (req,res) => {
    biddings.find({amount:{$gt:50000}})
    .then((data) => {
        res.status(200).send(data)
    })
    .catch((error) => {
        res.status(200).send(error)
    })
}
