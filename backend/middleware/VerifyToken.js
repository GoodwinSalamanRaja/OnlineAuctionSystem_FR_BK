const jwt = require("jsonwebtoken")

function verifyToken(req,res,next){
    const token = req.header("Authorization")
    if(token){
        const decoded = jwt.verify(token,"random-token")
        // console.log(decoded);
        if(decoded){
            next()
        }
    }
    else{
        res.status(401).send("Access denied")
    }
}

module.exports = verifyToken