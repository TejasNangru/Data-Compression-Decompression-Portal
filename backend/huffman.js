function buildFrequencyTable(data) {
  const freq = {};
  for (let byte of data) {
    freq[byte] = (freq[byte] || 0) + 1;
  }
  return freq;
}

function buildHuffmanTree(freq) {
  const nodes = Object.entries(freq).map(([char, freq]) => ({
    char: parseInt(char),
    freq,
    left: null,
    right: null,
  }));

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.freq - b.freq);
    const left = nodes.shift();
    const right = nodes.shift();
    nodes.push({
      char: null,
      freq: left.freq + right.freq,
      left,
      right,
    });
  }
  return nodes[0];
}

function buildCodebook(node, path = '', codebook = {}) {
  if (!node.left && !node.right) {
    codebook[node.char] = path;
    return codebook;
  }
  if (node.left) buildCodebook(node.left, path + '0', codebook);
  if (node.right) buildCodebook(node.right, path + '1', codebook);
  return codebook;
}

function encodeData(data, codebook) {
  let encoded = '';
  for (let byte of data) {
    encoded += codebook[byte];
  }
  const pad = (8 - (encoded.length % 8)) % 8;
  encoded += '0'.repeat(pad);
  const bytes = [];
  for (let i = 0; i < encoded.length; i += 8) {
    bytes.push(parseInt(encoded.slice(i, i + 8), 2));
  }
  return { bytes: Buffer.from(bytes), pad };
}

function huffmanCompress(data) {
  const freq = buildFrequencyTable(data);
  const tree = buildHuffmanTree(freq);
  const codebook = buildCodebook(tree);
  const { bytes, pad } = encodeData(data, codebook);
  return {
    compressed: bytes,
    meta: JSON.stringify({ codebook, pad }),
  };
}

function decodeData(bytes, codebook, pad) {
  let bitstr = '';
  for (let byte of bytes) {
    bitstr += byte.toString(2).padStart(8, '0');
  }
  bitstr = bitstr.slice(0, bitstr.length - pad);
  const rev = {};
  for (let k in codebook) rev[codebook[k]] = k;
  let decoded = [];
  let curr = '';
  for (let bit of bitstr) {
    curr += bit;
    if (rev[curr]) {
      decoded.push(Number(rev[curr]));
      curr = '';
    }
  }
  return Buffer.from(decoded);
}

function huffmanDecompress(data, meta) {
  const { codebook, pad } = meta;
  return decodeData(data, codebook, pad);
}

module.exports = { huffmanCompress, huffmanDecompress };
