import Razorpay from "razorpay"

const KEY_ID = process.env.RAZORPAY_KEY_ID
const KEY_SECRET = process.env.RAZORPAY_SECRET
// console.log(KEY_ID,KEY_SECRET,7753)
export const razorpay = new Razorpay({
    key_id : KEY_ID ,
    key_secret : KEY_SECRET,

})