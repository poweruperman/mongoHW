const { Scrap } = require('../models')
const axios = require('axios')
const cheerio = require('cheerio')

module.exports = app => {
    // Main page
    app.get('/', (req, res) => {
        // practice
        axios.get('https://www.nytimes.com/')
        .then(({ data}) => {
            const $ = cheerio.load(data)
            const tmp = []
            $('span.balanceHeadline').each((i, elem) => {
                tmp.push({
                    tmp : $(elem).text()
                })
                res.render('index', {
                    tmp : tmp
                })
            })
        })
        .catch(e => console.log(e))
        // res.render('index', {
        //     info : tmp
        // })
        
    })
    // Scrap
    app.get('/scrap', (req, res) => {
        axios.get('https://www.nytimes.com/')
            .then(({ data}) => {
                const $ = cheerio.load(data)
                const tmp = []
                $('span.balanceHeadline').each((i, elem) => {
                    tmp.push({
                        tmp : $(elem).text()
                    })
                    res.render('/scrap', {
                        info : tmp
                    })
                })
            })
            .catch(e => console.log(e))

    })
    // GET All posts
    app.get('/recallPosts', (req, res) => {
        Scrap.find({}, (e, scraps) => {
            if (e) throw e
            res.render('recallPosts', {
                posts : scraps
            })
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
            res.sendStatus(200)
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