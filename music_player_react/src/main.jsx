import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import SongPlaying from './Components/Body/Songs/SongPlaying.jsx'
import SongList from './Components/Body/Songs/SongList.jsx'
import SongPlayingMobile from './Components/Body/SongPlayingMobile.jsx'

let app_route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/song/:id",
        element: <SongPlaying />
      },
    ],
  },
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/song-list/song/:id",
        element: <SongPlayingMobile/>
      }
    ]
  }

])



const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<RouterProvider router={app_route} />);