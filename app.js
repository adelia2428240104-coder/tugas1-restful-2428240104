const express = require("express");
const app = express();
app.use(express.json());

// data awal paket foto
let photoPackages = [
    {
        id: 1,
        namaPaket: "Wisuda Keluarga",
        jenis: "wisuda",
        jumlahFoto: 20,
        durasiJam: 1,
        harga: 450000,
    },
    {
        id: 2,
        namaPaket: "Prewedding Romantic",
        jenis: "prewedding",
        jumlahFoto: 50,
        durasiJam: 3,
        harga: 1500000,
    },
    {
        id: 3,
        namaPaket: "Foto Produk UMKM",
        jenis: "produk",
        jumlahFoto: 15,
        durasiJam: 2,
        harga: 600000,
    }
];

let nextId = 4;

app.get("/", (req, res) => {
  res.json({
    nama: "Adelia",
    nim: "2428240104",
    topik: 29,
    endpoints: [
      "GET /photo-packages",
      "GET /photo-packages/:id",
      "POST /photo-packages",
      "PUT /photo-packages/:id",
      "DELETE /photo-packages/:id",
      "GET /photo-packages?jenis=wisuda"
    ]
  });
});

// GET /photo-packages
app.get("/photo-packages", (req, res) => {
    res.json(photoPackages);
});

// GET /photo-packages/:id
app.get("/photo-packages/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const photoPackage = photoPackages.find((item) => item.id === id);

  if (!photoPackage) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  res.json(photoPackage);
});

// POST /photo-packages
app.post("/photo-packages", (req, res) => {
  const { namaPaket, jenis, jumlahFoto, durasiJam, harga } = req.body;

  if (!namaPaket || !jenis || jumlahFoto === undefined || durasiJam === undefined || harga === undefined) {
    return res.status(400).json({
      status: "error",
      message: "Field wajib belum lengkap",
      data: null,
    });
  }

  const newPhotoPackage = {
    id: nextId++,
    namaPaket,
    jenis,
    jumlahFoto,
    durasiJam,
    harga,
  };

  photoPackages.push(newPhotoPackage);

  res.status(201).json(newPhotoPackage);
});

// PUT /photo-packages/:id
app.put("/photo-packages/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const photoPackage = photoPackages.find((item) => item.id === id);

  if (!photoPackage) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  const { namaPaket, jenis, jumlahFoto, durasiJam, harga } = req.body;

  if (!namaPaket || !jenis || jumlahFoto === undefined || durasiJam === undefined || harga === undefined) {
    return res.status(400).json({
      status: "error",
      message: "Field wajib belum lengkap",
      data: null,
    });
  }

  photoPackage.namaPaket = namaPaket;
  photoPackage.jenis = jenis;
  photoPackage.jumlahFoto = jumlahFoto;
  photoPackage.durasiJam = durasiJam;
  photoPackage.harga = harga;

  res.json(photoPackage);
});

// DELETE /photo-packages/:id
app.delete("/photo-packages/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = photoPackages.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  const deletedPhotoPackage = photoPackages.splice(index, 1)[0];

  res.json(deletedPhotoPackage);
});

const server = app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});

server.on("error", (err) => {
  console.error("Server error:", err);
});

server.on("close", () => {
  console.log("Server ditutup");
});