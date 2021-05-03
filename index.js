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

function getMovieDetails(movie){
    let cast = "";
    movie.cast.forEach((member) => {
        cast += `${member.actor}, `;
    })
    let output = `
        <div class="col-md-4">
            <img src="${movie.poster}">
        </div>
        <div class="col-md-8">
            <h2>${movie.title}</h2>
            <ul class="list-group bg-secondary">
                <li class="list-group-item"><strong>Year:</strong> ${movie.year}</li>
                <li class="list-group-item"><strong>Length</strong> ${movie.length}</li>
                <li class="list-group-item"><strong>Rating</strong> ${movie.rating}</li>
                <li class="list-group-item"><strong>Cast</strong> ${cast}</li>
            </ul>
            <p>
                <h4>Plot</h4>
                ${movie.plot}
            </p>
            <a href="#" onclick='window.open("https://www.imdb.com/title/${movie.id}/");return false;' class="btn btn-primary">View IMDB</a>
            <button onclick="goBackToSearch()" class="btn btn-primary">Go Back</button> 
        </div>
    `;
    console.log(document.querySelectorAll("#movies .col-md-3")[0].style.display);

    document.querySelectorAll("#movies .col-md-3").forEach((movieCard) => {
        movieCard.style.display = "none";
    })

    document.querySelector("#searchForm").style.display = "none";

    document.querySelector("#movies").innerHTML += output;
}

function goBackToSearch(){
    document.querySelector("#movies .col-md-4").remove();
    document.querySelector("#movies .col-md-8").remove();
    document.querySelectorAll("#movies .col-md-3").forEach((movieCard) => {
        movieCard.style.display = "";
    })
    document.querySelector("#searchForm").style.display = "";

}
