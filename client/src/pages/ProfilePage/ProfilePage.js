import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/auth.hook';

import CardsMovies from '../../components/CardsMovies/CardsMovies';

import './ProfilePage.scss';
import { Button, Navbar, Nav } from 'react-bootstrap';

export const ProfilePage = () => {
  const { logout, userData } = useAuth();
  const [movie, getMovies] = useState([]);
  const profileMovies = useSelector(state => state.movieSearchReducer.profileMovies);

  const logoutHandler = (e) => {
    e.preventDefault();
    logout();
  }

  useEffect(() => {
    const film = (
      <CardsMovies movies={profileMovies} />
    );
    getMovies(film);
  }, [profileMovies])

  return (
    <>
      <Navbar bg="dark" variant="dark">
        {userData ?
          <Navbar.Brand href="#home">{userData.userName}</Navbar.Brand>
          : null
        }
        <Nav className="mr-auto">
          <Link className="search-link" to="/search">Search</Link>
        </Nav>
        <Button href="/" onClick={logoutHandler}>
          Log out
        </Button>
      </Navbar>
      {movie}
    </>
  )
};