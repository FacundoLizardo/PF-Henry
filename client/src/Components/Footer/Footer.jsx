import Styles from "./Footer.module.css";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <div className={Styles.footerContainer}>
      <div className={Styles.footerContainerImg}>
        <img src={logo} alt={logo} />
      </div>
      <div className={Styles.subFooter}>
        <div className={Styles.footerTop}>
          <div className={Styles.footerTopItem}>
            <h4>Acceso</h4>
            <a href="/">Inicio</a>
            <a href="/courses">Cursos</a>
          </div>
          <div className={Styles.footerTopItem}>
            <h4>Empresa</h4>
            <a href="/about">Mision</a>
            <a href="/about">Vision</a>
          </div>
          <div className={Styles.footerTopItem}>
            <h4>Nosotros</h4>
            <a
              href="https://www.linkedin.com/in/lucasgabrieltamburlini/"
              target="_blank"
              rel="noopener noreferrer"
            >
              in/lucastamburlini
            </a>

            <a
              href="https://www.linkedin.com/in/danielor92/"
              target="_blank"
              rel="noopener noreferrer"
            >
              in/danielor92
            </a>

            <a
              href="https://www.linkedin.com/in/facundolizardo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              in/facundolizardo
            </a>

            <a
              href="https://www.linkedin.com/in/carlosenriquegonzalezgonzalez/"
              target="_blank"
              rel="noopener noreferrer"
            >
              in/carlosenriquegonzalezgonzalez
            </a>
            <a
              href="https://www.linkedin.com/in/josevalperga/"
              target="_blank"
              rel="noopener noreferrer"
            >
              in/josevalperga
            </a>
            <a
              href="https://www.linkedin.com/in/claudia-torres-a580a11a8/"
              target="_blank"
              rel="noopener noreferrer"
            >
              in/claudiatorres
            </a>
          </div>
          <div className={Styles.footerTopItem}>
            <h4>Colaboración</h4>
            <a
              href="https://www.soyhenry.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Henry
            </a>
          </div>
        </div>

        <div className={Styles.footerBottom}>
          <div className={Styles.footerBottomItem}>
            <p>
              {new Date().getFullYear()} EducaStream @ Todos los derechos
              reservados.
            </p>
          </div>
          <div className={Styles.footerBottomItem}>
            <a href="/terms">Terminos & Condiciones</a>
            <a href="/privacy">Privacidad</a>
            <a href="/">Seguridad</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
