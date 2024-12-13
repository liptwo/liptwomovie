import React, { useState } from 'react'
import PropTypes from 'prop-types';


const Header = ( {onSearch} ) => {
  const [textSearch, setTextSearch] = useState("");

  return (
    <div className="p-4 bg-black flex items-center justify-between top-0 left-0 right-0 ">
        <div className="flex item-center space-x-4">
            <h1 className="text-[30px] uppercase
            font-bold text-red-700">Liptwo</h1>
            <nav className="flex items-center space-x-4">
                <a href="#" className='text-white' >Home</a>
                <a href="#" className='text-white'>About</a>
                <a href="#" className='text-white'>Contact</a> 
            </nav>
        </div>
        <div className='flex items-center space-x-4'>
            <input type="text" placeholder="Search" className= "p-2 text-black rounded" onChange={(e) => setTextSearch(e.target.value)} value={textSearch} />
            <button className=" p-2 rounded-lg bg-red-700 text-white" onClick={() => onSearch(textSearch)}>Search</button>
        </div> 
    </div>
  )
}

Header.propTypes = {
    onSearch:PropTypes.func,

}

export default Header
