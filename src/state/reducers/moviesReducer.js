const activeMoviesCategoryInitialState = "Fantasy"
const moviesInitialState = {
    movies: [
        {
            category: "Fantasy",
            moviesList: [
                {
                    Poster: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg",
                    Title: "The Lord of the Rings: The Fellowship of the Ring",
                    Type: "movie",
                    Year: "2001",
                    imdbID: "tt0120737"
                },
                {
                    Poster: "https://m.media-amazon.com/images/M/MV5BZGMxZTdjZmYtMmE2Ni00ZTdkLWI5NTgtNjlmMjBiNzU2MmI5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
                    Title: "The Lord of the Rings: The Two Towers",
                    Type: "movie",
                    Year: "2002",
                    imdbID: "tt0167261"
                },
                {
                    Poster: "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
                    Title: "The Lord of the Rings: The Return of the King",
                    Type: "movie",
                    Year: "2003",
                    imdbID: "tt0167260"
                },
            ]
        },
        {
            category: "action & adventure",
            moviesList: [
                {
                    Poster: "https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
                    Title: "Mad Max: Fury Road",
                    Type: "movie",
                    Year: "2015",
                    imdbID: "tt1392190"
                },
                {
                    Poster: "https://m.media-amazon.com/images/M/MV5BMTY4MTUxMjQ5OV5BMl5BanBnXkFtZTcwNTUyMzg5Ng@@._V1_SX300.jpg",
                    Title: "Mission: Impossible - Ghost Protocol",
                    Type: "movie",
                    Year: "2011",
                    imdbID: "tt1229238"
                },
                {
                    Poster: "https://m.media-amazon.com/images/M/MV5BMjMyNDkzMzI1OF5BMl5BanBnXkFtZTgwODcxODg5MjI@._V1_SX300.jpg",
                    Title: "Thor: Ragnarok",
                    Type: "movie",
                    Year: "2017",
                    imdbID: "tt3501632"
                }
            ]
        }
    ],
}


const findCategoryIdx = (movies, action) => {
    let movieCategoryIdx
    if (action.type === "SET_MOVIES") {
        movieCategoryIdx = movies.findIndex(movie => movie.category === action.payload.category)
    } else if (action.type === "DELETE_MOVIE") {
        movieCategoryIdx = movies.findIndex(movie => movie.moviesList.find(movie => movie.imdbID === action.payload))
    }
    return movieCategoryIdx
}

export const CategoryReducer = (state = moviesInitialState, action) => {
    const movieCategoryIdx = findCategoryIdx(state.movies, action)
    switch (action.type) {
        case "SET_MOVIES":
        case "DELETE_MOVIE": {
            if (movieCategoryIdx === -1) {
                const oldMovies = state.movies
                return {
                    ...state,
                    movies: oldMovies.concat({
                        category: action.payload.category,
                        moviesList: moviesReducer([], action)
                    })
                }

            } else {
                const oldMovieList = state.movies[movieCategoryIdx]
                const newMoviesList = [{
                    ...oldMovieList,
                    moviesList: moviesReducer(oldMovieList.moviesList, action)
                }]

                return {
                    ...state,
                    movies: [
                        ...state.movies.slice(0, movieCategoryIdx),
                        ...newMoviesList,
                        ...state.movies.slice(movieCategoryIdx + 1)
                    ]
                }
            }
        }
        default:
            return state
    }
}

const moviesReducer = (state = moviesInitialState.movies, action) => {
    switch (action.type) {
        case "SET_MOVIES":
            return [...state, ...action.payload.moviesList]
        case "DELETE_MOVIE":
            const newMoviesList = state.filter(movie => movie.imdbID !== action.payload)
            return newMoviesList
        default:
            return state
    }
};

export const activeMoviesCategoryReducer = (state = activeMoviesCategoryInitialState, action) => {
    if (action.type === "CHANGE_CATEGORY") {
        return action.payload
    } else {
        return state
    }
}

