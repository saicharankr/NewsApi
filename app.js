const { getNdtvNews, indiaTodayNews, getTinNews } = require('./newsScraper')
const express = require("express");
const paginate = require('jw-paginate');
const cors = require('cors')




const app = express()
app.use(cors())

app.get("/",(req,res)=>{
    res.send("app started")
})

app.get("/ndtv", (req, res) => {
    getNdtvNews().then(function (list) {
        const page = parseInt(req.query.page) || 1;

        // get pager object for specified page
        const pageSize = 10;
        const pager = paginate(list.length, page, pageSize);

        // get page of items from items array
        const pageOfItems = list.slice(pager.startIndex, pager.endIndex + 1);

        // return pager object and current page of items
        return res.json({pager,pageOfItems});
    })
})


app.get("/in", (req, res) => {
    indiaTodayNews().then(function (list) {
        const page = parseInt(req.query.page) || 1;

        // get pager object for specified page
        const pageSize = 10;
        const pager = paginate(list.length, page, pageSize);

        // get page of items from items array
        const pageOfItems = list.slice(pager.startIndex, pager.endIndex + 1);

        // return pager object and current page of items
        return res.json({pager,pageOfItems});
    })
})

app.get("/tin", (req, res) => {
    getTinNews().then(function (list) {
        console.log(list)
        const page = parseInt(req.query.page) || 1;

        // get pager object for specified page
        const pageSize = 10;
        const pager = paginate(list.length, page, pageSize);

        // get page of items from items array
        const pageOfItems = list.slice(pager.startIndex, pager.endIndex + 1);

        // return pager object and current page of items
        return res.json({pager,pageOfItems});
    }).catch((err) => console.log(err))
})

app.listen(8080)
