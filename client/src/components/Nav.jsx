import { useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth";
import { useSelector, useDispatch } from "react-redux";
import { clearUserInfo, setUserInfo } from "../app/userSlice";

const NavComponent = () => {
  const currentUser = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (AuthService.getCurrentUserInfo()) {
      dispatch(setUserInfo(AuthService.getCurrentUserInfo()));
    }
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    window.alert("logout successfully.");
    dispatch(clearUserInfo());
  };

  return (
    <div>
      <nav>
        <nav
          className="navbar navbar-expand-lg"
          style={{ background: "#e3f2fd" }}
        >
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Learning system
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    Home
                  </Link>
                </li>

                {!currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                )}
                {!currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                )}
                {currentUser && (
                  <li className="nav-item">
                    <Link onClick={handleLogout} className="nav-link" to="/">
                      Logout
                    </Link>
                  </li>
                )}
                {currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      Profile
                    </Link>
                  </li>
                )}
                {currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/course">
                      Courses
                    </Link>
                  </li>
                )}
                {currentUser && currentUser.user.role == "instructor" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/postCourse">
                      Create Courses
                    </Link>
                  </li>
                )}
                {currentUser && currentUser.user.role == "student" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/enroll">
                      Enroll Courses
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </nav>
    </div>
  );
};

export default NavComponent;
