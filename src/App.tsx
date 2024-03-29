import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { MovieDb } from './moviedb';
import { useAppDispatch, useAppSelector } from './app/hooks'; 
import { addConfig, configSelector } from './features/defaultConfig';
import { MovieSlug } from './pages/movieSlug/MovieSlug';
import './App.scss'
import { Movies } from './pages/movies/Movies';

export const api = new MovieDb(process.env.REACT_APP_API_ACCESS_TOKEN || '');

export const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};

function App(): JSX.Element {
  const [ loading, setLoading ] = useState(true);
  const dispatch = useAppDispatch();
  const configState = useAppSelector(configSelector);

  useEffect(() => {
    api.configuration().then(config => {
      dispatch(addConfig({config}));
    });
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [configState])

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route element={<Movies />} path='movies/' />
        <Route element={<MovieSlug />} path='movies/:id' />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
