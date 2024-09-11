// components/Header.js
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
  return (
    <header>
      <div className="bg-primary text-white text-center py-3">
        <h1 className="display-4">Rețete și Planificare Mese</h1>
        <p className="lead">Simplifică viața ta culinară!</p>
      </div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Home</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/recipes">Rețete</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-recipe">Adaugă Rețetă</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/meal-planning">Planificare Mese</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">Despre</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;
