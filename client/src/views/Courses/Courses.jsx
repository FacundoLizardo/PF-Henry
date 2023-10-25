import Styles from "./Courses.module.css";
import CardContainer from "../../Components/CardContainer/CardContainer";
import Card from "../../Components/Card/Card";

const Courses = () => {
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
		<div className={Styles.coursesContainer}>
			<CardContainer course={course} />
		</div>
	);
};

export default Courses;
