import React, { useEffect } from 'react';
import Axios from 'axios';

function Favorite(props) {

  useEffect(() => {

    let variables = {
      userFrom,
      movieId,

    }

    Axios.post('/api/favorite/favoriteNumber', variables)
      .then(response => {
        if (response.data.success) {

        } else {
          alert('Failed to get information');
        }
      })

  }, [])

  return (
    <div>
      <button>Favorite</button>
    </div>
  )
}

export default Favorite
