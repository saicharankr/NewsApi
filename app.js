const {getNdtvNews,indiaTodayNews}=require('./newsScraper')
const express = require("express")


const app=express()

app.get("/ndtv",(req,res)=>{
    getNdtvNews().then(list => res.send(list))    
})


app.get("/in",(req,res)=>{
    indiaTodayNews().then(list => res.send(list))    
})

app.listen(8080)
