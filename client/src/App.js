import React from 'react';
import { BrowserRouter as Router, } from 'react-router-dom';
import { useRoutes } from './routes';
import { useSelector } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);
  const routes = useRoutes(isAuthenticated);

  return (
    <Router>
      <div className="App">
        {routes}
      </div>
    </Router>
  );
}

export default App;
