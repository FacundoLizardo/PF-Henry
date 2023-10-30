import styles from "./Privacy.module.css";
import { useEffect } from "react";

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.containerPri}>
      <h2 className={styles.h2}>Política de Privacidad</h2>
      <br />
      <h3 className={styles.h3}>Nuestro compromiso de cumplir con la ley</h3>
      <br />
      <p>
        Esta Política de Privacidad afecta a los datos que nos proporciona, ya
        sea a través de los formularios o de cualquier otro medio a su
        disposición (teléfono, correo electrónico, etc.). Al aceptar esta
        Política de Privacidad, usted da su consentimiento para que EducaStream
        procese sus datos personales con los fines indicados a continuación.
      </p>
      <br />
      <h3 className={styles.h3}>¿Qué información recopilaremos y para qué la utilizaremos?</h3>
      <br />
      <p>
        Le pediremos su nombre y su correo electrónico en caso de que desee
        hacernos una pregunta o comentar algo. Solo lo utilizaremos para
        procesar sus consultas. También recopilaremos la información necesaria
        para gestionar sus compras y mantenerlo informado sobre su estado. Le
        pediremos su nombre, apellidos, dirección, correo electrónico, número de
        teléfono, información de tarjeta de crédito y otra información que pueda
        ser necesaria para dicho propósito. Accederemos y podremos tratar los
        datos que nos ha proporcionado en los formularios y en el uso que haga
        del sitio web con los fines establecidos en esta Política de Privacidad.
        Además, mediante el uso que haga del sitio, podrá proporcionar diversos
        datos personales, que utilizaremos de manera disociada para recopilar
        estadísticas. Con esto, pretendemos mejorar nuestros servicios y
        ofrecerle una navegación personalizada. Siempre que lo haya permitido
        previamente, le enviaremos ofertas relacionadas con nuestros cursos
        por correo electrónico.
      </p>
      <br />
      <h3 className={styles.h3}>Sus derechos</h3>
      <br />
      <p>
        Puede ejercer sus derechos de acceso, rectificación, cancelación y
        oposición de acuerdo con la ley enviándonos una solicitud por escrito a
        través del correo electrónico de contacto de la página.
      </p>
      <br />
      <h3 className={styles.h3}>Idioma</h3>
      <br />
      <p>
        El idioma aplicable a esta Política de Privacidad es el español. Si se le
        han ofrecido versiones de esta Política de Privacidad en otros idiomas,
        ha sido para su conveniencia y usted acepta expresamente que siempre
        estarán regidas por la versión en español. En caso de que haya alguna
        contradicción entre lo que dice la versión en español de esta Política de
        Privacidad y lo que dice la traducción, en cualquier caso prevalecerá la
        versión en español.
      </p>
      <br />
      <h3 className={styles.h3}>Dudas y consultas</h3>
      <br />
      <p>
        Por supuesto, si tiene dudas o preguntas sobre la protección de sus
        datos en este sitio web al respecto de nuestros cursos, puede ponerse en contacto con
        nosotros a través del correo electrónico de contacto y trataremos de
        resolver sus dudas lo antes posible.
      </p>
      <br />
     EducaStream
    </div>
  );
}
