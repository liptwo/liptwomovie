import React, { useEffect, useState } from 'react'
import rating from '../assets/rating.png'
import rating_half from '../assets/rating-half.png'
import temp from '../assets/temp-1.png'
import iconPlay from   '../assets/play-button.png'

const Banner = () => {
        
    const [searchMovie, setSearchMovie] = useState([]);
    const nameSearch = 'The garden of Words'
    useEffect(()=>{
        const handleSearch = async(nameSearch) => {
            try {
                const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` ,   
                }
                };
                const url = `https://api.themoviedb.org/3/search/movie?query=${nameSearch}&include_adult=false&language=vi&page=1`;
                const movieSearch = await fetch(url, options);
                const data = await movieSearch.json();
                setSearchMovie(data.results[0]);
                console.log(data)
                
            }
            catch(error){
                console.log(error);
                }
            };
        handleSearch(nameSearch);
    }, []);
        

  return (
    <div className='w-full h-[700px] bg-center bg-no-repeat bg-cover bg-banner flex-wrap relative overflow-hidden
    '>
        <div className="absolute w-full h-full top-0 left-0 bg-black opacity-40 flex-wrap"/>
        <div className='w-full h-full flex items-center justify-center space-x-[30px] p-4'>
            <div className='flex flex-col ml-5 space-y-5 items-baseline relative w-[50%]'>
                <p className='text-white bg-gradient-to-r from-red-600 py-2 px-2  z-19 to-red-300 capitalize '>Anime movie</p>
                <div className='flex flex-col space-y-4 '>
                    <h2 className='text-white font-bold text-[40px]'>{searchMovie.title}</h2>
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
                        <button className='p-3 font-bold text-sm bg-red-600 text-white rounded '>Xem phim</button>
                    </div>
                </div>
            </div>
            <div className='w-[50%] flex items-center justify-center'>
                <div className='w-[300px]  h-[400px] relative group'>
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
}

export default Banner
