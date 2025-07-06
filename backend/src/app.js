import express from "express";
import cors from "cors";
import userRoutes from "./routes/UserRoutes.js";
import healthRoutes from "./routes/HealthRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/user', userRoutes);
app.use("/health", healthRoutes);

app.listen(3000, () => console.log(`Server started on port 3000`));