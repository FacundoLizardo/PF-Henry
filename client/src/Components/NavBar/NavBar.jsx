/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { userData } from "../../utils/user";
import { useNavigate } from "react-router-dom";

import Styles from "../NavBar/NavBar.module.css";
import { userData } from "../../utils/user";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const navigate = useNavigate();

	const handleNavigateToUser = (userId) => {
		navigate(`/instructor/${userId}`, {
			state: { userData: userData },
		});
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
									<NavLink to={"/"}>Home</NavLink>
								</li>
								<li>
									<NavLink to={"/courses"}>Cursos</NavLink>
								</li>
								<li>
									<button onClick={handleModal} className={Styles.menuModal}>
										M
									</button>
									{showModal && (
										<div className={Styles.modal}>
											<div
												className={Styles.modalContent}
												onClick={handleModal}
											>
												<Link to={"/student"}>Alumno</Link>
												<button
													onClick={() => {
														handleNavigateToUser(userData.id);
													}}
												>
													Instructor
												</button>
												<Link to={"/config"}>Configuración</Link>
												<Link to={"/login"}>Ingresar / Salir</Link>
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
