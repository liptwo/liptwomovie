import PropTypes from 'prop-types';
import rating from '../assets/rating.png'
import rating_half from '../assets/rating-half.png'
import iconPlay from   '../assets/play-button.png'
import React, { useContext, useEffect, useState } from 'react'
import { MovieContext } from '../context/MovieProvider';

const BannerEach = ({movie}) => {
    const handleTrailer = useContext(MovieContext);
    const [searchMovie, setSearchMovie] = useState([]);
    useEffect(()=>{
        const handleSearch = async(movie) => {
        try {
            const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` ,   
            }
            };
            const url = `https://api.themoviedb.org/3/search/movie?query=${movie.item[0]}&include_adult=false&language=en-US&page=1`;
            const Search = await fetch(url, options);
            const data = await Search.json();
            setSearchMovie(data.results[0]);
            console.log('>>', data.results[0]);
            console.log(url);
        }
        catch(error){
            console.log(error);
    
        }
        }
        handleSearch(movie);
    },[]);
  return (
    <div 
        key={searchMovie.id} 
        className="w-full h-[700px] flex-wrap relative overflow-hidden" 
        style={{ backgroundImage: `url(/${movie.item[1]}.png)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
        <div className="absolute w-full h-full top-0 left-0 bg-black opacity-40 flex-wrap"/>
        <div  className='w-full h-full flex items-center ml-[100px] justify-center space-x-[30px] p-4' >
                        <div  className='flex flex-col ml-5 space-y-5 items-baseline relative w-[50%]'>
                        <p className='text-white bg-gradient-to-r from-red-600 py-2 px-2  z-19 to-red-300 capitalize '>Anime movie</p>
                        <div className='flex flex-col space-y-4 '>
                            <h2 className='text-white font-bold text-[40px]'>{searchMovie.title || searchMovie.original_title }</h2>
                            <div className='flex items-center space-x-3'>
                                <img src={rating} alt="rating" className='w-8 h-8'/>
                                <img src={rating} alt="rating" className='w-8 h-8'/>
                                <img src={rating} alt="rating" className='w-8 h-8'/>
                                <img src={rating} alt="rating" className='w-8 h-8'/>
                                <img src={rating_half} alt="rating_half" className='w-8 h-8'/>
                            </div>
                            <p className='text-white'>{searchMovie.overview}
                            </p>
                            <div className='flex items-center space-x-4'>
                                <button className='p-3 font-bold text-sm bg-black text-white rounded'>Chi tiết</button>
                                <button className='p-3 font-bold text-sm bg-red-600 text-white rounded ' onClick={()=>handleTrailer(searchMovie.id)}>Xem phim</button>
                            </div>
                        </div>
                    </div>
                    <div className='w-[50%] flex items-center justify-center'>
                        <div className='w-[300px]  h-[400px] relative group' onClick={()=>handleTrailer(searchMovie.id)}>
                            <img src={`${import.meta.env.VITE_IMG_URL}${searchMovie.poster_path}`} alt="rtemp" className='w-full h-full object-cover shadow-black shadow-2xl' />
                            <div className='w-full h-full absolute top-0 left-0 items-center justify-center backdrop-blur-[2px] flex  opacity-0 group-hover:opacity-100
                            transition-opacity duration-500 ease-in-out cursor-pointer'>
                                <img src={iconPlay} alt="play" className='w-16 h-16 relative z-20 '  />
                            </div>
                        </div>
                        
                    </div>
                </div>
        </div>
  )
};
// BannerEach.propTypes = {
//     movie: PropTypes.string,

// }

export default BannerEach
