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

import { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";
const auth = getAuth(appFireBase);

const Login = ({ updateContextUser }) => {
  const nav = useNavigate();
  const user = useContext(userContext);
  const [registering, setRegistering] = useState(false);
  console.log(user);

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
      .then((result) => {
        updateContextUser(result);
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
          <label>Constraseña </label>
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
              <label>Repite contraseña: </label>
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
            onClick={() => setRegistering(!registering)}
          >
            {registering ? "Inicia Sesion" : "Registrate"}
          </span>
        </p>
        <p className={style.p}>
          {registering
            ? "Registrate también con:"
            : "Iniciar sesión con:"}
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
