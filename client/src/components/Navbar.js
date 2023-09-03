import React, { useState, useEffect } from 'react';
import { Link as ScrollLink, scroller } from 'react-scroll';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import "../components/LandingPage/static/css/nav.css"

function Navbar() {
  const navigate = useNavigate()
  let location = useLocation();

  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const checkCurrentUser = async () => {
      if (!localStorage.getItem('currentUser')) {
        // Handle redirect or show login link if needed
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('currentUser')));
      }
    };
    checkCurrentUser();
  }, []);

  const Logout = () => {
    localStorage.removeItem('currentUser');
    // Clear the "currentUser" cookie

    // Redirect to the login page after logout
    window.location.href = '/';
  };
  const scrollTarget = (target) => scroller.scrollTo(target, {smooth: true, duration: 700});

  const scrollToPage = async (target) => {
      if (location.pathname !=='/') {
        console.log("The location path is", location.pathname)
          await navigate("/")
      }
      console.log("false")
      scrollTarget(target);
  };

  return (
    <div style={{marginBottom:"6%"}}>
      <nav className="navbar navbar-expand-lg fixed-top ">
        <RouterLink className="navbar-brand ml-5" to="/">
          HOTEL BOOKING
        </RouterLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i className="fas fa-bars" style={{ color: 'white' }}></i>
          </span>
        </button>

        <div className="navbar-collapse" id="navbarSupportedContent">
          {currentUser ? (
            <ul className="navbar-nav mr-5">
              <li className="nav-item" >
                <ScrollLink className="nav-link" onClick={() => scrollToPage('hero')}>
                  Home
                </ScrollLink>
              </li>
              <li className="nav-item">
                <ScrollLink className="nav-link" onClick={() => scrollToPage('about')}>
                  About Us
                </ScrollLink>
              </li>
              <li className="nav-item">
                <ScrollLink className="nav-link" onClick={() => scrollToPage('hotels')}>
                  Hotels
                </ScrollLink>
              </li>
              <li className="nav-item">
                <ScrollLink className="nav-link" onClick={() => scrollToPage('blogs')}>
                  What Blogs
                </ScrollLink>
              </li>
              <li className="nav-item">
              <RouterLink className="nav-link" to="/flight">
                      Flight
                    </RouterLink>
              </li>
              <li className="nav-item">
                <ScrollLink className="nav-link" onClick={() => scrollToPage('contact')}>
                  Contact
                </ScrollLink>
              </li>
              <div className="dropdown ml-5">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-user mr-3"></i>
                  {currentUser.firstName} {currentUser.lastName}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  {currentUser.isAdmin ? (
                    <RouterLink className="dropdown-item" to="/admin">
                      Admin Profile
                    </RouterLink>
                  ) : (
                    <RouterLink className="dropdown-item" to="/profile">
                      Profile
                    </RouterLink>
                  )}

                  <button className="dropdown-item" onClick={Logout}>
                    Logout
                  </button>
                </div>
              </div>
            </ul>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <ScrollLink className="nav-link" to="hero" smooth={true} duration={100}>
                  Home
                </ScrollLink>
              </li>
              <li className="nav-item">
                <ScrollLink className="nav-link" to="about" smooth={true} duration={100}>
                  About Us
                </ScrollLink>
              </li>
              <li className="nav-item">
                <ScrollLink className="nav-link" to="hotels" smooth={true} duration={100}>
                  Hotels
                </ScrollLink>
              </li>
              <li className="nav-item">
                <ScrollLink className="nav-link" to="blogs" smooth={true} duration={100}>
                  What Blogs
                </ScrollLink>
              </li>
              <li className="nav-item">
                <ScrollLink className="nav-link" to="contact" smooth={true} duration={100}>
                  Contact
                </ScrollLink>
              </li>
              <li className="nav-item active ml-5">
                <RouterLink className="nav-link" to="/signup">
                  Register
                </RouterLink>
              </li>
              <li className="nav-item">
                <RouterLink className="nav-link" to="/login">
                  Login
                </RouterLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
