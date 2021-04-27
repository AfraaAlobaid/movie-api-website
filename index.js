document.addEventListener("DOMContentLoaded", () => {
    fetch("https://imdb8.p.rapidapi.com/auto-complete?q=game%20of%20thr", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "4b54f47853mshaa3746e9b0a1c36p16a3b7jsn2c5496e3a6de",
		"x-rapidapi-host": "imdb8.p.rapidapi.com"
	}
})
.then(response => response.json())
.then(json => {
    console.log(json);
    getMovies(json);
})
.catch(err => {
	console.error(err);
});
})

function getMovies(json){
    let movies = json.d;
    let output = "";
    movies.forEach(movie => {
        output += `
            <div class="col-md-3">
                <div class="card bg-secondary">
                    <div class="card-body text-center">
                        <img src="${movie.i.imageUrl}" alt="Movie Cover Image">
                        <h6 class="m-3">${movie.l}</h6>
                        <a onclick="selectMovie('${movie.id}')" class="btn btn-primary" href="#">Details</a>
                    </div>
                </div>
            </div>
        `
    });
    document.querySelector("#movies").innerHTML = output;
}