module.exports = (Schema, model) => {
    const Scrap = new Schema({
        Headline : String,
        Summary : String,
        URL : String, 
        Comments : String
    })

    return model('Scrap', Scrap)
}