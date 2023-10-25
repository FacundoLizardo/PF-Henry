import './Footer.css';
import fb from '../../../public/fb.png'
import linkedin from '../../../public/linkedin.png'
import insta from '../../../public/insta.png'

const Footer = () => {
  return (
    <div className="footer">
      <div className='sb_footer section_padding'>
        <div className='sb_footer-links'>
        <div className='sb_footer-links_div'>
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
        <div className='sb_footer-links_div'>
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
        <div className='sb_footer-links_div'>
        <h4>Comunidad</h4>
          <a href='/'>
            <p>Testimonios</p>
          </a>
        </div>
        <div className='sb_footer-links_div'>
        <h4>Nosotros</h4>
          <a href='/about'>
            <p>Mision</p>
          </a>
          <a href='/contactos'>
            <p>Vision</p>
          </a>
        </div>
        <div className='sb_footer-links_div'>
        <h4>Redes Sociales</h4>
         <div className='socialmedia'>
          <p><img src={fb} alt="" /></p>
          <p><img src={linkedin} alt="" /></p>
          <p><img src={insta} alt="" /></p>
        </div>
        </div>
        </div>

        <hr></hr>

      <div className='sb_footer-below'>
        <div className='sb_footer-copyright'>
          <p>
            @{new Date().getFullYear()} EducaStream. All right reserved.
          </p>
        </div>
      <div className='sb_footer-below-links'>
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
