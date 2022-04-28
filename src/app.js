const path = require("path");

const express = require("express");

const app = express();

const hbs = require("hbs");
const { query } = require("express");

const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

//Define paths for express config

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "/templates/views");
const partials = path.join(__dirname, "/templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partials);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Raiyan Ashraf",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Raiyan Ashraf",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "HELP",
    help: "If you want any help understanding this, look up at this page",
    name: "Raiyan Ashraf",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error",
    message: "Help article not found",
    name: "Raiyan Ashraf",
  });
});

// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "Raiyan",
//       age: 22,
//     },
//     {
//       name: "Ashraf",
//       age: 22,
//     },
//   ]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About my website</h1>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Must provide the address to get weather update",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      //console.log("Error :", error);
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        // console.log(chalk.green(location));
        // console.log(forecastData);
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );

  // res.send({
  //   forecast: "Temp 25 degree, cloudy, slight rainfall",
  //   locations: "Dhaka",
  //   address: req.query.address,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Must provide a search term",
    });
  }

  //console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error",
    message: "Page not found",
    name: "Raiyan Ashraf",
  });
});

//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
