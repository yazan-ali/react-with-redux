import React from 'react';
import Movie from './movie';

function OneCategoryList({ movies }) {
    return (
        <div className="movies-list-container">
            {
                movies.moviesList.map(movie => (
                    <Movie movie={movie} />
                ))
            }
        </div>
    )
}

export default OneCategoryList;