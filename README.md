# Media Pojok Nduljati - Views Tracking System

Dokumentasi untuk sistem tracking views berita di Media Pojok Nduljati.

## 🎯 Fitur

- ✅ Tracking jumlah views untuk setiap berita
- ✅ Tampilan views di bawah setiap kartu berita
- ✅ Backend API yang fleksibel (PHP atau Node.js)
- ✅ Penyimpanan data persistent
- ✅ Real-time view updates

## 📁 Struktur Folder

```
homepage/
├── index.html              # Halaman utama (sudah diupdate dengan views)
├── api/
│   ├── views.php          # Backend API (PHP)
│   └── server.js          # Backend API (Node.js)
├── data/
│   └── views.json         # File penyimpanan data views
├── script/
│   └── main.js            # JavaScript (sudah diupdate)
├── style/
│   └── styles.css         # CSS (sudah diupdate)
├── package.json           # Dependencies untuk Node.js
└── README.md              # File ini
```

## 🚀 Setup & Cara Menjalankan

### Opsi 1: PHP Backend (Rekomendasi untuk Hosting Standar)

**Persyaratan:**
- Server dengan PHP 5.6+ (sudah built-in di mayoritas hosting)
- Folder `data/` harus writable (chmod 755 atau 777)

**Cara Menjalankan:**
1. Upload semua file ke server hosting Anda
2. Set permission folder `data/` agar writable:
   ```bash
   chmod 755 data/
   ```
3. Akses website melalui browser
4. Views akan otomatis ter-track

**Testing API PHP:**
```
GET  http://yoursite.com/api/views.php?action=get                  # Ambil semua views
GET  http://yoursite.com/api/views.php?action=get&post_id=post-1  # Ambil views post-1
POST http://yoursite.com/api/views.php?action=increment&post_id=post-1  # Increment view
```

### Opsi 2: Node.js Backend (Untuk Development)

**Persyaratan:**
- Node.js v12+ (download dari https://nodejs.org/)
- npm (biasanya include dengan Node.js)

**Cara Menjalankan:**

1. Buka terminal/command prompt di folder `homepage`

2. Install dependencies:
   ```bash
   npm install
   ```

3. Jalankan server:
   ```bash
   npm start
   ```
   atau
   ```bash
   node api/server.js
   ```

4. Server akan berjalan di `http://localhost:3000`

5. Update URL API di `script/main.js` jika diperlukan:
   ```javascript
   const apiBaseUrl = 'http://localhost:3000/api/views';
   ```

6. Buka `index.html` di browser (pastikan server Node.js tetap berjalan)

**Testing API Node.js:**
```bash
# Ambil semua views
curl http://localhost:3000/api/views

# Ambil views untuk post-1
curl http://localhost:3000/api/views?post_id=post-1

# Increment view
curl -X POST http://localhost:3000/api/views/increment \
  -H "Content-Type: application/json" \
  -d '{"post_id":"post-1"}'
```

## 📊 Format Data Views

File `data/views.json` berisi struktur seperti ini:

```json
{
  "post-1": 15,
  "post-2": 8,
  "post-3": 12,
  "post-4": 25,
  "post-5": 5,
  "post-6": 18,
  "featured": 42
}
```

Setiap kali halaman dimuat, views untuk semua post akan otomatis bertambah 1.

## 🔧 Cara Kerja Sistem

1. **Halaman Dimuat** → JavaScript membaca `main.js`
2. **Fetch Current Views** → Ambil data views dari API
3. **Display Views** → Tampilkan angka views di setiap kartu berita
4. **Increment Views** → Kirim request ke API untuk increment counter
5. **Update Display** → Refresh tampilan views dengan number terbaru

## 📝 File yang Dimodifikasi

### `index.html`
- Ditambahkan atribut `data-post-id` pada setiap `.post-card` dan `.featured-post`
- Ditambahkan elemen `.views-counter` dengan `.views-count` di setiap berita

### `style/styles.css`
- Ditambahkan styling untuk `.views-counter` class
- Views counter ditampilkan di bawah setiap berita dengan border top separator

### `script/main.js`
- Ditambahkan `fetchAllViews()` - fetch data views dari API
- Ditambahkan `incrementView()` - kirim request untuk increment view
- Ditambahkan `updateViewsCounts()` - update tampilan views di DOM
- Ditambahkan `trackPageViews()` - track views saat halaman dimuat

## 🐛 Troubleshooting

### Views tidak bertambah
**PHP:**
- Pastikan folder `data/` memiliki permission write (chmod 755/777)
- Cek error log PHP di server
- Pastikan `views.php` bisa diakses

**Node.js:**
- Pastikan server Node.js sedang berjalan (`npm start`)
- Check konsol untuk error messages
- Port 3000 tidak terpakai aplikasi lain

### CORS Error (Node.js)
Jika mendapat error CORS, pastikan hasil dari `app.use(cors())` di `server.js` sudah aktif.

### File views.json tidak terbuat
- Pastikan folder `data/` exist
- Folder harus writable
- PHP/Node.js memiliki permission untuk create file

## 📱 Responsive Design

Views counter sudah responsive dan akan ditampilkan dengan baik di:
- Desktop (> 768px)
- Tablet (481px - 768px)  
- Mobile (< 480px)

## 🔐 Keamanan

**Untuk Production:**
- Validasi input pada API endpoint
- Implement rate limiting untuk prevent abuse
- Use HTTPS untuk semua request
- Add authentication jika diperlukan

## 📞 Support

Jika ada masalah, check:
1. Console browser (F12) untuk JavaScript errors
2. Network tab untuk API response
3. Server logs (PHP atau Node.js)
4. File permission di folder `data/`

---

**Dibuat untuk:** Media Pojok Nduljati - Pondok Pesantren Darul Falah
