const express = require("express");
const {deviceModels} = require("../models");

const router = express.Router();

//melihat data
router.get("/", async (req, res) => {
    const dataDevice = await deviceModels.findAll();

    if (!dataDevice) {
        return res.status(404).json({
            message: "Data tidak ditemukan"
        })
    };
    return res.status(200)
        .json({
            message: "Berhasil mendapatkan semua data device.",
            data: dataDevice,
        });
    
});

//menambah data
router.post("/", async (req, res) => {
    const dataDevice = { ...req.body };

    try {
        const addDevice = await deviceModels.create({
            ...dataDevice
        });
        return res.status(200).json({
            message: "Data berhasil ditambahkan",
            data: addDevice
        });
    } catch (error) {
        return res.status(400).json({
            message: "Gagal menambahkan data. Pastikan data yang Anda masukkan valid.",
            data: {}
        });
    }
});


//mengubah data
router.put("/:id", async (req,res) => {
    const dataDevice = {...req.body};
    const id = req.params.id;

    const updateData = await deviceModels.update({
        ...dataDevice
    },{
        where: {
            id:id,
        },
    });

    if(!updateData){
        return res.status(404).json({
            message: "Data tidak ditemukan",
            data: {}
        });
    };

    const dataDeviceUpdate = await deviceModels.findOne({
        where: {
            id: id,
        },
    });

    return res.status(200)
        .json({
            message: "Berhasil mengubah data user.",
            data: dataDeviceUpdate,
        });
})

//hapus data
router.delete("/:id", async (req,res) => {
    const id = req.params.id;
    const deleteDevice = await deviceModels.destroy({
        where: {
            id: id,
        },
    });

    if (!deleteDevice) {
        return res.status(400)
            .json({
                message: "Gagal menghapus data device.",
                data: {},
            });
    }

    return res.status(200)
        .json({
            message: "Berhasil menghapus data device.",
            data: deleteDevice,
        });
})

module.exports = router;