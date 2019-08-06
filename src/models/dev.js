const { model, Schema } = require('mongoose')

const patter = { type: String,  required: true }

const DevSchema = new Schema({
    name: patter,
    user: patter,
    avatar: patter,
    bio:String
}, { timestamps: true })

module.export = model('Dev', DevSchema)