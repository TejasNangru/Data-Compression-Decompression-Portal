const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const { huffmanCompress, huffmanDecompress } = require('./huffman');
const { rleCompress, rleDecompress } = require('./rle');

const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(cors());
app.use(express.json());

app.post('/api/compress', upload.single('file'), (req, res) => {
  console.log('Received file:', req.file);
  const { algorithm } = req.body;
  const fileBuffer = fs.readFileSync(req.file.path);
  console.log('File buffer length:', fileBuffer.length);
  let result, stats;
  const start = Date.now();

  if (algorithm === 'huffman') {
    result = huffmanCompress(fileBuffer);
  } else if (algorithm === 'rle') {
    result = rleCompress(fileBuffer);
  } else {
    return res.status(400).json({ error: 'Unsupported algorithm' });
  }
  const end = Date.now();

  stats = {
    originalSize: fileBuffer.length,
    compressedSize: result.compressed.length,
    ratio: (result.compressed.length / fileBuffer.length).toFixed(2),
    timeMs: end - start,
  };

  fs.unlinkSync(req.file.path);

  res.json({
    compressed: Buffer.from(result.compressed).toString('base64'),
    stats,
    meta: result.meta,
  });
});

app.post('/api/decompress', upload.single('file'), (req, res) => {
  const { algorithm, meta } = req.body;
  const fileBuffer = fs.readFileSync(req.file.path);
  let result, stats;
  const start = Date.now();

  if (algorithm === 'huffman') {
    result = huffmanDecompress(fileBuffer, JSON.parse(meta));
  } else if (algorithm === 'rle') {
    result = rleDecompress(fileBuffer);
  } else {
    return res.status(400).json({ error: 'Unsupported algorithm' });
  }
  const end = Date.now();

  stats = {
    decompressedSize: result.length,
    timeMs: end - start,
  };

  fs.unlinkSync(req.file.path);

  res.json({
    decompressed: Buffer.from(result).toString('base64'),
    stats,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
