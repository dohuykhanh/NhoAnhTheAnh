const express = require('express');
const VatTuRouter = express.Router();
const { ObjectId } = require('mongodb');
const { db } = require('../db')
    // here we create our Route
VatTuRouter.post("/", async(req, res) => {
        const VatTu = {
            TenVatTu: req.body.TenVatTu,
            SoLuong: parseInt(req.body.SoLuong),
            NgaySanXuat: new Date(req.body.NgaySanXuat),
            NgayHetHan: new Date(req.body.NgayHetHan),
            ChiNhanh: req.body.ChiNhanh,
            Gia: parseInt(req.body.Gia)
        };
        const result = await db.VatTu.insertOne(VatTu);

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
    // get the


VatTuRouter.get("/c/:chinhanh", async(req, res) => {
    const chinhanh = req.params.chinhanh;
    const result = await db.VatTu.find({
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

//get the
VatTuRouter.get("/:id", async(req, res) => {
    const id = req.params.id;
    const result = await db.VatTu.find({
        _id: ObjectId(id),
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

//get the
VatTuRouter.put("/:id", async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const filter = {
        _id: new ObjectId(id)
    }
    const updateDoc = {
        $set: body
    }
    const result = await db.VatTu.updateOne(filter, updateDoc);

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

VatTuRouter.delete("/:id", async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const filter = {
        _id: new ObjectId(id)
    }
    const updateDoc = {
        $set: body
    }
    const result = await db.VatTu.deleteOne(filter);

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

module.exports = VatTuRouter;