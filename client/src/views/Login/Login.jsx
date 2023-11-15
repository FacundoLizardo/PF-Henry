/* eslint-disable */
import style from "./Login.module.css";
import googleSvg from "../../assets/icons/icons8-google.svg";
import { appFireBase } from "../../firebase/firebase";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithPopup,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
} from "firebase/auth";

import user from "../../assets/navBarImages/user.png";
import Swal2 from "sweetalert2";
import Swal from "sweetalert2/dist/sweetalert2.js";

import { useContext, useState } from "react";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/getUser";
import axios from "axios";
import { postUser } from "../../utils/postUser";
const auth = getAuth(appFireBase);

const Login = ({ updateContextUser, setLogged }) => {
	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 2500,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener("mouseenter", Swal.stopTimer);
			toast.addEventListener("mouseleave", Swal.resumeTimer);
		},
	});
	const nav = useNavigate();
	const user2 = useContext(userContext);
	const [registering, setRegistering] = useState(false);

	const authentication = async (e) => {
		e.preventDefault();
		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;
		const reemail = document.getElementById("re_email").value;
		const repassword = document.getElementById("re_password").value;

		console.log(email, password, reemail, repassword);
		if (registering) {
			if (email === reemail && password === repassword) {
				// createUserWithEmailAndPassword(auth, email, password)
				// 	.then((result) => {
				// 		const usuario = { email: email, password: password };
				// 		localStorage.setItem("allowed", false);
				// 		updateContextUser(usuario);
				// 		console.log(result);
				// 	})
				// 	.catch(() => {
				// 		return Toast.fire({
				// 			icon: "error",
				// 			title: "¡Este email ya se encuentra en uso!",
				// 			customClass: {
				// 				popup: "mySwal",
				// 			},
				// 		});
				// 	});
				// .finally(nav("/courses/"));
				const usuario = {
					email: email,
					password: password,
					photoURL: user,
					role_student: true,
					role_instructor: false,
				};
				console.log(usuario);
				postUser(usuario)
					.then((result) => {
						//localStorage.setItem("allowed", false);
						updateContextUser(usuario);
						//console.log(result);
					})
					.catch((error) => {
						return Toast.fire({
							icon: "warning",
							title: "¡El email y las contraseñas deben ser iguales!",
							customClass: {
								popup: "mySwal",
							},
						});
					});
			} else {
				return Toast.fire({
					icon: "warning",
					title: "¡El email y las contraseñas deben ser iguales!",
					customClass: {
						popup: "mySwal",
					},
				});
			}
		} else {
			signInWithEmailAndPassword(auth, email, password)
				.then(() => {
					const usuario = { email: email, password: password };
					updateContextUser(usuario);
				})
				.finally(() => nav("/courses/"));
		}
	};

	const googleAuth = async () => {
		const googleSignIn = new GoogleAuthProvider();
		document.querySelector("#google").disabled = true;
		signInWithPopup(auth, googleSignIn)
			.then(async (result) => {
				const { user } = result;
				const userMail = await getUser(user.email);
				if (userMail.enabled) {
					if (user.email === userMail.email) {
						localStorage.setItem("userOnSession", JSON.stringify(userMail));
						updateContextUser(userMail);
						localStorage.setItem("logged", true);
						return;
					} else {
						let name = "nombre";
						let apellido = [];
						const nameSplited = result.user.displayName.split(" ");
						for (let i = 0; i < nameSplited.length; i++) {
							name = nameSplited[0];
							if (i >= 1) {
								apellido.push(nameSplited[i]);
							}
						}
						const objUser = {
							first_name: name,
							email: user.email,
							last_name: apellido.join(" "),
							photoURL: user.photoURL,
							role_instructor: true,
							role_student: true,
							emailVerified: user.emailVerified,
							enabled: true,
						};
						const response = await axios.post("/users/create", objUser);
						localStorage.setItem(
							"userOnSession",
							JSON.stringify(response.data)
						);
						//console.log(response.data);
						setLogged(true);
						localStorage.setItem("logged", true);
						return updateContextUser(response.data);
					}
				} else {
					Swal2.fire({
						title: "Tu usuario ha sido bloqueado",
						text: "Comunicate con nosotros al mail admin@educastream.com",
						icon: "error",
						confirmButtonText: "Entiendo",
						customClass: {
							popup: "mySwal",
						},
					}).then(() => nav(`/courses/`));
				}
			})
			.finally(() => {
				nav("/courses/");
			});
	};

	return (
		<div className={style.form_container}>
			<div className={style.form}>
				<div className={style.flex_column}>
					<label>Email </label>
				</div>
				<div className={style.inputForm}>
					<input
						type="text"
						className={style.input}
						id="email"
						name="email"
						placeholder="Ingresa email"
					/>
				</div>
				{registering ? (
					<>
						<div className={style.flex_column}>
							<label>Repetir Email: </label>
						</div>
						<div className={style.inputForm}>
							<input
								type="text"
								id="re_email"
								name="re_email"
								className={style.input}
								placeholder="Repite tu email"
							/>
						</div>
					</>
				) : (
					""
				)}

				<div className={style.flex_column}>
					<label>Contraseña </label>
				</div>
				<div className={style.inputForm}>
					<input
						type="password"
						id="password"
						name="password"
						className={style.input}
						placeholder="Ingresa contraseña"
					/>
				</div>

				{registering ? (
					<>
						<div className={style.flex_column}>
							<label>Repetir Contraseña: </label>
						</div>
						<div className={style.inputForm}>
							<input
								id="re_password"
								name="re_password"
								type="password"
								className={style.input}
								placeholder="Repite tu contraseña"
							/>
						</div>
					</>
				) : (
					""
				)}

				<div className={style.flex_row}></div>
				<button
					className={style.button_submit}
					onClick={(e) => authentication(e)}>
					{registering ? "Regístrate" : "Inicia sesión"}
				</button>
				<p className={style.p}>
					{registering ? "Si ya tienes cuenta" : "Si no tienes cuenta"}
					<span
						className={style.span}
						onClick={() => setRegistering(!registering)}>
						{registering ? "Inicia sesión" : "Regístrate"}
					</span>
				</p>
				<p className={style.p}>
					{registering
						? "Regístrate también con:"
						: "Iniciar sesión también con:"}
				</p>
				<div className={style.flex_row}></div>
				<button id="google" className={style.btn} onClick={googleAuth}>
					<img src={googleSvg} width="24px" />
					Google
				</button>
			</div>
		</div>
	);
};

export default Login;
