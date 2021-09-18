import React, { useState } from 'react';
import axios from 'axios';

function TextField({ categories, handelSubmit, handelCategoryChang }) {

    const [showAddCategory, setShowAddCategory] = useState(false)
    const [moviesList, setMoviesList] = useState([])
    const [moviesOptionList, setMoviesOptionList] = useState([])
    const [categoryName, setCategoryName] = useState("")
    const [search, setSearch] = useState("")
    const [showClearIcon, setShowClearIcon] = useState(false)

    const handelCategoryChange = (evt) => {
        let value = evt.target.value
        if (value === "new category") {
            setShowAddCategory(true)
            setCategoryName("")
        } else {
            setCategoryName(value)
            setShowAddCategory(false)
        }
    }

    const handelSearchChange = async (evt) => {
        const value = evt.target.value
        setSearch(value);
        if (value === "") {
            setMoviesOptionList([])
            setShowClearIcon(false)
        } else {
            setShowClearIcon(true)
            await axios.get(`https://www.omdbapi.com/?apikey=aec5a726&s=${value}`)
                .then(res => setMoviesOptionList(res.data.Search))
        }
    }

    const handelNewCategoryChange = (evt) => {
        setCategoryName(evt.target.value)
    }

    const onSubmit = () => {
        handelSubmit(moviesList, categoryName)
        setMoviesList([])
        setMoviesOptionList([])
        setSearch("")
    }

    const onMovieClick = (movie) => {
        setMoviesList([...moviesList, movie])
    }

    return (
        <div className="text-input-root">
            <h3>Search by movie name</h3>

            <div style={{ display: moviesList.length > 0 ? "block" : "none" }} className="selected-movie-list">
                {moviesList && moviesList.map((movie, idx) => (
                    <p>{`${idx + 1}. ${movie.Title}`}</p>
                ))}
            </div>

            <div className="search-bar">
                <input className="input"
                    type="text" value={search}
                    onChange={handelSearchChange}
                    placeholder="Enter movie name"
                />
                {moviesOptionList &&
                    <div style={{ display: moviesOptionList.length > 0 ? "block" : "none", backgroundColor: "#fff", color: "#125040" }}>
                        {
                            moviesOptionList.map(movie => (
                                <p onClick={() => onMovieClick(movie)}>{movie.Title}</p>
                            ))
                        }
                    </div>
                }
            </div>
            <div className="radio" style={{ display: "flex", gap: 10 }}>
                {categories.map(category => (
                    <div>
                        <input onChange={handelCategoryChange} id={category} type="radio" value={category} name="category" />
                        <label htmlFor={category}>{category}</label>
                    </div>
                ))}
            </div>
            {
                showAddCategory && <input
                    style={{ borderRadius: 5, marginTop: 10 }}
                    className="input"
                    type="text"
                    value={categoryName}
                    onChange={handelNewCategoryChange}
                    placeholder="category name"
                />
            }
            <button className="btn" onClick={onSubmit} type="button">Submit</button>
        </div >
    )
}

export default TextField;