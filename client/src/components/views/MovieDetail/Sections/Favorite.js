import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Button } from 'antd';

function Favorite(props) {

  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  let variables = {
    userFrom: userFrom,
    movieId: movieId,
    movieTitle: movieTitle,
    moviePost: moviePost,
    movieRunTime: movieRunTime
  }

  useEffect(() => {



    Axios.post('/api/favorite/favoriteNumber', variables)
      .then(response => {
        console.log(response.data);

        if (response.data.success) {
          setFavoriteNumber(response.data.FavoriteNumber);
        } else {
          alert('Failed to get Number information');
        }
      })

    Axios.post('/api/favorite/favorited', variables)
      .then(response => {
        console.log(response.data);
        if (response.data.success) {
          setFavorited(response.data.Favorited);
        } else {
          alert('Failed to update favorited info');
        }
      })

  }, [])

  const onClickFavorite = () => {
    if (Favorited) {
      Axios.post('/api/favorite/removeFromFavorite', variables)
        .then(response => {
          if (response.data.success) {
            setFavorited(!Favorited);
            setFavoriteNumber(FavoriteNumber - 1);
          } else {
            alert('failed to delete')
          }
        })
    } else {
      Axios.post('/api/favorite/addToFavorite', variables)
        .then(response => {
          if (response.data.success) {
            setFavoriteNumber(+ 1);
            setFavorited(!Favorited);
          } else {
            alert('failed to add to favorite list')
          }
        }
        )

    }
  }
  return (
    <div>
      <Button onClick={onClickFavorite}>{Favorited ? " Not Favorite" : "Add to Favorite"} {FavoriteNumber}</Button>
    </div>
  )
}

export default Favorite
