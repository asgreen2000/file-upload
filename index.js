const express = require('express');
const app = express();
const fileUpload = require("express-fileupload");
const path = require("path");
require('dotenv').config();


app.use('/public', express.static(process.cwd() + '/public'));
app.use(
    fileUpload()
);

app.get('/', (req, res) => {
    

    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/fileanalyse', (req, res) => {

    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }

    const file = req.files.upfile;
    const path = __dirname + "/files/" + file.name;

    file.mv(path, (err) => {
        if (err) {
        return res.status(500).send(err);
        }
        const response = {
            fileName: file.name
        }
        return res.send(response);
    });

});


app.listen(process.env.PORT, () => {

    console.log("Server ran!");

});