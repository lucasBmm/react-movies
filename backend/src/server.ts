import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Node server works!');
})

app.listen(8080, () => {
    console.log('Server listening on port ' + 8080);
});