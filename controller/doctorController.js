const slotsModel = require('../models/slotsModel')
const slots = require('../models/slotsModel')
const {getDateAndPrioritize} = require('./aiModelController')

const getAllTimeSlots = async (request, response) => {
    try {
        const {_id} = request.body
        const timeSlot = await slots.find({_id})
        if(len(timeSlot) <= 0) {
            return response.status(404).json({status: 'failed', code:404, data:[], message: 'No slots available'})
        }

        response.status(201).json({status: 'success', code: 201, data: [timeSlot], message: "Time Slot successfully fetched"})
    } catch(error) {
        response.status(500).json({status: 'error', code:500, data: [], message: error.message,})
    }
    
}

const AddNewSlot = async (request, response) => {
    const {doctor, startTime, endTime, totalSlotsStrength, currentFilledStrength} = request.body

    const existSlot = await slotsModel.findOne({startTime})
    if (existSlot) {
        return response.status(409).json({status: 'failed', code: 409, data: [], message:'Existing Slots'})
    }

    const slot = await new slotsModel({doctor, startTime, endTime, totalSlotsStrength, currentFilledStrength})
    const newSlot = await slot.save()
    getDateAndPrioritize(newSlot.startTime)
    response.status(201).json({status: 'success', code: 201, data: [newSlot], message: "Slot added successfully"})
}


module.exports = {
    getAllTimeSlots,
    AddNewSlot
}