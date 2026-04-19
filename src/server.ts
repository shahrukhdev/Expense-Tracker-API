import express from "express";
import app from "./config/app.js";
import connectDB from './config/db.js';
import env from "./config/env.js";

const startServer = async (): Promise<void> => {
  try {
    // ─── Connect to DB first, then start server ─────────────────────────────
    await connectDB();

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

