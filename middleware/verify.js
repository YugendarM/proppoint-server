const adminUserModel = require('../models/adminUserModel')
const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN } = require('../configuration/config')

const verifyAdmin = (request, response, next) => {
    try{
        const authHeader = request.headers['cookie']

        if (!authHeader) return response.status(401).json({code:401, message:'Token not found'})

        const cookie = authHeader.split('=')[1]
        const accessToken = cookie.split(';')[0]

        jwt.verify(cookie, ACCESS_TOKEN, async(error, decoded) => {
            if (error)
            {
                return response.status(401).json({code:401 ,message:'Session expired'})
            }
            const {id} = decoded
            const existingUser = await adminUserModel.findById(id)
            const {password, ...data} = existingUser._doc
            request.user = data

            const { role } = request.user
            if (role !== 'admin') {
                return response.status(401).json({status: 'failed',code:401,message: 'Unauthorized access'})
            }
            next()
        })  
    } catch(error) {
        response.status(500).json({status: 'error', code: 500, message: error.message})
    }
}

module.exports = { verifyAdmin } 