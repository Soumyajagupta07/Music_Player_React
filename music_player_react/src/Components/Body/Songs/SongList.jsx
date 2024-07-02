import React, { useEffect, useState, useRef } from 'react';
import '../../../css/SongList.css';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { SONG_API } from '../../../utils/constants';
import '../../../css/BodyHead.css';
import SongCard from './SongCard';
import { Link } from 'react-router-dom';
import SongListShimmer from '../../Shimmer/SongListShimmer';

const SongList = () => {
    const [active1, setActive1] = useState(true);
    const [active2, setActive2] = useState(false);
    const [SongData, setSongData] = useState([]);
    const [FilterData, setFilterData] = useState([]);
    const [SongSearch, setSongSearch] = useState('');
    const [activeSong, setActiveSong] = useState(null);
    const [songDurations, setSongDurations] = useState({});
    const audioRef = useRef(null);
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

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        let data = await fetch(SONG_API);
        let result = await data.json();
        setSongData(result?.data);
        filterForYou(result?.data);
        fetchDurations(result?.data);
    }

    function filterForYou(songs) {
        let newData = songs.filter(song => song.top_track === false);
        setFilterData(newData);
    }

    function filterTopTracks(songs) {
        let newData = songs.filter(song => song.top_track === true);
        setFilterData(newData);
    }

    function handleLink1() {
        setActive1(true);
        setActive2(false);
        filterForYou(SongData);
    }

    function handleLink2() {
        setActive1(false);
        setActive2(true);
        filterTopTracks(SongData);
    }

    function handleInput(e) {
        setSongSearch(e.target.value);
    }

    function KeyHandle(e) {
        if (e.nativeEvent.key === 'Enter') {
            searchFn()
        }
    }

    function searchFn() {
        if (SongSearch === '') {
            alert("Enter a song");
        } else {
            let newData = SongData.filter((song) => (
                song.name.toLowerCase().includes(SongSearch.toLowerCase()) || song.artist.toLowerCase().includes(SongSearch.toLowerCase())
            ));
            setFilterData(newData);
            setSongSearch('');
        }
    }

    function handleActive(id) {
        setActiveSong(id);
    }

    function fetchDurations(songs) {
        songs.forEach(song => {
            const audio = new Audio(song.url);
            audio.addEventListener('loadedmetadata', () => {
                setSongDurations(prevDurations => ({
                    ...prevDurations,
                    [song.id]: audio.duration
                }));
            });
        });
    }

    return (
        <>
            {
                isMobile ? (
                    <div className="song_container">
                        {
                            (SongData.length === 0) ? (<><SongListShimmer /> <SongListShimmer /><SongListShimmer /></>) :
                                (
                                    SongData.map((song) => (
                                        <Link
                                            key={song.id}
                                            to={`/song/${song.id}`}
                                            style={{ textDecoration: "none" }}
                                        >
                                            <SongCard
                                                id={song.id}
                                                name={song.name}
                                                artist={song.artist}
                                                img_id={song.cover}
                                                isActive={activeSong === song.id}
                                                duration={songDurations[song.id] || 0}
                                                onCardClick={() => handleActive(song.id)}
                                            />
                                        </Link>
                                    )))
                        }
                    </div>
                ) : (
                    <>
                        <div className='BodyHead'>
                            <button onClick={handleLink1}>
                                <p className={active1 ? "active" : "not-active"}>For You</p>
                            </button>
                            <button onClick={handleLink2}>
                                <p className={active2 ? "active" : "not-active"}>Top Tracks</p>
                            </button>
                        </div>
                        <div className='SongList'>
                            <div className="wrapper">
                                <input type="text" placeholder='Search Song, Artist' onChange={handleInput} value={SongSearch} onKeyDown={KeyHandle} />
                                <button onClick={searchFn} className='search_button'><FaMagnifyingGlass className='icon' /></button>
                            </div>
                            <div className="song_container">
                                {
                                    (SongData.length === 0) ? (<><SongListShimmer /> <SongListShimmer /><SongListShimmer /></>) : (FilterData.length === 0) ? (<p className='no_songs'>There are no related songs. You can navigate through the tabs to explore our songs</p>) :
                                        (
                                            FilterData.map((song) => (
                                                <Link
                                                    key={song.id}
                                                    to={`/song/${song.id}`}
                                                    style={{ textDecoration: "none" }}
                                                >
                                                    <SongCard
                                                        id={song.id}
                                                        name={song.name}
                                                        artist={song.artist}
                                                        img_id={song.cover}
                                                        isActive={activeSong === song.id}
                                                        duration={songDurations[song.id] || 0}
                                                        onCardClick={() => handleActive(song.id)}
                                                    />
                                                </Link>
                                            )))
                                }
                            </div>
                        </div>

                    </>
                )
            }

        </>
    );
}

export default SongList;