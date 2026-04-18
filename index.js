const express = require("express");
var methodOverride = require('method-override');
const bodyParser = require('body-parser');
require('dotenv').config();
// tao thong bao
var flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
//kết nối MongoDB
const database = require("./config/database");
database.connect();

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());
app.set("views", "./views");
app.set("view engine", "pug");

//flash
app.use(cookieParser('keyboardtan'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

// App Locals Variables
const systemConfig = require("./config/system")
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//Nhúng file tĩnh
app.use(express.static("public"));

//Routes
route(app);
routeAdmin(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
