const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const { connectToDb, db } = require('./db');
const NhanvienRouters = require('./Routers/NhanvienRouter');
const VatTuRouter = require("./Routers/VatTuRouter");
const HoaDonRouter = require("./Routers/HoaDonRouter");
const ThongBaoRouter = require("./Routers/ThongBaoRouter");
const PhieuChuyenRouter = require("./Routers/PhieuChuyenRouter");
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(express.json());
app.use("/Nhanvien", NhanvienRouters);
app.use("/VatTu", VatTuRouter);
app.use("/HoaDon", HoaDonRouter);
app.use("/ThongBao", ThongBaoRouter);
app.use("/PhieuChuyen", PhieuChuyenRouter);
app.get('/', (req, res) => {
    res.json('Hello world')
})


app.post('/Login', async(req, res) => {
    console.log(req.body)
    const respond = await db.TaiKhoan.findOne(req.body)
    res.status(200)
    res.json(respond)
})


const port = process.env['PORT'] || 5001
app.listen(port, () => {
    console.log('App is running on port 3000', port);
    connectToDb()
})