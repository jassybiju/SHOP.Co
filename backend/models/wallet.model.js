import mongoose from 'mongoose'

const walletSchema = new mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    balance : {
        type: Number,
        default : 0
    },
},{
    timestamps :true
})

export const Wallet = mongoose.model('Wallet',walletSchema)