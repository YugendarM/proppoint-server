const mongoose = require('mongoose')

const patientSlot = new mongoose.Schema(
    {
        slot: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'slots'
        },
        patients: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'patients'
        }],
    }
)

module.exports = mongoose.model.patientSlot || mongoose.model('patientSlots', patientSlot)