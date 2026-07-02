import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

// Disable strict caching during template development & preview
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// Serve all static HTML, CSS, JS, Fonts, and Images from root directory
app.use(express.static(process.cwd()));

// SPA Fallback for 404 pages (faithfully serves 404.html if route not found)
app.use((req, res) => {
  res.status(404).sendFile(path.join(process.cwd(), '404.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`==================================================`);
  console.log(` Reeni Premium ThemeForest Template Server`);
  console.log(` Running on: http://localhost:${PORT}`);
  console.log(` Serving pure static HTML5 / CSS3 / Vanilla JS`);
  console.log(`==================================================`);
});
