const express = require('express')
const fs = require('fs');
const path = require('path');

const app = express();


app.use('/', express.static('public'));



app.get('/data', (req, res) => {
    const testFolder = '/data';

    fs.readdir(testFolder, (err, files) => {
        res.set("Content-Type", "application/json");
        res.write(JSON.stringify(files));
        res.end();
    })
})

app.get('/time', (req, res) => {
    res.set("Content-Type", "text/plain");

    if (!fs.existsSync("/data/.updateTime")) {
        res.status(404);
        res.end();
    } else {
        fs.createReadStream('/data/.updateTime').pipe(res);
    }
})

app.get('/data/:dataName', (req, res) => {
    const dataName = req.params.dataName;

    const validDataNameCheck = /^[a-zA-Z_\-0-9][a-zA-Z_\-0-9\.]+$/;
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

    res.set("Content-Type", "text/csv");
    fs.createReadStream(ddataPath).pipe(res);
})

const port = process.env.SERVICE_PORT;
console.log('listening on ' + port);
app.listen(port);