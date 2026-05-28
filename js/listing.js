let activeCat = 'semua';

function filterCat(cat, btn) {
  activeCat = cat;
  document.querySelectorAll('#cat-tabs .filter-tab').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');
  var list = cat === 'semua' ? products : products.filter(function(p) { return p.cat === cat; });
  renderProducts(list, 'product-grid');
}

document.addEventListener('DOMContentLoaded', function() {
  renderProducts(products, 'product-grid');
});
