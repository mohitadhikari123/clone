'use strict';
const apikey = "0729109aa76996a6ca10d91bad33547d"
const apiEndpoint = "https://api.themoviedb.org/3"
const imgPath = "https://image.tmdb.org/t/p/original";
const apiPathstv = {
    fetchAllCategories: `${apiEndpoint}/genre/tv/list?api_key=${apikey}`,
    fetchMoviesList: (id) => `${apiEndpoint}/discover/tv?api_key=${apikey}&with_genres=${id}`,
    fetchTrending: `${apiEndpoint}/trending/tv/week?api_key=${apikey}`,

}

// Boots Up the App
function init() {
    fetchTrendingMovies();
    fetchAndBuildAllSections();
}
const movieId = window.localStorage.getItem("movieId");

const getMovieDetailstv = function (movieId) {
    window.localStorage.setItem("movieId", String(movieId));
}
const fetchDataFromServer = function (url, callback, optionalParam) {
    fetch(url)
        
        .then(response => response.json())
        .then(data => callback(data, optionalParam));
}
fetchDataFromServer(`https://api.themoviedb.org/3/tv/${movieId}?api_key=${apikey}`, function (movie) {

    const {
        backdrop_path,
        poster_path,
        title,
        release_date,
        runtime,
        vote_average,
        genres,
        overview,

    } = movie;
   
});

function fetchTrendingMovies() {
    fetchAndbuildMoviesSection(apiPathstv.fetchTrending, 'Trending Now')
        .then(list => {
          
            const randomIndex = parseInt(Math.random() * list.length);
            buildBannerSectiontv(list[randomIndex]);
        }).catch(err => {
            console.error(err);
        });
}

function buildBannerSectiontv(movie) {
    const bannerCont = document.getElementById('banner-section-tv');

    bannerCont.style.backgroundImage = `url('${imgPath}${movie.backdrop_path}')`;
    
    const div = document.createElement('div');

    div.innerHTML = `
            <h2 class="banner__title">${movie.title||movie.name}</h2>
            <p class="banner__info">Trending in TV Shows </p>
            <p class="banner__overview">${movie.overview && movie.overview.length > 200 ? movie.overview.slice(0, 200).trim() + '...' : movie.overview}</p>
            <div class="action-buttons-cont">
            <a  href="./detailtv.html" title = "${movie.title}" onclick="getMovieDetailstv(${movie.id})" class="action-button"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon1
                Hawkins-Icon-Standard"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg> &nbsp;&nbsp; Play</a>
                <a  href="./detailtv.html" title = "${movie.title}" onclick="getMovieDetailstv(${movie.id})" class="action-button">
            
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon2 Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"></path></svg> &nbsp;&nbsp; More Info</a> 
            </div>
        `;

    div.className = "banner-content container";

    bannerCont.append(div);
}
function detail() {
    window.location = "detail.html";
}

function fetchAndBuildAllSections() {
    fetch(apiPathstv.fetchAllCategories)
        .then(res => res.json())
        .then(res => {
        
            const categories = res.genres;
            if (Array.isArray(categories) && categories.length) {
                categories.forEach(category => {
                    fetchAndbuildMoviesSection(
                        apiPathstv.fetchMoviesList(category.id),
                        category.name
                    );
                });
            }
           
        })
        .catch(err => console.error(err));
}

function fetchAndbuildMoviesSection(fetchUrl, categoryName) {

    return fetch(fetchUrl)
        .then(res => res.json())
        .then(res => {
            const movies = res.results;
            if (Array.isArray(movies) && movies.length) {
                buildMoviesSection(movies, categoryName);
            }
            return movies;
        })
        .catch(err => console.error(err))
}
function buildMoviesSection(list, categoryName) {
    const moviesCont = document.getElementById('movies-cont');
    const moviesListHTML = list.map(item => {
       if(item.backdrop_path!=null ||item.title!=null){
  
        return `<div>
        <a href="./detailtv.html" title = "${item.title||item.name}" onclick="getMovieDetailstv(${item.id})">
        <img class="movies-item" src = "${imgPath}${item.backdrop_path}" alt="${item.title||item.name}">
        
        <p class="movies-section-title">${item.title||item.name}</p>
        </a> 
        </div>
        `;}
       
    } ).join('');
    const moviesSectionHTML = ` 
    <h2 class="movies-section-heading">${categoryName} <span class="explore-nudge">Explore All</span></h2>
     <div class="movies-row">
        ${moviesListHTML}
        
     </div>`
    
    const div = document.createElement('div');
    div.className = "movies-section";
    div.innerHTML = moviesSectionHTML;

    moviesCont.append(div);

}

window.addEventListener('load', function () {
    init();

    window.addEventListener('scroll', function () {
        // header ui update
        const header = document.getElementById('header');
        if (window.scrollY > 5) header.classList.add('black-bg')
        else header.classList.remove('black-bg');
    })
})
