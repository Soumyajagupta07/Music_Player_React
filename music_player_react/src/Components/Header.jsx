import React, { useState, useEffect } from 'react';
import { FaSpotify, FaTimes, FaBars, FaMusic } from 'react-icons/fa';
import '../css/Header.css';
import { Link, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { SONG_API } from '../utils/constants';
import { withTheme } from '@mui/material';


const Header = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [state, setState] = useState({
        right: false,
    });
    const [songdata, setSongData] = useState([])

    const { id } = useParams();

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        const data = await fetch(SONG_API)
        const res = await data.json();
        setSongData(res?.data)
    }
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 ,}}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <h2 style={{color:'black', marginLeft:'13px'}}>All Songs</h2>
            <List>
                {songdata.map((text, index) => (
                    <ListItem key={index} disablePadding>
                        <Link to={'/song-list/song/' + text.id} style={{width:'100%'}} className='drawer_item'>
                            <ListItemButton>
                                <ListItemText primary={text.name} className='drawer_song_name' />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>

        </Box>
    );
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
        <>
            {
                (isMobile) ? (
                    <div className='mobile_header'>
                        <Link to={'/'} style={{ textDecoration: "none", color: "rgba(255,255,255,1)" }}><p><FaSpotify style={{ fontSize: "40px" }} /> Spotify</p></Link>
                        <div >
                            {['right'].map((anchor) => (
                                <React.Fragment key={anchor}  >
                                    <Button onClick={toggleDrawer(anchor, true)} title='Explore Songs'><FaMusic style={{fontSize:'30px', color:'white'}}/></Button>
                                    <Drawer
                                        anchor={anchor}
                                        open={state[anchor]}
                                        onClose={toggleDrawer(anchor, false)}
                                        
                                    >
                                        {list(anchor)}
                                    </Drawer>
                                </React.Fragment>
                            ))}
                        </div>

                    </div>
                ) : (

                    <div className='Header'>
                        <Link to={'/'} style={{ textDecoration: "none", color: "rgba(255,255,255,1)" }}><p><FaSpotify style={{ fontSize: "40px" }} /> Spotify</p></Link>

                    </div>
                )
            }

        </>
    );
}

export default Header;