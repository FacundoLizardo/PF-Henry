import Button from "../../Components/Button/Button";
import CardContainer from "../../Components/CardContainer/CardContainer";
import Footer from "../../Components/Footer/Footer";
import Home from "../../Components/Home/Home";
import { Link } from "react-router-dom";
import Styles from "./Layout.module.css";

const Layout = () => {
	const course = [
		{
			title: "Curso de microlearning",
			description: "aqui aprenderas que es el microlearning",
			rating: 4,
			image:
				"https://i.ytimg.com/vi/MHip3eVhK9g/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBa2Tc3wl_CWfJzbvhBmHo1sBXdEg",
			instructorImage:
				"https://yt3.ggpht.com/peu87JRecAO0qd7KhfPHLrQ_XJBEiuAiNHGuGU74dvJRnfNzP6x3sNfiIINRISZpDIqQzRgFpg=s68-c-k-c0x00ffffff-no-rj",
		},

		{
			title: "Curso de microlearning",
			description: "aqui aprenderas que es el microlearning",
			rating: 4,
			image:
				"https://i.ytimg.com/vi/MHip3eVhK9g/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBa2Tc3wl_CWfJzbvhBmHo1sBXdEg",
			instructorImage:
				"https://yt3.ggpht.com/peu87JRecAO0qd7KhfPHLrQ_XJBEiuAiNHGuGU74dvJRnfNzP6x3sNfiIINRISZpDIqQzRgFpg=s68-c-k-c0x00ffffff-no-rj",
		},
		{
			title: "Curso de microlearning",
			description: "aqui aprenderas que es el microlearning",
			rating: 4,
			image:
				"https://i.ytimg.com/vi/MHip3eVhK9g/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBa2Tc3wl_CWfJzbvhBmHo1sBXdEg",
			instructorImage:
				"https://yt3.ggpht.com/peu87JRecAO0qd7KhfPHLrQ_XJBEiuAiNHGuGU74dvJRnfNzP6x3sNfiIINRISZpDIqQzRgFpg=s68-c-k-c0x00ffffff-no-rj",
		},

		{
			title: "Curso de microlearning",
			description: "aqui aprenderas que es el microlearning",
			rating: 4,
			image:
				"https://i.ytimg.com/vi/MHip3eVhK9g/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBa2Tc3wl_CWfJzbvhBmHo1sBXdEg",
			instructorImage:
				"https://yt3.ggpht.com/peu87JRecAO0qd7KhfPHLrQ_XJBEiuAiNHGuGU74dvJRnfNzP6x3sNfiIINRISZpDIqQzRgFpg=s68-c-k-c0x00ffffff-no-rj",
		},

		{
			title: "Curso de microlearning",
			description: "aqui aprenderas que es el microlearning",
			rating: 4,
			image:
				"https://i.ytimg.com/vi/MHip3eVhK9g/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBa2Tc3wl_CWfJzbvhBmHo1sBXdEg",
			instructorImage:
				"https://yt3.ggpht.com/peu87JRecAO0qd7KhfPHLrQ_XJBEiuAiNHGuGU74dvJRnfNzP6x3sNfiIINRISZpDIqQzRgFpg=s68-c-k-c0x00ffffff-no-rj",
		},
		{
			title: "Curso de microlearning",
			description: "aqui aprenderas que es el microlearning",
			rating: 4,
			image:
				"https://i.ytimg.com/vi/MHip3eVhK9g/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBa2Tc3wl_CWfJzbvhBmHo1sBXdEg",
			instructorImage:
				"https://yt3.ggpht.com/peu87JRecAO0qd7KhfPHLrQ_XJBEiuAiNHGuGU74dvJRnfNzP6x3sNfiIINRISZpDIqQzRgFpg=s68-c-k-c0x00ffffff-no-rj",
		},
	];
	return (
		<div className={Styles.layoutContainer}>
			<h2>Cursos mejor valorados por nuestros alumnos</h2>
			<CardContainer course={course} />
			<h2>Categorias</h2>
			<CardContainer course={course} />
			<h2>Ultimos cursos </h2>
			<CardContainer course={course} />
			<h2>Novedades</h2>

			<Link to="/courses">
				<button className={Styles.buttonCourses}>Ver todos cursos</button>
			</Link>

			<Footer />
		</div>
	);
};

export default Layout;
