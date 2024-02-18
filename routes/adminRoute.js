const express = require('express')
const router = express()

const {check} = require('express-validator')
const validate = require('../middleware/validate')
const {login, createSpecialization, createDoctor, } = require('../controller/adminController')
const {verifyAdmin} = require('../middleware/verify')

router.post(
    '/login', 
    check('email')
        .isEmail()
        .withMessage('Enter a valid email address')
        .normalizeEmail(),
    check('password')
        .not()
        .isEmpty(),
    validate,
    login
)

// Admin create doctor type (specialization) 
router.post('/create-specialization', verifyAdmin, createSpecialization)

// Admin create basic doctor profile 
router.post('/create-doctor', verifyAdmin, createDoctor)


module.exports = router