const router = require('express').Router()
const { getAllUsers } = require('./user-model')

router.get('/api/users', async (req, res) => {
    res.status(200).json(await getAllUsers())
  })

  module.exports = router