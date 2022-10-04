const express = require('express');
const NhanvienRounter = express.Router();
const { ObjectId } = require('mongodb');
const { db } = require('../db')

// here we create our Route
NhanvienRounter.post("/", async(req, res) => {
        const NhanVien = {
            hoten: req.body.hoten,
            sdt: req.body.sdt,
            ChiNhanh: req.body.ChiNhanh,
        };
        const result = await db.NhanVien.insertOne(NhanVien);

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
    //get the
NhanvienRounter.get("/c/:chinhanh", async(req, res) => {
        const chinhanh = req.params.chinhanh;
        const result = await db.NhanVien.find({
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
NhanvienRounter.get("/:id", async(req, res) => {
    const id = req.params.id;
    const result = await db.NhanVien.find({
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
NhanvienRounter.put("/:id", async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const filter = {
        _id: new ObjectId(id)
    }
    const updateDoc = {
        $set: body
    }
    const result = await db.NhanVien.updateOne(filter, updateDoc);

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


NhanvienRounter.delete("/:id", async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const filter = {
        _id: new ObjectId(id)
    }
    const updateDoc = {
        $set: body
    }
    const result = await db.NhanVien.deleteOne(filter);

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


module.exports = NhanvienRounter;