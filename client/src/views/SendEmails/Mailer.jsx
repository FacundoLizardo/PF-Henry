import React, { useState, useEffect } from 'react'; 
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import style from './Mailer.module.css';
import { useRef } from 'react';
import { getUser } from '../../utils/getUser';

const Mailer = () => {
  const formRef = useRef(null);
  const [userData, setUserData] = useState(null);

  
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('userOnSession'));
  
    if (session?.email !== '' && !userData) {
      setUserData(session);
  
    
      if (!userData?.id) {
        getUser(session.email)
          .then((response) => {
            console.log('Additional User data:', response);
            setUserData((prevUserData) => ({ ...prevUserData, ...response }));
          })
          .catch((error) => {
            console.error('Error fetching additional user data:', error);
          });
      }
    }
  }, [userData]);
  

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
      <h1 className={style.titleForm}>Contactemos</h1>
      <form ref={formRef} className={style.formMail} onSubmit={SendEmail}>
        <label>Mensaje</label>
        <textarea name="user_message" className={style.textarea} id="" cols="30" rows="10" required></textarea>
        <hr />
        <button type="submit" className={style.button}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Mailer;
