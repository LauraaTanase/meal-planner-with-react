import { Link } from 'react-router-dom';

const HeaderComponent = () => {
  return (
    <header>
      <div className="bg-primary text-white text-center py-3">
        <h1 className="display-4">Recipes and Meal Planning</h1>
        <p className="lead">Simplify your culinary life!</p>
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
                <Link className="nav-link" to="/recipes">Recipes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/meal-planning">Meal Planning</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;
