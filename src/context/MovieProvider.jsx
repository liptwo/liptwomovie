import React, { createContext, useState } from 'react'
import Modal from 'react-modal';
import YouTube from 'react-youtube';

const MovieContext = createContext();

const customStyles = {
    content: {
      backgroundColor:"black",
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      position: 'fixed',
      zIndex: 1020,
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0, 0, 0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
};

const opts = {
    height: '650',
    width: '1200',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: '1',
    },
};

const MovieProvider = ({ children }) => {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [trailerKey, setTrailerKey] = useState("");

    const handleTrailer = async(id) => {
        try{
            const urlGetVideo = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`; 
            const options = {
                method: 'GET',
                headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}` ,   
                }
            };
            const respone = await fetch(urlGetVideo,options);
            const data = await respone.json();
            console.log(data);
            setTrailerKey(data.results[0].key);
            setIsOpen(true);
        }
        catch (error){
            setIsOpen(false);
            console.log(error);
        }

    };

    return (
        <MovieContext.Provider value={handleTrailer}>
            {children}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={()=> setIsOpen(false)}
                style={customStyles}
                contentLabel="Youtube Modal"
            >
                <YouTube videoId={trailerKey} opts={opts}  />
                {/* onReady={this._onReady} */}
            </Modal>
        </MovieContext.Provider>
    )
}

export {MovieProvider, MovieContext}
