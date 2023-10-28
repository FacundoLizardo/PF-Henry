import styles from '../About/About.module.css'
import { FaGithub } from "react-icons/fa";

const About = () => {

return (
    <div className={styles.about}>
      <br />
      <div className={styles.cont}>
        <div className={styles.nosotros}>
        <h1>Nosotros Somos</h1>
          <br />
          <h2>Mision</h2>
          <br />
          <h3>Concentramos nuestros esfuerzos:<br />

          Nos enfocamos en la optimización de la infraestructura educativa a través de soluciones tecnológicas avanzadas. Nuestro objetivo es aumentar la cobertura, el acceso y la asistencia mediante la implementación de sistemas y recursos educativos de última generación. Además, colaboramos estrechamente con los docentes en el desarrollo de proyectos que impulsan la eficiencia en los procesos de enseñanza y aprendizaje, elevando las expectativas educativas y laborales a través de la aplicación de metodologías innovadoras.</h3>

          <br />
          <h2>Visión</h2>
          <br />
          <h3>Visualizamos un futuro en el que la educación se convierta en el motor de cambio para la próxima generación de latinoamericanos. Nuestra visión es empoderar a los estudiantes con las herramientas tecnológicas y habilidades necesarias para soñar, diseñar y alcanzar sus proyectos de vida de manera efectiva y sostenible, aprovechando al máximo las oportunidades que ofrece la revolución digital en el aprendizaje.</h3>
        </div>
      </div>
      
      <br />
      <div className={styles.devs}>
        <div className={styles.dev}>
          <a href="https://github.com/CodeLudovic" target="blank">
            <img className={styles.imgDev} src="https://avatars.githubusercontent.com/u/14829243?v=4" alt="" />
            <h2 style={{color:"blue", width:"70%"}}>Daniel Ospina</h2>
            <h4 style={{color:"black", width:"70%"}}>La tecnología está revolucionando la educación. <br /><br />
            (Barack Obama)           
              <div className={styles.git}><FaGithub />CodeLudovic</div>
              </h4> 
            <br />
            <br />
          </a>
        </div>
        <div className={styles.dev}>
          <a href="https://github.com/KayitaC2024" target="blank">
            <img className={styles.imgDev} src="https://avatars.githubusercontent.com/u/101375963?v=4" alt="" />
            <h2 style={{color:"blue", width:"70%"}}>Claudia Torres</h2>
            <h4 style={{color:"black", width:"70%"}}>La educación es el arma para cambiar el mundo.<br /> <br />
            (Nelson Mandela)
              <div className={styles.git}><FaGithub />KayitaC2024</div>
              </h4>
            <br />
            <br />
          </a>
        </div>
        <div className={styles.dev}>
          <a href="https://github.com/lucastamburlini" target="blank">
            <img className={styles.imgDev} src="https://avatars.githubusercontent.com/u/74024761?v=4" alt="" />
            <h2 style={{color:"blue", width:"70%"}}>Lucas Tamburlini</h2>
            <h4 style={{color:"black", width:"70%"}}>La tecnología no es la respuesta, es la herramienta. <br /><br />
            (William Kamkwamba)
              <div className={styles.git}><FaGithub />lucastamburlini</div>
              </h4>
            <br />
            <br />
          </a>
        </div>
        <div className={styles.dev}>
          <a href="https://github.com/FacundoLizardo" target="blank">
            <img className={styles.imgDev} src="https://avatars.githubusercontent.com/u/97638269?v=4" alt="" />
            <h2 style={{color:"blue", width:"70%"}}>Facundo Lizardo</h2>
            <h4 style={{color:"black", width:"70%"}}>La tecnología puede amplificar el aprendizaje.<br /><br />
            ( Bill Gates.)
            <div className={styles.git}><FaGithub />FacundoLizardo</div>
            </h4>
            <br />
            <br />
          </a>
        </div>
        <div className={styles.dev}>
          <a href="https://github.com/JoseValperga" target="blank">
            <img className={styles.imgDev} src="https://avatars.githubusercontent.com/u/123827147?v=4" alt="" />
            <h2 style={{color:"blue", width:"70%"}}>José Valperga</h2>
            <h4 style={{color:"black", width:"70%"}}>La tecnología es la (ala) derecha de la educación.<br /><br />
           (Randy Pausch)
              <div className={styles.git}><FaGithub />JoseValperga</div>
            </h4>
            <br />
            <br />
          </a>
        </div>
        <div className={styles.dev}>
          <a href="https://github.com/CEGGonzalez" target="blank">
            <img className={styles.imgDev} src="https://avatars.githubusercontent.com/u/136920851?u=122fa7a82be9268997ae95ac89f34bf2b14a0f5c&v=4" alt="" />
            <h2 style={{color:"blue", width:"70%"}}>Carlos González</h2>
            <h4 style={{color:"black", width:"70%"}}>La educación y la tecnología se unen para el cambio.<br /><br />
            (Salman Khan)
          <div className={styles.git}><FaGithub />CEGGonzalez</div>
            </h4>
            <br />
            <br />
          </a>
        </div>
       
      </div>
      <hr />
    </div>
  );
}

export default About;