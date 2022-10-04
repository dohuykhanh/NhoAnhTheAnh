const express = require('express');
const ThongBaoRouter = express.Router();
const { ObjectId } = require('mongodb');
const { db } = require('../db')


ThongBaoRouter.post("/", async(req, res) => {
    const NhanVien = {
        YeuCau: req.body.YeuCau,
        hoten: req.body.hoten,
        sdt: req.body.sdt,
        ChiNhanh: req.body.ChiNhanh,
        idtb: req.body.idtb
    };
    const result = await db.ThongBao.insertOne(NhanVien);

    if (!result) {
        res.json({
            status: "FAILED",
            message: "Không thêm được nhân viên"
        })
    } else {
        res.json({
            status: "SUCCESS",
            message: "Thêm nhân viên thành công",
            data: NhanVien
        })
    }
})

ThongBaoRouter.get("/", async(req, res) => {
    const chinhanh = req.params.chinhanh;
    const result = await db.ThongBao.find({

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



ThongBaoRouter.delete("/:id", async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const filter = {
        _id: new ObjectId(id)
    }
    const updateDoc = {
        $set: body
    }
    const result = await db.ThongBao.deleteOne(filter);

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
module.exports = ThongBaoRouter;