import React, { useEffect } from 'react';
import SearchNavbar from '../components/SearchNavbar/SearchNavbar';
import CardsMoviesOfSearch from '../components/CardsMovies/CardsMoviesOfSearch';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovie } from '../redux/actions';
import { useParams } from 'react-router-dom';

const SearchFilmsPage = () => {
  const dispatch = useDispatch();
  const foundMovies = useSelector(state => state.movieStateReducer.foundMovies);
  const isWithPicture = useSelector(state => state.movieStateReducer.isWithPicture);
  const isLoading = useSelector(state => state.movieStateReducer.isLoading);
  const profileMovies = useSelector(state => state.movieStateReducer.profileMovies);
  const { movie, page } = useParams();

  useEffect(() => {
    if (movie) {
      dispatch(fetchMovie(movie, isWithPicture, page));
    }
  }, [movie, page, isWithPicture])

  if (!movie) {
    return (
      <>
        <SearchNavbar />
      </>
    )
  } else {
    return (
      <>
        <SearchNavbar />
        {foundMovies ?
          <CardsMoviesOfSearch
            movies={foundMovies}
            isLoading={isLoading}
            profileMovies={profileMovies}
          />
          : null
        }
      </>
    )
  }
}

export default SearchFilmsPage;