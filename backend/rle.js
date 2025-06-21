function rleCompress(data) {
  let out = [];
  let i = 0;
  while (i < data.length) {
    let count = 1;
    while (i + count < data.length && data[i] === data[i + count] && count < 255) {
      count++;
    }
    out.push(count);
    out.push(data[i]);
    i += count;
  }
  return { compressed: Buffer.from(out), meta: null };
}

function rleDecompress(data) {
  let out = [];
  for (let i = 0; i < data.length; i += 2) {
    const count = data[i];
    const value = data[i + 1];
    for (let j = 0; j < count; j++) {
      out.push(value);
    }
  }
  return Buffer.from(out);
}

module.exports = { rleCompress, rleDecompress };
