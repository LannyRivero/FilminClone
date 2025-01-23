import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Asegúrate de importar los estilos de Swiper
import {
  getRecentHits,
  getFamilyFriendly,
  getAnimated,
  getThrillers,
  getCultMovies,
  getRomantic,
  getDarkComedy,
  getMusical,
  getOscar,
  getTerror,
} from '../../../services/TmbServicesFiltersCarrusel'; // Asegúrate de que la ruta sea correcta
import { getImageUrl } from '../../../services/TmbServices'; // Importa la función para obtener la URL de la imagen

const Carousel = ({ title, fetchFunction }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchFunction();
        console.log(data.results);
        setMovies(data.results); // Asumiendo que la respuesta tiene una propiedad 'results'
        
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [fetchFunction]);

  if (!movies) return;

  

  return (
    <div>
      <h2>{title}</h2>
      <Swiper spaceBetween={10} slidesPerView={5}>
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
            <h3>{movie.title}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const Carrusel = () => {
  return (
    <div>
      <Carousel title="Recent Hits" fetchFunction={getRecentHits} />
      <Carousel title="Family Friendly" fetchFunction={getFamilyFriendly} />
      <Carousel title="Animated" fetchFunction={getAnimated} />
      <Carousel title="Thrillers" fetchFunction={getThrillers} />
      <Carousel title="Cult Movies" fetchFunction={getCultMovies} />
      <Carousel title="Romantic" fetchFunction={getRomantic} />
      <Carousel title="Dark Comedy" fetchFunction={getDarkComedy} />
      <Carousel title="Musical" fetchFunction={getMusical} />
      <Carousel title="Oscar" fetchFunction={getOscar} />
      <Carousel title="Terror" fetchFunction={getTerror} />
    </div>
  );
};
Carousel.propTypes = {
  title: PropTypes.string.isRequired,
  fetchFunction: PropTypes.func.isRequired,
};


export default Carrusel;