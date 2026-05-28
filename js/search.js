var activeCond = 'semua';

function updatePriceLabel() {
  var v = +document.getElementById('price-range').value;
  document.getElementById('price-label').textContent = 'Rp ' + v.toLocaleString('id-ID');
}

function toggleCond(cond, btn) {
  activeCond = cond;
  document.querySelectorAll('.cond-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  runSearch();
}

function runSearch() {
  var q = document.getElementById('search-input').value.toLowerCase();
  var maxPrice = +document.getElementById('price-range').value;
  var sort = document.getElementById('sort-select').value;
  var list = products.filter(function(p) {
    var matchQ = !q || p.name.toLowerCase().includes(q) || p.story.toLowerCase().includes(q);
    var matchP = p.price <= maxPrice;
    var matchC = activeCond === 'semua' || p.cond === activeCond;
    return matchQ && matchP && matchC;
  });
  if (sort === 'termurah') list.sort(function(a,b) { return a.price - b.price; });
  else if (sort === 'termahal') list.sort(function(a,b) { return b.price - a.price; });
  else if (sort === 'dampak') list.sort(function(a,b) { return b.impact - a.impact; });
  renderProducts(list, 'search-grid');
  document.getElementById('search-empty').style.display = list.length ? 'none' : 'block';
}

document.addEventListener('DOMContentLoaded', function() {
  renderProducts(products, 'search-grid');
});
