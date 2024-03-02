import express, { response } from "express";

import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use("/books", bookRoutes);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome To the MERN Stack tutorial");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app connected to DB");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
