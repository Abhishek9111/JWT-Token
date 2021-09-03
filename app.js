const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()

app.get('/api',(req,res)=>{
    res.json({
        msg:'Welcome to API'
    })
})

app.post('/api/posts',verifyToken,(req,res)=>{

    jwt.verify(req.token,'football',(err,data)=>{
        if(err) res.sendStatus(403)
        else
        res.json({message:'Post created!!',data:data})  //as per ES7 we can use type just data instead of data:data
    })
})

app.post('/login',(req,res)=>{
    //MOCK USER
    const user1 = {
        id:1,
        username:'abhishek',
        password:'12345'
    }
    jwt.sign({user:user1},'football',{expiresIn:'300s'},(err,token)=>{              // here football is the secret key 
        res.json({token})
    })
})

function verifyToken(req,res,next){
    //get authorizer header value
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader != undefined){
        const bearer = bearerHeader.split(" ")
        const bearerToken = bearer[1]

        req.token = bearerToken
        next();
    }
}



const PORT = process.env.PORT || 3000;
app.listen(PORT,()=> console.log(`Server is running at ${PORT}`))