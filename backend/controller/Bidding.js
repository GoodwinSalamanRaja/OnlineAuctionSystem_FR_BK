const { all } = require("axios")
const biddings = require("../model/Bidding")
const users = require("../model/UserRegister")

exports.setBiddingToUser = (req, res) => {
    const bidding = new biddings(req.body)
    bidding.save()
        .then((bidding) => {
            users.findByIdAndUpdate(req.params.id,
                {
                    $push: { biddings: bidding._id }
                },
                { new: true, useFindAndModify: false }
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

exports.getAll = (req, res) => {
    // console.log(req.params.name);
    biddings.find({ productName: req.params.name }).sort({ amount: "desc" }).limit(1)
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((error) => {
            res.status(200).send(error)
        })
}

exports.getWinnerOfBids = async (req, res) => {
    try {
        const productName = await biddings.distinct("productName")
        const winners = []
        await Promise.all(productName.map(async (p) => {
            const winner = await biddings.find({ productName: p }).sort({ amount: "desc" }).limit(1)
            console.log(winner[0]);
            winners.push(winner[0])
            console.log(winners);
        }))
        res.status(200).send(winners)
    }catch(error){
        res.status(200).send(error)
    }
}
