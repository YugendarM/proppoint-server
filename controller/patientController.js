const doctorSpecialization = require('../models/doctorSpecializationModel')
const doctorModel = require('../models/doctorModel')
const patientModel = require('../models/patientModel')

const getAllSpecialization = async (request, response) => {
    try {
        const specialization = await doctorSpecialization.find()
        if(!specialization) {
            return response.status(404).json({status: 'failed', code:404, data: [], message:'No data found on the database'})
        }

        response.status(200).json({status: 'success', code:200, data: [specialization], message: 'Data fetched successfully'}) 
    } catch(error) {
        response.status(500).json({status: 'error', code:500,  data: [], message: error.message})
    }
    
}

const getAllDoctors = async (request, response) => {
    const id = request.body._id 
    try {

        const doctors = await doctorModel.find({
            specialization: {
                $in: [id]
            }
        });

        const {password:doctorPassword, role:doctorRole , ...doctor_data } = newUser._doc
        response.send(doctor_data)
    } catch(error)
    {
        console.log(`Can't connect to the server : ${error}`)
    }
}

const checksForId = async (request, response) => {
    const {email, phone} = request.body
    const existingPatient = await patientModel.find({email})
    if(existingPatient) {
        
        return response.status(201).json({status: 'success', code: 201, data: [existingPatient], message: "Found your Patient Id"}) 
    } else {
        const checkPhone = await patientModel.find({phone})
        if(checkPhone) {
            return response.status(201).json({status: 'success', code: 201, data: [existingPatient], message: "Found your Patient Id"}) 
        }
    }

    response.status(404).json({status: 'warning', code: 404, data: [], message: "No Patient Id Found"})
}

const addNewUser = async (request, response) => {
    const {firstName, lastName, email, phone, role, dateOfBirth, diabetes, diabetesValue, bloodPressure, bloodPressureValue, historyOfSurgery, surgeryDescription, city, occupation} = request.body

    try {
        const newPatient = await new patientModel({firstName, lastName, email, phone, role, dateOfBirth, diabetes, diabetesValue, bloodPressure, bloodPressureValue, historyOfSurgery, surgeryDescription, city, occupation})

        const addedPatient = await newPatient.save()

        response.status(201).json({status: 'success', code: 201, data: [addedPatient], message: "Patient added successfully"})
    } catch (error) {
        console.error('Error adding doctor specialization:', error);
        response.status(500).json({ status: 'error', code: 500, message: 'Internal server error' });
    }
}

const getDataForModel = (request, response) => {
    // const name, isInfant, dobYear, isPregnant, underSurgery, diabetes, hypertension, gender = request.body
}

module.exports = {
    getAllSpecialization,
    getAllDoctors,
    checksForId,
    addNewUser
}