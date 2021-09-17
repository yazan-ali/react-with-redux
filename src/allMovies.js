import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setMovies, changeMoviesCategory } from "./state/actions/movieActions";

import CategoryTabs from './categoryTabs';
import MovisList from './moviesList';
import TextField from './textField';

function AllMovies() {

    const movies = useSelector((state) => state);
    const tabs = movies.allMovies.movies.map(moviesList => moviesList.category)
    const dispatch = useDispatch();

    const handelCategoryChange = (category) => {
        dispatch(changeMoviesCategory(category))
    }

    const handelSubmit = (moviesList, category) => {
        dispatch(setMovies({
            category,
            moviesList
        }));
    }

    console.log(movies.allMovies.movies)

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <TextField
                categories={tabs.concat("new category")}
                handelSubmit={handelSubmit}
                handelCategoryChange={handelCategoryChange}
            />
            <div className="movies-list-root">
                <CategoryTabs
                    tabs={tabs}
                    handelCategoryChange={handelCategoryChange}
                    activeMoviesCategory={movies.activeMoviesCategory}
                />
                <MovisList
                    allMovies={movies.allMovies.movies}
                    activeMoviesCategory={movies.activeMoviesCategory}
                />
            </div>
        </div>
    )
}

export default AllMovies;