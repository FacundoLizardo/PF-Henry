/* eslint-disable react/no-unknown-property */
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { userData } from "../../utils/user";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import Styles from "../NavBar/NavBar.module.css";
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import nonuser from "../../assets/navBarImages/nonuser.png";
import Cart from "../Cart/Cart";

const Navbar = () => {
  const user2 = useContext(userContext);
  const { user } = user2;

  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleNavigateToInstructor = (userId) => {
    navigate(`/instructor/${userId}`, {
      state: { userData: userData },
    });
  };

  const handleNavigateToStudet = (userId) => {
    navigate(`/student/${userId}`, {
      state: { userData: userData },
    });
  };

  const handleNavigateToConfig = (userId) => {
    navigate(`/config/${userId}`, {
      state: { userData: userData },
    });
  };

  const signOutFn = () => {
    const auth = getAuth();
    signOut(auth);
    window.location.reload();
  };

  const signInFn = () => {
    window.location = "http://localhost:5173/login";
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && open) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setOpen(!open);
    }
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={Styles.navbarContainer}>
      <nav>
        <div className={Styles.navbarLogo}>
          <img src={logo} alt="EducaStream" />
        </div>
        <div className={Styles.navbarAssets}>
          <div className={`${Styles.navbarLinks} ${open ? Styles.active : ""}`}>
            <div>
              <ul>
                <li>
                  <NavLink to={"/"}>Inicio</NavLink>
                </li>
                <li>
                  <NavLink to={"/courses"}>Cursos</NavLink>
                </li>
                <li>
                  <button className={Styles.cart}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="128"
                      height="128"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill="currentColor"
                        d="M14 13.1V12H4.6l.6-1.1l9.2-.9L16 4H3.7L3 1H0v1h2.2l2.1 8.4L3 13v1.5c0 .8.7 1.5 1.5 1.5S6 15.3 6 14.5S5.3 13 4.5 13H12v1.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0-.7-.4-1.2-1-1.4zM4 5h10.7l-1.1 4l-8.4.9L4 5z"
                      />
                    </svg>
                    <Cart />
                  </button>
                </li>
                <li>
                  {user2.email === "" ? (
                    <img
                      src={nonuser}
                      className={Styles.imgProfile}
                      onClick={handleModal}
                    />
                  ) : (
                    <img
                      src={user?.photoURL}
                      className={Styles.imgProfile}
                      onClick={handleModal}
                    />
                  )}

                  {showModal && (
                    <div className={Styles.modal}>
                      <div
                        className={Styles.modalContent}
                        onClick={handleModal}
                      >
                        <button
                          onClick={() => {
                            handleNavigateToStudet(userData.id);
                          }}
                        >
                          Mi aprendizaje
                        </button>
                        <button
                          onClick={() => {
                            handleNavigateToInstructor(userData.id);
                          }}
                        >
                          Instructor
                        </button>
                        <button
                          onClick={() => {
                            handleNavigateToConfig(userData.id);
                          }}
                        >
                          Configuración
                        </button>
                        {user?.email ? (
                          <button onClick={signOutFn}>Log Out</button>
                        ) : (
                          <button onClick={signInFn}>Ingresar</button>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className={Styles.navbarToggle} onClick={handleClick}>
            {open ? (
              <svg
                className={Styles.menuClose}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M18 6l-12 12"></path>
                <path d="M6 6l12 12"></path>
              </svg>
            ) : (
              <svg
                className={Styles.menuOpen}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M4 6h16"></path>
                <path d="M7 12h13"></path>
                <path d="M10 18h10"></path>
              </svg>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
