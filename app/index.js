import express from 'express'
import utilisateurs from './routes/utilisateurs.js'
import bodyParser from 'body-parser'
const app = express()
app.use(bodyParser.json())
app.use('/utilisateurs', utilisateurs)
export default app