import 'dotenv/config'
import './database/db.js';
import express, { json } from 'express';
import authroutes from './routes/authroutes.js';


const app = express();

app.use(express.json());


app.use('/', authroutes);


const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log('🔥🔥🔥 http://localhost:'+ PORT));