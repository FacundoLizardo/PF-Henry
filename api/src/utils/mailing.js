require("dotenv").config();
const { Resend } = require("resend");
const resend = new Resend(process.env.RESENDKEY);

const sendEmailBuy = async (to, cart) => {
	const generateProductSections = () => {
		const sections = cart.map((product) => {
			return `
            <div>
                <h3>Usted compró el curso: ${product.name}</h3>
                <p>${product.description}</p>
                <p>Precio: USD ${product.price}</p>
                <div class="productImageContainer">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                </div>
            </div>
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
                /* Estilos generales */
                body {
                    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                    background-color: #ffffff;
                }

                .container {
                    width: 70%;
                    margin: 0 auto;
                }

                /* Estilos del encabezado y logo */
                .tableTop {
                    height: auto;
                    justify-content: center;
                    align-items: center;
                    display: flex;
                    flex-direction: column;
                    margin: auto;
                    text-align: center;
                }

                .logo {
                    height: 50px;
                    margin: 20px auto;
                }

                /* Estilos de las secciones */
                section {
                    padding: 10px;
                    background-color: #f9f9f9;
                    border: 1px solid #ddd;
                }

                /* Estilos de la imagen del producto */
                .productImageContainer {
                    width: 300px;
                    height: 270px;
                    margin-top: 10px;
                    object-fit: cover;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: auto;
                }

                .productImageContainer img {
                    max-width: 100%;
                    height: 100%;
                }

                /* Estilos de los títulos y texto */
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
            </style>
    </head>
    <body>
        <div class="container">
            <section>
                <div class="tableTop">

                 <img
                    src="https://firebasestorage.googleapis.com/v0/b/educastream-df454.appspot.com/o/logo%2Flogo.png?alt=media&token=c946cd65-24c8-4c7e-bb95-73dcaf3ae6a3&_gl=1*1g6n7p1*_ga*ODUzMzI3ODU3.LjE2OTgyNDgwNjI.*_ga_CW55HF8NVT*MTY5OTA1OTc0OC4yOS4x.LjE2OTkwNTk4MjYuNTAuMC4w"
                    alt="EducaStream logo"
                    class="logo"
                </div>
            </section>
            <section>
                <h1 class="heading">Detalle de compra</h1>
                <div class="tableBottom">
                   ${productSections}
                </div>          
            </section>
            
        </div>
    </body>
    </html>
  `;
	try {
		const email = await resend.emails.send({
			from: "EducaStream <admin@whitebeartech.com.co>",
			to: [`${to}`],
			subject: "Detalles de Compra - EducaStream",
			html: `${html}`,
		});
	} catch (error) {
		console.log("Error al enviar el correo: ", error);
	}
};

module.exports = { sendEmailBuy };
