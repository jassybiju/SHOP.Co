import redis from 'redis'

const client = redis.createClient({ socket:{host : '127.0.0.1', port : 6379} })

client.on('error',(error)=>console.log(error))

await client.connect()

export default client