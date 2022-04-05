const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let RestroomSchema = new Schema(
    {
        count: {
            type: Number,
            require: true
        },
        restroom: {
            type: Number
        },
        toilet: {
            type: Number
        }
    }
)

module.exports = mongoose.model("restroom", RestroomSchema)