const router = require('express').Router()
const Users = require('./user-model')

router.get('/', async (req, res) => {
    res.status(200).json(await Users.getAllUsers())
  })

  module.exports = router