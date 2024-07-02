import { useState, useEffect } from 'react'
import React from 'react'
import SongList from '../Body/Songs/SongList'
import SongPlaying from './Songs/SongPlaying'
import SongPlayingMobile from './SongPlayingMobile'


const Body = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className='Body'>
           {isMobile ? <SongPlayingMobile /> : <SongList />}
        </div>
    )
}

export default Body;