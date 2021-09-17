import React from 'react';
import { useDispatch } from "react-redux";
import { deleteMovie } from "./state/actions/movieActions";

function Movie({ movie }) {

    const dispatch = useDispatch();

    const handelDeleteMovie = () => {
        dispatch(deleteMovie(movie.imdbID));
    }

    return (
        <div className="movie-card" onClick={handelDeleteMovie}>
            <img src={movie.Poster} />
            <h3>{movie.Title}</h3>
        </div>
    )
}

export default Movie;