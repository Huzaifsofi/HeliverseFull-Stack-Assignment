const express = require('express')
const { default: mongoose } = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const UserRoutes = require('./routes/UserRouter')


const app = express()

app.use(express.json())
app.use(cors())

app.use('/api', UserRoutes)



const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`running at ${port}`)
})

mongoose.connect(
    process.env.DATABASE
).then(() => console.log('database conneccted'))
.catch((err) => console.log(err))