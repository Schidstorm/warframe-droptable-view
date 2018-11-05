const express = require('express')
const fs = require('fs');
const path = require('path');

const app = express();


app.use('/index.html', express.static('../public/index.html'));

const testFolder = '/data';

fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
})

app.get('/data/:dataName', (req, res) => {
    const dataName = req.params.dataName;

    const validDataNameCheck = /^[a-zA-Z_\-0-9\.]+$/;
    if (!validDataNameCheck.test(dataName)) {
        res.status(406);
        res.end('');
        return;
    }

    const ddataPath = path.join('/data', dataName) ;
    if (!fs.existsSync(ddataPath)) {
        res.status(404);
        res.end('');
        return;
    }

    res.header('Content-Type: text/csv');
    fs.createReadStream(ddataPath).pipe(res);
})

const port = process.env.SERVICE_PORT;
console.log('listening on ' + port);
app.listen(port);