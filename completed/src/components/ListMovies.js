import React, { useState, useEffect } from 'react';
import Movie from "./Movie";
import { Search } from 'semantic-ui-react';
import styles from './ListMovies.module.css'; // styles for ListMovie component

function ListMovies(props) {
    // initialize state and function to set state using the useState Hook
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [search, setSearch] = useState("");

    // calling useEffect on Mount of Component
    useEffect(() => {
        // url for Studio Ghibli API
        fetch('https://ghibliapi.herokuapp.com/films')
            .then(res => res.json())
            // updates state using setMovies
            .then(res => {
                setMovies(res)
                setFilteredMovies(res)
            });
    }, []);

    useEffect(() => {
        let filteredMovies = [];
        if (search.length !== 0) {
            filteredMovies = [...movies.filter(movie => movie.title.toLowerCase().includes(search))]
            setFilteredMovies(filteredMovies)
        } else setFilteredMovies(movies);
        console.log(search, filteredMovies)
        // eslint-disable-next-line
    }, [search])

    const handleSearch = (e) => {
        setSearch(e.target.value.toString().toLowerCase())
    }

    return (
        <div className={styles.main}>
            <h1 className={styles.title}>Studio Ghibli With React Hooks!</h1>
            <Search
                className={styles.search}
                onSearchChange={handleSearch}
            />
            <div className={styles.movies}>
                {/* Map elements of movies onto Cards */}
                {filteredMovies.map((movie, idx) =>
                    <div className={styles.movie}>
                        <Movie
                            // Add Props to Movie Card
                            classname="movie"
                            title={movie.title}
                            description={movie.description}
                            director={movie.director}
                            rating={movie.rt_score}
                            key={`${movie.title}-${idx}`}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListMovies;