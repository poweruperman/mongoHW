const { Scrap } = require('../models')

module.exports = app => {
    // GET All posts
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