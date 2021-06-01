import Axios from 'axios';
import React, { useEffect } from 'react';
import './favorite.css';

function FavoritePage() {

  useEffect(() => {
    Axios.post('/api/favorite/getFavoritedMovie', { userFrom: localStorage.getItem('userId') })
      .then(response => {
        if (response.data.success) {
          console.log(response.data)
        } else {
          alert('fail to get movie info');
        }
      })
  }, [])

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





        </tbody>
      </table>
    </div>
  )
}

export default FavoritePage
