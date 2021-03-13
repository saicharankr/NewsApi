const axios = require('axios');
const cheerio = require('cheerio');


const fullNews = async (url, source) => {
    try {
        const { data } = await axios.get(
            url
        );
        const $ = cheerio.load(data);
        if (source == "indianexpress") {

            var content = []

            $("#pcl-full-content > p").each((id, el) => {
                if ( el.firstChild !== null  && el.firstChild.data !== undefined) {
                    content.push(el.firstChild.data)
                }
            })

            var story = {
                "title": $("h1.native_story_title").text(),
                "synopsis": $("h2.synopsis").text(),
                "content": content

            }
            return story
        }

    } catch (err) {
        return err
    }
}

fullNews("https://indianexpress.com/article/india/ashwani-kumar-interview-on-farmers-protests-nda-govt-congress-7226331/", "indianexpress").then(data => console.log(data))
