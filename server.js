import dotenv from 'dotenv';
import app from './app/index.js'
dotenv.config();
const port = process.env.PORT || '3000'
app.listen(port)