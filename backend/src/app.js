import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true
    }
));

app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));

import userRouter from "../src/routes/user.routes.js"
app.use("/api/v1",userRouter)
app.get("/", (req, res) => {
    res.send("Hello connected");
});

export default app;
