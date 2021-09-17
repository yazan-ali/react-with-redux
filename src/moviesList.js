import React from 'react';
import OneCategoryList from './oneCategoryList';

function MoviesList({ allMovies, activeMoviesCategory }) {
    const oneCategoryList = allMovies.filter(category => category.category === activeMoviesCategory)
    return (
        <div>
            <OneCategoryList movies={oneCategoryList[0]} />
        </div>
    )
}

export default MoviesList;