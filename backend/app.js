import express, { urlencoded } from "express";
import './utils/env.js'
import { connectDB } from "./config/db.js";
import authRouter from './routes/auth.routes.js'

const PORT = process.env.PORT || 8000;
const app = express();



// client.on('error',(error)=>console.log(1 , error))

//  await client.connect()

app.use(express.json())
app.use(urlencoded({extended : true}))

app.use('/api/auth', authRouter)


app.use((error , req, res, next)=>{
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  console.log(statusCode)
  res.status(statusCode)
  res.json({
    message : error.message, 
    status : "error"
  })
})

app.listen(PORT, () => {
  connectDB()
  console.log(`listening to port ${PORT}`);
});


