import express from 'express';
import path from 'path';
const __dirname = path.resolve();

const app = express();

const PORT = 3001;

app.get('/ping', (_, res) => {
  res.send('pong');
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`App listening port ${PORT}`));
