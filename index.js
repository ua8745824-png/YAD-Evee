const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

module.exports = (req, res) => {
  let reqUrl = (req.url || '/').split('?')[0];
  let cleanPath = decodeURIComponent(reqUrl).replace(/^\/+/, '');

  if (!cleanPath || cleanPath === '') {
    cleanPath = 'index.html';
  }

  const filePath = path.join(__dirname, cleanPath);

  // Check if file exists directly
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400'
      });
      return fs.createReadStream(filePath).pipe(res);
    }
  }

  // Only fallback to index.html for page routes (NOT for missing css, js, or image assets)
  const ext = path.extname(cleanPath).toLowerCase();
  if (!ext || ext === '.html') {
    const indexPath = path.join(__dirname, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache'
      });
      return fs.createReadStream(indexPath).pipe(res);
    }
  }

  // Proper 404 for missing static assets
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 Not Found');
};
