const Product = require("../../models/product.model");
const productsHelper=require("../../helpers/products");
// [GET] /products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false,
  }).sort({ position: "desc" });
  const newProducts = productsHelper.newPriceProducts(products);

  res.render("client/pages/products/index", {
    pageTitle: "Products",
    products: newProducts,
  });
};

// [GET] /products/:slug
module.exports.detail = async (req, res) => {
  try {
    let find = {
      slug: req.params.slug,
      deleted: false,
      status: "active",
    };
    const product = await Product.findOne(find);
    
    res.render("client/pages/products/detail", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    req.flash("error", `Không tồn tại sản phẩm này!`);
    res.redirect(`/products`);
  }
};
