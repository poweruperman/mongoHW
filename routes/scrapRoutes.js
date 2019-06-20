const { Scrap } = require('../models')
const axios = require('axios')
const cheerio = require('cheerio')

module.exports = app => {
    // Main page
    app.get('/', (req, res) => {
        res.render('index')
    })
    app.get('/scrap', (req, res) => {
        const tmp = []
        axios.get('https://reactjsnews.com/')
            .then(({ data }) => {
                const $ = cheerio.load(data)
                $('div.post').each((i, elem) => {
                    tmp.push({
                        index : i,
                        title: $(elem).children('a').children('h3').text(),
                        summary: $(elem).children('p').text(),
                        url: `https://reactjsnews.com${$(elem).children('a').attr('href')}`
                    })
                })
                res.render('scrap', {
                    tmp
                })
            })
            .catch(e => console.log(e))
    })
    // GET All posts
    app.get('/saved', (req, res) => {
        Scrap.find({}, (e, scraps) => {
            if (e) throw e
            res.render('saved', {
                posts: scraps
            })
        })
    })
    // GET all post
    app.get('/posts', (req, res) => {
        Scrap.find({}, (e, scraps) => {
            if (e) throw e
            res.json(scraps)
        })
    })
    // GET One post
    app.get('/posts/:id', (req, res) => {
        Scrap.findById(req.params.id, (e, scrap) => {
            if (e) throw e
            res.json(scrap)
        })
    })
    // CREATE / POST a post
    app.post('/posts', (req, res) => {
        Scrap.create(req.body, e => {
            if (e) throw e
            res.render('index')
        })
    })
    // UPDATE / PUT a post
    app.put('/posts/:id', (req, res) => {
        Scrap.findByIdAndUpdate(req.params.id, req.body, e => {
            if (e) throw e
            res.sendStatus(200)
        })
    })
    // DELETE a post
    app.delete('/posts/:id', (req, res) => {
        Scrap.findByIdAndDelete(req.params.id, e => {
            if (e) throw e
            res.sendStatus(200)
        })
    })
}