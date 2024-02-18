const mongoose = require('mongoose')

const doctorSpecialization = new mongoose.Schema(
    {
        type : {
            type : String,
            required : [true, 'Specialization is a mandatory filed'],
            // unique: true
        }
    }
)

module.exports = mongoose.model.doctorSpecialization || mongoose.model('doctorSpecialization', doctorSpecialization)