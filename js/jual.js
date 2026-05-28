var currentStep = 1;

function updatePreview() {
  var nama  = document.getElementById('f-nama').value;
  var cat   = document.getElementById('f-cat').value;
  var cond  = document.querySelector('input[name=kondisi]:checked');
  var story = document.getElementById('f-story').value;
  var harga = document.getElementById('f-harga').value;
  var card  = document.getElementById('preview-card');
  var hasContent = nama || cat || cond || story || harga;
  card.classList.toggle('has-content', !!hasContent);
  if (!hasContent) {
    card.innerHTML = '<div class="preview-empty">Isi form untuk melihat preview kartu produk kamu ✍️</div>';
    return;
  }
  var condBadge = cond
    ? '<div style="margin-top:6px;"><span class="section-badge badge-' +
      (cond.value==='Bagus'?'green':cond.value==='Layak'?'amber':'coral') +
      '">' + cond.value + '</span></div>'
    : '';
  card.innerHTML =
    '<div class="preview-emoji">' + (catEmoji[cat] || '📦') + '</div>' +
    '<div class="preview-name">' + (nama || '—') + '</div>' +
    condBadge +
    (harga ? '<div class="preview-price">Rp ' + (+harga).toLocaleString('id-ID') + '</div>' : '') +
    (story ? '<div class="preview-story">"' + story + '"</div>' : '');
}

function nextStep(n) {
  if (n === 2 && (!document.getElementById('f-nama').value || !document.getElementById('f-cat').value)) {
    alert('Isi nama dan kategori dulu ya!'); return;
  }
  if (n === 3 && !document.querySelector('input[name=kondisi]:checked')) {
    alert('Pilih kondisi barang dulu!'); return;
  }
  document.getElementById('step-' + currentStep).style.display = 'none';
  document.getElementById('step-' + currentStep + '-dot').classList.replace('active', 'done');
  currentStep = n;
  document.getElementById('step-' + currentStep).style.display = 'block';
  document.getElementById('step-' + currentStep + '-dot').classList.add('active');
}

function prevStep(n) {
  document.getElementById('step-' + currentStep).style.display = 'none';
  document.getElementById('step-' + currentStep + '-dot').classList.remove('active');
  currentStep = n;
  document.getElementById('step-' + currentStep).style.display = 'block';
  document.getElementById('step-' + currentStep + '-dot').classList.remove('done');
  document.getElementById('step-' + currentStep + '-dot').classList.add('active');
}

function submitForm() {
  var harga = document.getElementById('f-harga').value;
  if (!harga || +harga < 1000) { alert('Masukkan harga yang valid!'); return; }
  document.getElementById('step-4').style.display = 'none';
  document.getElementById('step-4-dot').classList.replace('active', 'done');
  var impacts = ['♻️ 1 barang diselamatkan', '🌿 ~3 kg CO₂ dicegah', '💧 ~75L air hemat'];
  document.getElementById('success-impacts').innerHTML = impacts.map(function(i) {
    return '<span class="success-impact-chip badge-teal section-badge">' + i + '</span>';
  }).join('');
  document.getElementById('success-panel').classList.add('show');
}

function resetForm() {
  document.getElementById('success-panel').classList.remove('show');
  ['f-nama', 'f-story', 'f-harga'].forEach(function(id) { document.getElementById(id).value = ''; });
  document.getElementById('f-cat').value = '';
  document.querySelectorAll('input[name=kondisi]').forEach(function(r) { r.checked = false; });
  [1, 2, 3, 4].forEach(function(n) {
    document.getElementById('step-' + n).style.display = n === 1 ? 'block' : 'none';
    var dot = document.getElementById('step-' + n + '-dot');
    dot.classList.remove('active', 'done');
    if (n === 1) dot.classList.add('active');
  });
  currentStep = 1;
  updatePreview();
}

document.addEventListener('DOMContentLoaded', function() {
  updatePreview();
});
