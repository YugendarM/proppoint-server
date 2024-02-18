const express = require('express')
const router = express.Router()

const {getAllTimeSlots, AddNewSlot} = require('../controller/doctorController')

router.post('/time-slots', getAllTimeSlots)
router.post('/create-slots', AddNewSlot)

module.exports = router 