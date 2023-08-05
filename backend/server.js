import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import connectToDB from "./config/db.js";
import cookieParser from "cookie-parser";
import path from "path"
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


if ([process.env.NODE_ENV === 'production']) {
  const __dirname = path.resolve()
  app.use(express.static(path.join(__dirname , 'frontend/dist')))

  app.get('*' , (req , res )=>{
    res.sendFile(path.resolve(__dirname , 'frontend' , 'dist'  , 'index.html'))
  })
}else{
  app.get("/", (req, res) => {
    res.send("Server is Ready");
  });
}




//error handler middlewares
app.use(notFound);
app.use(errorHandler);

connectToDB();

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
