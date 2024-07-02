import { useState, useEffect } from 'react'
import Header from './Components/Header'
import Body from './Components/Body/Body'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import SongPlayingMobile from './Components/Body/SongPlayingMobile';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [songPlayingRendered, setSongPlayingRendered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile && !songPlayingRendered) {
      setSongPlayingRendered(true);
      navigate('/song-list/song/1');
    }
  }, [isMobile, songPlayingRendered, navigate]);

  return (
    <div className='App'>
      {isMobile ? (
        songPlayingRendered ? (
          <>
            <Header />
            <SongPlayingMobile />
          </>
        ) : (
          <>
            <Header />
            <Outlet />
          </>
        )
      ) : (
        <>
          <Header />
          <Body />
          <Outlet />
        </>
      )}
    </div>
  );
}

export default App;