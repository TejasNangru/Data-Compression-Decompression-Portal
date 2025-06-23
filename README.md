# Data Compression & Decompression Portal

[Hosted Live (Frontend@Vercel Backend@Render](https://data-compression-decompression-port-lovat.vercel.app/)  
[Video Walkthrough](https://your-demo-video-link.com)

---

## Project Description

A web portal to upload files and apply lossless compression algorithms (Huffman Coding or Run-Length Encoding), view compression statistics, and download processed files. The app also explains each algorithm and visualizes compression results.

---

## Features

- Upload files (text, image, binary) and compress/decompress using Huffman or RLE
- Download compressed or decompressed files
- View compression statistics (original size, compressed size, ratio, time)
- Visualize compression results with charts
- Learn about each algorithm in the UI
- Responsive design for desktop and mobile
- Robust error handling for unsupported files and decompression errors

---

## Tech Stack

| Layer      | Technology                       |
|------------|----------------------------------|
| Frontend   | React.js, Tailwind CSS, Chart.js |
| Backend    | Node.js, Express.js, Multer      |

---

## Setup Instructions

### Backend

  1. `cd backend`
  2. `npm install`
  3. `npm start`



### Frontend

  1. `cd frontend`
  2. `npm install`
  3. `npm start`



### Usage

- Visit the frontend at [http://localhost:3000](http://localhost:3000)
- Backend runs at [http://localhost:5000](http://localhost:5000)
- For production, set `REACT_APP_API_BASE_URL` in `frontend/.env` to your backend URL (e.g., Render)

---

## Algorithm Explanations & Best Use Cases

### Huffman Coding

- **Description:** Assigns variable-length codes to input characters, giving shorter codes to more frequent characters.
- **Best for:** Text files and data with lots of repeated characters. Less effective on already compressed images.

### Run-Length Encoding (RLE)

- **Description:** Replaces sequences of the same value with a single value and a count.
- **Best for:** Files with long runs of repeated characters (e.g., simple text, bitmap images). Not effective for most images or HTML.

---

## Demo Links

- **Live App:** [https://your-frontend.vercel.app](https://your-frontend.vercel.app)
- **Video Walkthrough:** [https://your-demo-video-link.com](https://your-demo-video-link.com)

---
