
import { getFilterCarrusel } from './TmbServices'; 



// Defino los filtros preconfigurados para cada carrusel
const filters = {
  recentHits: { 
    primary_release_date_gte: `${new Date().getFullYear() - 5}-01-01`, 
    sort_by: 'vote_average.desc', 
    vote_count_gte: 50 
  },

  familyFriendly: { 
    certification_country: 'US', 
    certification: 'G', 
    with_genres: '16,10751' 
  },

  animated: { 
    with_genres: '16' 
  },

  thrillers: { 
    with_genres: '53', 
    sort_by: 'vote_average.desc', 
    vote_count_gte: 100 
  },
  cultMovies: { 
    with_keywords: 'cult-classic' 
  },

  romantic: { 
    with_genres: '10749' 
  },
  
  darkComedy: { 
    with_keywords: 'satire,dark-comedy'
  },    

  musical: { 
    with_genres: '10402'
  },     
  oscar: { 
    primary_release_year: 2023, 
    sort_by: 'vote_average.desc',
    with_original_language: 'es,fr,de,it,ko'
  },

  terror: { 
    with_genres: '27', 
    sort_by: 'vote_average.desc'
  },
};


// Funciones para obtener los datos de cada carrusel
function getRecentHits(params = {}) {
    return getFilterCarrusel({ ...filters.recentHits, ...params });
  }
  
  function getFamilyFriendly(params = {}) {
    return getFilterCarrusel({ ...filters.familyFriendly, ...params });
  }
  
  function getAnimated(params = {}) {
    return getFilterCarrusel({ ...filters.animated, ...params });
  }
  
  function getThrillers(params = {}) {
    return getFilterCarrusel({ ...filters.thrillers, ...params });
  }
  
  function getCultMovies(params = {}) {
    return getFilterCarrusel({ ...filters.cultMovies, ...params });
  }
  
  function getRomantic(params = {}) {
    return getFilterCarrusel({ ...filters.romantic, ...params });
  }
  
  function getDarkComedy(params = {}) {
    return getFilterCarrusel({ ...filters.darkComedy, ...params });
  }
  
  function getMusical(params = {}) {
    return getFilterCarrusel({ ...filters.musical, ...params });
  }
  
  function getOscar(params = {}) {
    return getFilterCarrusel({ ...filters.oscar, ...params });
  }
  
  function getTerror(params = {}) {
    return getFilterCarrusel({ ...filters.terror, ...params });
  }
  
  
  export {
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
  };

