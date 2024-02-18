const express = require('express')
const app = express()
const { PORT, DB} = require('./configuration/config')

const connect = require('./database/connection')
const adminRoute = require('./routes/adminRoute')
const patientRoute = require('./routes/patientRoute')
const doctorRoute = require('./routes/doctorRoute')

const cors = require('cors')
const morgan = require('morgan')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('tiny'))

app.get('/', (request, response) => {
    response.status(200).json({message: "it's working ✌️"})
})

app.use('/api/v1/admin', adminRoute)
app.use('/api/v1/patient', patientRoute)
app.use('/api/v1/doctor', doctorRoute)

connect()
    .then( () => {
        try{
            app.listen(PORT, () => {
                console.log(`Server started running at http://localhost:${PORT}/`)
            })
        }
        catch(error)
        {
            console.log(`Can't connect to the server : ${error}`)
        }
    })
    .catch(error => {
        console.log(`Error while connecting to database : ${error}`)
    })