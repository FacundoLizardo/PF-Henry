import Styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={Styles.footerContainer}>
      <div className={Styles.sbFooter}>
        <div className={Styles.sbFooterLinks}>
          <div className={Styles.sbFooterLinksDiv}>
            <h4>Educación</h4>
            <a href="/courses">
              <p>Curso</p>
            </a>
            <a href="/courses">
              <p>English Academy</p>
            </a>
            <a href="/courses">
              <p>Arte Digital</p>
            </a>
          </div>
          <div className={Styles.sbFooterLinksDiv}>
            <h4>Recursos</h4>
            <a href="/courses">
              <p>Cursos</p>
            </a>
            <a href="/courses">
              <p>Cursos</p>
            </a>
            <a href="/courses">
              <p>Cursos</p>
            </a>
          </div>
          <div className={Styles.sbFooterLinksDiv}>
            <h4>Comunidad</h4>
            <a href="/">
              <p>Testimonios</p>
            </a>
          </div>
          <div className={Styles.sbFooterLinksDiv}>
            <h4>Nosotros</h4>
            <a href="/about">
              <p>Mision/Vsion</p>
            </a>
          </div>
          <div className={Styles.sbFooterLinksDiv}>
            <h4>Redes Sociales</h4>
            <div className={Styles.socialMedia}></div>
          </div>
        </div>

        <hr></hr>

        <div className={Styles.sbFooterBelow}>
          <div className={Styles.sbFooterCopyright}>
            <p>@{new Date().getFullYear()} EducaStream. All right reserved.</p>
          </div>
          <div className={Styles.sbFooterBelowLinks}>
            <a href="/terms">
              <div>
                <p>Terminos & Condiciones</p>
              </div>
            </a>
            <a href="/privacy">
              <div>
                <p>Privacidad</p>
              </div>
            </a>
            <a href="/security">
              <div>
                <p>Seguridad</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
