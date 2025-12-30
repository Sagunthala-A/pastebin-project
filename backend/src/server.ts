import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";


connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log(`Backend running on port 3000`);
    });
  })
  .catch((err) => {
    console.error("DB error", err);
    process.exit(1);
  });
