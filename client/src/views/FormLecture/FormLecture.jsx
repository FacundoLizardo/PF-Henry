/* eslint-disable */
import axios from "axios";
import { useState, useEffect } from "react";
import { storage } from "../../firebase/firebase";
import style from "./FormLecture.module.css";
import {
	ref,
	uploadBytes,
	getDownloadURL,
	getMetadata,
} from "firebase/storage";
import {} from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { getAllCourses } from "../../utils/getAllCourses";
import Swal from "sweetalert2";
import { validationLesson } from "../../utils/validation";

const FormLecture = ({ updateContextUser }) => {
	const navigate = useNavigate();
	const id = useParams().courseId;
	const [loading, setLoading] = useState(false);
	const [lecture, setLecture] = useState({
		title: "",
		description: "",
		CourseId: id,
		video_url: "",
		section: 0,
		wasLook: false,
	});
	const cursos = localStorage.getItem("coursesData");
	const [errors, setErrors] = useState({
		title: "",
		description: "",
		section: "",
		video_url: "",
	});
	const nombreCurso = JSON.parse(localStorage.getItem("coursesData")).filter(
		(elemento) => elemento.id === id
	);
	const sections = nombreCurso[0].sections;

	useEffect(() => {
		const session = JSON.parse(localStorage.getItem("userOnSession"));
		if (session?.email !== "") {
			updateContextUser(session);
		}
		console.log(lecture);
	}, [lecture]);

	const uploadVideo = async () => {
		const video = document.getElementById("video");
		const videoFile = video.files[0];
		const videoRef = ref(
			storage,
			`courses/${nombreCurso[0].title}/${lecture.title} - ${id}`
		);
		await uploadBytes(videoRef, videoFile);
		const path = await getDownloadURL(videoRef);
		setLecture({ ...lecture, video_url: `${path}` });

		return path;
	};
	const handleChange = (event) => {
		const { name, value } = event.target;
		setLecture({ ...lecture, [name]: value });

		const newErrors = validationLesson({
			...lecture,
			[name]: value,
		});
		setErrors(newErrors);
	};

	const onSubmit = async () => {
		setLoading(true);
		try {
			const videoPath = await uploadVideo();

			const lesson = { ...lecture, video_url: videoPath };

			const response = await axios.post("/lessons/create", lesson);

			await getAllCourses();

			if (response.data) {
				Swal.fire({
					title: "Tu clase se creo correctamente!",
					text: "Dirígete a la sección de tus cursos creados, ahí podrás encontrarlo.",
					icon: "success",
					confirmButtonText: "Ir a Lecciones",
					customClass: {
						popup: "mySwal",
					},
				}).then(() => navigate(`/instructor/${nombreCurso[0].instructor_id}`));
			}
		} catch (error) {
			Swal.fire({
				title: "¡Falta información importante!",
				text: "Por favor revisa y completa todos los campos.",
				icon: "warning",
				confirmButtonText: "Completar formulario",
				customClass: {
					popup: "mySwal",
				},
			});
		} finally {
			setLoading(false);
		}
	};
	return (
		<>
			{!loading && (
				<div className={style.container}>
					<div className={style.modal}>
						<div className={style.modal__header}>
							<span className={style.modal__title}>
								Nueva Clase - {nombreCurso[0].title}{" "}
							</span>
						</div>
						<div className={style.modal__body}>
							<div className={style.input}>
								<label className={style.input__label}>
									Nombre de la leccion
								</label>
								<input
									className={style.input__field}
									type="text"
									id="title"
									name="title"
									value={lecture.title}
									onInput={handleChange}
									maxLength={70}
								/>
								<div className={style.input__description}>{errors.title}</div>
								<label className={style.input__label}>Descripción</label>
								<textarea
									id="description"
									name="description"
									value={lecture.description}
									className={style.input__field}
									onInput={handleChange}
									maxLength={100}></textarea>
								<p className={style.input__description}>{errors.description}</p>
								<label className={style.input__label}>Seccion:</label>
								<select
									className={style.input__field}
									id="section"
									name="section"
									value={lecture.section}
									onInput={handleChange}>
									<option name="section">Seccion:</option>
									{new Array(sections).fill(" ").map((section, index) => (
										<option key={index} value={index + 1}>
											Seccion {index + 1}
										</option>
									))}
								</select>
								<p className={style.input__description}>{errors.section}</p>
								<label className={style.input__label}>Cargar video:</label>
								<input
									className={style.input__field}
									type="file"
									id="video"
									name="video_url"
									onInput={handleChange}
								/>
								<p className={style.input__description}>{errors.video_url}</p>
								<Button text={"Crear Clase"} onClick={() => onSubmit()} />
							</div>
						</div>
					</div>
				</div>
			)}
			{loading && (
				<div className={style.container}>
					<div className={style.loader}></div>
				</div>
			)}
		</>
	);
};

export default FormLecture;
