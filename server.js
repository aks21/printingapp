// server.js
const express = require('express');
const multer  = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the CSS file
app.get('/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'styles.css'), { headers: { 'Content-Type': 'text/css' } });
});

// Handle file upload
app.post('/upload', upload.single('pdfFile'), (req, res) => {
  if (req.file) {
    res.json({ success: true, filename: req.file.filename });
  } else {
    res.json({ success: false });
  }
});

app.get('/script.js', (req, res) => {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(path.join(__dirname, 'script.js'));
  });
  
// Serve the uploaded files
app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
  console.log(`Web app listening at http://localhost:${port}`);
});
