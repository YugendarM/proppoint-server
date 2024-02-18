const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema(
    {
        firstName : {
            type : String,
            required : [true, 'First name is a mandatory field'],
            max : 25,
        },
        lastName : {
            type : String,
            required : 
            [true, 'Last name is a mandatory field'],
            max : 25,
        },
        email: {
            type: String,
            required: [true, 'Email is a mandatory field'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true, 
            validate: {
                validator: function(v) {
                    
                    return /^\d{10}$/.test(v);
                },
                message: props => `${props.value} is not a valid phone number! Please provide a 10-digit number.`
            }
        },
        role: {
            type: String,
            required: true,
            default: "patient",
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'others']
        },
        isPregnant: {
            type: Boolean,
            required: function(){
                return this.gender == 'female'
            }
        },
        diabetes: {
            type: Boolean,
            required: true,
        },
        diabetesValue: {
            type: Number,
            required: function() {
                return this.diabetes === true
            }
        },
        bloodPressure: {
            type: Boolean,
            required: true,
        },
        bloodPressureValue: {
            type: Number,
            required: function() {
                return this.diabetes === true;
            }
        },
        historyOfSurgery: {
            type: Boolean,
            required: true,
        },
        surgeryDescription: {
            type: String,
        },
        city: {
            type: String, 
            required: true,
        },
        occupation: {
            type: String, 
            required: true
        },
        slot: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'slots'
        }
    },
    {
        timestamps : true
    }
)


module.exports = mongoose.model.patientSchema || mongoose.model('patients', patientSchema)