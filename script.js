const products = [
  { id:1, name:"Laptop ASUS Vivobook", cat:"elektronik", emoji:"💻", cond:"Bagus", price:2800000, seller:"Rafi, Malang", story:"Menemani skripsi selama 2 tahun. Masih mulus, baterai awet. Harus dijual karena upgrade ke MacBook.", impact:12 },
  { id:2, name:"Kemeja Flanel Vintage", cat:"pakaian", emoji:"👕", cond:"Bagus", price:85000, seller:"Dina, Batu", story:"Beli di thrift store 3 tahun lalu, hanya dipakai beberapa kali. Ukuran M, kondisi seperti baru.", impact:3 },
  { id:3, name:"Kursi Belajar Kayu", cat:"furnitur", emoji:"🪑", cond:"Layak", price:320000, seller:"Pak Hendra, Malang", story:"Kursi warisan dari kos lama. Kayunya solid, cuma ada sedikit goresan di kaki. Sayang dibuang.", impact:8 },
  { id:4, name:"Novel Tetralogi Buru", cat:"buku", emoji:"📚", cond:"Bagus", price:120000, seller:"Mbak Siti, Kepanjen", story:"Koleksi lengkap 4 buku Pramoedya. Sudah kubaca berkali-kali, saatnya menemukan rumah baru.", impact:2 },
  { id:5, name:"Kamera Canon 700D", cat:"elektronik", emoji:"📷", cond:"Layak", price:1900000, seller:"Yoga, Malang", story:"Kamera pertamaku belajar fotografi. Shutter count masih rendah. Dijual karena switch ke mirrorless.", impact:15 },
  { id:6, name:"Jaket Denim Levis", cat:"pakaian", emoji:"🧥", cond:"Bagus", price:250000, seller:"Rina, Malang", story:"Jaket kesayangan tapi ukurannya sudah kegedean. Authentic Levis, kondisi sangat baik.", impact:5 },
  { id:7, name:"Meja Kerja Minimalis", cat:"furnitur", emoji:"🪵", cond:"Bekas", price:450000, seller:"Bu Dewi, Singosari", story:"Meja ini sudah jadi saksi ribuan jam kerja. Ada bekas stiker tapi masih kokoh dan fungsional.", impact:20 },
  { id:8, name:"Buku Desain UI/UX", cat:"buku", emoji:"🎨", cond:"Bagus", price:95000, seller:"Aldi, Malang", story:"Beli untuk persiapan bootcamp tapi sudah tidak terpakai. Isinya masih sangat relevan.", impact:2 },
];

const catEmoji = { elektronik:'📱', pakaian:'👕', furnitur:'🪑', buku:'📚', '':'' };
const catBgColor = { elektronik:'#e0f2fe', pakaian:'#fce7f3', furnitur:'#fef3c7', buku:'#d1fae5' };

let activeCat = 'semua';
let activeCond = 'semua';
let currentStep = 1;

function renderProducts(list, gridId) {
  const grid = document.getElementById(gridId);
  if (!list.length) { grid.innerHTML = ''; return; }
  grid.innerHTML = list.map(p => `
    <div class="product-card">
      <div class="product-img" style="background:${catBgColor[p.cat] || '#f5f5f4'}">
        ${p.emoji}
        <span class="product-condition cond-${p.cond.toLowerCase()}">${p.cond}</span>
      </div>
      <div class="product-body">
        <div class="product-name">${p.name}</div>
        <div class="product-seller">oleh ${p.seller}</div>
        <div class="product-price">Rp ${p.price.toLocaleString('id-ID')}</div>
        <button class="product-story-btn" onclick="toggleStory(${p.id})">
          <span id="story-icon-${p.id}">📖</span> Baca ceritanya
        </button>
        <div class="product-story" id="story-${p.id}">"${p.story}"</div>
      </div>
    </div>
  `).join('');
}

function toggleStory(id) {
  document.getElementById('story-' + id).classList.toggle('open');
}

function filterCat(cat, btn) {
  activeCat = cat;
  document.querySelectorAll('#cat-tabs .filter-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const list = cat === 'semua' ? products : products.filter(p => p.cat === cat);
  renderProducts(list, 'product-grid');
}

function updatePriceLabel() {
  const v = +document.getElementById('price-range').value;
  document.getElementById('price-label').textContent = 'Rp ' + v.toLocaleString('id-ID');
}

function toggleCond(cond, btn) {
  activeCond = cond;
  document.querySelectorAll('.cond-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  runSearch();
}

function runSearch() {
  const q = document.getElementById('search-input').value.toLowerCase();
  const maxPrice = +document.getElementById('price-range').value;
  const sort = document.getElementById('sort-select').value;
  let list = products.filter(p => {
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.story.toLowerCase().includes(q);
    const matchP = p.price <= maxPrice;
    const matchC = activeCond === 'semua' || p.cond === activeCond;
    return matchQ && matchP && matchC;
  });
  if (sort === 'termurah') list.sort((a,b) => a.price - b.price);
  else if (sort === 'termahal') list.sort((a,b) => b.price - a.price);
  else if (sort === 'dampak') list.sort((a,b) => b.impact - a.impact);
  renderProducts(list, 'search-grid');
  document.getElementById('search-empty').style.display = list.length ? 'none' : 'block';
}

function calcPersonal() {
  const items = +document.getElementById('item-slider').value;
  const weight = +document.getElementById('weight-slider').value;
  document.getElementById('item-val').textContent = items + ' barang';
  document.getElementById('weight-val').textContent = weight.toFixed(1) + ' kg';
  document.getElementById('res-co2').textContent = (items * weight * 3).toFixed(1);
  document.getElementById('res-water').textContent = Math.round(items * weight * 75);
  document.getElementById('res-waste').textContent = Math.round(items * weight);
}

function animateCount(id, target, suffix='', duration=1500) {
  const el = document.getElementById(id);
  const start = Date.now();
  const tick = () => {
    const p = Math.min((Date.now() - start) / duration, 1);
    el.textContent = Math.round(p * target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function updatePreview() {
  const nama = document.getElementById('f-nama').value;
  const cat = document.getElementById('f-cat').value;
  const cond = document.querySelector('input[name=kondisi]:checked');
  const story = document.getElementById('f-story').value;
  const harga = document.getElementById('f-harga').value;
  const card = document.getElementById('preview-card');
  const hasContent = nama || cat || cond || story || harga;
  card.classList.toggle('has-content', !!hasContent);
  if (!hasContent) {
    card.innerHTML = '<div class="preview-empty">Isi form untuk melihat preview kartu produk kamu ✍️</div>';
    return;
  }
  const condBadge = cond ? `<div style="margin-top:6px;"><span class="section-badge badge-${cond.value==='Bagus'?'green':cond.value==='Layak'?'amber':'coral'}">${cond.value}</span></div>` : '';
  card.innerHTML = `
    <div class="preview-emoji">${catEmoji[cat] || '📦'}</div>
    <div class="preview-name">${nama || '—'}</div>
    ${condBadge}
    ${harga ? `<div class="preview-price">Rp ${(+harga).toLocaleString('id-ID')}</div>` : ''}
    ${story ? `<div class="preview-story">"${story}"</div>` : ''}
  `;
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
  const harga = document.getElementById('f-harga').value;
  if (!harga || +harga < 1000) { alert('Masukkan harga yang valid!'); return; }
  document.getElementById('step-4').style.display = 'none';
  document.getElementById('step-4-dot').classList.replace('active', 'done');
  const impacts = ['♻️ 1 barang diselamatkan', '🌿 ~3 kg CO₂ dicegah', '💧 ~75L air hemat'];
  document.getElementById('success-impacts').innerHTML = impacts.map(i =>
    `<span class="success-impact-chip badge-teal section-badge">${i}</span>`
  ).join('');
  document.getElementById('success-panel').classList.add('show');
}

function resetForm() {
  document.getElementById('success-panel').classList.remove('show');
  ['f-nama', 'f-story', 'f-harga'].forEach(id => { document.getElementById(id).value = ''; });
  document.getElementById('f-cat').value = '';
  document.querySelectorAll('input[name=kondisi]').forEach(r => r.checked = false);
  [1, 2, 3, 4].forEach(n => {
    document.getElementById('step-' + n).style.display = n === 1 ? 'block' : 'none';
    const dot = document.getElementById('step-' + n + '-dot');
    dot.classList.remove('active', 'done');
    if (n === 1) dot.classList.add('active');
  });
  currentStep = 1;
  updatePreview();
}

// Init
renderProducts(products, 'product-grid');
renderProducts(products, 'search-grid');
setTimeout(() => {
  animateCount('stat-item', 1247);
  animateCount('stat-co2', 3800, ' kg');
  animateCount('stat-seller', 412);
  animateCount('stat-saved', 284, ' jt');
}, 300);
