document.addEventListener('click', e => {
    if (e.target.className === 'articleBtn') {
        let tmpIndex = e.target.dataset.index
        let tmp = {}
        // tmp.index = tmpIndex
        tmp.Headline = document.querySelector(`#Title${tmpIndex}Content`).textContent
        tmp.Summary = document.querySelector(`#Summary${tmpIndex}`).textContent
        tmp.URL = document.querySelector(`#Title${tmpIndex}Content`).dataset.url
        tmp.Comments = ''
        fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tmp)
        })
            .then(_ => {
                document.querySelector(`#ArticleBtn${tmpIndex}`).innerHTML = `Saved`
                document.querySelector(`#ArticleBtn${tmpIndex}`).className = 'savedBtn'
            })
            .catch(e => console.log(e))
    } else if (e.target.className === 'deleteBtn') {
        let tmpID = e.target.dataset.id
        fetch(`/posts/${tmpID}`, {
            method: 'DELETE'
        })
            .then(_ => {
                location.reload()
            })
            .catch(e => console.log(e))
    }
})


document.querySelector('.commentBtn').addEventListener('click', e => {
    e.preventDefault()
    let tmpID = e.target.dataset.id
    fetch(`/posts/${tmpID}`)
        .then(r => r.json())
        .then(({ Comments }) => {
            let comment = {}
            comment.Comments = `${Comments}
${document.querySelector(`#comment${tmpID}`).value}
            `
            fetch(`/posts/${tmpID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(comment)
            })
                .then(_ => {
                    location.reload()
                })
                .catch(e => console.log(e))
        })
        .catch(e => console.log(e))

})
