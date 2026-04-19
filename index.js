const express = require("express");
const app = express();
var methodOverride = require('method-override');
const bodyParser = require('body-parser');
var flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const database = require("./config/database");
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
const systemConfig = require("./config/system");



require('dotenv').config();

// tao thong bao


//kết nối MongoDB
database.connect()
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));




const port = process.env.PORT || 3000;

app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

//flash
app.use(cookieParser('keyboardtan'));
app.use(session({
  secret: 'keyboardtan',  
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// App Locals Variables

app.locals.prefixAdmin = systemConfig.prefixAdmin;

//Nhúng file tĩnh
app.use(express.static(`${__dirname}/public`));

//Routes
route(app);
routeAdmin(app);
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
app.set('trust proxy', 1);
module.exports = app;