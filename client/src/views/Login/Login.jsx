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

import { useContext, useState } from "react";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/getUser";
import axios from "axios";
const auth = getAuth(appFireBase);

const Login = ({ updateContextUser }) => {
	const nav = useNavigate();
	const user2 = useContext(userContext);
	const [registering, setRegistering] = useState(false);
	console.log(user2);

	const authentication = async (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;
		if (registering) {
			createUserWithEmailAndPassword(auth, email, password)
				.then(() => {
					const usuario = { email: email, password: password, isNew: 1 };
					updateContextUser(usuario);
				})
				.catch((error) =>
					console.log(
						"Ocurrio un error al tratar de crear usuario en el authenticator" +
							error
					)
				)
				.finally(nav("/courses/"));
		} else {
			signInWithEmailAndPassword(auth, email, password)
				.then(() => {
					const usuario = { email: email, password: password, isNew: 0 };
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
				if (user.email === userMail.email) {
					localStorage.setItem("userOnSession", JSON.stringify(userMail));
					updateContextUser(userMail);
					console.log(userMail);
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
					};

					const response = await axios.post("/users/create", objUser);
					updateContextUser(response.data);
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
					<label>Password </label>
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
							<label>Repite Password: </label>
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
				<button className={style.button_submit}>
					{registering ? "Registrate" : "Inicia Sesion"}
				</button>
				<p className={style.p}>
					{registering ? "Si ya tienes cuenta" : "Si no tienes cuenta"}
					<span
						className={style.span}
						onClick={() => setRegistering(!registering)}>
						{registering ? "Inicia Sesion" : "Registrate"}
					</span>
				</p>
				<p className={style.p}>
					{registering
						? "Registrate Tambien Con:"
						: "Iniciar Sesion Tambien Con:"}
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
