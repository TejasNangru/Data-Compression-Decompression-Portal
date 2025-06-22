import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const ALGO_EXPLANATIONS = {
  huffman: "Huffman Coding is a lossless compression algorithm that assigns variable-length codes to input characters, with shorter codes assigned to more frequent characters.",
  rle: "Run-Length Encoding (RLE) compresses data by replacing sequences of the same value with a single value and a count.",
};

function App() {
  const [file, setFile] = useState(null);
  const [algorithm, setAlgorithm] = useState('huffman');
  const [stats, setStats] = useState(null);
  const [resultFile, setResultFile] = useState(null);                                
  const [meta, setMeta] = useState(null);
  const [mode, setMode] = useState('compress');
  const [error, setError] = useState('');

  const handleFileChange = e => setFile(e.target.files[0]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setStats(null);
    setResultFile(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('algorithm', algorithm);
    if (mode === 'decompress' && meta) {
      formData.append('meta', meta);
    }

    try {
      const url = mode === 'compress' ? '/api/compress' : '/api/decompress';
      const res = await axios.post(url, formData, { baseURL: 'http://localhost:5000' });
      if (mode === 'compress') {
        setStats(res.data.stats);
        setResultFile(res.data.compressed);
        setMeta(res.data.meta);
      } else {
        setStats(res.data.stats);
        setResultFile(res.data.decompressed);
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  const downloadFile = () => {
    if (!resultFile) return;
    const byteArray = Uint8Array.from(atob(resultFile), c => c.charCodeAt(0));
    const blob = new Blob([byteArray]);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = mode === 'compress' ? 'compressed.bin' : 'decompressed.bin';
    a.click();
    URL.revokeObjectURL(url);
  };

  

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-900 flex items-center justify-center py-10">
    <div className="w-full max-w-xl bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-slate-200">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-800 mb-2 text-center tracking-tight">
        Data Compression <span className="text-indigo-600">&</span> Decompression Portal
      </h1>
      <p className="text-center text-slate-600 mb-6">
        Compress and decompress files using modern algorithms.
      </p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="file"
          onChange={handleFileChange}
          required
          className="block w-full text-slate-700 border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block font-semibold text-slate-700 mb-1">Algorithm</label>
            <select
              value={algorithm}
              onChange={e => setAlgorithm(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            >
              <option value="huffman">Huffman Coding</option>
              <option value="rle">Run-Length Encoding</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block font-semibold text-slate-700 mb-1">Mode</label>
            <select
              value={mode}
              onChange={e => setMode(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            >
              <option value="compress">Compress</option>
              <option value="decompress">Decompress</option>
            </select>
          </div>
        </div>
        {mode === 'decompress' && algorithm === 'huffman' && (
          <textarea
            placeholder="Paste meta JSON from compression step"
            value={meta || ''}
            onChange={e => setMeta(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
            rows={3}
          />
        )}
        <button
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2.5 rounded-xl shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          type="submit"
        >
          {mode === 'compress' ? 'Compress' : 'Decompress'}
        </button>
      </form>
      {error && (
        <div className="mt-4 text-center text-red-600 font-semibold bg-red-50 border border-red-200 rounded-lg py-2 px-3">
          {error}
        </div>
      )}
      {stats && (
        <div className="mt-6">
          <h2 className="text-lg font-bold text-indigo-700 mb-2 border-b-2 border-indigo-200 pb-1">Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(stats).map(([k, v]) => (
              <div
                key={k}
                className="bg-slate-100 rounded-lg px-4 py-2 text-center shadow text-slate-700 font-mono"
              >
                <span className="block text-xs font-semibold uppercase text-slate-500">{k}</span>
                <span className="block text-lg font-bold">{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {stats && (
        <div className="mt-6">
          <Bar
            data={{
              labels: ['Original Size', 'Compressed Size'],
              datasets: [
                {
                  label: 'File Size (bytes)',
                  data: [stats.originalSize, stats.compressedSize ?? stats.decompressedSize],
                  backgroundColor: ['#3b82f6', '#10b981'],
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                title: { display: true, text: 'Compression Results' },
              },
              scales: {
                y: { beginAtZero: true },
              },
            }}
          />
        </div>
      )}
      {resultFile && (
        <button
          onClick={downloadFile}
          className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-2.5 rounded-xl shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Download {mode === 'compress' ? 'Compressed' : 'Decompressed'} File
        </button>
      )}
      {meta && mode === 'compress' && algorithm === 'huffman' && (
        <div className="mt-4">
          <label className="block font-semibold text-slate-700 mb-1">
            Meta JSON (copy this for decompression)
          </label>
          <textarea
            className="w-full border border-slate-300 rounded-lg p-2 bg-slate-50 text-xs"
            value={meta}
            readOnly
            rows={4}
            onFocus={e => e.target.select()}
          />
        </div>
      )}
      <div className="mt-8 bg-gradient-to-r from-indigo-100 via-blue-100 to-slate-100 rounded-lg p-4 shadow-inner">
        <h2 className="font-bold text-indigo-700 mb-1">Algorithm Explanation</h2>
        <p className="text-slate-700">{ALGO_EXPLANATIONS[algorithm]}</p>
      </div>
    </div>
  </div>
);

}

export default App;
