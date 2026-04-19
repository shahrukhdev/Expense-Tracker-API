import express, { Application } from "express";
import routes from "../index.js";
import cors from "cors";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test
// app.get('/', (req, res) => {
//   res.send('Server is working');
// });

app.use('/api/v1', routes);

export default app;

