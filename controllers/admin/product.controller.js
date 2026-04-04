const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
// [GET] /admin/products
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  //tinh nang filterStatus
  const filterStatus=filterStatusHelper(req.query);
  if (req.query.status) {
    find.status = req.query.status;
  }

// Tinh nang search
  const objectSearch = searchHelper(req.query); 
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }

  const products = await Product.find(find);
  // console.log(products);
  res.render("admin/pages/products/index", {
    pageTitle: "Products List",
    products: products,
    filterStatus: filterStatus,
    keyword:objectSearch.keyword,
  });
};
