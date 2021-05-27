let page = 1
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page='
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const form = document.getElementById("form")
const search = document.getElementById("search")
const main = document.getElementById("main")
const left = document.getElementById("left")
const right = document.getElementById("right")
const leftIcon = document.getElementById("licon")
const rightIcon = document.getElementById("ricon")

getMovies(API_URL + "" + page + "")
async function getMovies(url) {
    const data = await fetch(url)
    const movies = await data.json()
    showMovies(movies.results)
}

function showMovies(movies) {
    main.innerHTML = ""

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
            <img src=${IMG_PATH + poster_path}
            alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${voteClass(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `
        main.appendChild(movieEl)
    })
}
function voteClass(vote) {
    if (vote >= 8) {
        return "green"
    } else if (vote >= 5) {
        return "orange"
    } else {
        return "red"
    }
}


form.addEventListener("submit", (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if (searchTerm && searchTerm != "") {
        getMovies(SEARCH_API + searchTerm)
        search.value = ""
    } else {
        window.location.reload()
    }
})

leftIcon.classList.add('disabled')

right.addEventListener("click", () => {
    page++
    leftIcon.classList.remove('disabled')
    getMovies(API_URL + "" + page + "")
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
})


left.addEventListener("click", () => {
    page--
    if (page < 1) {
        page = 1
    }
    getMovies(API_URL + "" + page + "")
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    if (page === 1) {
        leftIcon.classList.add("disabled")
    }
})
