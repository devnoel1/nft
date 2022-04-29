const mongoose = require('mongoose');

const CollectionItemSchema = new mongoose.Schema({
    tokenId:{
        type: String,
        required: false,
    },
    title:{
        type: String,
        required: [true, 'Please add a title'],
    },
    description: {
        type: String,
        required: false,
    },
    pics:{
        type: String,
        required: false,
    },
    price:{
        type: Number,
        required: false,
    },
    collectonId:{
        type: String,
        required: false,
    },
    isListed:{
        type: Boolean,
        default: false,
    },
    isSold:{
        type: Boolean,
        default: false,
    }
})


module.exports = mongoose.models.CollectionItem || mongoose.model('CollectionItem', CollectionItemSchema);
