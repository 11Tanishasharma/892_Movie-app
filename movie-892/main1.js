// Poster
const poster = document.querySelector(".poster");
const postertitle = document.querySelector(".poster-div h1");
const posterdesc = document.querySelector(".poster-desc");
const posterTime = document.querySelector(".poster-time");
let posterDivTitle = [
  " ",
  "The Batman",
  "Peaky Blinders",
  "Thor: The Dark World",
  "Kung Fu Panda 2",
  "Dune",
];
let posterDivDesc = [
  "",
  "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
  "A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby.",
  "The powerful but arrogant god Thor is cast out of Asgard to live amongst humans in Midgard (Earth), where he soon becomes one of their finest defenders.",
  "Po and his friends fight to stop a peacock villain from conquering China with a deadly new weapon, but first the Dragon Warrior must come to terms with his past.",
  "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
];

let posterDivTime = [
  "",
  "2h 56m . 2022 . Action",
  "36h 00m . 2013-2022 . TV-Series ",
  "1h 55m . 2011 . Fantasy",
  "1h 30m . 2011 . Animation",
  "2h 35m . 2022 . Adventure",
];

var i = 1;
setInterval(() => {
  poster.src = `poster/poster${i++}.jpg`;
  postertitle.innerHTML = posterDivTitle[i - 1];
  posterdesc.innerHTML = posterDivDesc[i - 1];
  posterTime.innerHTML = posterDivTime[i - 1];

  if (i > 5) {
    i = 1;
  }
}, 1500);

// Scroll
const gallery = document.querySelectorAll(".gallery");
const left = document.querySelectorAll(".left");
const right = document.querySelectorAll(".right");


right[0].addEventListener("click", () => {
  gallery[0].style.scrollBehavior = "smooth";
  gallery[0].scrollLeft += 900;
});
right[1].addEventListener("click", () => {
  gallery[1].style.scrollBehavior = "smooth";
  gallery[1].scrollLeft += 900;
});
right[2].addEventListener("click", () => {
  gallery[2].style.scrollBehavior = "smooth";
  gallery[2].scrollLeft += 900;
});
left[0].addEventListener("click", () => { 
  gallery[0].style.scrollBehaviour = "smooth";
  gallery[0].scrollLeft -= 900;
});
left[1].addEventListener("click", () => {
  gallery[1].style.scrollBehaviour = "smooth";
  gallery[1].scrollLeft -= 900;
});
left[2].addEventListener("click", () => {
  gallery[2].style.scrollBehaviour = "smooth";
  gallery[2].scrollLeft -= 900;
});


// Search
const searchNav = document.querySelector(".search-nav");
const searchDiv = document.querySelector(".search");
const searchCross = document.querySelector(".search-cross");
searchNav.addEventListener("click", () => {
  searchDiv.classList.remove("d-none");
  searchDiv.classList.add("d-block");
});
searchCross.addEventListener("click", () => {
  searchDiv.classList.add("d-none");
});

// Search api
const searchButton = document.querySelector(".search-button");
const searchInput = document.querySelector(".search input");
const searchCard = document.querySelectorAll(".search-card");
const searchNotFound = document.querySelector(".notfound");

const searchMovie = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGZlZjJjNThjMzRiMDZlZDU2YTUzM2NlMDczMGQ4MyIsInN1YiI6IjY2MWNiNDU2NmY0M2VjMDE4NzVjZmUzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ysxlcC2k_tS7oKW2rvqLU-vxkMf00MGCkl8nfiINnDQ",
  },
};

searchButton.addEventListener("click", () => {
  let searchValue = searchInput.value;
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=en-US&page=1`,
    searchMovie
  )
    .then((response) => response.json())
    .then((response) => {
      let responseData = response;
      console.log(responseData);
      if (responseData.results.length == 0) {
        searchNotFound.classList.remove("d-none");
        searchCard.forEach((card) => {
          card.classList.add("d-none");
        });
      } else {
        searchCard.forEach((card, index) => {
          // Displaying card
          searchNotFound.classList.add("d-none");
          card.classList.remove("d-none");

          // Changing card images
          let cardTitle = card.querySelector("h5");
          cardTitle.innerHTML = responseData.results[index].title;

          // Changing card title
          let cardImage = card.querySelector("img");
          cardImage.src = image_link + responseData.results[index].poster_path;

          // Changing card details
          let cardDetails = card.querySelector("p span");
          cardDetails.innerHTML = `${
            Math.round(responseData.results[index].vote_average * 10) / 10
          } . ${responseData.results[index].release_date}`;
        });
      }
    })
    .catch((err) => console.error(err));
});

const image_link = "https://image.tmdb.org/t/p/w500/";

// search chal gya
// sb scroll kr diye

// Popular TV Shows
const getPopularShows = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGZlZjJjNThjMzRiMDZlZDU2YTUzM2NlMDczMGQ4MyIsInN1YiI6IjY2MWNiNDU2NmY0M2VjMDE4NzVjZmUzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ysxlcC2k_tS7oKW2rvqLU-vxkMf00MGCkl8nfiINnDQ",
  },
};

fetch(
  "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
  getPopularShows
)
  .then((response) => response.json())
  .then((response) => {
    const tvShows = response.results;
    const cards = document.querySelectorAll(".popular-tv-shows .card");
    cards.forEach((card, i) => {
      const titleElement = card.querySelector(".card-title");
      const imageElement = card.querySelector(".card-img");
      const textElement = card.querySelector(".card-text span");
      titleElement.textContent = tvShows[i].name;
      imageElement.src = image_link + tvShows[i].poster_path;

      textElement.textContent = `${
        Math.round(tvShows[i].vote_average * 10) / 10
      } | TV Show`;
    });
  })
  .catch((err) => console.error(err));

// upcoming
const getUpcoming = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGZlZjJjNThjMzRiMDZlZDU2YTUzM2NlMDczMGQ4MyIsInN1YiI6IjY2MWNiNDU2NmY0M2VjMDE4NzVjZmUzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ysxlcC2k_tS7oKW2rvqLU-vxkMf00MGCkl8nfiINnDQ",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
  getUpcoming
)
  .then((response) => response.json())
  .then((response) => {
    const upcoming = response.results;
    console.log(upcoming);
    const moviesCards = document.querySelectorAll(".upcoming .card");
    moviesCards.forEach((card, i) => {
      const titleElement = card.querySelector(".card-title");
      const imageElement = card.querySelector(".card-img");
      const textElement = card.querySelector(".card-text span");
      titleElement.textContent = upcoming[i].title;
      imageElement.src = image_link + upcoming[i].poster_path;
      textElement.textContent = `${
        Math.round(upcoming[i].vote_average * 10) / 10
      } | Movies`;
    });
  })
  .catch((err) => console.error(err));

// Trending

const getMovies = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGZlZjJjNThjMzRiMDZlZDU2YTUzM2NlMDczMGQ4MyIsInN1YiI6IjY2MWNiNDU2NmY0M2VjMDE4NzVjZmUzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ysxlcC2k_tS7oKW2rvqLU-vxkMf00MGCkl8nfiINnDQ",
  },
};

fetch(
  "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
  getMovies
)
  .then((response) => response.json())
  .then((response) => {
    const trending = response.results;
    // Trending
    const TrendingCards = document.querySelectorAll(".trending .card");
    TrendingCards.forEach((card, i) => {
      const titleElement = card.querySelector(".card-title");
      const imageElement = card.querySelector(".card-img");
      const textElement = card.querySelector(".card-text span");
      titleElement.textContent = trending[i + 10].title;
      imageElement.src = image_link + trending[i + 10].poster_path;
      textElement.textContent = `${
        Math.round(trending[i + 10].vote_average * 10) / 10
      } | Movies`;
    });

    // Upcoming
    const fastCards = document.querySelectorAll(".fast .card");
    console.log(fastCards);
    fastCards.forEach((card, i) => {
      const titleElement = card.querySelector(".card-title");
      const imageElement = card.querySelector(".card-img-top");
      const textElement = card.querySelector(".card-text span");
      titleElement.textContent = trending[i+3].title;
      imageElement.src = image_link + trending[i+3].poster_path;
      textElement.textContent = `${
        Math.round(trending[i+3].vote_average * 10) / 10
      } | Movies`;
    });
  })
  .catch((err) => console.error(err));

// Top rated

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGZlZjJjNThjMzRiMDZlZDU2YTUzM2NlMDczMGQ4MyIsInN1YiI6IjY2MWNiNDU2NmY0M2VjMDE4NzVjZmUzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ysxlcC2k_tS7oKW2rvqLU-vxkMf00MGCkl8nfiINnDQ",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    const topRated = response.results;

    const topRatedCards = document.querySelectorAll(".top-rated .card");
    console.log(topRatedCards);
    topRatedCards.forEach((card, i) => {
      const titleElement = card.querySelector(".card-title");
      const imageElement = card.querySelector(".card-img-top");
      const textElement = card.querySelector(".card-text span");
      titleElement.textContent = topRated[i+7].title;
      imageElement.src = image_link + topRated[i+7].poster_path;
      textElement.textContent = `${
        Math.round(topRated[i+7].vote_average * 10) / 10
      } | Movies`;
    });
  })
  .catch((err) => console.error(err));

// Navbar
const navSearch = document.querySelector(".nav-search");
const navbarToggler = document.querySelector(".navbar-toggler");
navbarToggler.addEventListener("click", () => {
  navSearch.classList.toggle("d-none");
});

