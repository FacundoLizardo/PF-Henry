import styles from './Terms.module.css'
import { useEffect } from "react";

const Terms = () => {

    useEffect(() => {
        window.scrollTo(0,0)
    },[])

    return(
        <div className={styles.container}>
          <br />
          <br />
            <h2 className={styles.h2}>TÉRMINOS Y CONDICIONES</h2>
            <br />
            <h3>Términos de Uso de los Servicios de EDUCASTREAM</h3>
            <br />
            <p className={styles.p}>Por favor, lea cuidadosamente los Términos de Uso de los servicios del sitio “http://localhost:5173” (”Sitio”), referentes al servicio de Escuela (“Educastream”), <br /> que se detallan a continuación, ya que los mismos contienen información de su interés relacionada con el uso del servicio. Al acceder al servicio y a cualquier <br />página del mismo, el usuario se compromete a cumplir y aceptar todos los términos y condiciones que aparecen a continuación. El presente documento constituye <br /> el instrumento que contempla los Términos de Uso del servicio que se aplicarán y resultarán obligatorios para todos los usuarios que deseen adquirir cursos, carreras <br /> y/o utilizar la plataforma web http://localhost:5173</p>
            <br />
            <p className={styles.p}>En caso de no estar de acuerdo con estos Términos de Uso, le aconsejamos no acceder al sitio o a cualquier página del mismo.</p>
            <br />
            <ul>
              <h4 className={styles.h4}>1. Definiciones</h4>
              <br />
                <li>(I) Plataforma virtual, incluyendo acceso al material de cada curso a todos los usuarios; acceso a sus calificaciones; acceso al registro <br /> de sus asistencias; acceso al registro de pago de los aranceles.</li> <br />
                <li>(II) Acceso al curso online y a su contenido.</li> <br />
                <li>(III) Usuario. Toda aquella persona que participe de los programas de Educastream, incluyendo estudiantes, tutores, coordinadores y profesores.</li> <br />
                <li>(IV) Proveedor. Educastream </li> <br />
                <li>(V) Datos necesarios: nombre; apellido; e-mail; número de teléfono; país de residencia; DNI.</li>
                <br />
                <h4 className={styles.h4}>2. Alcance</h4>
                <br />
                <li>Educastream prestará los servicios a todos los usuarios. Educastream arbitrará los medios que estén a su alcance para proveer el mejor servicio disponible y con la tecnología que, <br /> de acuerdo a sus recursos y posibilidades técnico-económicos, se considere apropiada. Educastream se reserva el derecho de cambiar la forma en la que presta los servicios, <br /> comprometiéndose a informar a los usuarios con la mayor anticipación posible. </li>
                <br />
                <h4 className={styles.h4}>3. Condiciones de Uso</h4>
                <br />
                <li>Educastream podrá retirar o suspender, cautelarmente, la prestación del servicio a aquellos Usuarios que incumplan lo establecido en estos Términos de Uso de los servicios, <br /> reservándose los derechos legales correspondientes frente a los eventuales daños y perjuicios que dichos incumplimientos le ocasionen.</li>
                <br />
                <h4 className={styles.h4}>4. Responsabilidad del Usuario</h4>
                <br />
                <li>El usuario se compromete a utilizar el servicio de conformidad con la legislación vigente, la moral, las buenas costumbres y el orden público, así como a abstenerse de utilizar el servicio <br /> con fines o efectos ilícitos, prohibidos en los presentes Términos de Uso de los servicios, lesivos de los derechos e intereses de terceros, o que de cualquier forma puedan dañar, inutilizar, <br /> sobrecargar o deteriorar los servicios, los equipos informáticos de otros usuarios o de otros usuarios de Internet (hardware y software) así como los documentos, archivos y toda clase de <br /> contenidos almacenados en sus equipos informáticos (hacking), o impedir la normal utilización o disfrute de dichos servicios, equipos informáticos y documentos, archivos y contenidos <br /> por parte de los demás usuarios y de otros usuarios.</li>
                <br />
                <h4 className={styles.li}>Propiedad Intelectual de los Estudiantes</h4>
                <br />
                <li>La propiedad intelectual del código desarrollado durante la etapa educativa pertenece exclusivamente a quien lo creó. Educastream no difundirá el mismo. 
                  <br />
                  <br />
                  Sin perjuicio de ello, es responsabilidad de cada estudiante la protección y custodia de los derechos de la obra creada.</li>
            </ul>
            <br />
            <br />
            <br />
        </div>
    )
}

export default Terms;