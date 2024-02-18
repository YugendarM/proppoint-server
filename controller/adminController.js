const adminModel = require('../models/adminUserModel')
const doctorSpecializationModel = require('../models/doctorSpecializationModel')
const doctorModel = require('../models/doctorModel')

const initialData = require('../database/initialData')
const bcrypt = require('bcrypt')

const login = async (request, response) => {
    const allUserData = await adminModel.find()
    if (allUserData.length === 0)
    {
        const initialUser = new adminModel(initialData)
        await initialUser.save()
    }
    const { email } = request.body
    try {
        const existingUser = await adminModel.findOne({ email }).select('+password')
        if (!existingUser)
            return response.status(401).json({status: 'failed', code:401,  data: [], message:'Invalid email/password'})

        const validatePassword = await bcrypt.compare(`${request.body.password}`,existingUser.password)

        if (!validatePassword)
            return response.status(401).json({status: 'failed', code:401, data: [], message:'Invalid email/password'})

        let options = {
            maxAge: 20 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }
        const token = existingUser.generateAccessJWT()
        await existingUser.save()
        response.cookie('SessionID', token, options)
        response.status(200).json({status: 'success', code:200, message: 'Login successful'})
    }
    catch (error) {
        response.status(500).json({status: 'error', code:500,  data: [], message: error.message})
    }
}

const createSpecialization = async (request, response) => {
    try {
        const { type } = request.body; 
        if (!type) {
            return res.status(400).json({ message: 'Specialization type is required' });
        }

        const existingType = await doctorSpecializationModel.findOne({type})

        if (existingType) {
            return response.status(409).json({status: 'failed', code: 409, data: [], message:'Existing Specialization'})
        }
        const specialization = await new doctorSpecializationModel({
            type: type
        });

        await specialization.save();

        response.status(201).json({status: 'success', code: 201, data: [specialization], message: "Doctor Specialization added successfully"})

    } catch (error) {
        console.error('Error adding doctor specialization:', error);
        response.status(500).json({ status: 'error', code: 500, message: 'Internal server error' });
    }
}

const createDoctor = async (request, response) => {
    const {firstName, lastName, email, password, phone, role, specialization, yearsOfExperience, age, gender} = request.body

    try {
        const existingDoctor = await doctorModel.findOne({email})

        if(existingDoctor) {
            return response.status(409).json({status: 'failed', code:409, data:[], message: 'Doctor with this email id already exists'})
        }

        const newDoctorToBeRegister = await new doctorModel({
            firstName, lastName, email, password, phone, role, specialization, yearsOfExperience, age, gender
        })
        const newDoctor = await newDoctorToBeRegister.save()

        response.status(201).json({status: 'success', code: 201, data: [newDoctor], message: "Doctor added successfully"})
    } catch(error) {
        response.status(500).json({status: 'error', code:500, data: [], message: error.message,})
    }
}


module.exports = {
    login, 
    createSpecialization,
    createDoctor,
}