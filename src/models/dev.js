const { model, Schema } = require('mongoose')

const patter = { type: String,  required: true }

const DevSchema = new Schema({
    name: patter,
    user: patter,
    avatar: patter,
    bio:String,
    likes:[{ 
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }],
    deslikes:[{
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }]
}, { timestamps: true })

module.exports = model('Dev', DevSchema)