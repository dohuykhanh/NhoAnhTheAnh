const express = require('express');
const HoaDonRouter = express.Router();
const { ObjectId } = require('mongodb');
const { db } = require('../db')




HoaDonRouter.post("/", async(req, res) => {
    const VatTu = {
        SanPham: [req.body.hoadon],

        ChiNhanh: req.body.ChiNhanh,
        Gia: parseInt(req.body.Gia),
        NguoiBan: req.body.NguoiBan
    };
    const result = await db.HoaDon.insertOne(VatTu);

    if (!result) {
        res.json({
            status: "FAILED",
            message: "Không thêm được sản phẩm"
        })
    } else {
        res.json({
            status: "SUCCESS",
            message: "Thêm sản phẩm thành công",
            data: VatTu
        })
    }
})


module.exports = HoaDonRouter;