const rp = require('request-promise');
const axios = require('axios');
const cheerio = require('cheerio');




exports.getNdtvNews = async () => {
    try {
        const { data } = await axios.get(
            `https://www.ndtv.com/latest?pfrom=home-ndtv_mainnavgation`
        );
        const $ = cheerio.load(data);
        var noPage = $('div.listng_pagntn.clear > a').length
        const newsList = [];
        for (var i = 1; i <= noPage; i++) {
            const { data } = await axios.get(
                `https://www.ndtv.com/latest/page-${i}`
            );
            const $ = cheerio.load(data);
            $('div.news_Itm > div.news_Itm-img').each((_idx, el) => {
                var newsItem = { "link": el.firstChild.attribs.href, 
                "imgLink": el.firstChild.firstChild.attribs.src, 
                "title": el.firstChild.firstChild.attribs.title, 
                "content": el.nextSibling.children[2].firstChild.data,
                "source":"ndtv" }
                newsList.push(newsItem)
            });
        }
        return newsList
    } catch (error) {
        return error;
    }
};

exports.indiaTodayNews = async () => {
    try {
        var noPage = 10;
        const newsList = [];
        for (var i = 0; i <= noPage; i++) {
            if( i >= 1){
                const { data } = await axios.get(
                    `https://www.indiatoday.in/india?page=${i}`
                );
                const $ = cheerio.load(data);
                $('div.view-content > div.catagory-listing').each((_idx, el) => {
                    if (el.firstChild.nextSibling.children[1] !== undefined && el.firstChild.nextSibling.children[1].firstChild !== null) {
                        var newsItem = {
                            "link": "https://www.indiatoday.in" + el.firstChild.nextSibling.children[0].firstChild.attribs.href,
                            "imgLink": el.firstChild.children[1].attribs.src,
                            "title": el.firstChild.nextSibling.children[0].attribs.title,
                            "content": el.firstChild.nextSibling.children[1].firstChild.data,
                            "source":"indiatoday"
                        }
                    } else {
                        var newsItem = {
                            "link": "https://www.indiatoday.in" + el.firstChild.nextSibling.children[0].firstChild.attribs.href,
                            "imgLink": el.firstChild.children[1].attribs.src,
                            "title": el.firstChild.nextSibling.children[0].attribs.title,
                            "content": "Nan",
                            "source":"indiatoday"
                        }
                    }
                    newsList.push(newsItem)
                });
            }else{
                const { data } = await axios.get(
                    `https://www.indiatoday.in/india`
                );
                const $ = cheerio.load(data);
                $('div.view-content > div.catagory-listing').each((_idx, el) => {
                    if (el.firstChild.nextSibling.children[1] !== undefined && el.firstChild.nextSibling.children[1].firstChild !== null) {
                        var newsItem = {
                            "link": "https://www.indiatoday.in" + el.firstChild.nextSibling.children[0].firstChild.attribs.href,
                            "imgLink": el.firstChild.children[1].attribs.src,
                            "title": el.firstChild.nextSibling.children[0].attribs.title,
                            "content": el.firstChild.nextSibling.children[1].firstChild.data,
                            "source":"indiatoday"
                        }
                    } else {
                        var newsItem = {
                            "link": "https://www.indiatoday.in" + el.firstChild.nextSibling.children[0].firstChild.attribs.href,
                            "imgLink": el.firstChild.children[1].attribs.src,
                            "title": el.firstChild.nextSibling.children[0].attribs.title,
                            "content": "Nan",
                            "source":"indiatoday"
                        }
                    }
                    newsList.push(newsItem)
                });
            }
            
        }
        return newsList
    } catch (error) {
        return error;
    }
};

exports.getTinNews = async () => {
    try {
        var noPage = 10;
        const newsList = [];
        for (var i = 1; i <= noPage; i++) {
            const { data } = await axios.get(
                `https://indianexpress.com/section/india/page/${i}/`
            );
            const $ = cheerio.load(data);
            $('div.nation > div.articles' ||'div.nation > div.articles.first').each((_idx, el) => {               
                var newsItem = { 
                    "link": el.firstChild.children[1].attribs.href, 
                    "imgLink": el.firstChild.children[1].firstChild.attribs.src, 
                    "title": el.firstChild.nextSibling.children[1].firstChild.data, 
                    "content": el.lastChild.firstChild.data,
                    "source":"indianexpress"
                }
                newsList.push(newsItem)
            });
        }
        return newsList
    } catch (error) {
        return error;
    }
};

