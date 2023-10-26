import Styles from "./Form.module.css";
import { useState } from "react";
import { sendData } from "../../Handlers/Handlers";
import Footer from "../../Components/Footer/Footer";

const Form = () => {
	const listCourses = [
		{
			course_id: "c4796a20-8f33-42a5-aa9a-2ac3305d9172",
			title: "Curso de microlearning",
			description: "Aquí aprenderás qué es el microlearning",
			instructor_id: "b05d6c8d-0eaa-4e99-8b75-548f5466714e",
			created_at: "20-12-2023 15:45hs",
			updated_at: "20-12-2023 15:45hs",
			progress: 0,
			category: "Programación",
			image:
				"https://i.ytimg.com/vi/MHip3eVhK9g/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBa2Tc3wl_CWfJzbvhBmHo1sBXdEg",
			instructorImage:
				"https://yt3.ggpht.com/peu87JRecAO0qd7KhfPHLrQ_XJBEiuAiNHGuGU74dvJRnfNzP6x3sNfiIINRISZpDIqQzRgFpg=s68-c-k-c0x00ffffff-no-rj",
			rating: 4,
			comments: [
				{
					user: "0ac15268-6b06-4c1d-8c7e-0164d607ad05",
					description: "Lorem lorem lorem lorem lorem",
				},
				{
					user: "d34e4371-e540-4b3d-9b11-45f46a6485d3",
					description: "Lorem lorem lorem lorem lorem",
				},
			],
			lessons: [
				{
					lesson_id: "e3c2c1a6-82ab-45ac-b12b-d08b69eb8e5d",
					title: "Introducción al Microlearning",
					description: "Aprende los conceptos básicos del Microlearning",
					course_id: "c4796a20-8f33-42a5-aa9a-2ac3305d9172",
					image: "https://example.com/lesson1.jpg",
					video_url: "https://example.com/lesson1.mp4",
					duration: 15,
					sequence_order: 1,
					created_at: "20-12-2023 15:45hs",
					updated_at: "20-12-2023 15:45hs",
				},
				{
					lesson_id: "6d6e1f94-2a2c-43b7-a596-747f8c5a41f1",
					title: "Ejemplos de Microlearning",
					description: "Descubre ejemplos reales de Microlearning en acción",
					course_id: "c4796a20-8f33-42a5-aa9a-2ac3305d9172",
					image: "https://example.com/lesson2.jpg",
					video_url: "https://example.com/lesson2.mp4",
					duration: 20,
					sequence_order: 2,
					created_at: "20-12-2023 15:45hs",
					updated_at: "20-12-2023 15:45hs",
				},
				{
					lesson_id: "edd9dce5-2d6b-4e0a-8c99-12880aa97b61",
					title: "Estrategias de Aprendizaje",
					description:
						"Explora diferentes estrategias de aprendizaje en el microlearning",
					course_id: "c4796a20-8f33-42a5-aa9a-2ac3305d9172",
					image: "https://example.com/lesson3.jpg",
					video_url: "https://example.com/lesson3.mp4",
					duration: 25,
					sequence_order: 3,
					created_at: "20-12-2023 15:45hs",
					updated_at: "20-12-2023 15:45hs",
				},
				{
					lesson_id: "d29cbf0b-2e45-49e4-a488-0b9f4786ad91",
					title: "Evaluación de Microlearning",
					description:
						"Aprende a evaluar la efectividad del microlearning en tu organización",
					course_id: "c4796a20-8f33-42a5-aa9a-2ac3305d9172",
					image: "https://example.com/lesson4.jpg",
					video_url: "https://example.com/lesson4.mp4",
					duration: 18,
					sequence_order: 4,
					created_at: "20-12-2023 15:45hs",
					updated_at: "20-12-2023 15:45hs",
				},
			],
		},
	];

	const [course, setCourse] = useState({
		title: "",
		description: "",
		category: "",
		image: "",
	});

	const handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		setCourse((prevCourse) => ({ ...prevCourse, [name]: value }));
	};

	const onSubmit = async () => {
		await sendData(course);
	};

	console.log(course);

	return (
		<div className={Styles.detailCourseContainer}>
			<form className={Styles.form} onSubmit={onSubmit}>
				<h2 className={Styles.formTitle}>
					AQUÍ PODRÁS CREAR TU CURSO, LUEGO APARECERÁ EN TU PANEL DE INSTRUCTOR
					DONDE PODRÁS AÑADIR LAS LECCIONES QUE CONSIDERES NECESARIAS.
				</h2>
				<label>Titulo de tu curso</label>
				<input
					placeholder="Titulo"
					onChange={handleChange}
					name="title"
					className={Styles.input}
				/>

				<label>Descripcion del curso (maximo 100 caracteres)</label>
				<input
					placeholder="Descripcion"
					onChange={handleChange}
					name="description"
					className={Styles.input}
				/>

				<label>Categoria a la que pertenece</label>
				<input
					placeholder="Categoria"
					onChange={handleChange}
					name="category"
					className={Styles.input}
				/>

				<label>
					Agrega una imagen miniatura descriptiva de tu curso, esta debe ser una
					URL
				</label>
				<input
					placeholder="Ingresa aqui la URL de la imagen "
					onChange={handleChange}
					name="image"
					className={Styles.input}
				/>

				<button type="submit" className={Styles.buttonSubmit}>
					Submit
				</button>
			</form>
			<Footer />
		</div>
	);
};

export default Form;
