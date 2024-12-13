
import { useState, useEffect } from 'react'

import Header from './components/Header'
import Banner from './components/Banner'
import MovieList from './components/movieList'
import MovieSearch from './components/MovieSearch';
import { MovieContext, MovieProvider } from './context/MovieProvider';



export default function App() {
  const [movie, setMovie] = useState([]);
  const [movieRated, setMovieRated ] = useState([]);

      
  const [searchMovie, setSearchMovie] = useState([]);

  const handleSearch = async(nameSearch) => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` ,   
        }
      };
      const url = `https://api.themoviedb.org/3/search/movie?query=${nameSearch}&include_adult=false&language=en-US&page=1`;
      const movieSearch = await fetch(url, options);
      const data = await movieSearch.json();
      setSearchMovie(data.results);
      console.log(data)
        
    }
    catch(error){
      console.log(error);

    }
  }



  useEffect(()=>{
    const fetchMovie = async() => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` ,   
        }
      };
      const url1 = 'https://api.themoviedb.org/3/movie/popular?language=vi-US&page=1';
      const url2 = 'https://api.themoviedb.org/3/movie/top_rated?language=vi-US&page=1';

      const [res1, res2] = await Promise.all([
        fetch(url1,options),
        fetch(url2, options),
      ])
      const data1 = await res1.json();
      const data2 = await res2.json();
      console.log(data1, data2);
      setMovie(data1.results);
      setMovieRated(data2.results);
    };
    fetchMovie();
  }, []);

  return (
    <>
    <MovieProvider>
      <div className='bg-black w-full h-full pb-10'>
        <Header onSearch={handleSearch}/>
        <Banner />
        {searchMovie.length > 0 ?
        (
            <MovieSearch title={'Kết quả tìm kiếm'} data={searchMovie}/>
        )
        :(
        <>

          <MovieList title={'Phim Hot'} data={movie}/>
          <MovieList title={'Phim Đề Cử'} data={movieRated}/>
        </>
        )};
        
      </div>
    </MovieProvider>
    </>
    
  )
}