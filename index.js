const express= require('express');
const mongoose=require('mongoose');
const session =require('express-session');
const redis=require('redis');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, SESSION_SECRET, REDIS_PORT } = require('./config/config.js');

let RedisStore=require('connect-redis').default;
let redisClient=redis.createClient({
    socket: {
        host: REDIS_URL,
        port: REDIS_PORT,
    }
})
redisClient.connect().catch(console.error);
let redisStore = new RedisStore({
    client: redisClient,
});

const postRouter= require("./routes/postRoute.js")
const userRouter= require("./routes/userRoute.js")
const app = express();


const connectWithRetry= ()=>{  //so that if by chance mongocontainer is not running when node container start running . It keeps on retrying unitl the container starts. It's not best practice
    mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
    .then(()=> console.log("Successfully connected to MongoDB"))
    .catch((e)=>{console.log(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`,e)
        setTimeout(connectWithRetry,5000)  
    })
}
connectWithRetry();
app.use(express.json());
app.use(session({
    store: redisStore,
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false, 
        httpOnly: true,
        maxAge: 30000
    }
}))

app.get('/', (req, res)=>{
    res.send("<h1>Welcome!!!</h1>");
})

app.use("/api/v1/posts",postRouter)
app.use("/api/v1/users",userRouter)

const port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})