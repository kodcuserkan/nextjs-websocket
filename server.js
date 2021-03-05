var bodyParser = require("body-parser");
//var cors = require('cors');
const path = require("path");
const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    //const server=express().use('*', cors());
    const server = express();

    server.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });
    server.use(bodyParser.json()); // support json encoded bodies
    server.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
    server.use("/assets", express.static(__dirname + "/assets"));

    server.get(/next/, (req, res) => {
      //  console.log("next");
      handle(req, res);
    });

    server.get(/webpack/, (req, res) => {
      //console.log("webpack");
      handle(req, res);
    });

   
    server.get("/", (req, res) => {
      const actualPage = "/";
      app.render(req, res, actualPage);
    });

    server.get("/dashboard/:friendlyPath", (req, res) => {
      const actualPage = "/dashboard";
      const queryParams = { friendlyPath: req.params.friendlyPath };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/about', (req, res) => {
      const actualPage = '/about'
      app.render(req, res, actualPage)
    })
    server.get('/login', (req, res) => {
      const actualPage = '/login'
      app.render(req, res, actualPage)
    })

    server.get("/robots.txt", (req, res) => {
      res.header("Content-Type", "text/plain");
      res.sendFile(path.join(__dirname, "robots.txt"));
    });

    server.get("/sitemap.xml", (req, res) => {
      res.header("Content-Type", "text/xml");
      res.sendFile(path.join(__dirname, "sitemap.xml"));
    });

    server.get("*", (req, res) => {
      //console.log('> on get ..')
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
