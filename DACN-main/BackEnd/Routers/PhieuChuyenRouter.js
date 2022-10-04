const express = require('express');
const PhieuChuyenRouter = express.Router();
const { ObjectId } = require('mongodb');
const { db } = require('../db')




PhieuChuyenRouter.post("/", async(req, res) => {
    const VatTu = {
        SanPham: [req.body.hoadon],

        ChiNhanh: req.body.ChiNhanh
    };
    const result = await db.PhieuChuyen.insertOne(VatTu);

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


PhieuChuyenRouter.get("/c/:chinhanh", async(req, res) => {
    const chinhanh = req.params.chinhanh;
    const result = await db.PhieuChuyen.find({
        ChiNhanh: chinhanh,
    }).toArray();

    if (!result) {
        res.json({
            status: "FAILED",
            message: "Không có dữ liệu"
        })
    } else {
        res.json({
            status: "SUCCESS",
            message: "Lấy được dữ liệu",
            data: result
        })
    }
})


PhieuChuyenRouter.delete("/:id", async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const filter = {
        _id: new ObjectId(id)
    }
    const updateDoc = {
        $set: body
    }
    const result = await db.PhieuChuyen.deleteOne(filter);

    if (!result) {
        res.json({
            status: "FAILED",
            message: "Không có dữ liệu"
        })
    } else {
        res.json({
            status: "SUCCESS",
            message: "Lấy được dữ liệu",
            data: result
        })
    }
})

module.exports = PhieuChuyenRouter;