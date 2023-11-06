const EducaStreamMail = (cart) => (
	<div>
		<div style={main}>
			<div style={container}>
				<section>
					<div>
						<img
							src="https://firebasestorage.googleapis.com/v0/b/educastream-df454.appspot.com/o/logo%2Flogo.png?alt=media&token=c946cd65-24c8-4c7e-bb95-73dcaf3ae6a3&_gl=1*1g6n7p1*_ga*ODUzMzI3ODU3LjE2OTgyNDgwNjI.*_ga_CW55HF8NVT*MTY5OTA1OTc0OC4yOS4x.LjE2OTkwNTk4MjYuNTAuMC4w"
							alt="EducaStream logo"
							style={logo}
						/>
					</div>

					<div style={tableCell}>
						<h1 style={heading}>Factura</h1>
					</div>
				</section>
				<section style={productTitleTable}>
					<h3 style={productsTitle}>EducaStream</h3>
				</section>
				<section>
					<div style={{ width: "64px" }}>
						<img
							src="$static/apple-hbo-max-icon.jpeg" // Reemplaza por la ruta correcta de tu imagen
							width="64"
							height="64"
							alt="HBO Max"
							style={productIcon}
						/>
					</div>
					<div style={{ paddingLeft: "22px" }}>
						<h4 style={productTitle}>HBO Max: Stream TV & Movies</h4>
						<p style={productDescription}>HBO Max Ad-Free (Monthly)</p>
						<p style={productDescription}>Renews Aug 20, 2023</p>
					</div>
					<div style={productPriceWrapper}>
						<p style={productPrice}>$14.99</p>
					</div>
				</section>
				<hr style={productPriceLine} />
				<section style={{ alignContent: "" }}>
					<div style={tableCell}>
						<p style={productPriceTotal}>TOTAL</p>
					</div>
					<div style={productPriceVerticalLine}></div>
					<div style={productPriceLargeWrapper}>
						<p style={productPriceLarge}>$14.99</p>
					</div>
				</section>
			</div>
		</div>
	</div>
);

export default EducaStreamMail;

const main = {
	fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
	backgroundColor: "#ffffff",
};

const container = {
	margin: "0 auto",
	padding: "20px 0 48px",
	width: "660px",
};

const tableCell = { display: "table-cell", textAlign: "right" };

const heading = {
	fontSize: "32px",
	fontWeight: "300",
	color: "#888888",
};

const logo = {
	/* Agrega estilos para tu logo aquí */
};

const productTitleTable = {
	borderCollapse: "collapse",
	borderSpacing: "0px",
	color: "rgb(51, 51, 51)",
	backgroundColor: "rgb(250, 250, 250)",
	borderRadius: "3px",
	fontSize: "12px",
};

const productsTitle = {
	background: "#fafafa",
	paddingLeft: "10px",
	fontSize: "14px",
	fontWeight: "500",
	margin: "0",
};

const productIcon = {
	margin: "0 0 0 20px",
	borderRadius: "14px",
	border: "1px solid rgba(128, 128, 128, 0.2)",
};

const productTitle = {
	fontSize: "12px",
	fontWeight: "600",
};

const productDescription = {
	fontSize: "12px",
	color: "rgb(102, 102, 102)",
};

const productPriceTotal = {
	margin: "0",
	color: "rgb(102, 102, 102)",
	fontSize: "10px",
	fontWeight: "600",
	padding: "0px 30px 0px 0px",
	textAlign: "right",
};

const productPrice = {
	fontSize: "12px",
	fontWeight: "600",
};

const productPriceLarge = {
	margin: "0px 20px 0px 0px",
	fontSize: "16px",
	fontWeight: "600",
	whiteSpace: "nowrap",
	textAlign: "right",
};

const productPriceWrapper = {
	display: "table-cell",
	padding: "0px 20px 0px 0px",
	width: "100px",
	verticalAlign: "top",
	textAlign: "right",
};

const productPriceLine = { margin: "30px 0 0 0" };

const productPriceVerticalLine = {
	height: "48px",
	borderLeft: "1px solid",
	borderColor: "rgb(238, 238, 238)",
};

const productPriceLargeWrapper = { display: "table-cell", width: "90px" };
