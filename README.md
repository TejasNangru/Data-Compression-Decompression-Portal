# 🚀 Data Compression & Decompression Portal

[🌐 Live App (Frontend @ Vercel, Backend @ Render)](https://data-compression-decompression-port-lovat.vercel.app/)  
⚠️ *Note: The backend (Render) may take 10–20 seconds to respond on the first request due to free-tier sleep mode. Subsequent requests are much faster!*

[🎥 Video Walkthrough](https://youtu.be/k0KVpDGTDDM?si=SSHDbapf-dN-TWzs)

---

## 📖 Project Description

Data Compression & Decompression Portal is a full-stack web app that lets you upload files, compress or decompress them using **Huffman Coding** or **Run-Length Encoding (RLE)**, and download the processed results.  
The portal visualizes compression statistics, explains each algorithm, and is fully responsive.

### 🧩 **Algorithms & Best Use Cases**

- **Huffman Coding:**  
  Assigns variable-length codes to input characters, optimizing for frequent symbols.  
  *Best for:* Text files or data with lots of repeated characters. Less effective on already compressed files (like JPEG/PNG images).

- **Run-Length Encoding (RLE):**  
  Replaces sequences of the same value with a single value and a count.  
  *Best for:* Data with long runs of repeated values (e.g., simple text, bitmap images). Not effective for most images or HTML.

---

## ✨ Features

- 📁 Upload & process files (text, image, binary)
- 🔄 Compress or decompress using Huffman or RLE
- 📉 View original size, compressed size, ratio, and time
- 📊 Visualize compression results with interactive charts
- ℹ️ Learn about each algorithm in the UI
- 📥 Download compressed or decompressed files
- 🖥️ Responsive design for desktop & mobile
- ⚠️ Robust error handling for unsupported files & decompression errors

---

## 🛠️ Tech Stack

| Layer         | Technology                                      |
|---------------|-------------------------------------------------|
| **Frontend**  | React.js, Tailwind CSS, Chart.js (react-chartjs-2) |
| **Backend**   | Node.js, Express.js, Multer, fs                 |
| **Algorithms**| Huffman Coding, Run-Length Encoding (RLE)       |
| **Hosting**   | Frontend: Vercel<br>Backend: Render             |

---

## 🏗️ Setup Instructions (Run Locally)

### Backend

1. `cd backend`
2. `npm install`
3. `npm start`


### Frontend

1. `cd frontend`
2. `npm install`
3. `npm start`


### Usage

- Open your browser at [http://localhost:3000](http://localhost:3000)
- Backend runs at [http://localhost:5000](http://localhost:5000)
- For production, set `REACT_APP_API_BASE_URL` in `frontend/.env` to your Render backend URL.

---





