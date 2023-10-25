import Styles from './Footer.module.css'
import fb from '../../../public/fb.png'
import linkedin from '../../../public/linkedin.png'
import insta from '../../../public/insta.png'

const Footer = () => {
  return (
    <div className={Styles.footerContainer}>
      <div className={Styles.sbFooter}>
              <div className={Styles.sbFooterLinks}>
        <div className={Styles.sbFooterLinksDiv}>
          <h4>Educación</h4>
          <a href='/cursos'>
            <p>Curso</p>
          </a>
          <a href='/cursos'>
            <p>English Academy</p>
          </a>
          <a href='/cursos'>
            <p>Arte Digital</p>
          </a>
        </div>
        <div className={Styles.sbFooterLinksDiv}>
          <h4>Recursos</h4>
          <a href='/cursos'>
            <p>Cursos</p>
          </a>
          <a href='/cursos'>
            <p>Cursos</p>
          </a>
          <a href='/cursos'>
            <p>Cursos</p>
          </a>
        </div>
        <div className={Styles.sbFooterLinksDiv}>
        <h4>Comunidad</h4>
          <a href='/'>
            <p>Testimonios</p>
          </a>
        </div>
        <div className={Styles.sbFooterLinksDiv}>
        <h4>Nosotros</h4>
          <a href='/about'>
            <p>Mision</p>
          </a>
          <a href='/contactos'>
            <p>Vision</p>
          </a>
        </div>
        <div className={Styles.sbFooterLinksDiv}>
        <h4>Redes Sociales</h4>
         <div className={Styles.socialMedia}>
          <p><img src={fb} alt="" /></p>
          <p><img src={linkedin} alt="" /></p>
          <p><img src={insta} alt="" /></p>
        </div>
        </div>
        </div>

        <hr></hr>

      <div className={Styles.sbFooterBelow}>
        <div className={Styles.sbFooterCopyright}>
          <p>
            @{new Date().getFullYear()} EducaStream. All right reserved.
          </p>
        </div>
      <div className={Styles.sbFooterBelowLinks}>
        <a href="/terms"><div><p>Terminos & Condiciones</p></div></a>
        <a href="/privacy"><div><p>Privacidad</p></div></a>
        <a href="/security"><div><p>Seguridad</p></div></a>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Footer;
