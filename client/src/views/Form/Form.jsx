import Styles from "./Form.module.css";
import { useState } from "react";
import Footer from "../../Components/Footer/Footer";
import { sendData } from "../../utils/postCreateCourse";

const Form = () => {
	const [course, setCourse] = useState({
		title: "",
		description: "",
		instructor_id: "",
		category: "",
		image: "",
	});

	const getId = () => {
		const user = getUserInfo();

		const id = user.id;

		setCourse((prevCourse) => ({ ...prevCourse, instructor_id: id }));
	};

	// 	Desarrollo web
	// Marketing digital
	// Programación
	// Diseño gráfico
	// Idiomas
	// Negocios y emprendimiento
	// Ciencias de datosgti
	// Fotografía
	// Arte y creatividad
	// Salud y bienestar
	// Música
	// Culinaria y gastronomía
	// Finanzas personales
	// Programación de videojuegos
	// Desarrollo de aplicaciones móviles
	// Ciencias sociales
	// Diseño de moda
	// Psicología y consejería
	// Energías renovables
	// Ciencias ambientales

	const handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		setCourse((prevCourse) => ({ ...prevCourse, [name]: value }));
		getId();
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
