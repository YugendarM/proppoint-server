const express = require('express')
const router = express()

const {getAllSpecialization, getAllDoctors, checksForId, addNewUser} = require('../controller/patientController')

router.get('/specialization', getAllSpecialization)
router.post('/search-doctor', getAllDoctors)

router.post('/get-id', checksForId)
router.post('/add-profile-details', addNewUser)


module.exports = router