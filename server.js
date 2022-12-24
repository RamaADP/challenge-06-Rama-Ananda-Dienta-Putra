import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/auth.js";
import refreshTokenRoutes from "./routes/refreshToken.js";
import userRoutes from "./routes/users.js";
import mongoose from "mongoose";

const app = express();

config ();

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/CH6', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.log(err.message);
});

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/refreshToken", refreshTokenRoutes);
app.use("/api/users", userRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on ${port}...`))
    