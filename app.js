const express = require('express')
const colors = require('colors')
const errorHandler = require('./middleware/errorMiddleware')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const port = process.env.PORT || 5000;

connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Edmunds Cars',
            version: '1.0.0',
            description: "An Api's documentation for Emunds Cars"
        },
        servers: [
            {
                url: 'http://localhost:5000'
            }
        ],
    },
    apis: ["./routes/*.js"]
}

const specs = swaggerJsDoc(options);

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/categories', require('./routes/categoryRoutes'))
app.use('/api/cars', require('./routes/carRoutes'))
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(specs))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
