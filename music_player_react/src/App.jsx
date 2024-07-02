import { useState,useEffect } from 'react'
import Header from './Components/Header'
import Body from './Components/Body/Body'

import { Outlet } from 'react-router-dom'
function App() {

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
    <div className='App' >
      {
        isMobile ? <><Header /><Outlet/></> : <><Header/><Body /><Outlet/></>
      }
    </div>
  )
}


export default App;