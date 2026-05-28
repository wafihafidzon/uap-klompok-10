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

const catEmoji   = { elektronik:'📱', pakaian:'👕', furnitur:'🪑', buku:'📚', '':'' };
const catBgColor = { elektronik:'#e0f2fe', pakaian:'#fce7f3', furnitur:'#fef3c7', buku:'#d1fae5' };

function renderProducts(list, gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
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

function animateCount(id, target, suffix, duration) {
  suffix = suffix || '';
  duration = duration || 1500;
  const el = document.getElementById(id);
  if (!el) return;
  const start = Date.now();
  const tick = () => {
    const p = Math.min((Date.now() - start) / duration, 1);
    el.textContent = Math.round(p * target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// Highlight nav link matching current page
(function activateNav() {
  const page = document.body.dataset.page;
  if (!page) return;
  document.querySelectorAll('.nav-link[data-page="' + page + '"]').forEach(function(el) {
    el.classList.add('active');
  });
})();
