import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import './Slider.css';


function Tags({ media }) {
  return (
    <div className="tags">
      {media.media_type === 'tv' && (
        <span className="tag">
          {media.seasons || 1} TEMPORADA{media.seasons > 1 ? 'S' : ''}
        </span>
      )}
      <span className="tag exclusive">ESTRENO EXCLUSIVO</span>
    </div>
  );
}


function Subtitle({ media }) {
  if (media.media_type === 'movie') {
    return <p className="slider-subtitle">{media.director || 'Director desconocido'}</p>;
  }
  return null; 
}

function SliderCard({ media, isActive, onPlayTrailer, onTrailerEnd }) {
  const [showTrailer, setShowTrailer] = useState(false); 
  const TRAILER_DURATION = 50; 

  useEffect(() => {
    if (isActive) {
      console.log('Slide activo:', media.title || media.name);

      const timer = setTimeout(() => {
        setShowTrailer(true); 
        onPlayTrailer(); 
      }, 5000); 

      return () => {
        clearTimeout(timer);
        console.log('Limpieza del temporizador para:', media.title || media.name);
      };
    } else {
      setShowTrailer(false); 
      console.log('Reiniciando a la imagen para:', media.title || media.name);
    }
  }, [isActive, media, onPlayTrailer]);

  return (
    
    <div
      className="slider-card"
      style={{
        backgroundImage: !showTrailer
          ? `url(https://image.tmdb.org/t/p/original${media.backdrop_path})`
          : 'none',
      }}
    >
     
      <div className="slider-overlay"></div>
      <div className="slider-content">       
        <Tags media={media} />
        <h3 className="slider-title">{media.title || media.name}</h3>
        <Subtitle media={media} />

        {showTrailer ? (
          <div className="trailer-container">
            <ReactPlayer
              className="react-player"
              url={`https://www.youtube.com/watch?v=${media.trailerKey}`}
              playing={isActive}
              controls={true} 
              width="100%"
              height="100%"
              config={{
                youtube: {
                  playerVars: {
                    autoplay: 1,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                  },
                },
              }}
              onProgress={({ playedSeconds }) => {
                if (playedSeconds >= TRAILER_DURATION) {
                  console.log(`Tráiler interrumpido después de ${TRAILER_DURATION} segundos`);
                  onTrailerEnd();
                }
              }}
              onEnded={onTrailerEnd} 
            />
          </div>
        ) : null}

        <button className="slider-button"> Ver Ahora </button>
        
      </div>
    </div>
  );
}

SliderCard.propTypes = {
  media: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    name: PropTypes.string,
    backdrop_path: PropTypes.string.isRequired,
    trailerKey: PropTypes.string,
    director: PropTypes.string,
    seasons: PropTypes.number,
    media_type: PropTypes.oneOf(['movie', 'tv']).isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onPlayTrailer: PropTypes.func.isRequired,
  onTrailerEnd: PropTypes.func.isRequired,
};

Tags.propTypes = {
  media: PropTypes.shape({
    media_type: PropTypes.oneOf(['movie', 'tv']).isRequired,
    seasons: PropTypes.number,
  }).isRequired,
};

Subtitle.propTypes = {
  media: PropTypes.shape({
    media_type: PropTypes.oneOf(['movie', 'tv']).isRequired,
    director: PropTypes.string,
    seasons: PropTypes.number,
  }).isRequired,
};

export default SliderCard;
