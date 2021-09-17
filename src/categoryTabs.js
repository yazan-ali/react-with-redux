import React from 'react'

function CategoryTabs({ tabs, handelCategoryChange, activeMoviesCategory }) {
    return (
        <div className="tabs">
            {tabs.map(category => (
                <div
                    className={activeMoviesCategory === category ? "active" : ""}
                    onClick={() => handelCategoryChange(category)}
                >
                    {category}
                </div>
            ))}
        </div>
    )
}

export default CategoryTabs;