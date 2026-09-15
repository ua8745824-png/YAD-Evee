const http = require('http');

const urls = [
  '/',
  '/css/style.css',
  '/css/components.css',
  '/css/responsive.css',
  '/js/data.js',
  '/js/calculator.js',
  '/js/visualizer.js',
  '/js/forms.js',
  '/js/app.js',
  '/assets/images/hero_scooty.jpg',
  '/assets/images/ev2_1.jpg',
  '/assets/images/ev2_4.jpg',
  '/assets/images/ev2_6.jpg',
  '/assets/images/ev3_loader.jpg',
  '/assets/images/battery_tech.jpg',
  '/assets/images/factory_assembly.jpg'
];

let pending = urls.length;
let hasError = false;

urls.forEach(path => {
  http.get(`http://localhost:3000${path}`, (res) => {
    let bytes = 0;
    res.on('data', chunk => bytes += chunk.length);
    res.on('end', () => {
      console.log(`[${res.statusCode}] ${path} (${bytes} bytes)`);
      if (res.statusCode !== 200) hasError = true;
      pending--;
      if (pending === 0) {
        if (hasError) {
          console.error('FAILED: Some files returned non-200');
          process.exit(1);
        } else {
          console.log('\n✅ ALL 16 ENDPOINTS AND ASSETS RETURNED 200 OK PERFECTLY!');
          process.exit(0);
        }
      }
    });
  }).on('error', (err) => {
    console.error(`ERROR fetching ${path}:`, err.message);
    process.exit(1);
  });
});
