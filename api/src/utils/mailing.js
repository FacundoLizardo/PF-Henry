require("dotenv").config();
const { Resend } = require("resend");
const resend = new Resend(process.env.RESENDKEY);

const sendEmailBuy = async (to, cart) => {
	const generateProductSections = () => {
		const sections = cart.map((product) => {
			return `
            <section>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>${product.price}</p>
            <img src=${product.image} >
            </section>
            `;
		});
		return sections.join(""); // Combina todas las secciones en una sola cadena
	};

	const productSections = generateProductSections();

	const html = `
    <!DOCTYPE html>
    <html>
    <head>
            <style>
            body {
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                background-color: #ffffff;
            }

            h1 {
                font-size: 24px;
                color: #333;
            }

            h3 {
                font-size: 20px;
                color: #444;
            }

            p {
                font-size: 14px;
                color: #666;
            }

            .container {
                width: 80%;
                margin: 0 auto;
            }

            .logo {
                max-width: 100px;
                height: auto;
                display: block;
                margin: 0 auto;
            }

            section {
                margin: 20px 0;
                padding: 10px;
                background-color: #f9f9f9;
                border: 1px solid #ddd;
            }
            </style>
    </head>
    <body>
        <div class="container">
            <section>
                <div>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/educastream-df454.appspot.com/o/logo%2Flogo.png?alt=media&token=c946cd65-24c8-4c7e-bb95-73dcaf3ae6a3&_gl=1*1g6n7p1*_ga*ODUzMzI3ODU3.LjE2OTgyNDgwNjI.*_ga_CW55HF8NVT*MTY5OTA1OTc0OC4yOS4x.LjE2OTkwNTk4MjYuNTAuMC4w"
                        alt="EducaStream logo"
                        class="logo"
                    />
                </div>
                <div class="table-cell">
                    <h1 class="heading">Factura</h1>
                </div>
            </section>
            ${productSections}
        </div>
    </body>
    </html>
  `;
	console.log(html);
	try {
		const email = await resend.emails.send({
			from: "EducaStream <admin@whitebeartech.com.co>",
			to: [`${to}`],
			subject: "Detalles de Compra - EducaStream",
			html: `${html}`,
		});
		console.log(email);
	} catch (error) {
		console.log("Error al enviar el correo: ", error);
	}
};

const sendEmailUser = async (id, to) => {
	const html = `
    <!DOCTYPE html>
    <html>
    <head>
            <style>
            body {
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                background-color: #ffffff;
            }

            h1 {
                font-size: 24px;
                color: #333;
            }

            h3 {
                font-size: 20px;
                color: #444;
            }

            p {
                font-size: 14px;
                color: #666;
            }

            .container {
                width: 80%;
                margin: 0 auto;
            }

            .logo {
                max-width: 100px;
                height: auto;
                display: block;
                margin: 0 auto;
            }

            section {
                margin: 20px 0;
                padding: 10px;
                background-color: #f9f9f9;
                border: 1px solid #ddd;
            }
            .buttonContainer .cssButtonSharpBlue {
                min-width: 100px;
                height: auto;
                color: #fff;
                padding: 5px 8px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                display: inline-block;
                outline: none;
                border: 2px solid #3d0dca;
                background: #3d0dca;
                border-radius: 25px;
              }
              .buttonContainer .cssButtonSharpBlue:hover {
                background: #fff;
                color: #3d0dca;
              }

            </style>
    </head>
    <body>
        <div class="container">
            <section>
                <div>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/educastream-df454.appspot.com/o/logo%2Flogo.png?alt=media&token=c946cd65-24c8-4c7e-bb95-73dcaf3ae6a3&_gl=1*1g6n7p1*_ga*ODUzMzI3ODU3.LjE2OTgyNDgwNjI.*_ga_CW55HF8NVT*MTY5OTA1OTc0OC4yOS4x.LjE2OTkwNTk4MjYuNTAuMC4w"
                        alt="EducaStream logo"
                        class="logo"
                    />
                </div>
                <div class="table-cell">
                    <h1 class="heading">EducaStream -  Verificacion de Email</h1>
                </div>
                <div class="table-cell">
                 <h2 class="heading">Porfavor realiza click en este boton para verificar tu direccion de correo como cuenta en el sistema.
                 user: ${id}
                 </h2>
                </div>
                <button> <a href="http://localhost:5173">
                Verificar Email
                </a></button>
            </section>
        </div>
    </body>
    </html>
  `;
	console.log(html);
	try {
		const email = await resend.emails.send({
			from: "EducaStream <admin@whitebeartech.com.co>",
			to: [`${to}`],
			subject: "Verifica tu cuenta - EducaStream",
			html: `${html}`,
		});
		console.log(email);
	} catch (error) {
		console.log("Error al enviar el correo: ", error);
	}
};

module.exports = { sendEmailBuy, sendEmailUser };
