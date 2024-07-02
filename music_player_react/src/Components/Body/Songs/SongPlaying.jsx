import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../../css/SongPlaying.css';
import Box from '@mui/material/Box';
import { SONG_API } from '../../../utils/constants';
import Slider from '@mui/material/Slider';
import { FaBackward, FaCirclePause, FaCirclePlay, FaEllipsis, FaForward, FaVolumeHigh, FaVolumeXmark } from 'react-icons/fa6';
import SongPlayingShimmer from '../../Shimmer/SongPlayingShimmer';
import SongList from './SongList';

const SongPlaying = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [isMuted, setIsMuted] = useState(false); 

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (id && songs.length > 0) {
            const song = songs.find(song => song.id === parseInt(id));
            setCurrentSong(song);
        }
    }, [id, songs]);

    async function fetchData() {
        let data = await fetch(SONG_API);
        let res = await data.json();
        setSongs(res?.data || []);
    }

    useEffect(() => {
        if (audioRef.current && currentSong) {
            audioRef.current.src = currentSong.url || '';
            if (isPlaying) {
                audioRef.current.play();
            }
        }
    }, [currentSong]);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
            audioRef.current.muted = isMuted; // Set muted state
        }
    }, [isPlaying, isMuted]);

    function playFn() {
        setIsPlaying(true);
    }

    function pauseFn() {
        setIsPlaying(false);
    }


    function nextSong() {
        setProgress(0);
        const currentIndex = songs.findIndex(song => song.id === currentSong.id);
        const nextIndex = (currentIndex + 1) % songs.length;
        navigate(`/song/${songs[nextIndex].id}`);
        setIsPlaying(false);
    }

    function prevSong() {
        setProgress(0);
        const currentIndex = songs.findIndex(song => song.id === currentSong.id);
        const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
        navigate(`/song/${songs[prevIndex].id}`);
        setIsPlaying(false);
    }

    if (!currentSong) {
        return <SongPlayingShimmer />;
    }


    const handleTimeUpdate = () => {
        const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(progress);
    };

    const handleSliderChange = (event, newValue) => {
        const newTime = (newValue / 100) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
        setProgress(newValue);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted); // Toggle muted state
    };

    const img_src = `https://cms.samespace.com/assets/${currentSong.cover}`;

    return (
        <div className='SongPlaying'>
            <div className="song_playing_info">
                <p className='Songname'>{currentSong.name}</p>
                <p className='Songartist'>{currentSong.artist}</p>
            </div>
            <img src={img_src} alt="img" className='Songimage' />
            <Box sx={{ width: 480, marginTop: '16px', padding: '0px' }} >
                <Slider
                    size="small"
                    defaultValue={0}
                    value={progress}
                    aria-label="small"
                    color='white'
                    onChange={handleSliderChange}
                    sx={{
                        '& .MuiSlider-thumb': {
                            visibility: 'hidden',
                            transition: 'visibility 0s, opacity 0.5s linear',
                        },
                        '&:hover .MuiSlider-thumb': {
                            visibility: 'visible',
                        },
                        height: '6px'
                    }}
                />
            </Box>
            <div className="song_controls">
                <button className='seeker'><FaEllipsis /></button>
                <div className="play_pause_next_prev_control">
                    <button className='backward' onClick={prevSong} ><FaBackward style={{ height: "16px", width: "24px" }} /></button>
                    {
                        isPlaying ? <button className='pause' onClick={pauseFn}><FaCirclePause style={{ height: "48px", width: "48px" }} /></button> : <button className='play' onClick={playFn} ><FaCirclePlay style={{ height: "48px", width: "48px" }} /></button>
                    }
                    <button className='forward' onClick={nextSong}><FaForward style={{ height: "16px", width: "24px" }} /></button>
                </div>
                {
                    isMuted ? (
                        <button className='volume' style={{ padding: [3, 1, 3, 1] }} onClick={toggleMute}><FaVolumeXmark style={{ height: "16px", width: "20px" }} /></button>
                    ) : (
                        <button className='volume' style={{ padding: [3, 1, 3, 1] }} onClick={toggleMute}><FaVolumeHigh style={{ height: "16px", width: "20px" }} /></button>
                    )
                }
            </div>
            <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} />
        </div>
    );
};

export default SongPlaying;