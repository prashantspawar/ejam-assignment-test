var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

/* Using Async module, Begin */
/*
var _ = require('lodash');
var async = require("async");
*/
/* Using Async module, End */

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var weatherRouter = require("./routes/weather");

var app = express();

/*
// Set up a whitelist and check against it:
var whitelist = [process.env.APP_URL, 'http://localhost', 'https://localhost']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
*/
app.use(cors());

app.set("port", process.env.PORT || 3000);

/*
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Authorization, Content-Type"
  );
  next();
});
*/

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/" + process.env.API_VERSION + "/weather", weatherRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts("html")) {
    res.render("404", {
      url: req.url,
      message: "Not found",
      error: {
        stack: "Not found",
        status: 404
      }
    });
    return;
  }

  // respond with json
  if (req.accepts("json")) {
    res.send({
      error: "Not found"
    });
    return;
  }

  /*
  next(createError(404));
  */
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

process.on('uncaughtException', function (err) {
  console.error((new Date()).toUTCString() + ' uncaughtException:', err.message);
  console.error(err.stack);
  process.exit(1);
});

module.exports = app;