// 1. Import các thư viện
const express = require("express");
const path = require("path"); // Nên dùng path
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
require('dotenv').config();

// 2. Import các cấu hình nội bộ
const database = require("./config/database");
const systemConfig = require("./config/system");
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

// 3. KHỞI TẠO APP (Dòng này phải nằm trên tất cả các dòng app.use)
const app = express(); 

// 4. Kết nối Database
database.connect();

// 5. Cấu hình Middleware (Sau khi đã có 'app')
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cookieParser('keyboardtan'));
app.use(session({
  secret: 'keyboardtan',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(flash());

// Locals
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Static files
app.use(express.static(path.join(__dirname, "public")));

// 6. Routes (Truyền app vào sau khi đã config xong middleware)
route(app);
routeAdmin(app);

// 7. Export
module.exports = app;