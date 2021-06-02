import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import './favorite.css';
import { Popover } from 'antd';
import { IMAGE_BASE_URL } from '../../Config';

function FavoritePage() {

  const [Favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavoritedMovie();
  }, [])

  const fetchFavoritedMovie = () => {
    Axios.post('/api/favorite/getFavoritedMovie', { userFrom: localStorage.getItem('userId') })
      .then(response => {
        if (response.data.success) {
          setFavorites(response.data.favorites);
          console.log(response.data)
        } else {
          alert('fail to get movie info');
        }
      })
  }

  const onClickDelete = (movieId, userFrom) => {

    const variables = {
      movieId,
      userFrom
    }
    console.log('delete clicked');
    Axios.post('/api/favorite/removeFromFavoritedmovie', variables)
      .then(response => {
        if (response.data.success) {
          fetchFavoritedMovie();
        } else {
          alert('Failed to remove favorite.')
        }
      })
  }

  const renderCards = Favorites.map((favorite, index) => {

    const content = (
      <div>
        {favorite.moviePost ?
          <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} /> : "no image"
        }
      </div>
    )


    return <tr key={index}>
      <Popover content={content} vertitle={`${favorite.movieTitle}`}>
        <td>{favorite.movieTitle}</td>
      </Popover>
      <td>{favorite.movieRunTime} mins</td>
      <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button></td>
    </tr>
  })

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h2> Favorite Movies </h2>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie RunTime</th>
            <td>Remove from favorites</td>
          </tr>
        </thead>
        <tbody>
          {renderCards}
        </tbody>
      </table>
    </div>
  )
}

export default FavoritePage
