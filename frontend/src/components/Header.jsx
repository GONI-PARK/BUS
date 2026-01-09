function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#">
          MySite
        </a>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              About
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
