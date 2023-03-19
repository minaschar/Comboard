const express = require("express");
require("../database/mongoose");
const http = require("http");
const bodyParser = require("body-parser");

// Import routers
const connectRouter = require("../routers/connect.js");
const logoutRouter = require("../routers/logout.js");
const uploadRouter = require("../routers/upload.js");
const teamRouter = require("../routers/team.js");
const projectRouter = require("../routers/project.js");
const organizationRouter = require("../routers/organization.js");
const errorRouter = require("../routers/error.js");

const app = express();
// We use http module because in socket.io library, we need to pass as argument the HTTP server, but express alone, creates the server behind the scenes and we don't have access to the HTTP server
const server = http.createServer(app);

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Config the routers
app.use(connectRouter);
app.use(logoutRouter);
app.use(uploadRouter);
app.use(teamRouter);
app.use(projectRouter);
app.use(organizationRouter);
// This must be the last
app.use(errorRouter);

module.exports = server;
