export const setMovies = (movies) => {
    return {
        type: "SET_MOVIES",
        payload: movies,
    };
}


export const deleteMovie = (movieId) => {
    return {
        type: "DELETE_MOVIE",
        payload: movieId
    }
}

export const changeMoviesCategory = (category) => {
    return {
        type: "CHANGE_CATEGORY",
        payload: category
    }
}