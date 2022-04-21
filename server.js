import express from 'express';
import path from 'path';
import favicon from 'express-favicon';
const __dirname = path.resolve();

const app = express();

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8080;

app.get('/ping', (_, res) => {
  res.send('pong');
});

app.use(favicon(__dirname + '/build/favicon.ico'));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/chat', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('*', (req, res) => {
  res.send('Page does not exist 404 💥💥💥');
});

app.listen(PORT, () => console.log(`App listening port ${PORT}`));

//https://powerful-depths-16588.herokuapp.com/
