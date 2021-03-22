import { useState, useEffect } from "react";
import axios from '../config/axios';

export default function useListGenres() {
  const [listGenre, setListGenre] = useState([]);

  useEffect(() => {
    axios({ requiresAuth: false }).get('/genres')
        .then(({data}) => {
            const genres = data.genres.map(genre => ({ value: genre.id, label: genre.name }));
            setListGenre(genres)
        });
  },[]);

  return listGenre;
}
