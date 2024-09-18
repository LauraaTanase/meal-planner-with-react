import React from 'react';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
  const headerStyle = {
    backgroundColor: '#004526', 
    color: '#fff', 
    textAlign: 'center',
    padding: '1rem',
  };

  const navbarStyle = {
    backgroundColor: '#001a00', 
  };

  const navLinkStyle = {
    color: '#fff', 
    textDecoration: 'none', 
  };

  return (
    <header>
      <div style={headerStyle}>
        <h1 className="display-4">Recipes and Meal Planning</h1>
        <p className="lead">Simplify your culinary life!</p>
      </div>

      <nav className="navbar navbar-expand-lg navbar-dark" style={navbarStyle}>
        <div className="container">
          <Link className="navbar-brand" to="/">Home</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/recipes" style={navLinkStyle}>Recipes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/meal-planning" style={navLinkStyle}>Meal Planning</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/About" style={navLinkStyle}>About</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;
