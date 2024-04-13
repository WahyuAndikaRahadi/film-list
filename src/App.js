import { getMovieList, searchMovie } from './api';
import './App.css';
import { useEffect, useState } from "react"

const App = () => {
  const [popularMovies, setPopularMovies] = useState([])

  const ImgUrl = "https://image.tmdb.org/t/p/w500"

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result)
    })
  }, [])

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (

          <div className="Movie-wrapper" key={i}>
            <div className="Movie-title">{movie.title}</div>
            <img className="movie-image" src={`${ImgUrl}/${movie.poster_path}` } />
            <div className="Movie-date">Tanggal Rilis : {movie.release_date}</div>
            <div className="Movie-rate">Rating Film : {movie.vote_average}</div>
          </div>
      )
    })
  }


  const search = async(q) => {
    if(q.length > 3) {
   const query = await searchMovie(q)
   setPopularMovies(query.results)
    }
  }



  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie List By Wahyu</h1>
        <input placeholder="Cari Film Favorit mu :)....." className="Movie-search" onChange={({ target }) => search(target.value)} />
        <div className="Movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
}

export default App;
