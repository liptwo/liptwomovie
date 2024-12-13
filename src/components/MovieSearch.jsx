import React, { useContext, useState } from 'react'
import { MovieContext } from '../context/MovieProvider';




const MovieSearch = ({title, data}) => {

const handleTrailer = useContext(MovieContext);

  return (
        <div className='text-white p-10 mb-5 capitalize'>
            <h2 className='uppercase text-xl font-bold mb-5'>{title}</h2>
            <div className='grid grid-cols-3 gap-4 md:grid-cols-5 lg:grid-cols-7'>
            {data && data.length> 0 && data.map((item) => (
                    <div key={item.id} className='w-[200px] h-[300px] relative group' onClick={() => handleTrailer(item.id)}>
                        <div className='group-hover:scale-105 transition-transform duration-500 ease-in-out
                        w-full h-full cursor-pointer'> 
                            <div className='absolute top-0 left-0 w-full h-full bg-black/40'/>
                            <img src={`url${import.meta.env.VITE_IMG_URL}${item.poster_path})`} alt={item.title} className='w-full h-full object-cover ' />
                        </div>
                        <div className=' flex absolute bottom-4 mx-2 text-center item-center'>     
                                <p className='uppercase text-sm'>{item.title || item.original_title}</p>
                        </div>
                    </div>
                ))}
            </div>
    </div>
  )
};

export default MovieSearch
    