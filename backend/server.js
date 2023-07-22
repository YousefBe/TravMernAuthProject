import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import connectToDB from "./config/db.js";
import cookieParser from "cookie-parser";
dotenv.config();

const port = process.env.PORT || 2000;
const baseURL = "/api";
const app = express();


app.use(express.json())
//to allow form data
app.use(express.urlencoded({extended : true}));
app.use(cookieParser())


//routes 
app.use(`${baseURL}/users`, userRoutes);
app.get("/", (req, res) => {
  res.send("Server is Ready");
});


//error handler middlewares
app.use(notFound);
app.use(errorHandler);

connectToDB();

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
