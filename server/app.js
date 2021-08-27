require("dotenv").config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const PORT = process.env.PORT || 3001
const routesPost = require('./routes/post')


app.use("/client/public/",express.static("/public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(routesPost)
app.use(morgan(process.env.LOG_LEVEL))


if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname + '/client/dist/'))


    app.get('*', function (_, res) {
        const index = path.join(__dirname, '/client/dist', 'index.html');
        res.sendFile(index);
      });

}

mongoose.connect(process.env.URL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
}, (error) => {
    if (!error) {
        console.log("DB connect")
        app.listen(PORT, (error) => {
            if (!error) {
                console.log(`SERVER  connect  http://localhost:${PORT}`)
            } else {
                console.log(error)
            }

        })
    } else {
        console.log(error)
    }


})





