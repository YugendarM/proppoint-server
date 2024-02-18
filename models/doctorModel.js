const mongoose = require('mongoose')

const doctorSchema =  new mongoose.Schema(
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
        password : {
            type : String,
            required : [true,'Password is a mandatory field'],
            select : false,
            max : 25,
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
            default: "doctor",
        },
        specialization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'doctorSpecialization'
        },
        yearsOfExperience: {
            type: Number,
            required: true,
            min: 0,
            max: 99,
        },
        age: {
            type: Number,
            required: true,
            min: 10,
            max: 99,
        },
        gender: {
            type: String, 
            required: true,
            enum: ['male', 'female', 'others']
        }
    },
    {
        timestamps : true
    }
)

module.exports = mongoose.model.doctorSchema || mongoose.model('doctors', doctorSchema)