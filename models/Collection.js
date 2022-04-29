const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Please add a title'],
    },
    description: {
        type: String,
    },
    symbol:{
        type: String,
        required: false,
    },
    likes:{
        type: String,
        required: false,
    },
    dislikes:{
        type: String,
        required: false,
    },
    pics:{
        type: String,
        required: false,
    },
    userId:{
        type: String,
        required: false,
    }
})


module.exports = mongoose.models.Collection || mongoose.model('Collection', CollectionSchema);
