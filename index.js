const express= require('express');
const mongoose=require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config/config.js');

const app = express();


const connectWithRetry= ()=>{  //so that if by chance mongocontainer is not running when node container start running . It keeps on retrying unitl the container starts. It's not best practice
    mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
    .then(()=> console.log("Successfully connected to MongoDB"))
    .catch((e)=>{console.log(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`,e)
        setTimeout(connectWithRetry,5000)  
    })
}
connectWithRetry();
app.get('/', (req, res)=>{
    res.send("<h1>Welcome!!!</h1>");
})

const port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})