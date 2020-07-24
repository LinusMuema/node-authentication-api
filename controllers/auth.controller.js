const User = require('../models/user')
const bcrypt = require('bcrypt')
const rounds = 10
const utils = require('../utils/utils')

exports.login = (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user) res.status(404).json({error: 'no user with that email found'})
            else {
                bcrypt.compare(req.body.password, user.password, (error, match) => {
                    if (error) res.status(500).json(error)
                    else if (match) res.status(200).json({token: utils.generateToken(user)})
                    else res.status(403).json({error: 'passwords do not match'})
                })
            }
        })
        .catch(error => {res.status(500).json(error)})
}

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, rounds, (error, hash) => {
        if (error) res.status(500).json(error)
        else {
            const newUser =  User({email: req.body.email, password: hash})
            newUser.save()
                .then(user => {
                    res.status(200).json({token: utils.generateToken(user)})
                })
                .catch(error => {
                    res.status(500).json(error)
                })
        }
    })
}
