const db = require('../db');

module.exports.index = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 8;

  const start = (page - 1) * perPage;
  const end = page * perPage;

  const totalProducts = db.get('products').value();
  const totalPage = Math.ceil(totalProducts.length / perPage);

  console.log(db.get('products').value());
  res.render('products/index', {
    products: db
      .get('products')
      .value()
      .slice(start, end),
    totalPage: totalPage,
    currentPage: page,
  });
};

module.exports.search = (req, res) => {
  const q = req.query.q;
  const matchedProducts = db
    .get('products')
    .value()
    .filter(
      product => product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1,
    );
  res.render('products/index', {
    products: matchedProducts,
    values: req.query,
  });
};
