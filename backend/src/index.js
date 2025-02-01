import app from './app.js';
import connectDB from './db/index.js';
import dotenv from 'dotenv';

dotenv.config({
})
connectDB()
    .then(() => {
        console.log(" Database connected successfully");

        app.on("error", (err) => {
            console.error("Server Error:", err);
        });
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on PORT ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
        process.exit(1);
    });