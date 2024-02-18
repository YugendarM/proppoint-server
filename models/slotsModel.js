const mongoose = require('mongoose')

const slotsModel = new mongoose.Schema(
    {
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'doctors'
        },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,
        },
        totalSlotsStrength: {
            type: Number,
            required: true,
        },
        currentFilledStrength: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model.slotsModel || mongoose.model('slots', slotsModel)