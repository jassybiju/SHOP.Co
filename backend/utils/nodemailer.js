import nodemailer from 'nodemailer'
console.log(2)
const transporter = nodemailer.createTransport({
  host : 'smtp.ethereal.email',
  port : 587,
  secure : false,
  auth : {
    user : process.env.ETHREAL_EMAIL,
    pass : process.env.ETHREAL_PASS
  }
})


export const sendOTPMail = async(email , otp) =>{
  console.log(process.env.ETHREAL_EMAIL)
  const info = await transporter.sendMail({
    from : `"Shop.CO" <wilburn.daniel@ethereal.email>`,
    to: email,
    subject : "Register OTP for Shop.co",
    text : `This is the otp for registering ${otp}`
  })

  console.log(`Message Sent : ${info.messageId}`)
}