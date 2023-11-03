import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import Styles from "../NavBar/NavBar.module.css";
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import nonuser from "../../assets/navBarImages/nonuser.png";
import Cart from "../Cart/Cart";
import { clear } from "../../utils/clear";

const Navbar = () => {
	const [userOnSession, setuserOnSession] = useState({});
	const userData = useContext(userContext);

	useEffect(() => {
		setuserOnSession(JSON.parse(localStorage.getItem("userOnSession")));
	}, []);

	const [open, setOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const navigate = useNavigate();

	const handleNavigateToInstructor = (userId) => {
		navigate(`/instructor/${userId}`);
	};

	const handleNavigateToStudent = (userId) => {
		navigate(`/student/${userId}`);
	};

	const handleNavigateToConfig = (userId) => {
		navigate(`/config/${userId}`);
	};

	const signOutFn = () => {
		const auth = getAuth();
		if (userOnSession) {
			signOut(auth);
			clear();
			setuserOnSession({});
		} else {
			alert("No hay ningún usuario en sesión, por favor recargue la página");
		}
	};

	const signInFn = () => {
		window.location = "http://localhost:5173/login";
	};

	const handleMouseEnter = () => {
		setIsModalOpen(true);
	};

	const handleMouseLeave = () => {
		setIsModalOpen(false);
	};

	const handleClick = () => {
		if (window.innerWidth < 768) {
			setOpen(!open);
		}
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
									{!userData ? (
										<NavLink to={"/login"}>Mi aprendizaje</NavLink>
									) : (
										<NavLink to={`/student/${userData?.id}`}>
											Mi aprendizaje
										</NavLink>
									)}
								</li>
								<li>
									{!userData ? (
										<NavLink to={"/login"}>Enseñar</NavLink>
									) : (
										<NavLink to={`/instructor/${userData?.id}`}>
											Enseñar
										</NavLink>
									)}
								</li>
								<li>
									<Cart />
								</li>
								<li
									onMouseEnter={handleMouseEnter}
									onMouseLeave={handleMouseLeave}>
									<div className={Styles.imgProfile}>
										<img src={!userData ? nonuser : userData?.photoURL} />
									</div>
									{isModalOpen &&
										(!userData ? (
											<div className={Styles.modal}>
												<div className={Styles.modalContent}>
													<button onClick={signInFn}>Ingresar</button>
												</div>
											</div>
										) : (
											<div className={Styles.modal}>
												<div className={Styles.modalContent}>
													<button
														onClick={() =>
															handleNavigateToStudent(userData?.id)
														}>
														Mi aprendizaje
													</button>
													<button
														onClick={() =>
															handleNavigateToInstructor(userData?.id)
														}>
														Instructor
													</button>
													<hr />
													<button
														onClick={() =>
															handleNavigateToConfig(userData?.id)
														}>
														Configuración
													</button>
													<hr />
													<button onClick={signOutFn}>Desconectarse</button>
												</div>
											</div>
										))}
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
								fill="none">
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
								fill="none">
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
