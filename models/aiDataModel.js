const mongoose = require('mongoose')

const aiSortedSlotModel = new mongoose.Schema(
    {
        slot: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'slots'
        },
        patientsList: {
            tokenNo: {
                type: Number,
                min: 1,
                max: 50,
            },
            patient: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'patients'
            }

        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model.aiSortedSlotModel || mongoose.model('aiSortedSlot', aiSortedSlotModel)