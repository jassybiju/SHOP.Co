import nodemailer from 'nodemailer'
console.log(2)
const transporter = nodemailer.createTransport({
  host : 'smtp.gmail.com',
  port : 587,
  secure : false,
  auth : {
    user : process.env.EMAIL,
    pass : process.env.PASS
  }
})


export const sendOTPMail = async(email , otp) =>{
  console.log(process.env.ETHREAL_EMAIL)
  const info = await transporter.sendMail({
    from : `"Shop.CO" <${process.env.EMAIL}>`,
    to: email,
    subject : "Register OTP for Shop.co",
    text : `This is the otp for registering ${otp}`
  })

  console.log(`Message Sent : ${info.messageId}`)
}