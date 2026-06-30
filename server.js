const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const stateFile = path.join(__dirname, 'question_state.json');

app.use(express.json());
app.use(express.static(__dirname));

// Serve dashboard on root and /dashboard (no extension)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});
app.get('/all_notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'all_notes.html'));
});

app.get('/state', (req, res) => {
  fs.readFile(stateFile, 'utf8', (err, data) => {
    if (err) {
      return res.json({ done: {}, notes: {}, stars: {} });
    }
    try {
      return res.json(JSON.parse(data));
    } catch (e) {
      return res.json({ done: {}, notes: {}, stars: {} });
    }
  });
});

app.post('/state', (req, res) => {
  fs.writeFile(stateFile, JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ status: 'ok' });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server running at http://localhost:' + port);
});