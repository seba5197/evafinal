import express from 'express'
import morgan from 'morgan'
import apiRouter  from './routes'


const app = express()

app.use(morgan('dev'))
app.use(express.json())


//routes
try {
    app.use('/api/v1',apiRouter)
} catch (error) {
    app.use((_req, res) => {

        res.status(404).json({
            message: "error: "+error
        })
        
        })
}


app.use((_req, res) => {

res.status(404).json({
    message: "not found"
})

})

export default app
