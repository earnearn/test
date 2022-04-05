let mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router();

let RestroomSchema = require("../models/restroom")

router.route("/").get(async (req, res) => {

    const rests = await RestroomSchema.find({});
    try {
        res.send(rests);
    } catch (error) {
        res.status(500).send(error);
    }
})


router.route("/create").post(async (req, res, next) => {

    const rest = new RestroomSchema(req.body)
    try {
        await rest.save()
        res.send(rest)
    } catch (error) {
        res.status(500).send(error)
    }
})


router.route("/update/:cnt").get(async (req, res, next) => {
    try {
        const rest = await RestroomSchema.findByIdAndUpdate('6244298398292db191e8c446',{ "count": req.params.cnt });
        res.send("Success");
    } catch (error) {
        res.status(500).send(error);
    }
})



router.route("/update/restroom/:cnt").get(async (req, res, next) => {
    try {
        const rest = await RestroomSchema.findById('6244298398292db191e8c446');
        await rest.updateOne({ "restroom": req.params.cnt })
        await rest.save();
        res.send("Success");
    } catch (error) {
        res.status(500).send(error);
    }
})


router.route("/update/toilet/:cnt").get(async (req, res, next) => {
    try {
        const rest = await RestroomSchema.findById('6244298398292db191e8c446');
        await rest.updateOne({ "toilet": req.params.cnt })
        await rest.save();
        res.send("Success");
    } catch (error) {
        res.status(500).send(error);
    }
})



// router.route("/update").get(async (req, res, next) => {
//     try {
//         const rest = await RestroomSchema.findById('6244298398292db191e8c446');
//         await rest.updateOne({ "count": req.params.count, "restroom": req.params.restroom, "toilet": req.params.toilet })
//         await rest.save();
//         res.send("Success");
//     } catch (error) {
//         res.status(500).send(error);
//     }
// })


module.exports = router;