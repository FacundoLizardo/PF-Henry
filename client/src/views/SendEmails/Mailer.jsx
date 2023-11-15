import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import Styles from "./Mailer.module.css";
import { useRef } from "react";
import { getUserById } from "../../utils/getUserById";
import Button from "../../Components/Button/Button";
import { useParams } from "react-router-dom";

const Mailer = ({ updateContextUser }) => {
  const { id } = useParams();
  const formRef = useRef(null);
  const [userData, setUserData] = useState(null);
  const [instructorData, setInstructorData] = useState({});

  const handleGoBack = () => {
    window.history.back();
  };

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("userOnSession"));

    if (session?.email !== "" && !userData) {
      setUserData(session);
      updateContextUser(session);

      const getUser = async (id) => {
        const user = await getUserById(id);
        setInstructorData(user);
      };
      getUser(id);
    }
  }, [userData, instructorData, updateContextUser, id]);

  const SendEmail = async (event) => {
    event.preventDefault();

    const userMessage = event.target.user_message.value;

    if (!userMessage) {
      Swal.fire({
        title: "Error",
        text: "Por favor, completa el campo del mensaje.",
        icon: "error",
        customClass: {
          popup: "mySwal",
        },
      });
      return;
    }

    try {
      const templateParams = {
        user_name: userData?.user_name || "",
        user_email: userData?.email || "",
        user_message: userMessage,
        instructor_name:
          instructorData?.first_name + " " + instructorData?.last_name || "",
        instructor_email: instructorData?.email || "",
      };

      const res = await emailjs.send(
        "service_jyz8h9x",
        "template_28c0dg8",
        templateParams,
        "Sl82J57rAqANYBLn7"
      );
      console.log(res);

      Swal.fire({
        title: "¡Correo enviado!",
        text: "Gracias por tu mensaje.",
        icon: "success",
        customClass: {
          popup: "mySwal",
        },
      }).then(() => {
        if (formRef.current !== null) {
          formRef.current.reset();
        }
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error. Por favor, inténtalo de nuevo.",
        icon: "error",
        customClass: {
          popup: "mySwal",
        },
      });
    }
  };

  return (
    <div className={Styles.SendEmailsContainer}>
      <h1 className={Styles.formTitle}>Contactar al instructor</h1>
      <form ref={formRef} className={Styles.formMail} onSubmit={SendEmail}>
        <label className={Styles.formMessage}>Escribe tu mensaje</label>
        <textarea
          name="user_message"
          className={Styles.textarea}
          cols="30"
          rows="10"
          required
        ></textarea>
        <div className={Styles.formFooter}>
          <Button text="Volver" onClick={handleGoBack} />
          <Button text="Enviar" onClick={() => {}} />
        </div>
      </form>
    </div>
  );
};

export default Mailer;
