const db = require('../db');

module.exports.index = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 8;

  const start = (page - 1) * perPage;
  const end = page * perPage;

  const totalProducts = db.get('products').value();
  const totalPage = Math.ceil(totalProducts.length / perPage);

  const buttonToShow = 3; // Number of total pagination button to show, ex: 3 - show only 3 button
  let visiblePageNav = [];

  if (totalPage <= buttonToShow) {
    //Create normal pagination
    for (let i = 1; i <= totalPage; i++) visiblePageNav.push(i);
  } else {
    if (buttonToShow > totalPage - page) {
      for (let i = totalPage - buttonToShow + 1; i <= totalPage; i++) {
        visiblePageNav.push(i);
      }
    } else {
      for (let i = page - 1; i <= page + buttonToShow - 2; i++) {
        visiblePageNav.push(i);
      }
    }

    if (page === 1) {
      visiblePageNav = [];
      for (let i = 1; i <= buttonToShow; i++) {
        visiblePageNav.push(i);
      }
    }

    if (page === totalPage) {
      visiblePageNav = [];
      for (let i = page - buttonToShow + 1; i <= totalPage; i++) {
        visiblePageNav.push(i);
      }
    }
  }

  res.render('products/index', {
    products: db
      .get('products')
      .value()
      .slice(start, end),
    totalPage: totalPage,
    currentPage: page,
    visiblePageNav: visiblePageNav,
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
