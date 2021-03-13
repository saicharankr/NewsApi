const axios = require('axios');
const cheerio = require('cheerio');


const fullNews = async (url,source) => {
    try {
        const { data } = await axios.get(
            url
        );
        const $ = cheerio.load(data);
        if(source == "indianexpress"){
            console.log($("h1.native_story_title").text())
            console.log($("h2.synopsis").text())
            $("#pcl-full-content > p").each((id,el)=> {
                console.log(el)
            })
        }

    } catch (err) {
        return err
    }
}

fullNews("https://indianexpress.com/article/india/ashwani-kumar-interview-on-farmers-protests-nda-govt-congress-7226331/","indianexpress")