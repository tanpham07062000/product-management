const express = require("express");
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
database.connect();


const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

//flash
app.use(cookieParser('keyboardtan'));
app.use(session({ cookie: { maxAge: 60000 }}));
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
module.exports = app;