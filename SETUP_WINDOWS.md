# 🚀 Panduan Setup Views Counter - Windows

Panduan lengkap untuk menjalankan views tracking system di Windows.

## Pilihan Backend

Ada 2 pilihan untuk menjalankan backend:

### ✅ Pilihan 1: PHP (Recommended - Lebih Mudah)

**Apa yang Anda butuhkan:**
- Server dengan PHP (XAMPP, WAMP, atau langsung di hosting)
- Tidak perlu install apapun jika pakai hosting

**Step-by-step:**

#### Jika pakai XAMPP/WAMP:
1. Install XAMPP/WAMP dari internet
2. Pindahkan folder `homepage` ke folder `htdocs` (XAMPP) atau `www` (WAMP)
3. Jalankan XAMPP/WAMP
4. Buka browser: `http://localhost/homepage`
5. Selesai! Views sudah ter-track

#### Jika pakai Hosting:
1. Upload semua file ke hosting
2. Pastikan folder `data/` permission-nya 755 atau 777
3. Buka website
4. Selesai!

---

### ⚡ Pilihan 2: Node.js (Untuk Development/Testing)

**Apa yang Anda butuhkan:**
- Node.js (bisa download di https://nodejs.org/)

**Step-by-step:**

1. **Download & Install Node.js**
   - Go ke https://nodejs.org/
   - Download LTS version
   - Jalankan installer dan klik Next sampai selesai
   - Buka Command Prompt baru untuk confirm instalasi

2. **Verify Node.js Installation**
   ```
   Buka Command Prompt dan ketik:
   node --version
   npm --version
   
   Jika muncul versi, berarti sudah terinstall dengan benar
   ```

3. **Setup Project**
   - Buka Command Prompt
   - Navigasi ke folder homepage:
     ```
     cd D:\homepage
     ```
   - Install dependencies:
     ```
     npm install
     ```
     (Tunggu beberapa menit sampai selesai)

4. **Jalankan Server**
   ```
   npm start
   ```
   
   Atau:
   ```
   node api/server.js
   ```
   
   Jika berhasil, akan muncul:
   ```
   Views tracking server running on http://localhost:3000
   ```

5. **Buka Website**
   - Buka browser
   - Go to `http://localhost:3000` atau buka file `index.html`
   - Views sudah akan ter-track!

6. **Stop Server**
   - Tekan `Ctrl + C` di Command Prompt untuk stop server

---

## ❓ Troubleshooting

### PHP Issues

**Error: File tidak ditemukan**
- Pastikan file `api/views.php` sudah ada

**Error: Permission denied saat create file**
- Ubah permission folder `data/` ke 755 atau 777
- Jika pakai XAMPP: folder sudah otomatis writable

**Views tidak bertambah**
- Check browser Console (F12) untuk error
- Pastikan XAMPP/WAMP sudah running
- Clear browser cache (Ctrl+Shift+Delete)

---

### Node.js Issues

**Error: 'node' is not recognized**
- Node.js belum diinstall dengan benar
- Install ulang Node.js dan restart Command Prompt

**Error: npm install failed**
- Check koneksi internet
- Try: `npm cache clean --force`
- Jalankan `npm install` lagi

**Error: Port 3000 already in use**
- Ada aplikasi lain yang pakai port 3000
- Ganti port di `api/server.js`: ubah `const PORT = 3000;` jadi port lain seperti `3001`

**Server running tapi views tidak update**
- Check browser Console (F12)
- Pastikan `apiBaseUrl` di `script/main.js` sudah benar
- Clear browser cache

---

## 📊 Cek Views Data

File views disimpan di: `data/views.json`

Anda bisa buka file tersebut dengan text editor untuk lihat data views.

---

## 🎯 Quick Start Command

### Windows Command Prompt:
```
cd D:\homepage
npm install
npm start
```

Kemudian buka `http://localhost:3000` di browser.

---

## 📱 Akses dari Device Lain

Jika ingin akses dari smartphone/device lain saat development:

1. Cari IP address komputer Anda di Command Prompt:
   ```
   ipconfig
   
   Cari: IPv4 Address (contoh: 192.168.1.100)
   ```

2. Di device lain, buka: `http://[IP-ADDRESS]:3000`
   Contoh: `http://192.168.1.100:3000`

---

## ⚙️ API Endpoints

Jika ingin test API secara manual:

### GET - Ambil semua views
```
http://localhost:3000/api/views
```

### GET - Ambil views untuk post tertentu
```
http://localhost:3000/api/views?post_id=post-1
```

### POST - Tambah 1 view
Buka Postman atau tools serupa, kemudian:
```
URL: http://localhost:3000/api/views/increment
Method: POST
Body (JSON):
{
  "post_id": "post-1"
}
```

---

## 📚 Kurasi Folder Structure

```
D:\homepage\
├── index.html              ← Main page
├── api\
│   ├── views.php          ← PHP Backend
│   └── server.js          ← Node.js Backend
├── data\
│   └── views.json         ← Data views disimpan di sini
├── script\
│   └── main.js            ← JavaScript (sudah handle views)
├── style\
│   └── styles.css         ← CSS
├── images\                ← Folder images
├── package.json           ← Node.js dependencies
└── README.md              ← Full documentation
```

---

Semoga berhasil! 🎉

Jika masih ada pertanyaan, check file `README.md` untuk dokumentasi lengkap.
