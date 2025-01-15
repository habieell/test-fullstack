Fullstack Web Application

📌 Deskripsi

Proyek ini adalah aplikasi web full-stack yang dikembangkan menggunakan React.js untuk UI, Node.js untuk backend, dan database untuk penyimpanan data. Aplikasi ini memungkinkan pengguna untuk menampilkan, menambahkan, mengedit, dan melihat detail data berdasarkan JSON viewData.json.

🚀 Fitur Utama

Menampilkan Data dalam Grid Table - Data dikelompokkan berdasarkan tahun dan bulan.

Halaman Tambah Data - Form untuk menambahkan data baru ke dalam sistem.

Halaman Edit Data - Mengedit data yang sudah ada dalam sistem.

Fullstack Development - Menggunakan React.js di frontend, API berbasis Node.js

🛠️ Teknologi yang Digunakan

Frontend: React.js, Bootstrap, 

Backend: Node.js, JSON Server


🔧 Instalasi dan Menjalankan Aplikasi

0️⃣ Menjalankan JSON Server

npx json-server --watch db.json --port 4000

1️⃣ Clone Repository

git clone https://github.com/habieell/test-fullstack.git
cd test-fullstack

2️⃣ Menjalankan Backend

cd backend
npm install
npm start

3️⃣ Menjalankan Frontend

cd frontend
npm install
npm run dev

🔍 Struktur Folder

/test-fullstack
│── backend/          # Backend API dengan Express.js
│   ├── models/       # Model database
│   ├── routes/       # Endpoint API
│   ├── controllers/  # Logika bisnis
│   ├── server.js     # Entry point backend
│
│── frontend/         # Frontend React.js
│   ├── src/
│   │   ├── components/  # Komponen UI
│   │   ├── pages/       # Halaman aplikasi
│   │   ├── App.js       # Entry point React
│
│── db.json           # Data awal aplikasi
│── README.md         # Dokumentasi proyek



