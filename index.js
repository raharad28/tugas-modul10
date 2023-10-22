const express = require("express");
const db = require("./models");
const deviceRoutes = require("./routes/device.routes");

const app = express();
const port = 8000;

app.use(express.json());
app.use(deviceRoutes);

db.sequelize
    .authenticate()
    .then(() => {
        console.log('Koneksi ke database berhasil.');
    })
    .catch(err => {
        console.error('Gagal koneksi ke database: ', err);
    });

db.sequelize
    .sync({
        force: false, // To create table if exists
        alter: true // To update the table if exists
    })
    .then(() => {
        console.log("Database tersinkronisasi.");
    })
    .catch((err) => {
        console.log("Gagal sinkronisasi ke database: " + err.message);
    });
app.listen(port, () =>{
    console.log(`App started at ${port}`);
});
