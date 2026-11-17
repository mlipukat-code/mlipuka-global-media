"use strict";

const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

// Security and basic configuration
app.disable("x-powered-by");

app.use(express.json({ limit: "1mb" }));

app.use(express.urlencoded({
extended: true,
limit: "1mb"
}));

// Serve website files
app.use(express.static(path.join(__dirname, "public")));

// Home page
app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Server status
app.get("/api/status", (req, res) => {
res.json({
success: true,
service: "MLIPUKA GLOBAL MEDIA",
status: "online",
message: "News platform server is running successfully.",
languages: ["English", "Kiswahili", "Chinese", "French"],
owner: "Mlipuka Technical Services",
timestamp: new Date().toISOString()
});
});

// Handle unknown API routes
app.use("/api", (req, res) => {
res.status(404).json({
success: false,
message: "API endpoint not found."
});
});

// Handle unknown pages
app.use((req, res) => {
res.status(404).send("Page not found.");
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
console.log("MLIPUKA GLOBAL MEDIA running on port ${PORT}");
});