import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import router from './Routes/route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
    process.env.URL_MONGOOSE, {
        dbName: process.env.DB_NAME
    }
).then(() => {
    console.log('DB is connected.')
}).catch(() => {
    console.log('Error occure during DB Connection.')
});

const corsOptions = {
    origin: [
      process.env.URL_FRONTEND,
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};
app.use(cors(corsOptions));

app.get('/', (req, res) => { res.send('Welcome to API.') });
app.use('/api', router);

app.listen(PORT);
