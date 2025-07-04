import express from "express";
import cors from "cors";
import userRoutes from "./routes/UserRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/user', userRoutes);

app.listen(3000, () => console.log(`Server started on port 3000`));