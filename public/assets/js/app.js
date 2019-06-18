const axios = require('axios')
const cheerio = require('cheerio')

axios.get('https://www.nytimes.com/')
    .then(({ data }) => {
        const $ = cheerio.load(data)
        $('span.balancedHeadline').each((i, elem) => {
            console.log($(elem))
        })
    }) 
    .catch(e => console.log(e))
