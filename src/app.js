import express from "express";
import cors from "cors";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

export default app;
