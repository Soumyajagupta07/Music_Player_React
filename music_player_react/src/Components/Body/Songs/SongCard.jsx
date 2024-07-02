import React from 'react'
import '../../../css/SongCard.css'
import SongDurationShimmer from '../../Shimmer/SongDurationShimmer';
const SongCard = (props) => {
    let img_src = `https://cms.samespace.com/assets/${props.img_id}`


    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
    return (
        <div onClick={() => props.onCardClick(props.id)} className={props.isActive ? 'SongCard active-card' : 'SongCard inactive-card'}>
            <div className="song_info">
                <img src={img_src} alt="img" className='song_img' />
                <div className="song_details">
                    <p className='name'>{props.name}</p>
                    <p className='artist'>{props.artist}</p>
                </div>
            </div>
            {
                (props.duration===0)?<SongDurationShimmer/>:<p className='duration'>{formatDuration(props.duration)}</p>
            }
            

        </div>
    )
}

export default SongCard;