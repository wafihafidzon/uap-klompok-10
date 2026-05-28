function calcPersonal() {
  var items  = +document.getElementById('item-slider').value;
  var weight = +document.getElementById('weight-slider').value;
  document.getElementById('item-val').textContent   = items + ' barang';
  document.getElementById('weight-val').textContent = weight.toFixed(1) + ' kg';
  document.getElementById('res-co2').textContent    = (items * weight * 3).toFixed(1);
  document.getElementById('res-water').textContent  = Math.round(items * weight * 75);
  document.getElementById('res-waste').textContent  = Math.round(items * weight);
}

document.addEventListener('DOMContentLoaded', function() {
  calcPersonal();
});
