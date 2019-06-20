document.addEventListener('click', e => {
    if (e.target.className === 'articleBtn') {
        let tmpIndex = e.target.dataset.index
        let tmp = {}
        // tmp.index = tmpIndex
        tmp.Headline = document.querySelector(`#Title${tmpIndex}Content`).textContent
        tmp.Summary = document.querySelector(`#Summary${tmpIndex}`).textContent
        tmp.URL = document.querySelector(`#Title${tmpIndex}Content`).dataset.url
        tmp.comments = ''
        fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(tmp)
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

