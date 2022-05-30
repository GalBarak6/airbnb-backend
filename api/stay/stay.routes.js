const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
// const {getStays, getStay, deleteStay, updateStay} = require('./user.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getStays)
router.get('/:id', getStayById)
router.put('/:id', updateStay)
route.post('/', addStay)

// router.delete('/:id',  requireAuth, requireAdmin, deleteUser)
// router.post('/', requireAuth, requireAdmin, addStay)

module.exports = router