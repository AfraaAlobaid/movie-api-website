document.addEventListener("DOMContentLoaded", () => {
  let searchInput;
  document.querySelector("#searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    searchInput = document.querySelector("#searchInput").value;
    fetch(`https://imdb.p.rapidapi.com/auto-complete?q=${searchInput}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "4b54f47853mshaa3746e9b0a1c36p16a3b7jsn2c5496e3a6de",
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        //console.log(json);
        getMovies(json);
      })
      .catch((err) => {
        console.error(err);
      });
  });
});

function getMovies(json) {
  let movies = json.d;
  let output = "";
  movies.forEach((movie) => {
    output += `
            <div class="col-md-3">
                <div class="card bg-secondary">
                    <div class="card-body text-center">
                        <img src="${movie.i.imageUrl}" alt="Movie Cover Image">
                        <p class="m-2">${movie.l}</p>
                        <button onclick="selectMovie('${movie.id}')" class="btn btn-primary">Details</button>
                    </div>
                </div>
            </div>
        `;
  });
  document.querySelector("#movies").innerHTML = output;
}

function selectMovie(id) {
  fetch(
    `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${id}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "4b54f47853mshaa3746e9b0a1c36p16a3b7jsn2c5496e3a6de",
        "x-rapidapi-host":
          "imdb-internet-movie-database-unofficial.p.rapidapi.com",
      },
    }
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      getMovieDetails(json);
    })
    .catch((err) => {
      console.error(err);
    });
}

function getMovieDetails(json){
    
}
