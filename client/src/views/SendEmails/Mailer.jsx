import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import style from './Mailer.module.css';
import { useRef } from 'react';
import { getUserById } from '../../utils/getUserById';
import Button from "../../Components/Button/Button";
import { useParams } from 'react-router-dom';




const Mailer = ({ updateContextUser }) => {

  const { id } = useParams();
  console.log(id);
  const formRef = useRef(null);
  const [userData, setUserData] = useState(null);
  const [instructorData, setInstructorData] = useState({});
  // const userkData = await getUserById(instructorId);
  console.log(userData);


  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('userOnSession'));

    if (session?.email !== '' && !userData) {
      setUserData(session);
      updateContextUser(session)

      const getUser = async (id) => {
        const user = await getUserById(id)
        setInstructorData(user)

      }
      getUser(id)

    }
  }, [userData, instructorData]);

  console.log(instructorData);


  const SendEmail = async (event) => {
    event.preventDefault();

    const userMessage = event.target.user_message.value;

    if (!userMessage) {
      Swal.fire('Error', 'Por favor, completa el campo del mensaje.', 'error');
      return;
    }

    try {

      const templateParams = {
        user_name: userData?.user_name || '',
        user_email: userData?.email || '',
        user_message: userMessage,
        instructor_name: instructorData?.first_name + " " + instructorData?.last_name || '',
        instructor_email: instructorData?.email || '',

      };


      const res = await emailjs.send('service_jyz8h9x', 'template_28c0dg8', templateParams, 'Sl82J57rAqANYBLn7');
      console.log(res);

      Swal.fire('¡Correo enviado!', 'Gracias por tu mensaje.', 'success').then((result) => {
        if (formRef.current !== null) {
          formRef.current.reset();
        }
      });
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Ha ocurrido un error. Por favor, inténtalo de nuevo.', 'error');
    }
  };

  return (
    <div className={style.container}>
      <h1 className={style.titleForm}>Contacto instructor</h1>
      <form ref={formRef} className={style.formMail} onSubmit={SendEmail}>
        <label className={style.message}>Mensaje</label>
        <textarea name="user_message" className={style.textarea} id="" cols="30" rows="10" required></textarea>
        <hr />
        <Button text="Enviar" onClick={() => { }} />
      </form>
    </div>
  );
};

export default Mailer;
