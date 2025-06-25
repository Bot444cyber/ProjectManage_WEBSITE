import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import router from './Routes/route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
const corsOptions = {
  origin: process.env.URL_FRONTEND,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));

// MongoDB Connection
mongoose.connect(
  process.env.URL_MONGOOSE,
  { dbName: process.env.DB_NAME }
).then(() => {
  console.log('DB is connected.');
}).catch((err) => {
  console.log('Error during DB connection:', err.message);
});

// Routes
app.get('/', (req, res) => { res.send('Welcome to API.') });
app.use('/api', router);

// Server Start
export default app;
