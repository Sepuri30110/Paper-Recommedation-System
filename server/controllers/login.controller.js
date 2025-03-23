const model = require('../models/user.model')

const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    try {
        const data = req.body.formData;
        const user = await model.findOne({ "name": data.username })
        if (user && user.password === data.password) {
            jwt.sign({user}, "secret", (err, token) => {
                if (!err) {
                    console.log(token)
                    return res.status(200).json({text:"Success", token: token})
                } else {
                    console.log(err)
                    return res.status(401).json("Error")
                }
            })
        } else {
            console.log(req.body)
            return res.status(401).json("Invalid Credentials")
        }
    } catch (err) {
        console.log(err)
        return res.status(400).json("Error")
    }
}

const signup = async (req, res) => {
    try {
        const data = req.body.formData;
        console.log(data)

        const user = await model.findOne({ "name": data.name });
        const user1 = await model.findOne({ "mobile": data.mobile });

        if (user) return res.status(401).json("Name already exists")
        if (user1) return res.status(401).json("Mobile already exists")

        await model.create(data)

        return res.status(200).json("Success")
    } catch (err) {
        console.log(err)
        return res.status(400).json("Error")
    }
}

module.exports = { login, signup }