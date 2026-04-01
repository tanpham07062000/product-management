const express = require("express");
require('dotenv').config()

//kết nối MongoDB
const database = require("./config/database");
database.connect();

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
const app = express();
const port = process.env.PORT;
app.set("views", "./views");
app.set("view engine", "pug");

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
