'use strict';
const apikey = "0729109aa76996a6ca10d91bad33547d"
const apiEndpoint = "https://api.themoviedb.org/3"
const imgPath = "https://image.tmdb.org/t/p/original";
const movieId = window.localStorage.getItem("movieId");

const apiPaths = {
    fetchAllCategories: `${apiEndpoint}/genre/tv/list?api_key=${apikey}`,
    fetchMoviesList: (id) => `${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`,
    fetchTrending: `${apiEndpoint}/trending/tv/week?api_key=${apikey}`,
    fetchMovieDetails: `${apiEndpoint}/tv/${movieId}?api_key=${apikey}`,
    
}
const getMovieDetails2 = function (movieId) {
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
        title,name,
        release_date,
        runtime,
        vote_average,first_air_date,
        genres,
        spoken_languages:[{english_name}],
        overview,
    } = movie;

    document.title = `${title||name} - Netflix`;
    const moreDetails = document.getElementById('more_details');
    const div = document.createElement('div');
    div.innerHTML = `      
    <div class="more_details"
    id="more_details">
    <div class="moreDetails">More Details</div>
    <div class="moreDetailsCont">
        <div class="moreDetailsCont1">
            <div class="mdCont">
                <div class="mdCont1">Title</div>
                <div class="mdCont2">${title||name}</div>
            </div>
            <div class="mdCont">
                <div class="mdCont1">Watch Offline</div>
                <div class="mdCont2">Available to download</div>
            </div>
            <div class="mdCont">
                <div class="mdCont1">Subtitles</div>
                <div class="mdCont2">English, Hindi</div>
            </div>
            <div class="mdCont">
                <div class="mdCont1"> First Release Date</div>
                <div class="mdCont2">${first_air_date}</div>
            </div>
            <div class="mdCont">
                <div class="mdCont1">Rating</div>
                <div class="mdCont2"> ${vote_average.toFixed(1)}</div>
            </div>
            <div class="mdCont">
                <div class="mdCont1">Audio</div>
                <div class="mdCont2">${english_name}</div>
            </div>
        </div>
        
    </div>

</div>
     `;
                        div.className = "more_details_cont";

    moreDetails.append(div);

});

fetchDataFromServer(`https://api.themoviedb.org/3/tv/${movieId}?api_key=${apikey}`, function (movie) {
    
    const {
        backdrop_path,
        poster_path,
        title,
        genres:[{id,name}],
        release_date,
        runtime,
        vote_average,
        genres,
        overview,
        
    } = movie;
   
    const bannerCont = document.getElementById('banner-section');

    bannerCont.style.backgroundImage = `url('${imgPath}${movie.backdrop_path }')`;

    const div = document.createElement('div');
    div.innerHTML = `
            <h2 class="banner__title">${movie.title||movie.name}</h2>
            
            <div class="movie__detail" >
            <p class="release_date">${movie.first_air_date.split("-")[0]} | &nbsp</p>
            <p class="release_date">${movie.number_of_seasons}&nbsp Seasons &nbsp|&nbsp &nbsp </p>
            <p class="release_date">${name} </p>
            </div>

            <p class="banner__overview banner__overview1">${movie.overview && movie.overview.length > 200 ? movie.overview.slice(0, 200).trim() + '...' : movie.overview}</p>
           
        `;
    div.className = "banner-content container";

    bannerCont.prepend(div);
}),

function buildBannerSection(movie) {
    
}
function detail() {
    window.location = "detail.html";
}
fetchDataFromServer(`https://api.themoviedb.org/3/tv/${movieId}/recommendations?api_key=${apikey}`,
 function (movie) {
  
    moreLikeThis(movie)
    moreLikeThis2(movie)
    moreLikeThis3(movie)
    moreLikeThis4(movie)
    moreLikeThis5(movie)
    moreLikeThis6(movie)
    moreLikeThis7(movie)
    moreLikeThis8(movie)
    moreLikeThis9(movie)
    
});

function moreLikeThis(movie) {
    const {
        results: [{ backdrop_path,
            title,
            poster_path,
            id,
            release_date,name,
            runtime,
            vote_average,
            genres,
            overview }]
            
        } = movie;
        const mltMoviesCont = document.getElementById('mltMoviesCont');
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="mltMovie" >
             <img src="${imgPath}${backdrop_path}" alt="${title}">
             <p class="movies-section-title">${title||name}</p>
        </div>
                 `
                 div.className = "mltDivCont";
    if(backdrop_path!=null || title!=null){
        mltMoviesCont.append(div);

    }
}
function moreLikeThis2(movie) {
    const {
        results: [{},{},{ backdrop_path,
            title,
            poster_path,
            release_date,name,
            id,
            runtime,
            vote_average,
            genres,
            overview }]

    } = movie;
    const mltMoviesCont = document.getElementById('mltMoviesCont');
    const div = document.createElement('div');
    div.innerHTML = `
       
    <div class="mltMovie">
         <img src="${imgPath}${backdrop_path}" alt="${title}">
         <p class="movies-section-title">${title||name}</p>
    </div>

`
    div.className = "mltDivCont";

    if(backdrop_path!=null || title!=null){
        mltMoviesCont.append(div);

    }
}
function moreLikeThis3(movie) {
    const {
        results: [{},{ backdrop_path,
            title,
            poster_path,
            id,
            release_date,name,
            runtime,
            vote_average,
            genres,
            overview }]

    } = movie;
    const mltMoviesCont = document.getElementById('mltMoviesCont');
    const div = document.createElement('div');
    div.innerHTML = `
       
    <div class="mltMovie">
         <img src="${imgPath}${backdrop_path}" alt="${title}">
         <p class="movies-section-title">${title||name}</p>
    </div>

`
    div.className = "mltDivCont";

    if(backdrop_path!=null || title!=null){
        mltMoviesCont.append(div);

    }
}
function moreLikeThis4(movie) {
    const {
        results: [{},{},{},{ backdrop_path,
            title,
            poster_path,
            release_date,name,
            runtime,
            id,
            vote_average,
            genres,
            overview }]

    } = movie;
    const mltMoviesCont = document.getElementById('mltMoviesCont');
    const div = document.createElement('div');
    div.innerHTML = `
       
            <div class="mltMovie">
                <img src="${imgPath}${backdrop_path}" alt="${title}">
                <p class="movies-section-title">${title||name}</p>
            </div>

`
    div.className = "mltDivCont";
    if(backdrop_path!=null || title!=null){
        mltMoviesCont.append(div);

    }
}
function moreLikeThis5(movie) {
    const {
        results: [{},{},{},{},{ backdrop_path,
            title,
            poster_path,
            release_date,name,
            id,
            runtime,
            vote_average,
            genres,
            overview }]

    } = movie;
    const mltMoviesCont = document.getElementById('mltMoviesCont');
    const div = document.createElement('div');
    div.innerHTML = `
       
            <div class="mltMovie">
                <img src="${imgPath}${backdrop_path}" alt="${title}">
                <p class="movies-section-title">${title||name}</p>
            </div>

`
    div.className = "mltDivCont";

    if(backdrop_path!=null || title!=null){

        mltMoviesCont.append(div);
    }
}
function moreLikeThis6(movie) {
    const {
        results: [{},{},{},{},{},{ backdrop_path,
            title,
            poster_path,
            release_date,name,
            runtime,
            id,
            vote_average,
            genres,
            overview }]

    } = movie;
    const mltMoviesCont = document.getElementById('mltMoviesCont');
    const div = document.createElement('div');
    div.innerHTML = `
       
            <div class="mltMovie">
                <img src="${imgPath}${backdrop_path}" alt="${title}">
                <p class="movies-section-title">${title||name}</p>
            </div>

`
    div.className = "mltDivCont";

    if(backdrop_path!=null || title!=null){

        mltMoviesCont.append(div);
    }
}
function moreLikeThis7(movie) {
    const {
        results: [{},{},{},{},{},{},{ backdrop_path,
            title,
            poster_path,
            release_date,name,
            runtime,
            id,
            vote_average,
            genres,
            overview }]

    } = movie;
    const mltMoviesCont = document.getElementById('mltMoviesCont');
    const div = document.createElement('div');
    div.innerHTML = `
       
            <div class="mltMovie">
                <img src="${imgPath}${backdrop_path}" alt="${title}">
                <p class="movies-section-title">${title||name}</p>
            </div>

`
    div.className = "mltDivCont";

    if(backdrop_path!=null || title!=null){

        mltMoviesCont.append(div);
    }
}
function moreLikeThis8(movie) {
    const {
        results: [{},{},{},{},{},{},{},{ backdrop_path,
            title,
            poster_path,
            release_date,name,
            runtime,
            id,
            vote_average,
            genres,
            overview }]

    } = movie;
    const mltMoviesCont = document.getElementById('mltMoviesCont');
    const div = document.createElement('div');
    div.innerHTML = `
       
            <div class="mltMovie">
                <img src="${imgPath}${backdrop_path}" alt="${title}">
                <p class="movies-section-title">${title||name}</p>
            </div>

`
    div.className = "mltDivCont";

    if(backdrop_path!=null || title!=null){

        mltMoviesCont.append(div);
    }
}
function moreLikeThis9(movie) {
    const {
        results: [{},{},{},{},{},{},{},{},{ backdrop_path,
            title,
            poster_path,
            release_date,name,
            runtime,
            id,
            vote_average,
            genres,
            overview }]

    } = movie;
    const mltMoviesCont = document.getElementById('mltMoviesCont');
    const div = document.createElement('div');
    div.innerHTML = `
       
            <div class="mltMovie">
                <img src="${imgPath}${backdrop_path}" alt="${title}">
                <p class="movies-section-title">${title||name}</p>
            </div>

`
    div.className = "mltDivCont";

    if(backdrop_path!=null || title!=null){

        mltMoviesCont.append(div);
    }
}
window.addEventListener('load', function () {
   
    window.addEventListener('scroll', function () {
        // header ui update
        const header = document.getElementById('header');
        if (window.scrollY > 5) header.classList.add('black-bg')
        else header.classList.remove('black-bg');
    })
})