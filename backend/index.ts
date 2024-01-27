import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import usersRoute from "./routes/usersRoute";
import notesRoute from "./routes/notesRoute";

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.get("/", (req, res) => {
  console.log(req);
  return res.send("test");
});

app.use("/api/users", usersRoute);
app.use("/api/notes", notesRoute);

mongoose
  .connect(process.env.MONGODB_URL!)
  .then(() => {
    console.log("App connected to database");
    app.listen(port, () => {
      console.log(`App is listening to port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
