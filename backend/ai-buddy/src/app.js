const express = require("express");
const cookieParser = require("cookie-parser");
const aiBuddyRoutes = require('../src/routes/aiBuddy.routes')

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/aiBuddy",aiBuddyRoutes );

module.exports = app;
